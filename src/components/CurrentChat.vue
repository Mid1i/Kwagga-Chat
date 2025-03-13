<script setup lang="ts">
	import { storeToRefs } from "pinia";

	import type { ICurrentChat } from "@/types";

	import CurrentChatHeader from "@/components/CurrentChatHeader.vue";
	import CurrentChatFooter from "@/components/CurrentChatFooter.vue";
	import CustomLoader from "@/components/CustomLoader.vue";
	import Message from "@/components/Message.vue";

	import { formattedDate } from "@/helpers/datetime";
	import { useChatStore } from "@/stores/chat";
	import { useUserStore } from "@/stores/user";


	const { currentUser } = storeToRefs(useUserStore());

	const { saveUnsentMessage, setCurrentChat } = useChatStore();
	
	const { 
		currentChat, 
		chatHistory, 
		isChatOpen, 
		loading
	} = storeToRefs(useChatStore());


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
	<div :class="['chat', { opened: isChatOpen }]">
		<custom-loader
			:condition-empty="!currentChat"
			empty-text="Выберите, кому хотели бы написать"
		>
			<CurrentChatHeader
				@back-to-chats="setCurrentChat(null)"
				:="(currentChat as ICurrentChat)"
			/>
				<custom-loader
					:condition-loading="loading"
					:condition-empty="chatHistory.length === 0"
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
			<CurrentChatFooter @inputMessage="(text: string) => saveUnsentMessage(text)"/>
		</custom-loader>
	</div>
</template>


<style scoped lang="scss">
	.chat {
		position: relative;

		@include flex-column;
		flex: 1 1 auto;

		background: var(--color-bg-current-chat);
		border-top-left-radius: max(20px, 1.04vw);

		transition: all var(--duration-transition-base);

		&__history {
			position: relative;

			display: flex;
			flex: 1 1 auto;
			flex-direction: column-reverse;
			gap: max(10px, 0.52vw);

			padding: max(10px, 0.52vw) max(40px, 2.1vw);

			@include scroll-content(10px);
		}

		&__group {
			display: flex;
			flex-direction: column-reverse;
			gap: inherit;

			&-date {
				position: sticky;
				top: max(10px, 0.52vw);
				z-index: var(--layer-sticky-z-index);

				align-self: center;
				padding: max(10px, 0.52vw);
				order: 1;

				@include text(true);

				background: var(--color-group-date);
				backdrop-filter: blur(max(5px, 0.26vw));
				border: max(1px, 0.05vw) solid var(--color-border-dark);
				border-radius: max(20px, 1.04vw);

				-webkit-backdrop-filter: blur(max(5px, 0.26vw));
			}
		}
	}


	@media(max-width: 767px) {
		.chat {
			position: fixed;
			right: -100%;
			top: 0px;
			
			overflow: hidden;
			@include full-size;

			&.opened {
				right: 0px;
			}

			&__history {
				padding: 5px 15px;
			}

			&__group-date {
				top: 0px;

				padding: 5px 10px;
			}
		}
	}
</style>