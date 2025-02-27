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
	@use "@/assets/styles/variables.scss";


	.search {
		position: relative;

		transition: padding 0.2s ease-in-out;

		&__label {
			color: var(--color-text-secondary);

			position: absolute;
			left: 20px;
			top: 50%;
			
			pointer-events: none;
			transform: translateY(-50%);
			transition: all 0.2s ease-in-out;
		}

		&__input {
			background: var(--color-hover-bg);
			color: var(--color-text-primary);

			font-weight: 500;

			border-radius: 5px;

			padding-right: 50px;
			padding-left: 20px;

			height: 40px;
			width: 100%;

			&::-webkit-search-cancel-button {
				display: none;
			}
		}

		&__button {
			border: 2px solid transparent;
			border-radius: 5px;

			position: absolute;
			right: 15px;
			top: calc(50% + 20px);

			transform: translateY(-50%);

			height: 28px;
			width: 28px;

			&:focus-visible {
				border-color: var(--color-text-primary);
			}

			&-icon {
				color: var(--color-text-secondary);
	
				transform: rotate(0deg) scale(0);
				transition: all 0.1s ease-in-out, color 0s ease-in-out;
				
				height: 100%;
				width: 100%;
	
				&:hover {
					color: var(--color-text-primary);
				}
			}
		}

		&.active,
		&:focus-within {
			padding-top: 40px;

			& .search__label {
				color: var(--color-text-primary);
				font-weight: 700;
				font-size: 16px;

				left: 10px;
				top: 15px;
			}

			& .search__button-icon {
				transform: rotate(-135deg) scale(1);
			}
		}
	}
</style>