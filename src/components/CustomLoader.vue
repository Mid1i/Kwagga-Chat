<script setup lang="ts">
	defineProps<{ 
		conditionLoading: boolean; 
		conditionEmpty: boolean;
		emptyText: string; 
	}>();
</script>


<template>
	<div v-if="conditionLoading || conditionEmpty" class="loading">
		<span 
			v-if="conditionLoading" 
			class="loading__loader" 
			aria-label="Идёт загрузка"
		></span>
		<span v-else class="loading__empty">{{ emptyText }}</span>
	</div>
	<slot v-else></slot>
</template>

<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;
	

	.loading {
		align-items: center;
		display: flex;
		flex: 1 1 auto;
		justify-content: center;
		height: 100%;
		width: 100%;

		&__loader {
			position: relative;
			height: 50px;
			width: 50px;

			border: 5px solid var(--color-accent-primary);
			border-bottom-color: transparent;
			border-radius: 100%;

			animation: rotation 1s linear infinite;
		}

		&__empty {
			padding: 10px;

			@include text;
			color: var(--color-text-primary);

			background: var(--color-bg-extra);
			border-radius: 17px;
		}
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>