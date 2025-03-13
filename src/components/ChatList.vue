<script setup lang="ts">
	import { storeToRefs } from "pinia";

	import CustomLoader from "@/components/CustomLoader.vue";
	import ChatListItem from "@/components/ChatListItem.vue";
	
	import { useChatsStore } from "@/stores/chats";
	import { useChatStore } from "@/stores/chat";


	const { currentChat } = storeToRefs(useChatStore());
	const { setCurrentChat } = useChatStore();

	const { chats, loading } = storeToRefs(useChatsStore());
</script>

<template>
	<custom-loader
		:condition-loading="loading"
		:condition-empty="chats.length === 0"
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