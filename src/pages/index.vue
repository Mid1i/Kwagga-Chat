<script setup lang="ts">
	import { onMounted } from "vue";

	import CurrentChat from "@/components/CurrentChat.vue";
	import ChatList from "@/components/ChatList.vue";
	import Search from "@/components/Search.vue";

	import { useChatStore } from "@/stores/chat";


	const chatStore = useChatStore();
	
	onMounted(chatStore.getChats);
</script>


<template>
	<aside :class="['container__side-nav side-nav', { open: !chatStore.isOpen }]">
		<header class="side-nav__header">
			<button class="side-nav__header-button burger-menu" aria-label="Открыть меню навигации">
				<svg class="side-nav__header-icon">
					<use href="@/assets/navigation.svg#burgerMenu"/>
				</svg>
			</button>
			<button class="side-nav__header-edit" aria-label="Изменить порядок чатов">Изм.</button>
			<h6 class="side-nav__header-title">Чаты</h6>
			<button class="side-nav__header-button new-chat" aria-label="Начать новый чат">
				<svg class="side-nav__header-icon">
					<use href="@/assets/navigation.svg#newChat"/>
				</svg>
			</button>
			<Search/>
		</header>
		<ChatList/>
	</aside>
	<CurrentChat/>
</template>


<style scoped lang="scss">
	.side-nav {
		display: flex;
		flex-direction: column;
		max-width: max(430px, 22.4vw);
		width: 100%;

		transition: all var(--duration-transition-base);

		&__header {
			align-items: center;
			display: flex;
			flex-wrap: wrap;
			gap: max(15px, 0.78vw);
			padding: 0px max(15px, 0.78vw) max(10px, 0.52vw);

			&-button {
				@include button-base;

				&.new-chat {
					margin-left: auto;
				}
			}

			&-edit {
				display: none;
			}

			&-title {
				@include title;
			}
		}
	}


	@media(hover: hover) {
		.side-nav__header-button:hover {
			color: var(--color-active-icon);
		}
	}

	@media(max-width: 767px) {
		.side-nav {
			position: fixed;
			left: -100%;
			top: 0px;

			overflow: hidden;
			padding-top: 10px;
			max-width: 100%;

			&.open {
				left: 0px;
			}

			&__header {
				justify-content: space-between;
				padding: 0px 15px 10px;
				gap: 20px;

				&-button.new-chat {
					margin-left: 0px;
				}

				&-button.burger-menu {
					display: none;
				}

				&-edit {
					display: block;

					@include text(true);
				}
			}
		}
	}
</style>