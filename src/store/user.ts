import { defineStore } from "pinia";
import { ref } from "vue";

import type { IUser } from "@/types";

import { USERS } from "@/constants";


export const useUser = defineStore("user", () => {
	const currentUser = ref<IUser>(USERS[0]);


	return { currentUser }
});