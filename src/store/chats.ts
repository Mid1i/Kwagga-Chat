import { ref } from "vue";
import { defineStore } from "pinia";

import type { IChat } from "@/types";

import useWindowWidth from "@/composables/useWindowWidth";
import useAPI from "@/composables/useAPI";
import { getChats } from "@/api";


export const useChats = defineStore("chats", () => {
	const chats = ref<IChat[]>([]);

	const currentMenu = ref<{ id: number; x: number; y: number } | null>(null);

	const { data, status, fetchData: fetchChats } = useAPI<IChat[]>(getChats);

	const { isBigScreen } = useWindowWidth();


	const closeCurrentMenu = () => {
		currentMenu.value = null;
	};

	const setCurrentMenu = (event: MouseEvent, id: number) => {
		currentMenu.value = {
			id,
			x: isBigScreen.value ? event.clientX : 20,
			y: event.clientY
		}
	};

	const loadChats = async () => {
		await fetchChats();
		chats.value = data.value ?? [];
	};

	const deleteChat = async () => {
		if (!currentMenu.value) return;

		chats.value = chats.value.filter(chat => chat.id !== currentMenu.value!.id);
	};


	return {
		currentMenu,
		setCurrentMenu,
		closeCurrentMenu,
		chats,
		status,
		deleteChat,
		loadChats
	}
});