import { defineStore } from "pinia";
import { ref, reactive, watch } from "vue";

import type { IUnsentMessage, IHistory, IChat, ICurrentChat } from "@/types";

import { generateColor } from "@/helpers/color";
import useAPI from '@/composables/useAPI';
import { HISTORY } from "@/test";


export const useChatStore = defineStore("chats", () => {
	const { data: chats, status: chatsStatus, fetchData } = useAPI<IChat[]>([]);
	// const { data: history, status: historyStatus, fetchData: fetchHistory } = useAPI<IHistory[]>([]);
	
	const { status: historyStatus, fetchData: fetchHistory } = useAPI<IHistory[]>([]);
	const history = ref<IHistory[]>(HISTORY);

	const currentChat = ref<ICurrentChat | null>(null);
	const isOpen = ref<boolean>(false);

	const unsentMessages = reactive<IUnsentMessage[]>([]);

	const setCurrentChat = (id: number | null) => {
		const selected = chats.value.find(el => el.id === id);
		
		currentChat.value = !selected ? null : {
			...selected, 
			color: generateColor(selected.recepient.username) 
		};
		
		isOpen.value = !isOpen.value;
	};

	const updateUnsentMessages = (text: string) => {
		if (!currentChat.value) return;

		unsentMessages.push({
			id: unsentMessages.length,
			chatId: currentChat.value.id,
			text
		});
	};

	const getChats = () => {
		fetchData("/chats", "get");
	};

	const getHistory = () => {
		// if (currentChat.value) fetchHistory(`/history/${currentChat.value.id}`, "get");
		// if (currentChat.value) fetchHistory("/history", "get");
	};

	watch(currentChat, getHistory);


	return {
		isOpen,
		chats,
		chatsStatus,
		history,
		historyStatus,
		currentChat,
		unsentMessages,
		updateUnsentMessages,
		getChats,
		setCurrentChat
	}
});