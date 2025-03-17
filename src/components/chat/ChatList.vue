<script setup lang="ts">
	import { storeToRefs } from "pinia";

	import type { IMenuItem } from "@/types";

	import ChatListItem from "@/components/chat/ChatListItem.vue";
	import CustomLoader from "@/components/ui/CustomLoader.vue";
	import PopupMenu from "@/components/chat/PopupMenu.vue";
	import Backdrop from "@/components/ui/Backdrop.vue";
	
	import { useChats, useChat } from "@/store";


	const { currentChat } = storeToRefs(useChat());
	const { setCurrentChat } = useChat();

	const { 
		currentMenu,
		chats, 
		status 
	} = storeToRefs(useChats());

	const { 
		deleteChat,
		setCurrentMenu, 
		closeCurrentMenu 
	} = useChats();


	const CHAT_MENU_ITEMS: IMenuItem[] = [
		{
			icon: "newTab",
			text: "Открыть в новой вкладке",
			onClick: () => {
				window.open(`${window.location.origin}/${currentMenu.value!.id}`, "_blank");
			}
		},
		{
			isDelete: true,
			icon: "delete",
			text: "Удалить чат",
			onClick: deleteChat
		}
	];
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
				@contextmenu.prevent="setCurrentMenu($event, chat.id)"
				:is-active="currentChat?.id === chat.id"
				:key="chat.id"
				:="chat"
			/>
		</div>
		<Backdrop
			@toggle-popup="closeCurrentMenu"
			:is-open="!!currentMenu"
		>
			<PopupMenu
				:custom-style="{ top: `${currentMenu!.y}px`, left: `${currentMenu!.x}px` }"
				label="Меню управления чатом"
				:items="CHAT_MENU_ITEMS"
			/>
		</Backdrop>
	</custom-loader>
</template>

<style lang="scss" scoped>
	.container__chats {
		@include scroll-content;
		@include flex-column;
		
		gap: 2px;
		padding: 0px 5px 10px;
	}


	@media(max-width: 767px) {
		.container__chats {
			gap: 0px;
			padding: 5px 0px;
		}
	}
</style>