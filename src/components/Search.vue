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
		top: max(-2px, -0.1vw);

		@include date;
		color: var(--color-text-main);
	}

	.search {
		position: relative;

		height: max(36px, 1.66vw);
		width: 100%;

		&__label {
			position: absolute;
			left: max(10px, 0.52vw);
			top: 50%;

			@include text;

			transform: translateY(-50%);
			transition: all var(--duration-transition-base) ease-in-out;

			pointer-events: none;

			&.active {
				@include active-label;
			}
		}

		&__input {
			padding-right: max(40px, 2.1vw);
			padding-left: max(10px, 0.52vw);
			@include full-size;

			@include text(true);

			background: var(--color-bg-extra);
			border-radius: max(5px, 0.26vw);

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
			right: max(10px, 0.52vw);
			top: 50%;

			transform: translateY(-50%);

			@include button-base;
		}
	}


	@media(hover: hover) {
		.search__button:hover {
			color: var(--color-active-icon);
		}
	}
</style>