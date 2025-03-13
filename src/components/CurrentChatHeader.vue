<script setup lang="ts">
	import { computed } from "vue";
	import type { ICurrentChat } from "@/types";


	const { recepient, color } = defineProps<ICurrentChat>();

	defineEmits<{ backToChats: [] }>();

	const chatName = computed<string>(() => `${recepient.firstName} ${recepient.lastName}`);
	const firstLetter = computed<string>(() => recepient.firstName[0]);
	const isOnline = computed<boolean>(() => recepient.isOnline);
</script>


<template>
	<header class="header">
		<button 
			@click="$emit('backToChats')"
			class="header__mobile-button"
		>
			<svg class="header__mobile-icon">
				<use href="@/assets/navigation.svg#closeChat"/>
			</svg>
			Назад
		</button>
		<div class="header__recepient">
			<span class="header__recepient-wrapper" :style="{ backgroundColor: color }">{{ firstLetter }}</span>
			<div class="header__recepient-content">
				<h6 class="header__recepient-name">{{ chatName  }}</h6>
				<span :class="['header__recepient-status', { online: isOnline }]">{{ isOnline ? "online" : "был(а) недавно" }}</span>
			</div>
		</div>
		<div class="header__navigation">
			<button 
				class="header__navigation-button"
				aria-label="Поиск по сообщениям"
			>
				<svg class="header__navigation-icon">
					<use href="@/assets/navigation.svg#searchMessage"/>
				</svg>
			</button>
			<button 
				class="header__navigation-button"
				aria-label="Информация по чату"
			>
				<svg class="header__navigation-icon">
					<use href="@/assets/navigation.svg#chatData"/>
				</svg>
			</button>
			<button 
				class="header__navigation-button"
				aria-label="Настройки чата"
			>
				<svg class="header__navigation-icon">
					<use href="@/assets/navigation.svg#moreOptions"/>
				</svg>
			</button>
		</div>
		<span class="header__mobile-meta" :style="{ backgroundColor: color }">{{ firstLetter }}</span>
	</header>
</template>


<style lang="scss" scoped>
	.header {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: max(15px, 0.78) max(40px, 2.04vw);

		border-bottom: max(1px, 0.05vw) solid var(--color-border-light);

		&__mobile-button,
		&__mobile-meta {
			display: none;
		}

		&__recepient {
			align-items: center;
			display: flex;
			gap: max(10px, 0.52vw);

			&-wrapper {
				@include avatar-base;
			}

			&-content {
				@include flex-column;
				gap: max(5px, 0.26vw);
			}

			&-name {
				@include title;
			}

			&-status {
				@include text;
				font-size: max(12px, 0.62vw);

				&.online {
					color: var(--color-accent);
				}
			}
		}

		&__navigation {
			display: flex;
			gap: max(10px, 0.52vw);

			&-button {
				@include button-round;
			}
		}
	}


	@media(hover: hover) {
		.header__navigation-button:hover {
			background: var(--color-active-button);
		}
	}

	@media(max-width: 767px) {
		.header {
			padding: 10px 15px;

			&__mobile {
				&-button {
					@include button-base;
					@include text(true);
					overflow: visible;
					flex: 0 0 auto;
					justify-content: flex-start;
				}

				&-icon {
					flex: 0 0 auto;
				}

				&-meta {
					@include avatar-base;
					height: 40px;
					width: 40px;
				}
			}

			&__recepient-wrapper {
				display: none;
			}

			&__recepient-content {
				align-items: center;
				gap: 1px;
			}

			&__recepient-status {
				font-size: 11px;
			}

			&__navigation {
				display: none;
			}
		}
	}
</style>