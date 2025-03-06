<script setup lang="ts">
	// import ChatList from "@/components/ChatList.vue";
	import Search from "@/components/Search.vue";

	// import { useChatStore } from "@/store/chat";


	// const chatStore = useChatStore();
</script>


<template>
	<div class="container">
		<aside class="container__side-nav side-nav">
			<header class="side-nav__header">
				<button class="side-nav__header-button" aria-label="Открыть меню навигации">
					<svg class="side-nav__header-icon">
						<use href="@/assets/icons/navigation.svg#burgerMenu"/>
					</svg>
				</button>
				<h6 class="side-nav__header-title">Чаты</h6>
				<Search/>
			</header>
			<!-- <ChatList/> -->
		</aside>
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

	.side-nav {
		display: flex;
		flex-direction: column;
		padding: 20px 15px 0px;
		width: 430px;

		&__header {
			align-items: center;
			display: flex;
			flex-wrap: wrap;
			gap: 15px;
			padding-bottom: 10px;

			&-button {
				@include buttonIcon;
			}

			&-title {
				@include title;
			}
		}
	}


	@media(hover: hover) {
		.side-nav__header-button:hover {
			color: var(--color-text-primary);
		}
	}
</style>