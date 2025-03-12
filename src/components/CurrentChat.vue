<script setup lang="ts">
	import { computed } from "vue";

	import type { IHistory, StatusAPI, ICurrentChat } from "@/types";

	import CurrentChatHeader from "@/components/CurrentChatHeader.vue";
	import CurrentChatFooter from "@/components/CurrentChatFooter.vue";
	import CustomLoader from "@/components/CustomLoader.vue";
	import Message from "@/components/Message.vue";

	import { useChatStore } from "@/stores/chat";
	import { useUserStore } from "@/stores/user";

	import { MONTHES } from "@/constants";


	const chatStore = useChatStore();
	const userStore = useUserStore();

	const chat = computed<ICurrentChat | null>(() => chatStore.currentChat);

	const history = computed<IHistory[]>(() => chatStore.history);
	const historyStatus = computed<StatusAPI>(() => chatStore.historyStatus);

	const getGroupMonth = (date: string): string => {
		const month = new Date(date).getMonth();
		return `${month} ${MONTHES[month]}`;
	};

	const isUserMessage = (senderId: number): boolean => senderId === userStore.user.id;

	const getMessageRadius = (groupIndex: number, index: number): Record<string, string> => {
		const currentHistory = history.value[groupIndex];

		const messageSender = currentHistory.messages[index].sender.id;

		const prevMessageSender = index > 0 ? currentHistory.messages[index - 1].sender.id : 0;
		const nextMessageSender = index < currentHistory.messages.length - 1 ? currentHistory.messages[index + 1].sender.id : 0;

		const hasPrevFromSameSender = !!prevMessageSender && prevMessageSender === messageSender;
		const hasNextFromSameSender = !!nextMessageSender && nextMessageSender === messageSender;
		
		return {
			borderTopLeftRadius: `${isUserMessage(messageSender) ? 15 : hasNextFromSameSender ? 5 : 15}px`,
			borderTopRightRadius: `${isUserMessage(messageSender) ? (hasNextFromSameSender ? 5 : 15) : 15}px`,
			borderBottomLeftRadius: `${isUserMessage(messageSender) ? 15 : hasPrevFromSameSender ? 5 : 15}px`,
			borderBottomRightRadius: `${isUserMessage(messageSender) ? (hasPrevFromSameSender ? 5 : 15) : 15}px`,
		};
	};
</script>


<template>
	<div :class="['chat', { opened: chatStore.isOpen }]">
		<custom-loader
			:condition-loading="!!chat && historyStatus === 'loading'"
			:condition-empty="!chat"
			empty-text="Выберите, кому хотели бы написать"
		>
			<CurrentChatHeader
				@toggleChat="chatStore.toggleChat"
				:chat-color="chat!.color"
				:chat-name="`${chat!.recepient.firstName} ${chat!.recepient.lastName}`"
				:is-online="chat!.recepient.isOnline"
			/>
				<custom-loader
					:condition-loading="historyStatus === 'loading'"
					:condition-empty="historyStatus === 'success' && !history"
					empty-text="Сообщений пока нет"
				>
					<div class="chat__history">
						<div 
							v-for="(group, groupIndex) in history"
							class="chat__group"
							:key="group.date"
						>
							<span class="chat__group-date">{{ getGroupMonth(group.date) }}</span>
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
			<CurrentChatFooter
				@inputMessage="(text: string) => chatStore.updateUnsentMessages(text)"
			/>
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
				z-index: var(--layer-sticky-z-index);

				align-self: center;
				order: 1;

				position: sticky;
				top: max(10px, 0.52vw);

				padding: max(10px, 0.52vw);

				@include text(true);

				background: var(--color-group-date);
				border: max(1px, 0.05vw) solid var(--color-border-dark);
				border-radius: max(20px, 1.04vw);
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