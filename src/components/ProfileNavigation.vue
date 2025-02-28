<script setup lang="ts">
	import { useUserStore } from "@/store/user";


	const userStore = useUserStore();
</script>


<template>
	<footer class="navigation">
		<button 
			aria-label="Перейти в профиль"
			class="navigation__profile"
		>
			{{ `${userStore.user.firstName} ${userStore.user.lastName}` }}
		</button>
		<button 
			aria-label="Перейти в настройки"
			class="navigation__settings"
		>
			<svg class="navigation__settings-icon" height="20" width="20">
				<use href="@/assets/icons/navigation.svg#settings"/>
			</svg>
		</button>
	</footer>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.navigation {
		background: var(--color-hover-bg);

		align-items: center;
		display: flex;
		justify-content: space-between;

		padding: max(10px, 0.5vw);

		&__profile {
			color: var(--color-text-primary);
			font-weight: 500;
			font-size: max(14px, 0.7vw);

			@include focusVisible
		}

		&__settings {
			height: max(28px, 1.45vw);
			width: max(28px, 1.45vw);

			@include focusVisible;

			&-icon {
				color: var(--color-text-secondary);

				transform: rotate(0deg);
				transition: all 0.1s ease-in-out, color 0s;

				height: 100%;
				width: 100%;
			}
		}
	}


	@media(hover: hover) {
		.navigation__settings:hover .navigation__settings-icon {
			color: var(--color-text-primary);
			transform: rotate(90deg);
		}
	}
</style>