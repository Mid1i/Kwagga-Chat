<script setup lang="ts">
	import { onMounted, watch } from "vue";
	import { useRoute } from "vue-router";

	import CurrentChat from "@/components/CurrentChat.vue";
	import ChatList from "@/components/ChatList.vue";
	import Search from "@/components/Search.vue";

	import { useChatStore } from "@/stores/chat";


	const chatStore = useChatStore();
	const route = useRoute();


	onMounted(chatStore.getChats);

	watch(() => chatStore.chatsStatus, () => chatStore.setCurrentChat(Number(route.params?.id) ?? null));
</script>


<template>
	<aside :class="['container__side-nav side-nav', { open: !chatStore.isOpen }]">
		<header class="side-nav__header">
			<button class="side-nav__header-button" aria-label="Открыть меню навигации">
				<svg class="side-nav__header-icon">
					<use href="@/assets/navigation.svg#burgerMenu"/>
				</svg>
			</button>
			<h6 class="side-nav__header-title">Чаты</h6>
			<button class="side-nav__header-edit" aria-label="Изменить порядок чатов">Изм.</button>
			<Search/>
		</header>
		<ChatList/>
		<button class="side-nav__button" aria-label="Начать новый чат">
			<svg class="side-nav__icon">
				<use href="@/assets/navigation.svg#newChat"/>
			</svg>
		</button>
	</aside>
	<CurrentChat/>
</template>


<style scoped lang="scss">
	.side-nav {
		position: relative;
		overflow: hidden;

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
			}

			&-edit {
				display: none;
			}

			&-title {
				@include title;
			}
		}

		&__button {
			position: absolute;
			bottom: max(-60px, -3.15vw);
			right: max(40px, 2.1vw);
			z-index: var(--layer-button-z-index);

			@include button-round;
			height: var(--size-avatar-base);
			width: var(--size-avatar-base);

			background: var(--color-accent);

			& svg {
				height: 50%;
				width: 50%;
			}
		}
	}


	@media(hover: hover) {
		.side-nav:hover .side-nav__button {
			bottom: max(30px, 1.56vw);
		}

		.side-nav__header-button:hover {
			color: var(--color-active-icon);
		}

		.side-nav__button:hover {
			background: var(--color-active-accent);
		}
	}

	@media(max-width: 767px) {
		.side-nav {
			position: fixed;
			left: -100%;
			top: 0px;

			overflow: hidden;
			padding-top: 10px;
			height: 100%;
			max-width: 100%;

			&.open {
				left: 0px;
			}

			&__button {
				bottom: 20px;
				right: 20px;
			}

			&__header {
				justify-content: space-between;
				padding: 0px 15px 10px;
				gap: 20px;

				&-edit {
					display: block;

					@include text(true);
				}
			}
		}
	}
</style>