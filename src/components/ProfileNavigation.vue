<script setup lang="ts">
	import { useRoute } from "vue-router";

	import { useUserStore } from "@/store/user";


	const userStore = useUserStore();

	const router = useRoute();
</script>


<template>
	<footer class="footer">
		<button 
			aria-label="Перейти в профиль"
			class="footer__profile"
		>
			{{ `${userStore.user.firstName} ${userStore.user.lastName}` }}
			<br/>
			<span class="footer__profile-username">{{ `@${userStore.user.username}` }}</span>
		</button>
		<div class="footer__right">
			<button 
				aria-label="Начать новый чат"
				class="footer__button"
			>
				<svg class="footer__button-icon new-chat" height="20" width="20">
					<use href="@/assets/icons/navigation.svg#newChat"/>
				</svg>
			</button>
			<button 
				aria-label="Перейти в настройки"
				class="footer__button"
			>
				<svg class="footer__button-icon" height="20" width="20">
					<use href="@/assets/icons/navigation.svg#settings"/>
				</svg>
			</button>
		</div>
	</footer>
	<nav class="navigation">
		<ul class="navigation__list">
			<li class="navigation__list-el">
				<button 
					:class="['navigation__list-button', { active: router.path === '/profile' }]"
					aria-label="Перейти в профиль"
				>
					<svg class="navigation__list-icon" height="20" width="20">
						<use href="@/assets/icons/navigation.svg#profile"/>
					</svg>
					Профиль
				</button>
			</li>
			<li class="navigation__list-el">
				<button 
					:class="['navigation__list-button', { active: router.path === '/' }]"
					aria-label="Перейти в чаты"
				>
					<svg class="navigation__list-icon" height="20" width="20">
						<use href="@/assets/icons/navigation.svg#chats"/>
					</svg>
					Чаты
				</button>
			</li>
			<li class="navigation__list-el">
				<button 
					:class="['navigation__list-button', { active: router.path === '/settings' }]"
					aria-label="Перейти в настройки"
				>
					<svg class="navigation__list-icon" height="20" width="20">
						<use href="@/assets/icons/navigation.svg#settings"/>
					</svg>
					Настройки
				</button>
			</li>
		</ul>
	</nav>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.footer {
		background: var(--color-hover-bg);

		display: flex;
		justify-content: space-between;
		gap: max(5px, 0.25vw);

		padding: max(10px, 0.5vw);
		width: 100%;

		z-index: 3;

		&__profile {
			color: var(--color-text-primary);
			font-weight: 500;
			font-size: max(14px, 0.7vw);

			@include focusVisible;
			@include textOverflow;

			&-username {
				color: var(--color-text-secondary);
				font-size: max(14px, 0.7vw);
			}
		}

		&__right {
			display: flex;
			gap: inherit;
		}

		&__button {
			height: max(28px, 1.45vw);
			width: max(28px, 1.45vw);

			@include focusVisible;

			&-icon {
				color: var(--color-text-secondary);

				transform: rotate(0deg);

				height: 100%;
				width: 100%;
			}
		}
	}

	.navigation {
		display: none;
	}


	@media(hover: hover) {
		.footer__button:hover .footer__button-icon:not(.new-chat) {
			color: var(--color-text-primary);
			transform: rotate(90deg);
		}

		.footer__button:hover .footer__button-icon.new-chat {
			color: var(--color-text-primary);
		}
	}

	@media(max-width: 767px) {
		.footer {
			display: none;
		}

		.navigation {
			background: var(--color-hover-bg);

			display: flex;
			flex: 0 0 auto;

			padding: 0px;
			z-index: 3;

			&__list {
				display: flex;
				justify-content: space-around;
				gap: 10px;

				padding: 10px 20px 20px;
				width: 100%;

				&-icon {
					color: var(--color-text-secondary);

					height: 20px;
					width: 20px;
				}

				&-button {
					align-items: center;
					display: flex;
					flex-direction: column;
					gap: 5px;

					color: var(--color-text-secondary);
					font-size: 12px;

					&.active {
						color: var(--color-accent-primary);

						& .navigation__list-icon {
							color: var(--color-accent-primary);
						}
					}
				}
			}
		}
	}
</style>