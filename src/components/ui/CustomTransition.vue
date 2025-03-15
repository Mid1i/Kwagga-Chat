<script setup lang="ts">
	const { transitionName = "scale" } = defineProps<{ transitionName?: "scale" }>();
</script>


<template>
	<Transition :name="transitionName">
		<slot></slot>
	</Transition>
</template>


<style lang="scss" scoped>
	.scale-enter-from,
	.scale-leave-to {
		opacity: 0;
		transform: scale(0.9);
	}

	.scale-enter-active,
	.scale-leave-active {
		position: absolute;
		transition: all var(--duration-transition-base) ease-in-out;
	}

	.scale-enter-to,
	.scale-leave-from {
		transform: scale(1.1);
	}
</style>