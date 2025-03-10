import { ref } from "vue";
import axios, { AxiosResponse } from "axios";

import type { StatusType } from "@/types/Status";
import { API_URL } from "@/constants";


export const useAPI = <T>(initialData: T) => {
	const data = ref<T>(initialData);
	const status = ref<StatusType>("loading");


	const fetchData = async (url: string, method: "get" | "post" | "put" | "delete", params: Record<string, any> = {}) => {
		status.value = "loading";
		axios({ method, url: `${API_URL}${url}`, params }).then(handleData).catch(handleError)
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