<script setup lang="ts">
	import { ref } from "vue";

	import CustomButton from "@/components/ui/CustomButton.vue";

	import useSearch from "@/composables/useSearch";


	const inputRef = ref<HTMLElement | null>(null);

	const { searchValue, clearSearch } = useSearch();

	const handleKeydown = (event: KeyboardEvent): void => {
		if (event.key === "Escape" || (event.key === "Backspace" && !searchValue.value)) clearSearch();
	};
</script>


<template>
	<div class="search">
		<input
			@keydown="handleKeydown"
			v-model="searchValue"
			class="search__input"
			id="chatSearch"
			ref="inputRef"
			type="search"
		/>
		<label :class="['search__label', { active: !!searchValue }]" for="chatSearch">Поиск</label>
		<CustomButton
			@click="clearSearch"
			label="Очистить поле ввода"
			icon="clearSearch"
		/>
	</div>
</template>


<style scoped lang="scss">
	@mixin active-label {
		top: -2px;

		@include date;
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