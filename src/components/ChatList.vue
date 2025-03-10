<script setup lang="ts">
	import { computed } from "vue";

	import type { StatusType } from "@/types/Status";
	import type { IChat } from "@/interfaces/Chat";
	
	import CustomScrollbar from "@/components/CustomScrollbar.vue";
	import CustomLoader from "@/components/CustomLoader.vue";
	import ChatListItem from "@/components/ChatListItem.vue";
	import { useChatStore } from "@/store/chat";


	const chatStore = useChatStore();

	const status = computed<StatusType>(() => chatStore.chatsStatus);
	const chats = computed<IChat[]>(() => chatStore.chats);
</script>


<template>
	<custom-scrollbar 
		css-scrollbar-width="5"
		css-border-radius="100"
	>
		<custom-loader
			:condition-loading="status === 'loading'"
			:condition-empty="status === 'success' && chats.length === 0"
			empty-text="Тут пока пусто..."
		>
			<ul class="container__chats" aria-label="Список чатов">
				<ChatListItem 
					v-for="chat in chats"
					@click="chatStore.setCurrentChat(chat.id)"
					:is-active="chatStore.currentChat === chat"
					:key="chat.id"
					:="chat"
				/>
			</ul>
		</custom-loader>
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