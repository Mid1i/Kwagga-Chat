import { defineStore, storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

import type { IUnsentMessage, IHistory, ICurrentChat } from "@/types";

import { generateColor } from "@/helpers/color";
import { useChatsStore } from "@/stores/chats";
import useAPI from '@/composables/useAPI';
import { getHistory } from "@/api/chats";


export const useChatStore = defineStore("chats", () => {
	const currentChat = ref<ICurrentChat | null>(null);
	const chatHistory = ref<IHistory[]>([]);
	
	const unsentMessages = ref<IUnsentMessage[]>([]);
	const isChatOpen = ref<boolean>(false);

	const route = useRoute();

	const { chats, loading: loadingChats } = storeToRefs(useChatsStore());
	
	const { data, loading, fetchData: fetchHistory } = useAPI<IHistory[], number>(getHistory);


	const setCurrentChat = (id: number | null) => {
		const selected = chats.value.find(el => el.id === id);
		
		currentChat.value = !selected ? null : {
			...selected, 
			color: generateColor(selected.recepient.username) 
		};
		
		isChatOpen.value = !isChatOpen.value;
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


	watch(loadingChats, () => setCurrentChat(Number(route.params?.id) ?? null));


	return {
		isChatOpen,
		currentChat,
		loading,
		chatHistory,
		unsentMessages,
		saveUnsentMessage,
		loadChatHistory,
		setCurrentChat
	}
});