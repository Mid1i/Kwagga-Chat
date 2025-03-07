import { defineStore } from "pinia";
import { reactive, ref } from "vue";

import type { IChat } from "@/interfaces/Chat";
import { CHATS } from "@/test";


export const useChatStore = defineStore("chats", () => {
	const currentChat = ref<IChat | null>(null);
	const chats = reactive<IChat[]>(CHATS);

	const setCurrentChat = (id: number) => {
		currentChat.value = chats.find(el => el.id === id) ?? null;
	};


	return {
		chats,
		currentChat,
		setCurrentChat
	}
});