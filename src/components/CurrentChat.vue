<script setup lang="ts">
	import { computed } from "vue";

	import type { IHistory } from "@/interfaces/History";
	import type { IChat } from "@/interfaces/Chat";

	import CurrentChatHeader from "@/components/CurrentChatHeader.vue";
	import CurrentChatFooter from "@/components/CurrentChatFooter.vue";
	import CustomScrollbar from "@/components/CustomScrollbar.vue";
	import CustomLoader from "@/components/CustomLoader.vue";
	import Message from "@/components/Message.vue";
	import { useChatStore } from "@/store/chat";
	import { useUserStore } from "@/store/user";
	import { MONTHES } from "@/constants";


	const chatStore = useChatStore();
	const userStore = useUserStore();

	const chat = computed<IChat & { color: string } | null>(() => chatStore.currentChat);
	const history = computed<IHistory[]>(() => chatStore.history);

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
	<!-- <custom-loader
		:condition-loading="!!chat && chatStore.historyStatus === 'loading'"
		:condition-empty="!chat"
		empty-text="Выберите, кому хотели бы написать"
	> -->
	<custom-loader
		:condition-loading="false"
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
				<!-- <custom-loader
					:condition-loading="chatStore.historyStatus === 'loading'"
					:condition-empty="chatStore.historyStatus === 'success' && !history"
					empty-text="Сообщений пока нет"
				> -->
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
				<!-- </custom-loader> -->
			</custom-scrollbar>
			<CurrentChatFooter
				@inputMessage="(text: string) => chatStore.updateUnsentMessages(text)"
			/>
		</div>
	</custom-loader>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.chat {
		position: relative;

		display: flex;
		flex: 1 1 auto;
		flex-direction: column;

		background: var(--color-bg-secondary);
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
				align-self: center;
				order: 1;

				position: sticky;
				top: 10px;

				padding: 10px;

				@include text;
				color: var(--color-text-primary);

				background: var(--color-bg-extra);
				border-radius: 20px;
			}
		}
	}
</style>