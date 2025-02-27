import { defineStore } from "pinia";
import { reactive, ref } from "vue";

import type { Chat, SelectedChat } from "@/interfaces/Chat";
import { CHATS } from "@/test";


export const useChatStore = defineStore("chats", () => {
	const selectedChat = ref<SelectedChat | null>(null);
	const searchValue = ref<string>("");

	const chats = reactive<Chat[]>(CHATS);

	const clearSearch = (): void => {
		(document.activeElement as HTMLElement)?.blur();
		searchValue.value = "";
	};

	const selectChat = (id: number): void => {
		// selectedChat.value = chats.find(chat => chat.id === id);
	};


	return {
		searchValue,
		selectedChat,
		chats,
		clearSearch,
		selectChat
	};
});