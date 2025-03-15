import { defineStore, storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";

import type { IUnsentMessage, IHistory, ICurrentChat } from "@/types";

import useAPI from '@/composables/useAPI';
import { generateColor } from "@/helpers";
import { useChats } from "@/store";
import { getHistory } from "@/api";


export const useChat = defineStore("chat", () => {
	const currentChat = ref<ICurrentChat | null>(null);
	const chatHistory = ref<IHistory[]>([]);
	
	const unsentMessages = ref<IUnsentMessage[]>([]);

	const router = useRouter();

	const { chats, status: chatsStatus } = storeToRefs(useChats());
	
	const { data, status, fetchData: fetchHistory } = useAPI<IHistory[], number>(getHistory);


	const closeChat = () => {
		currentChat.value = null;
		router.push("/");
	};

	const setCurrentChat = (id?: number) => {
		if (chatsStatus.value !== "success") return;

		const selected = chats.value.find(el => el.id === id);
		
		currentChat.value = !selected ? null : {
			...selected, 
			color: generateColor(selected.recepient.username) 
		};
	};

	const saveUnsentMessage = (text: string) => {
		if (!currentChat.value) return;

		unsentMessages.value = [
			...unsentMessages.value,
			{
				id: unsentMessages.value.length,
				chatId: currentChat.value.id,
				text
			}
		]
	};

	const loadChatHistory = async () => {
		if (!currentChat.value) return;
		
		await fetchHistory(currentChat.value.id);
		chatHistory.value = data.value ?? [];
	};


	watch(chats, () => setCurrentChat(Number(router.currentRoute.value.params?.id)));
	watch(currentChat, loadChatHistory);


	return {
		currentChat,
		closeChat,
		status,
		chatHistory,
		unsentMessages,
		saveUnsentMessage,
		loadChatHistory,
		setCurrentChat
	}
});