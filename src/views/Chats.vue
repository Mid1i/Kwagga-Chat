<script setup lang="ts">
	import ProfileNavigation from "@/components/ProfileNavigation.vue";
	import SelectedChat from "@/components/SelectedChat.vue";
	import ChatList from "@/components/ChatList.vue";
	import Search from "@/components/Search.vue";

	import { useVisibility } from "@/hooks/useVisibility";
	import { useChatStore } from "@/store/chat";


	const { isVisible: isVisibleSearch, toggleVisibility: toggleSearch } = useVisibility();
	const { isVisible: isVisibleChat, toggleVisibility: toggleChat } = useVisibility();

	const chatStore = useChatStore();
</script>


<template>
	<div class="container">
		<aside :class="['chats', { hidden: !!chatStore.selectedChat && isVisibleChat }]">
			<header :class="['chats__header', { hidden: isVisibleSearch }]">
				<h2 class="chats__header-title">Чаты</h2>
				<div class="chats__header-right">
					<button 
						@click="toggleSearch"
						aria-label="Поиск по чатам"
						class="chats__header-button"
					>
						<svg class="chats__header-icon" height="20" width="20">
							<use href="@/assets/icons/navigation.svg#search"/>
						</svg>
					</button>
					<button 
						aria-label="Начать новый чат"
						class="chats__header-button"
					>
						<svg class="chats__header-icon" height="20" width="20">
							<use href="@/assets/icons/navigation.svg#newChat"/>
						</svg>
					</button>
				</div>
			</header>
			<Search 
				@toggle-visibility="toggleSearch"
				:is-visible="isVisibleSearch" 
			/>
			<ChatList @toggle-visibility="toggleChat"/>
			<ProfileNavigation/>
		</aside>
		<SelectedChat 
			@toggle-visibility="toggleChat"
			:is-visible="isVisibleChat"
		/>
	</div>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.container {
		align-items: stretch;
		display: flex;

		height: 100%;
		width: 100%;
	}

	.chats {
		background: var(--color-bg-secondary);
		box-shadow: var(--shadow-aside-chats);

		display: flex;
		flex-direction: column;

		padding-top: max(10px, 0.52vw);
		position: relative;

		width: max(200px, 14.6vw);

		&__header {
			display: none;
		}
	}


	@media(hover: hover) {
		.chats__header-button:hover .chats__header-icon {
			color: var(--color-text-primary);
		}
	}

	@media(max-width: 767px) {
		.chats {
			padding-top: 0px;

			position: fixed;
			top: 0px;
			left: 0px;

			height: 100%;
			width: 100%;

			transition: left 0.3s ease-in-out;
			z-index: 2;

			&.hidden {
				left: -100%;
			}

			&__header {
				background: var(--color-hover-bg);
				box-shadow: var(--shadow-header);

				align-items: center;
				display: flex;
				flex: 0 0 auto;
				justify-content: space-between;

				position: relative;
				padding: 15px 20px;
				
				height: 50px;
				
				overflow: hidden;
				transition: all 0.2s ease-in-out;

				&.hidden {
					padding: 0px;
					height: 0px;
				}

				&-title {
					color: var(--color-text-primary);
					font-size: 20px;
					font-weight: 700px;
				}

				&-right {
					display: flex;
					gap: 10px;
				}

				&-icon {
					color: var(--color-text-secondary);

					height: 100%;
					width: 100%;
				}

				&-button {
					height: 28px;
					width: 28px;

					@include focusVisible;

					&:active .chats__header-icon {
						color: var(--color-text-primary);
					}
				}
			}
		}
	}
</style>