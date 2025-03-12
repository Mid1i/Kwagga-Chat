<script setup lang="ts">
	import type { IChat } from "@/types";

	import { formattedDatetime, formattedWeekDay } from "@/helpers/datetime";
	import { generateColor } from "@/helpers/color";
	import { WEEK_MS, YEAR_MS } from "@/constants";
	import { useUserStore } from "@/stores/user";


	defineProps<IChat & { isActive: boolean }>();

	const userStore = useUserStore();

	const getMessageDatetime = (messageDate: string): string => {
		const date = new Date(messageDate);
		const now = new Date();
		
		date.setHours(0, 0, 0, 0);
		now.setHours(0, 0, 0, 0);

		const diff = now.getTime() - date.getTime();

		if (diff === 0) return formattedDatetime(new Date(messageDate),  ":");
		if (diff < WEEK_MS ) return formattedWeekDay(date);
		if (diff < YEAR_MS) return formattedDatetime(date,  ".").slice(0, -5);

		return formattedDatetime(date,  ".");
	};
</script>

<template>
	<li 
		:class="['chats__el chat', { active: isActive }]" 
		aria-label="Открыть чат"
		tabindex="0"
	>
		<span 
			:class="['chat__wrapper', { online: recepient.isOnline }]"
			:style="{ background: generateColor(recepient.username) }"
		>
			{{ recepient.firstName[0] }}
		</span>
		<div class="chat__content">
			<div class="chat__header">
				<span class="chat__header-recepient">{{ `${recepient.firstName} ${recepient.lastName}` }}</span>
				<span class="chat__header-datetime">{{ getMessageDatetime(lastMessage.datetime) }}</span>
			</div>
			<div class="chat__footer">
				<span class="chat__footer-message">
					<span v-if="lastMessage.sender.id === userStore.user.id" class="chat__footer-label">Вы: </span>
					{{ lastMessage.text }}
				</span>
				<span 
					v-if="unreadMessages" 
					class="chat__footer-counter" 
					aria-label="Открыть чат"
				>	
					{{ unreadMessages }}
				</span>
			</div>
		</div>
	</li>
</template>

<style lang="scss" scoped>
	.chat {
		position: relative;
		
		align-items: center;
		display: flex;
		gap: max(10px, 0.52vw);
		padding: max(10px, 0.5vw);
		
		border-radius: max(5px, 0.26vw);

		@include focus-visible;

		&::before {
			position: absolute;
			left: max(-1px, -0.05vw);
			top: 50%;

			height: 50%;
			width: max(3px, 0.15vw);

			background: transparent;
			border-radius: max(10px, 0.52vw);

			transform: translateY(-50%);

			content: "";
		}

		&__wrapper {
			@include avatar-base;

			&.online::after {
				position: absolute;
				bottom: max(2px, 0.1vw);
				right: max(4px, 0.2vw);
				
				height: var(--size-status);
				width: var(--size-status);
				
				background: var(--color-green);
				border: max(2px, 0.1vw) solid var(--color-bg-chats);
				border-radius: 100%;
				
				content: "";
			}
		}

		&__content {
			@include flex-column;
			flex: 1 1 auto;
			gap: max(5px, 0.26vw);
			overflow: hidden;
			width: calc(100% - max(60px, 3.1vw));
		}

		&__header {
			align-items: center;
			display: flex;
			gap: max(5px, 0.26vw);

			&-recepient {
				flex: 1 1 auto;

				@include title;
			}

			&-datetime {
				@include text;
			}
		}

		&__footer {
			align-items: center;
			display: flex;
			gap: max(5px, 0.26vw);

			&-message {
				flex: 1 1 auto;

				@include text;
			}

			&-label {
				@include text;
				color: var(--color-accent);
			}

			&-counter {
				flex: 0 0 auto;
				padding: max(3px, 0.15vw) max(8px, 0.42vw);

				@include text(true);

				background: var(--color-messages-counter);
				border-radius: max(20px, 1.04vw);
			}
		}

		&.active {
			background: var(--color-active-chat);

			&::before {
				background: var(--color-accent);
			}

			.chat__footer-counter {
				background: var(--color-accent);
			}
		}
	}


	@media(hover: hover) {
		.chat:hover {
			background: var(--color-active-chat);
		}
	}

	@media(max-width: 767px) {
		.chat {
			padding: 10px 15px;

			&:not(:last-child) {
				border-bottom: 1px solid var(--color-border-light);
			}

			&::before {
				display: none;
			}

			&__content {
				gap: 1px;
			}

			&__footer-counter {
				padding: 1px 8px;

				border-radius: 9px;
			}
		}
	}
</style>