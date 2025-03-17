<script setup lang="ts">
	import { useAuth } from "@/store";


	const { login, register } = useAuth();
</script>


<template>
	<div class="welcome">
		<div class="welcome__wrapper">
			<img 
				class="welcome__wrapper-image"
				src="/favicon.svg" 
				alt="Логотип 'Kwagga Чат'"
			>
		</div>
		<h1 class="welcome__title">Kwagga Чат</h1>
		<span class="welcome__subtitle">Твой мир в одном приложении!</span>
		<div class="welcome__navigation">
			<button @click="login" class="welcome__navigation-button">Войти</button>
			<button @click="register" class="welcome__navigation-button">Зарегистрироваться</button>
		</div>
	</div>
</template>


<style lang="scss" scoped>
	.welcome {
		@include flex-center;
		@include full-size;

		flex-direction: column;

		&__wrapper {
			height: 200px;
			width: 200px;

			&-image {
				@include full-size;
				pointer-events: none;
			}
		}

		&__title {
			margin-bottom: 10px;

			color: var(--color-text-main);
			font-size: 32px;
			font-weight: 800;
		}

		&__subtitle {
			margin-bottom: 80px;

			color: var(--color-text-muted);
			font-weight: 400;
			font-size: 14px;
		}

		&__navigation {
			@include flex-column;
			
			gap: 10px;
			max-width: 250px;
			width: 100%;

			&-button {
				@include focus-visible;

				padding: 8px;
	
				background: var(--color-button);
				border-radius: 10px;

				color: var(--color-text-main);
				font-weight: 400;
				font-size: 14px;
			}
		}
	}


	@media(hover: hover) {
		.welcome__navigation-button:hover {
			background: var(--color-active-button);
		}
	}
</style>