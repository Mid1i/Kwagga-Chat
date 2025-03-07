<script setup lang="ts">
	import CustomScrollbar from "@/components/CustomScrollbar.vue";
	import ChatListItem from "@/components/ChatListItem.vue";
	import { useChatStore } from "@/store/chat";


	const chatStore = useChatStore();
</script>


<template>
	<custom-scrollbar css-scrollbar-width="5">
		<ul class="container__chats" aria-label="Список чатов">
			<ChatListItem 
				v-for="chat in chatStore.chats"
				@click="chatStore.setCurrentChat(chat.id)"
				:is-active="chatStore.currentChat === chat"
				:key="chat.id"
				:="chat"
			/>
		</ul>
	</custom-scrollbar>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.container__chats {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 0px 5px 10px;

		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>