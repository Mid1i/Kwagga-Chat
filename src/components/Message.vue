<script setup lang="ts">
	import type { IMessage } from "@/interfaces/Message";

	import { formattedDatetime } from "@/helpers/datetime";

	import checkIcon from "@/assets/icons/message.svg";


	defineProps<IMessage & { 
		isUser: boolean; 
		messageRadius: Record<string, string> 
	}>();
</script>


<template>
	<div 
		:class="['chat__group-message message', { user: isUser }]"
		:style="messageRadius"
	>
		<p class="message__text">
			{{ text }}
			<span class="message__meta">
				<span class="message__meta-time">{{ formattedDatetime(new Date(datetime), ":") }}</span>
				<svg 
					v-if="isUser" 
					class="message__meta-icon"
					:aria-label="isUnread ? 'Не прочитано' : 'Прочитано'"
				>
					<use :href="`${checkIcon}#${ isUnread ? 'un' : '' }readMessage`"/>
				</svg>
			</span>
		</p>
	</div>
</template>


<style lang="scss" scoped>
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.message {
		align-self: flex-start;
		padding: 10px 5px 5px;
		max-width: 60%;

		background: var(--color-message-recepient);
		// border-radius: 15px 15px 15px 5px;

		&__text {
			padding: 0px 5px 5px;

			@include text;
			color: var(--color-text-primary);
			white-space: pre-wrap;
			word-break: break-word;
		}

		&__meta {
			align-items: center;
			display: flex;
			gap: 2px;
			margin-top: 5px;
			margin-left: 15px;
			float: right;

			&-time {
				@include smallText;
			}

			&-icon {
				height: 24px;
				width: 24px;

				color: var(--color-text-extra);
			}
		}

		&.user {
			align-self: flex-end;

			background: var(--color-message-user);
			// border-radius: 15px 15px 5px 15px;

			.message__meta-time,
			.message__meta-icon {
				color: var(--color-text-extra-user);
			}
		}
	}
</style>