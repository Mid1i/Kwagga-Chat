<script setup lang="ts">
	defineProps<{ 
		conditionLoading?: boolean; 
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
	.loading {
		@include flex-center;
		@include full-size;
		flex: 1 1 auto;

		&__loader {
			position: relative;
			height: var(--size-loader);
			width: var(--size-loader);

			border: max(5px, 0.26vw) solid var(--color-accent);
			border-bottom-color: transparent;
			border-radius: 100%;

			animation: rotation var(--duration-animation-loader) linear infinite;
		}

		&__empty {
			padding: max(10px, 0.52vw);

			@include text(true);

			background: var(--color-bg-extra);
			border-radius: max(17px, 0.72vw);
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