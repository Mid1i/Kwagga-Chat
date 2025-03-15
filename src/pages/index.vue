<script setup lang="ts">
	import { onMounted } from "vue";
	import { storeToRefs } from "pinia";

	import Chat from "@/components/chat/Chat.vue";
	import ChatList from "@/components/chat/ChatList.vue";
	import CustomButton from "@/components/ui/CustomButton.vue";
	import Search from "@/components/search/Search.vue";

	import { useChats, useChat } from "@/store";

	
	const { isChatOpen } = storeToRefs(useChat());

	const { loadChats } = useChats();

	
	onMounted(loadChats);
</script>


<template>
	<aside :class="['container__side-nav side-nav', { open: !isChatOpen }]">
		<header class="side-nav__header">
			<CustomButton
				is-base
				label="Открыть меню навигации"
				icon="burgerMenu"
			/>
			<h6 class="side-nav__header-title">Чаты</h6>
			<CustomButton
				custom-class="mobile"
				label="Изменить порядок чатов"
				text="Изм."
			/>
			<Search/>
		</header>
		<ChatList/>
		<CustomButton
			is-round-accent
			label="Начать новый чат"
			icon="newChat"
		/>
	</aside>
	<Chat/>
</template>


<style scoped lang="scss">
	.side-nav {
		position: relative;
		overflow: hidden;

		display: flex;
		flex-direction: column;
		max-width: 430px;
		width: 100%;

		transition: var(--transition-all);

		&__header {
			align-items: center;
			display: flex;
			flex-wrap: wrap;
			gap: 15px;
			padding: 0px 15px 10px;

			&-edit {
				display: none;
			}

			&-title {
				@include title;
			}
		}

		:deep(.button.round-accent) {
			position: absolute;
			bottom: -60px;
			right: 40px;
			z-index: 5px;
		}

		&:focus-within :deep(.button.round-accent) {
			bottom: 30px;
		}
	}


	@media(hover: hover) {
		.side-nav:hover :deep(.button.round-accent) {
			bottom: 30px;
		}

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
			height: 100%;
			max-width: 100%;

			&.open {
				left: 0px;
			}

			:deep(.button.round-accent) {
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