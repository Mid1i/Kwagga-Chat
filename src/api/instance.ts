import axios from "axios";

import { API_URL } from "@/constants";
import { useAuth } from "@/store";


const api = axios.create({
	baseURL: API_URL,
	timeout: 10000
});

api.interceptors.request.use(async config => {
	const { keycloak, logout } = useAuth();

	try {
		if (keycloak) {
			await keycloak.updateToken(60);
			config.headers["Authorization"] = `Bearer ${keycloak.token}`;
		}
	} catch (error) {
		console.log("Ошибка обновления токена: ", error);
		logout();
	}

	return config;
});


export default api;