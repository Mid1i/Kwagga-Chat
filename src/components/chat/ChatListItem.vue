<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { RouterLink } from "vue-router";

	import type { IChat } from "@/types";

	import Avatar from "@/components/ui/Avatar.vue";

	import { formattedDatetime, formattedWeekDay } from "@/helpers";
	import { WEEK_MS, YEAR_MS } from "@/constants";
	import { useUser } from "@/store";


	defineProps<IChat & { isActive: boolean }>();

	const { currentUser } = storeToRefs(useUser());

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
	<router-link 
		:class="['chats__el chat', { active: isActive }]" 
		:to="`/${id}`"
		role="button"
		aria-label="Открыть чат"
	>
		<Avatar
			:first-name="recepient.firstName"
			:is-online="recepient.isOnline"
			:username="recepient.username"
		/>
		<div class="chat__content">
			<div class="chat__header">
				<span class="chat__header-recepient">{{ `${recepient.firstName} ${recepient.lastName}` }}</span>
				<span class="chat__header-datetime">{{ getMessageDatetime(lastMessage.datetime) }}</span>
			</div>
			<div class="chat__footer">
				<span class="chat__footer-message">
					<span v-if="lastMessage.sender.id === currentUser.id" class="chat__footer-label">Вы: </span>
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
	</router-link>
</template>

<style lang="scss" scoped>
	.chat {
		@include focus-visible;
		
		position: relative;
		
		align-items: center;
		display: flex;
		gap: 10px;
		padding: 10px;
		
		border-radius: 5px;

		transition: var(--transition-all);

		&::before {
			position: absolute;
			left: -1px;
			top: 50%;

			height: 50%;
			width: 3px;

			background: transparent;
			border-radius: 10px;

			transition: var(--transition-all);
			transform: translateY(-50%);

			content: "";
		}

		&__content {
			@include flex-column;
			
			gap: 5px;
			flex: 1 1 auto;
			overflow: hidden;
			width: calc(100% - 60px);
		}

		&__header {
			align-items: center;
			display: flex;
			gap: 5px;

			&-recepient {
				@include title;
				flex: 1 1 auto;
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
				@include text;
				flex: 1 1 auto;
			}

			&-label {
				@include text;
				color: var(--color-accent);
			}

			&-counter {
				@include text(true);
				
				flex: 0 0 auto;
				padding: 3px 8px;

				background: var(--color-messages-counter);
				border-radius: 20px;
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