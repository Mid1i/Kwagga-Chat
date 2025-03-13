import { ref } from "vue";
import { defineStore } from "pinia";

import type { IChat } from "@/types";

import { getChats } from "@/api/chats";
import useAPI from "@/composables/useAPI";


export const useChatsStore = defineStore("chats", () => {
	const chats = ref<IChat[]>([]); 

	const { data, loading, fetchData: fetchChats } = useAPI<IChat[]>(getChats);


	const loadChats = async () => {
		await fetchChats();
		chats.value = data.value ?? [];
	};

	return {
		chats,
		loading,
		loadChats
	}
});