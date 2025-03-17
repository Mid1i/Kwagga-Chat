import { defineStore, storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";

import type { IUnsentMessage, IHistory, ICurrentChat } from "@/types";

// import useStomp from "@/composables/useStomp";
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
		if (chatsStatus.value !== "success" || currentChat.value?.id === id) return;

		const selected = chats.value.find(el => el.id === id);
		
		currentChat.value = !selected ? null : {
			...selected, 
			color: generateColor(selected.recepient.username) 
		};
	};

	const saveUnsentMessage = (text: string) => {
		if (!currentChat.value) return;

		unsentMessages.value = [
			...unsentMessages.value.filter(el => el.chatId !== currentChat.value?.id),
			{
				id: unsentMessages.value.length,
				chatId: currentChat.value.id,
				text
			}
		]
		console.log(unsentMessages.value, text)
	};

	const loadChatHistory = async () => {
		if (!currentChat.value) return;
		
		await fetchHistory(currentChat.value.id);
		chatHistory.value = data.value ?? [];
	};


	watch([chats, () => router.currentRoute.value.params?.id], () => setCurrentChat(Number(router.currentRoute.value.params?.id)));
	watch(currentChat, loadChatHistory);


	// const { messages, sendMessage } = useStomp("wss://5hgzrdg8-8080.euw.devtunnels.ms/api/ws", "/messages/chat/1", "/chat/1");

	const send = () => {
		const message = unsentMessages.value.find(el => el.chatId === currentChat.value?.id);
		
		if (message && message.text.trim()) {
			// sendMessage(message.text.trim());
			unsentMessages.value = unsentMessages.value.filter(el => el !== message);
		}
	}


	return {
		// messages,
		send,
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