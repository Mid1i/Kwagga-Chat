<script setup lang="ts">
	const { transitionName = "scale" } = defineProps<{ transitionName?: "scale" | "scale-extra" }>();
</script>


<template>
	<Transition :name="transitionName">
		<slot></slot>
	</Transition>
</template>


<style lang="scss" scoped>
	.scale-extra-enter-from,
	.scale-extra-leave-to,
	.scale-enter-from,
	.scale-leave-to {
		opacity: 0;
		transform: scale(0.9);
	}

	.scale-extra-enter-active,
	.scale-extra-leave-active,
	.scale-enter-active,
	.scale-leave-active {
		position: absolute;
		transition: all var(--transition-all);
	}

	.scale-enter-to,
	.scale-leave-from {
		transform: scale(1);
	}

	.scale-extra-enter-to,
	.scale-extra-leave-from {
		transform: scale(1.1);
	}
</style>