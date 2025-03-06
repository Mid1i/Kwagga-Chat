import { defineStore } from "pinia";
import { reactive } from "vue";

import type { IChat } from "@/interfaces/Chat";
import { CHATS } from "@/test";


export const useChatStore = defineStore("chats", () => {
	const chats = reactive<IChat[]>(CHATS);


	return {
		chats
	}
});