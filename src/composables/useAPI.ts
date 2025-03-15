import { ref } from "vue";

import type { StatusAPI } from "@/types";


const useAPI = <T, P = void>(apiFunc: (params: P) => Promise<T>) => {
	const data = ref<T | null>(null);
	const status = ref<StatusAPI>("idle");
	const error = ref<Error | null>(null);


	const fetchData = async (params: P) => {
		status.value = "loading";

		try {
			data.value = await apiFunc(params);
			status.value = "success";
		} catch(err) {
			error.value = err instanceof Error ? err : new Error(String(err));
			status.value = "error";
		}
	};


	return { 
		data, 
		status, 
		error, 
		fetchData 
	}
};

export default useAPI;
