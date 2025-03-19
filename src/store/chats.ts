import { ref } from "vue";
import { defineStore } from "pinia";

import type { IChat, IUser } from "@/types";

import useWindowWidth from "@/composables/useWindowWidth";
import useSearch from "@/composables/useSearch";
import { getChats, searchUser } from "@/api";
import useAPI from "@/composables/useAPI";


export const useChats = defineStore("chats", () => {
	const chats = ref<IChat[]>([]);

	const currentMenu = ref<{ id: number; x: number; y: number } | null>(null);

	const { data, status, fetchData: fetchChats } = useAPI<IChat[]>(getChats);

	const { results, status: searchStatus, search, onSearch, clearSearch } = useSearch<IUser[]>(searchUser);

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
		loadChats,
		results,
		searchStatus,
		search,
		onSearch,
		clearSearch
	}
});