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
	.loading {
		@include flex-center;
		@include full-size;
		flex: 1 1 auto;

		&__loader {
			position: relative;
			height: 50px;
			width: 50px;

			border: 5px solid $color-accent;
			border-bottom-color: transparent;
			border-radius: 100%;

			animation: rotation $duration-animation-loader linear infinite;
		}

		&__empty {
			padding: 10px;

			@include typography(text, false, true);

			background: $color-bg-extra;
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