<script setup lang="ts">
	import ProfileNavigation from "@/components/ProfileNavigation.vue";
	import ChatList from "@/components/ChatList.vue";
	import Search from "@/components/Search.vue";

	import { usePopup } from "@/hooks/usePopup";


	const { isOpened, togglePopup } = usePopup();
</script>


<template>
	<div class="container">
		<aside class="chats">
			<header :class="['chats__header', { hidden: isOpened }]">
				<h2 class="chats__header-title">Чаты</h2>
				<div class="chats__header-right">
					<button 
						@click="togglePopup"
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
				@toggle-visibility="togglePopup"
				:is-opened 
			/>
			<ChatList/>
			<ProfileNavigation/>
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
			width: 100%;

			&__header {
				background: var(--color-hover-bg);
				box-shadow: var(--shadow-header);

				align-items: center;
				display: flex;
				flex: 0 0 auto;
				justify-content: space-between;

				position: relative;
				padding: 10px 20px;
				
				height: 40px;
				
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