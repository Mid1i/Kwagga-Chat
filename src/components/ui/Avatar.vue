<script setup lang="ts">
	import { generateColor } from "@/helpers";


	defineProps<{
		customClass?: string;
		isOnline?: boolean;
		firstName: string;
		username: string;
	}>();
</script>


<template>
	<span 
		:style="{ background: generateColor(username) }"
		:class="[
			'avatar', 
			customClass, 
			{ online: isOnline }
		]"
	>
		{{ firstName[0] }}
	</span>
</template>


<style lang="scss" scoped>
	.avatar {
		position: relative;
		
		@include flex-center;
		flex: 0 0 auto;
		height: 50px;
		width: 50px;
		
		@include title;
		
		border-radius: 100%;
		
		overflow: visible;

		&.online::after {
			position: absolute;
			bottom: 2px;
			right: 4px;
			
			height: 11px;
			width: 11px;
			
			background: var(--color-green);
			border: 2px solid var(--color-bg-chats);
			border-radius: 100%;
			
			content: "";
		}
	}
</style>