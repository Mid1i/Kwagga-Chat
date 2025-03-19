<script setup lang="ts">
	const { transitionName = "scale" } = defineProps<{ 
		transitionName?: "scale" | "scale-extra" | "rotate"
	}>();
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
		transition: var(--transition-all);
	}

	.scale-enter-to,
	.scale-leave-from {
		transform: scale(1);
	}

	.scale-extra-enter-to,
	.scale-extra-leave-from {
		transform: scale(1.1);
	}

	.rotate-enter-from,
	.rotate-leave-to {
		transform: rotate(-360deg) scale(0);
		opacity: 0;
	}

	.rotate-enter-active,
	.rotate-leave-active {
		position: absolute;
		transition: var(--transition-all);
	}

	.rotate-enter-to
	.rotate-leave-from {
		transform: rotate(0deg) scale(1);
	}
</style>