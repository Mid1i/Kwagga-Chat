import { ref } from "vue";
import axios from "axios";

import type { StatusAPI, MethodAPI } from "@/types";
import type { AxiosResponse } from "axios";

import { API_URL } from "@/constants";


export default function useAPI<T>(initialData: T) {
	const data = ref<T>(initialData);
	const status = ref<StatusAPI>("loading");


	const fetchData = async (
		url: string, 
		method: MethodAPI, 
		params: Record<string, any> = {}
	) => {
		status.value = "loading";

		axios({ method, url: `${API_URL}${url}`, params })
			.then(handleData)
			.catch(handleError)
	};

	const handleData = (response: AxiosResponse) => {
		data.value = response.data;
		status.value = "success"; 
	};

	const handleError = (error: string) => {
		console.error(error);
		status.value = "error";
	};


	return {
		data,
		status,
		fetchData
	}
};
