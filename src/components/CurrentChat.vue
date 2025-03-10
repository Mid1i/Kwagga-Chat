<script setup lang="ts">
	import { computed } from "vue";

	import type { IHistory, StatusAPI, ICurrentChat } from "@/types";

	import CurrentChatHeader from "@/components/CurrentChatHeader.vue";
	import CurrentChatFooter from "@/components/CurrentChatFooter.vue";
	import CustomScrollbar from "@/components/CustomScrollbar.vue";
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
	<custom-loader
		:condition-loading="!!chat && historyStatus === 'loading'"
		:condition-empty="!chat"
		empty-text="Выберите, кому хотели бы написать"
	>
		<div class="chat">
			<CurrentChatHeader
				:chat-color="chat!.color"
				:chat-name="`${chat!.recepient.firstName} ${chat!.recepient.lastName}`"
				:is-online="chat!.recepient.isOnline"
			/>
			<custom-scrollbar 
				css-scrollbar-width="10" 
				css-border-radius="3"
			>
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
			</custom-scrollbar>
			<CurrentChatFooter
				@inputMessage="(text: string) => chatStore.updateUnsentMessages(text)"
			/>
		</div>
	</custom-loader>
</template>


<style scoped lang="scss">
	.chat {
		position: relative;

		@include flex-column;
		flex: 1 1 auto;

		background: $color-bg-current-chat;
		border-top-left-radius: 10px;

		&__history {
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
				z-index: $layer-sticky-z-index;

				align-self: center;
				order: 1;

				position: sticky;
				top: 10px;

				padding: 10px;

				@include typography(text, false, true);

				background: $color-group-date;
				border: 1px solid $color-border-dark;
				border-radius: 20px;
			}
		}
	}
</style>