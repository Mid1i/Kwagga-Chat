<script setup lang="ts">
	import { useChatStore } from "@/store/chat";


	defineProps<{ isVisible: boolean }>();
	defineEmits<{ toggleVisibility: [] }>();

	const chatStore = useChatStore();
</script>


<template>
	<div v-if="!!chatStore.selectedChat" :class="['chat', { active: isVisible }]">
		<header class="chat__header">
			<button 
				@click="$emit('toggleVisibility')"
				aria-label="Вернуться назад"
				class="chat__header-back"
			>
				<svg class="chat__header-icon" height="20" width="20">
					<use href="@/assets/icons/navigation.svg#back"/>
				</svg>
				Назад
			</button>
			<button 
				aria-label="Открыть профиль пользователя"
				class="chat__header-title"
			>
				{{ `${chatStore.selectedChat.partner.firstName} ${chatStore.selectedChat.partner.lastName}` }}
				<span :class="['chat__header-status', { online: chatStore.selectedChat.partner.online }]">{{ chatStore.selectedChat.partner.online ? "онлайн" : "был(а) недавно" }}</span>
			</button>
			<div class="chat__header-right">
				<button 
					aria-label="Поиск по сообщениям в чате"
					class="chat__header-button"
				>
					<svg class="chat__header-icon" height="20" width="20">
						<use href="@/assets/icons/navigation.svg#search"/>
					</svg>
				</button>
				<button 
					aria-label="Дополнительная информация"
					class="chat__header-button"
				>
					<svg class="chat__header-icon" height="20" width="20">
						<use href="@/assets/icons/navigation.svg#more"/>
					</svg>
				</button>
			</div>
		</header>
	</div>
	<div v-else class="empty">
		<span class="empty__text">Выберите, кому хотели бы написать</span>
	</div>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.chat {
		display: flex;
		flex: 1 1 auto;
		flex-direction: column;

		&__header {
			background: var(--color-bg-secondary);
			box-shadow: var(--shadow-header);

			align-items: center;
			display: flex;
			justify-content: space-between;

			padding: max(5px, 0.25vw) max(20px, 1vw);
	
			width: 100%;

			&-title {
				color: var(--color-text-primary);
				font-weight: 600;
				font-size: max(16px, 0.8vw);

				display: flex;
				flex-direction: column;
				gap: max(2px, 0.1vw);

				@include focusVisible;
			}

			&-status {
				color: var(--color-text-secondary);
				font-size: max(12px, 0.6vw);

				&.online {
					color: var(--color-accent-primary);
				}
			}

			&-right {
				display: flex;
				gap: max(10px, 0.5vw);
			}

			&-button {
				@include focusVisible;

				height: max(28px, 1.45vw);
				width: max(28px, 1.45vw);
			}

			&-icon {
				color: var(--color-text-secondary);

				height: 100%;
				width: 100%;
			}

			&-back {
				display: none;
			}
		}
	}

	.empty {
		align-items: center;
		display: flex;
		flex: 1 1 auto;
		justify-content: center;

		&__text {
			background: var(--color-bg-secondary);
			border-radius: max(20px, 1vw);

			color: var(--color-text-primary);
			font-size: max(14px, 0.7vw);
			font-weight: 500;

			padding: max(5px, 0.25vw) max(15px, 0.75vw);
		}
	}


	@media(hover: hover) {
		.chat__header-button:hover .chat__header-icon {
			color: var(--color-text-primary);
		}
	}

	@media(max-width: 767px) {
		.chat {
			position: fixed;
			right: -100%;
			top: 0px;

			height: 100%;
			width: 100%;

			transition: all 0.3s ease-in-out;
			z-index: 3;

			&.active {
				right: 0px;
			}

			&__header {
				justify-content: space-between;
				padding-left: 10px;
	
				&-title {
					align-items: center;
					gap: 0px;
	
					font-size: 14px;
				}
	
				&-back {
					align-items: center;
					display: flex;
					gap: 5px;
	
					color: var(--color-accent-primary);
					font-size: 14px;
					font-weight: 500;
				}
	
				&-icon {
					color: var(--color-accent-primary);
				}
			}
		}
	}
</style>