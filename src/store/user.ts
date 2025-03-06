import { defineStore } from "pinia";
import { ref } from "vue";

import type { IUser } from "@/interfaces/User";
import { USERS } from "@/test";



export const useUserStore = defineStore("user", () => {
	const user = ref<IUser>(USERS[0]);


	return {
		user
	}
});