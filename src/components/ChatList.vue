<script setup lang="ts">
	import { computed } from "vue";

	import type { Chat } from "@/interfaces/Chat";
	import { useChatStore } from "@/store/chat";
	import { formattedTime, formattedDate } from "@/helpers/datetime";

	import messageIcons from "@/assets/icons/message.svg";


	const chatStore = useChatStore();

	const chats = computed<Chat[]>(() => chatStore.chats);


	const getMessageDate = (messageDate: string): string => {
		const date = new Date(messageDate);
		date.setHours(0, 0, 0, 0);

		const now = new Date();
		now.setHours(0, 0, 0, 0);

		return (date.getTime() === now.getTime()) ? formattedTime(new Date(messageDate)) : formattedDate(date);
	};

	const getButtonAria = (firstName: string, lastName: string): string => `Перейти в чат с пользователем ${firstName} ${lastName}`;

	const getIconAria = (unread: boolean): string => `Сообщение ${unread ? "не " : ""}прочитано`;
	
	const getIconLink = (unread: boolean): string => `${messageIcons}#${unread ? 'check' : 'doubleCheck'}`;
	
	const isSelected = (chatId: number): boolean => chatId === chatStore.selectedChat?.id;
</script>


<template>
	<ul class="chats-list">
		<li
			v-for="({ id, partner, lastMessage, unreadMessages }) in chats"
			:key="id"
			class="chats-list__el"
		>
			<button 
				@click="chatStore.selectChat(id)"
				:class="['chats-list__button', { selected: isSelected(id) }]"
				:aria-label="getButtonAria(partner.firstName, partner.lastName)"
			>
				<div class="chats-list__row">
					<span class="chats-list__partner">{{ partner.firstName }}</span>
					<span class="chats-list__datetime">
						<svg 
							v-if="lastMessage.unread !== undefined"
							:aria-label="getIconAria(lastMessage.unread)"
							:class="['chats-list__icon', { unread: lastMessage.unread }]" 
							height="20" 
							width="20"
						>
							<use :href="getIconLink(lastMessage.unread)"/>
						</svg>
						{{ getMessageDate(lastMessage.datetime) }}
					</span>
				</div>
				<div class="chats-list__row">
					<span class="chats-list__message">{{ lastMessage.text }}</span>
					<span 
						v-show="!!unreadMessages" 
						aria-label="Непрочитанных сообщений"
						class="chats-list__unread"
					>{{ unreadMessages }}</span>
				</div>
			</button>
		</li>
	</ul>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.chats-list {
		display: flex;
		flex: 1 0 auto;
		flex-direction: column;
		gap: 10px;

		&__button {
			display: flex;
			flex-direction: column;
			gap: 5px;

			padding: 8px 12px;

			width: 100%;
			
			&:hover,
			&:focus-visible {
				background: var(--color-hover-bg);
			}

			&.selected {
				background: var(--color-selected-bg);
			}
		}

		&__row {
			align-items: center;
			display: flex;
			justify-content: space-between;
			gap: 5px;

			width: 100%;
		}

		&__partner {
			color: var(--color-text-primary);
			font-size: 16px;
			font-weight: 500;

			@include textOverflow;
		}

		&__datetime {
			align-items: center;
			display: flex;
			gap: 5px;

			color: var(--color-text-secondary);
			font-weight: 500;
			font-size: 14px;
		}

		&__icon {
			color: var(--color-accent-primary);
			
			flex: 0 0 auto;
			height: 20px;
			width: 20px;

			&.unread {
				color: var(--color-text-secondary);
			}
		}

		&__message {
			color: var(--color-text-secondary);
			font-size: 14px;

			@include textOverflow;
		}

		&__unread {
			background: var(--color-text-muted);
			color: var(--color-accent-white);

			border-radius: 8px;

			align-items: center;
			display: flex;
			flex: 0 0 auto;
			justify-content: center;

			font-size: 12px;
			font-weight: 600;

			padding: 1px 5px;

			min-width: 18px;
		}
	}
</style>