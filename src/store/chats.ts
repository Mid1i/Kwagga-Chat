import { ref } from "vue";
import { defineStore } from "pinia";

import type { IChat } from "@/types";

import useAPI from "@/composables/useAPI";
import { getChats } from "@/api";


export const useChats = defineStore("chats", () => {
	const chats = ref<IChat[]>([]); 

	const { data, status, fetchData: fetchChats } = useAPI<IChat[]>(getChats);


	const loadChats = async () => {
		await fetchChats();
		chats.value = data.value ?? [];
	};


	return {
		chats,
		status,
		loadChats
	}
});