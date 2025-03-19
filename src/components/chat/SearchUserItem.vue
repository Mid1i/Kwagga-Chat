<script setup lang="ts">
	import { RouterLink } from "vue-router";

	import type { IUser } from "@/types";

	import Avatar from "@/components/ui/Avatar.vue";


	defineProps<IUser>();
</script>


<template>
	<router-link
		class="result"
		:to="`/${id}`"
	>
		<Avatar
			:first-name="firstName"
			:username="username"
		/>
		<div class="result__content">
			<span class="result__content-name">{{ `${firstName} ${lastName}` }}</span>
			<span class="result__content-username">{{ `@${username}` }}</span>
		</div>
	</router-link>
</template>


<style lang="scss" scoped>
	.result {
		@include focus-visible;
		
		position: relative;
		
		align-items: center;
		display: flex;
		gap: 10px;
		padding: 10px;
		
		border-radius: 5px;

		transition: var(--transition-all);

		&__content {
			@include flex-column;

			gap: 5px;

			&-name {
				@include title;
			}

			&-username {
				@include text;
			}
		}
	}


	@media(hover: hover) {
		.result:hover {
			background: var(--color-active-chat);
		}
	}
</style>