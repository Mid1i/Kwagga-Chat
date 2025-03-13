import { ref } from "vue";


export default function useAPI<T, P = void>(apiFunc: (params: P) => Promise<T>) {
	const data = ref<T | null>(null);
	const loading = ref<boolean>(false);
	const error = ref<Error | null>(null);


	const fetchData = async (params: P) => {
		loading.value = true;

		try {
			data.value = await apiFunc(params);
		} catch(err) {
			error.value = err instanceof Error ? err : new Error(String(err));
		} finally {
			loading.value = false;
		}
	};


	return { data, loading, error, fetchData };
};
