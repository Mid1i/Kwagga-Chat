<script setup lang="ts">
	import { computed } from "vue";

	
	const { popups } = defineProps<{ popups: boolean[] }>();

	defineEmits<{ togglePopups: [] }>();


	const isOpen = computed<boolean>(() => popups.some(p => p));
</script>


<template>
	<div 
		v-if="isOpen"
		@click="$emit('togglePopups')"
		class="backdrop"
		tabindex="0"
		aria-label="Закрыть модальное окно"
	>
		<slot></slot>
	</div>	
</template>


<style lang="scss" scoped>
	.backdrop {
		position: fixed;
		left: 0px;
		top: 0px;

		@include full-size;

		pointer-events: none;

		&.active {
			pointer-events: auto;
		}
	}
</style>