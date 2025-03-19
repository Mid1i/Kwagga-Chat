<script setup lang="ts">
	import { ref } from "vue";

	import CustomButton from "@/components/ui/CustomButton.vue";


	const emit = defineEmits<{
		clearSearch: [];
		onSearch: [];
	}>();

	const inputRef = ref<HTMLElement | null>(null);
	const model = defineModel();


	const handleKeydown = (event: KeyboardEvent): void => {
		if (event.key === "Escape" || (event.key === "Backspace" && !model.value)) emit("clearSearch");
		if (event.key === "Enter") emit("onSearch");
	};
</script>


<template>
	<div class="search">
		<input
			v-model="model"
			@keydown="handleKeydown"
			class="search__input"
			id="chatSearch"
			ref="inputRef"
			type="search"
		/>
		<label :class="['search__label', { active: !!model }]" for="chatSearch">Поиск</label>
		<CustomButton
			@click="$emit('clearSearch')"
			label="Очистить поле ввода"
			icon="clearSearch"
		/>
	</div>
</template>


<style scoped lang="scss">
	@mixin active-label {
		top: -2px;

		@include date;
		font-weight: 600;
		color: var(--color-text-main);
	}

	.search {
		position: relative;

		height: 36px;
		width: 100%;

		&__label {
			@include text;
			
			position: absolute;
			left: 10px;
			top: 50%;

			transform: translateY(-50%);
			transition: var(--transition-all);

			pointer-events: none;

			&.active {
				@include active-label;
			}
		}

		&__input {
			@include full-size;
			@include text(true);
			@include focus-visible;
			
			padding-right: 40px;
			padding-left: 10px;


			background: var(--color-bg-extra);
			border-radius: 5px;

			transition: var(--transition-all);
			
			&::-webkit-search-cancel-button {
				display: none;
			}

			&:focus + .search__label {
				@include active-label;
			}
		}

		:deep(.button) {
			position: absolute;
			right: 10px;
			top: 50%;

			transform: translateY(-50%);
		}
	}
</style>