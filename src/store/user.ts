import { defineStore } from "pinia";
import { ref } from "vue";

import type { IUser } from "@/interfaces/User";
import { USER_1 } from "@/test";



export const useUserStore = defineStore("user", () => {
	const user = ref<IUser>(USER_1);


	return {
		user
	};
});