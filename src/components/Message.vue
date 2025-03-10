<script setup lang="ts">
	import type { IMessage } from "@/types";

	import { formattedDatetime } from "@/helpers/datetime";

	import checkIcon from "@/assets/message.svg";


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
	.message {
		align-self: flex-start;
		padding: 10px 5px 5px;
		max-width: 60%;

		background: $color-message-recepient-bg;

		&__text {
			padding: 0px 5px 5px;

			@include typography(text, false, true);
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
				@include typography(date);
			}

			&-icon {
				@include button-base;
			}
		}

		&.user {
			align-self: flex-end;

			background: $color-message-user-bg;

			.message__meta {
				margin-top: 0px;

				&-time,
				&-icon {
					color: $color-message-user-meta;
				}
			}
		}
	}
</style>