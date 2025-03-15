<script setup lang="ts">
	import { storeToRefs } from "pinia";

	import ChatListItem from "@/components/chat/ChatListItem.vue";
	import CustomLoader from "@/components/ui/CustomLoader.vue";
	
	import { useChats, useChat } from "@/store";


	const { currentChat } = storeToRefs(useChat());
	const { setCurrentChat } = useChat();

	const { chats, status } = storeToRefs(useChats());
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
				@click="setCurrentChat(chat.id)"
				:is-active="currentChat?.id === chat.id"
				:key="chat.id"
				:="chat"
			/>
		</div>
	</custom-loader>
</template>

<style lang="scss" scoped>
	.container__chats {
		@include flex-column;
		gap: 2px;
		padding: 0px 5px 10px;
		
		@include scroll-content;
	}


	@media(max-width: 767px) {
		.container__chats {
			gap: 0px;
			padding: 5px 0px;
		}
	}
</style>