import { ref } from "vue";
import axios from "axios";

import type { StatusAPI, MethodAPI } from "@/types";

import { API_URL } from "@/constants";


export default function useAPI<T>(initialData: T) {
	const data = ref<T>(initialData);
	const status = ref<StatusAPI>("idle");


	const fetchData = async (url: string, method: MethodAPI, body?: Record<string, any>) => {
		status.value = "loading";

		try {
			const response = await axios({ method, url: `${API_URL}${url}`, data: body });
			data.value = response.data;
			status.value = "success";
		} catch(error) {
			console.error(error);
			status.value = "error";
		}
	};


	return {
		data,
		status,
		fetchData
	}
};
