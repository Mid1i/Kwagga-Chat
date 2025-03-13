<script setup lang="ts">
	import { computed } from "vue";

	import type { StatusAPI, IChat } from "@/types";
	
	import CustomLoader from "@/components/CustomLoader.vue";
	import ChatListItem from "@/components/ChatListItem.vue";
	
	import { useChatStore } from "@/stores/chat";


	const chatStore = useChatStore();

	const status = computed<StatusAPI>(() => chatStore.chatsStatus);
	const chats = computed<IChat[]>(() => chatStore.chats);
</script>

<template>
	<custom-loader
		:condition-loading="status === 'loading'"
		:condition-empty="status === 'success' && chats.length === 0"
		empty-text="Тут пока пусто..."
	>
		<div class="container__chats" aria-label="Список чатов">
			<ChatListItem 
				v-for="chat in chats"
				@click="chatStore.setCurrentChat(chat.id)"
				:is-active="chatStore.currentChat?.id === chat.id"
				:key="chat.id"
				:="chat"
			/>
		</div>
	</custom-loader>
</template>

<style lang="scss" scoped>
	.container__chats {
		@include flex-column;
		gap: max(2px, 0.1vw);
		padding: 0px max(5px, 0.26vw) max(10px, 0.52vw);
		
		@include scroll-content;
	}


	@media(max-width: 767px) {
		.container__chats {
			gap: 0px;
			padding: 5px 0px;
		}
	}
</style>