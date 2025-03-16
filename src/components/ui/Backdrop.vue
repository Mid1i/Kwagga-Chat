<script setup lang="ts">
	import { ref, onUpdated } from "vue";

	import CustomTransition from "@/components/ui/CustomTransition.vue";


	defineProps<{ isOpen: boolean }>();

	const emit = defineEmits<{ togglePopup: [] }>();

	const backdropRef = ref<HTMLElement | null>(null);

	const closePopup = (event: KeyboardEvent) => {
		if (event.key === "Escape" || event.key === " " || event.key === "Enter") emit('togglePopup');
	};


	onUpdated(() => backdropRef.value?.focus());
</script>


<template>
	<teleport to="body">
		<custom-transition>
			<div
				v-if="isOpen"
				@keyup.prevent="closePopup"
				@click="$emit('togglePopup')"
				ref="backdropRef"
				class="backdrop"
				aria-label="Закрыть модальное окно"
				tabindex="0"
			>
				<slot></slot>
			</div>
		</custom-transition>
	</teleport>
</template>


<style lang="scss" scoped>
	.backdrop {
		@include full-size;
		
		position: fixed;
		left: 0px;
		top: 0px;
		z-index: var(--z-backdrop);

		transform-origin: left top; 
	}
</style>