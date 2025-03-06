<script setup lang="ts">
	import { computed, ref, onMounted, nextTick } from "vue";

	import type { IChat } from "@/interfaces/Chat";
	import { formattedTime, formattedDate } from "@/helpers/datetime";
	import { useScrollToTop } from "@/hooks/useScrollToTop";
	import { useChatStore } from "@/store/chat";

	import messageIcons from "@/assets/icons/message.svg";


	defineEmits<{ toggleVisibility: [] }>();

	const chatStore = useChatStore();

	const { scrollToTop, isScrolled } = useScrollToTop();
	
	const chats = computed<IChat[]>(() => chatStore.chats);
	const tabIndex = computed<number>(() => isScrolled.value ? 0 : -1);

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


	import CustomScrollbar from "@/components/CustomScrollbar.vue";
</script>


<template>
	<template v-if="chats.length > 0">
		<custom-scrollbar css-scrollbar-width="5">
			<ul class="chats-list">
				<li
					v-for="({ id, partner, lastMessage, unreadMessages }) in chats"
					:key="id"
					class="chats-list__el"
				>
					<button 
						@click="chatStore.selectChat(id), $emit('toggleVisibility')"
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
							<span class="chats-list__message">
								<span class="chats-list__message-accent">{{ lastMessage.senderId !== partner.id ? "Вы: " : "" }}</span>
								{{ lastMessage.text }}
							</span>
							<span 
								v-show="!!unreadMessages" 
								aria-label="Непрочитанных сообщений"
								class="chats-list__unread"
							>{{ unreadMessages }}</span>
						</div>
					</button>
				</li>
			</ul>
		</custom-scrollbar>
		<button 
			@click="scrollToTop"
			:class="['scroll-to-top', { active: isScrolled }]"
			:tabindex="tabIndex"
			aria-label="Перейти в начало чатов"
		>
			<svg class="scroll-to-top__icon" height="20" width="20">
				<use href="@/assets/icons/navigation.svg#arrowUp"/>
			</svg>
		</button>
	</template>
	<div v-else class="empty">
		<p class="empty__text">Здесь пока ничего нет</p>
		<button class="empty__button">Начать новый чат</button>
	</div>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.chats-list {
		display: flex;
		// flex: 1 1 auto;
		flex-direction: column;

		// overflow-y: overlay;
		padding: max(15px, 0.8vw) 0px;
		// height: 100%;

		&::-webkit-scrollbar {
			display: none;
		}

		&__row {
			align-items: center;
			display: flex;
			justify-content: space-between;
			gap: max(5px, 0.25vw);

			width: 100%;
		}

		&__partner {
			color: var(--color-text-primary);
			font-size: max(16px, 0.8vw);
			font-weight: 500;

			@include textOverflow;
		}

		&__datetime {
			align-items: center;
			display: flex;
			gap: max(5px, 0.25vw);

			color: var(--color-text-secondary);
			font-size: max(14px, 0.7vw);
		}

		&__icon {
			color: var(--color-accent-primary);
			
			flex: 0 0 auto;
			height: max(16px, 0.85vw);
			width: max(16px, 0.85vw);

			&.unread {
				color: var(--color-text-secondary);
			}
		}

		&__message {
			color: var(--color-text-secondary);
			font-size: max(14px, 0.7vw);

			@include textOverflow;

			&-accent {
				color: var(--color-accent-primary);
			}
		}

		&__unread {
			background: var(--color-text-muted);
			color: var(--color-accent-white);

			border-radius: max(8px, 0.4vw);

			align-items: center;
			display: flex;
			flex: 0 0 auto;
			justify-content: center;

			font-size: max(12px, 0.6vw);
			font-weight: 600;

			padding: 1px max(5px, 0.25vw);

			min-width: max(18px, 0.9vw);
		}

		&__button {
			display: flex;
			flex-direction: column;
			gap: max(5px, 0.25vw);

			padding: max(15px, 0.75vw) max(12px, 0.6vw);

			width: 100%;
			
			&:focus-visible {
				background: var(--color-hover-bg);
			}

			&.selected {
				background: var(--color-selected-bg);

				.chats-list__icon,
				.chats-list__unread,
				.chats-list__partner,
				.chats-list__message,
				.chats-list__datetime,
				.chats-list__message-accent {
					color: var(--color-accent-white);
				}

				.chats-list__partner {
					font-weight: 600;
				}

				.chats-list__unread {
					background: var(--color-accent-primary);
				}
			}
		}
	}

	.scroll-to-top {
		@include focusVisible;

		background: var(--color-hover-bg);
		box-shadow: var(--shadow-scroll-button);
		border-radius: 100%;

		align-items: center;
		display: flex;
		justify-content: center;
		
		position: absolute;
		bottom: 0px;
		right: max(20px, 1.05vw);

		height: max(40px, 2.1vw);
		width: max(40px, 2.1vw);

		transition: all 0.2s ease-in-out;
		z-index: 2;

		&.active {
			bottom: max(80px, 4.2vw);
		}

		&__icon {
			color: var(--color-text-secondary);

			height: 60%;
			width: 60%;
		}
	}

	.empty {
		align-items: center;
		display: flex;
		flex: 1 0 auto;
		flex-direction: column;
		justify-content: center;
		gap: max(10px, 0.5vw);

		&__text {
			color: var(--color-text-secondary);
			font-size: max(14px, 0.7vw);
		}

		&__button {
			color: var(--color-text-primary);
			font-size: max(14px, 0.7vw);

			@include focusVisible;
		}
	}


	@media(hover: hover) {
		.chats-list__button:hover:not(.selected) {
			background: var(--color-hover-bg);
		}

		.scroll-to-top:hover .scroll-to-top__icon {
			color: var(--color-text-primary);
		}

		.empty__button:hover {
			color: var(--color-accent-primary);
		}
	}

	@media(max-width: 767px) {
		.chats-list {
			padding: 0px;
			gap: 0px;
		}
		
		.chats-list__el:not(:first-child) {
			border-top: 1px solid var(--color-border-chat);
		}

		.chats-list__button {
			padding: 15px 20px;

			&:active {
				background: var(--color-hover-bg);
				transform: none;
			}
		}
	}
</style>