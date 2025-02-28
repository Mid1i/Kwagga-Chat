<script setup lang="ts">
	import { computed } from "vue";
	import { useChatStore } from "@/store/chat";


	const chatStore = useChatStore();

	const isActive = computed<boolean>(() => !!chatStore.searchValue);
	const tabIndex = computed<number>(() => (!!chatStore.searchValue ? 0 : -1));

	
	const handleKeydown = (event: KeyboardEvent): void => {
		if (event.key === "Escape" || (event.key === "Backspace" && !chatStore.searchValue)) chatStore.clearSearch();
	};
</script>


<template>
	<div :class="['search', { active: isActive }]">
		<label class="search__label" for="chatSearch">Поиск по чатам</label>
		<input
			@keydown="handleKeydown"
			v-model="chatStore.searchValue"
			class="search__input"
			id="chatSearch"
			type="search"
		/>
		<button
			@click="chatStore.clearSearch"
			:tabindex="tabIndex"
			class="search__button"
			aria-label="Очистить поле ввода"
		>
			<svg class="search__button-icon" height="20" width="20">
				<use href="@/assets/icons/header.svg#cross"/>
			</svg>
		</button>
	</div>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.search {
		position: relative;

		transition: padding 0.2s ease-in-out;

		&__label {
			color: var(--color-text-secondary);
			font-size: max(14px, 0.7vw);

			position: absolute;
			left: max(20px, 1vw);
			top: 50%;
			
			pointer-events: none;
			transform: translateY(-50%);
			transition: all 0.2s ease-in-out;
		}

		&__input {
			background: var(--color-hover-bg);
			color: var(--color-text-primary);

			font-weight: 500;

			padding-right: max(50px, 2.6vw);
			padding-left: max(20px, 1vw);

			height: max(40px, 2.1vw);
			width: 100%;

			&::-webkit-search-cancel-button {
				display: none;
			}
		}

		&__button {
			position: absolute;
			right: max(15px, 0.8vw);
			top: calc(50% + max(20px, 1vw));

			transform: translateY(-50%);

			@include focusVisible;

			height: max(31px, 1.6vw);
			width: max(31px, 1.6vw);

			&:focus-visible {
				border-color: var(--color-text-primary);
			}

			&-icon {
				color: var(--color-text-secondary);
	
				transform: rotate(0deg) scale(0);
				transition: all 0.1s ease-in-out, color 0s ease-in-out;
				
				height: 100%;
				width: 100%;
			}
		}

		&.active,
		&:focus-within {
			padding-top: max(40px, 2.1vw);

			& .search__label {
				color: var(--color-text-primary);
				font-weight: 700;
				font-size: max(16px, 0.8vw);

				left: max(10px, 0.5vw);
				top: max(15px, 0.8vw);
			}

			& .search__button-icon {
				transform: rotate(-135deg) scale(1);
			}
		}
	}


	@media(hover: hover) {
		.search__button:hover .search__button-icon {
			color: var(--color-text-primary);
		}
	}
</style>