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
	<aside class="container__side-nav side-nav">
		<header class="side-nav__header">
			<button class="side-nav__header-button" aria-label="Открыть меню навигации">
				<svg class="side-nav__header-icon">
					<use href="@/assets/navigation.svg#burgerMenu"/>
				</svg>
			</button>
			<h6 class="side-nav__header-title">Чаты</h6>
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
		max-width: 430px;
		width: 100%;

		&__header {
			align-items: center;
			display: flex;
			flex-wrap: wrap;
			gap: 15px;
			padding: 20px 15px 10px;

			&-button {
				@include button-base;
			}

			&-title {
				@include typography(title);
			}
		}
	}


	@media(hover: hover) {
		.side-nav__header-button:hover {
			color: $color-active-icon;
		}
	}
</style>