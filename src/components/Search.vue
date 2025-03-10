<script setup lang="ts">
	import { ref } from "vue";

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
		<button
			@click="clearSearch"
			class="search__button"
			:tabindex="!!searchValue ? 0 : -1"
			aria-label="Очистить поле ввода"
		>
			<svg class="search__button-icon" height="24" width="24">
				<use href="@/assets/navigation.svg#clearSearch"/>
			</svg>
		</button>
	</div>
</template>


<style scoped lang="scss">
	@mixin active-label {
		top: -2px;

		@include typography(date, false);
		color: $color-text-main;
	}

	.search {
		position: relative;

		height: 36px;
		width: 100%;

		&__label {
			position: absolute;
			left: 10px;
			top: 50%;

			@include typography(text);

			transform: translateY(-50%);
			transition: all 0.2s ease-in-out;

			pointer-events: none;

			&.active {
				@include active-label;
			}
		}

		&__input {
			padding-right: 40px;
			padding-left: 10px;
			@include full-size;

			@include typography(text, false, true);

			background: $color-bg-extra;
			border-radius: 5px;

			@include focus-visible;
			
			&::-webkit-search-cancel-button {
				display: none;
			}

			&:focus + .search__label {
				@include active-label;
			}
		}

		&__button {
			position: absolute;
			right: 10px;
			top: 50%;

			transform: translateY(-50%);

			@include button-base;
		}
	}


	@media(hover: hover) {
		.search__button:hover {
			color: $color-active-icon;
		}
	}
</style>