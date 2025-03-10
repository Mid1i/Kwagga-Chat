import { defineStore } from "pinia";
import { ref, reactive, watch } from "vue";

import type { IUnsentMessage } from "@/interfaces/Message";
import type { IHistory } from "@/interfaces/History";
import type { IChat } from "@/interfaces/Chat";

import { generateColor } from "@/helpers/color";
import { useAPI } from '@/hooks/useAPI';
import { HISTORY } from "@/test"


export const useChatStore = defineStore("chats", () => {
	const { data: chats, status: chatsStatus, fetchData } = useAPI<IChat[]>([]);
	// const { data: history, status: historyStatus, fetchData: fetchHistory } = useAPI<IHistory[]>([]);
	const history = reactive<IHistory[]>(HISTORY);

	const currentChat = ref<IChat & { color: string } | null>(null);
	const unsentMessages = reactive<IUnsentMessage[]>([]);

	const setCurrentChat = (id: number) => {
		const selected = chats.value.find(el => el.id === id);
		(selected) && (currentChat.value = { ...selected, color: generateColor(selected.recepient.username) });
	};

	const updateUnsentMessages = (text: string) => {
		unsentMessages.push({
			id: unsentMessages.length,
			chatId: currentChat.value!.id,
			text
		});
	};

	const getChats = () => {
		fetchData("/chats", "get");
	};

	const getHistory = (id: number) => {
		// fetchHistory(`/history/${id}`, "get");
	};

	watch(currentChat, () => currentChat.value && getHistory);


	return {
		chats,
		chatsStatus,
		history,
		// historyStatus,
		currentChat,
		unsentMessages,
		updateUnsentMessages,
		getChats,
		getHistory,
		setCurrentChat
	}
});