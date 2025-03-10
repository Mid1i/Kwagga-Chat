<script setup lang="ts">
	import type { IChat } from "@/interfaces/Chat";
	import { formattedDatetime, formattedWeekDay } from "@/helpers/datetime";
	import { generateColor } from "@/helpers/color";
	import { WEEK_MS, YEAR_MS } from "@/constants";
	import { useUserStore } from "@/store/user";


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
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.chat {
		position: relative;
		
		align-items: center;
		display: flex;
		gap: 10px;
		padding: 10px;
		
		border-radius: 5px;

		@include focusVisible;

		&::before {
			position: absolute;
			left: -1px;
			top: 50%;

			height: 50%;
			width: 3px;

			background: transparent;
			border-radius: 10px;

			transform: translateY(-50%);

			content: "";
		}

		&__wrapper {
			position: relative;

			align-items: center;
			display: flex;
			flex: 0 0 auto;
			justify-content: center;
			height: 50px;
			width: 50px;

			@include title;

			border-radius: 100%;

			&.online::after {
				position: absolute;
				bottom: 2px;
				right: 4px;
				
				height: 11px;
				width: 11px;
				
				background: var(--color-accent-success);
				border: 2px solid var(--color-bg-primary);
				border-radius: 100%;
				
				content: "";
			}
		}

		&__content {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;
			gap: 5px;
			width: calc(100% - 60px);
		}

		&__header {
			align-items: center;
			display: flex;
			gap: 5px;

			&-recepient {
				flex: 1 1 auto;

				@include title;
				@include textOverflow;
			}

			&-datetime {
				@include text;
			}
		}

		&__footer {
			align-items: center;
			display: flex;
			gap: 5px;

			&-message {
				flex: 1 1 auto;

				@include text;
				@include textOverflow;
			}

			&-label {
				@include text;
				color: var(--color-accent-primary);
			}

			&-counter {
				flex: 0 0 auto;
				padding: 3px 8px;

				@include text;
				color: var(--color-text-primary);

				background: var(--color-text-extra);
				border-radius: 20px;
			}
		}

		&.active {
			background: var(--color-active-bg);

			&::before {
				background: var(--color-accent-primary);
			}

			.chat__footer-counter {
				background: var(--color-accent-primary);
			}
		}
	}


	@media(hover: hover) {
		.chat:hover {
			background: var(--color-active-bg);
		}
	}
</style>