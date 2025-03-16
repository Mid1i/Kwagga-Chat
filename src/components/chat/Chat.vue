<script setup lang="ts">
	import { storeToRefs } from "pinia";

	import type { ICurrentChat } from "@/types";

	import Message from "@/components/chat/Message.vue";
	import ChatHeader from "@/components/chat/ChatHeader.vue";
	import ChatFooter from "@/components/chat/ChatFooter.vue";
	import CustomLoader from "@/components/ui/CustomLoader.vue";

	import { useChat, useUser } from "@/store";
	import { formattedDate } from "@/helpers";


	const { currentUser } = storeToRefs(useUser());

	const { 
		saveUnsentMessage,
		closeChat 
	} = useChat();
	
	const { 
		currentChat, 
		chatHistory,  
		status
	} = storeToRefs(useChat());


	const isUserMessage = (senderId: number): boolean => senderId === currentUser.value.id;

	const getMessageRadius = (groupIndex: number, index: number): Record<string, string> => {
		const BASE_RADIUS = window.matchMedia("(max-width: 767px)").matches ? "10px" : "15px";
		const SMALL_RADIUS = "5px";

		const { messages } = chatHistory.value[groupIndex];
		const messageSender = messages[index].sender.id;

		const prevSender = messages[index - 1]?.sender.id;
		const nextSender = messages[index + 1]?.sender.id;

		const hasPrevFromSameSender = prevSender === messageSender;
		const hasNextFromSameSender = nextSender === messageSender;
		const isUser = isUserMessage(messageSender);
		
		return {
			borderTopLeftRadius: isUser || !hasNextFromSameSender ? BASE_RADIUS : SMALL_RADIUS,
			borderTopRightRadius: isUser && hasNextFromSameSender ? SMALL_RADIUS : BASE_RADIUS,
			borderBottomLeftRadius: isUser || hasPrevFromSameSender ? BASE_RADIUS : SMALL_RADIUS,
			borderBottomRightRadius: isUser && !hasPrevFromSameSender ? SMALL_RADIUS : BASE_RADIUS
		}
	};
</script>


<template>
	<div class="chat">
		<custom-loader
			:condition-empty="!currentChat"
			empty-text="Выберите, кому хотели бы написать"
		>
			<ChatHeader
				@back-to-chats="closeChat"
				:="(currentChat as ICurrentChat)"
			/>
				<custom-loader
					:condition-loading="status === 'loading'"
					:condition-empty="status === 'success' && chatHistory.length === 0"
					empty-text="Сообщений пока нет"
				>
					<div class="chat__history">
						<div
							v-for="(group, groupIndex) in chatHistory"
							class="chat__group"
							:key="group.date"
						>
							<span class="chat__group-date">{{ formattedDate(new Date(group.date)) }}</span>
							<Message
								v-for="(message, index) in group.messages"
								:message-radius="getMessageRadius(groupIndex, index)"
								:is-user="isUserMessage(message.sender.id)"
								:key="message.id"
								:="message"
							/>
						</div>
					</div>
				</custom-loader>
			<ChatFooter @inputMessage="(text: string) => saveUnsentMessage(text)"/>
		</custom-loader>
	</div>
</template>


<style scoped lang="scss">
	.chat {
		@include flex-column;
		
		position: relative;

		flex: 1 1 auto;

		background: var(--color-bg-current-chat);
		border-top-left-radius: 20px;

		&__history {
			@include scroll-content(10px);
			
			position: relative;

			display: flex;
			flex: 1 1 auto;
			flex-direction: column-reverse;
			gap: 10px;

			padding: 10px 40px;
		}

		&__group {
			display: flex;
			flex-direction: column-reverse;
			gap: inherit;

			&-date {
				@include text(true);
				
				position: sticky;
				top: 10px;
				z-index: var(--z-sticky-date);

				align-self: center;
				padding: 10px;
				order: 1;

				backdrop-filter: blur(5px);
				background: var(--color-group-date);
				border: 1px solid var(--color-border-dark);
				border-radius: 20px;

				-webkit-backdrop-filter: blur(5px);
			}
		}
	}


	@media(max-width: 767px) {
		.chat {
			@include full-size;
			flex: 0 0 auto;
			
			overflow: hidden;

			&__history {
				padding: 35px 15px;
			}

			&__group-date {
				top: 0px;

				padding: 5px 10px;
			}
		}
	}
</style>