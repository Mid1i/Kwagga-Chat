import { defineStore } from 'pinia';
import { ref } from "vue";
import Keycloak, { KeycloakTokenParsed } from "keycloak-js";

import {
	KC_CLIENT_ID, 
	KC_HOST, 
	KC_REALM 
} from "@/constants";


export const useAuth = defineStore("auth", () => {
	const refreshInterval = ref<NodeJS.Timeout | null>(null);

	const isAuthenticated = ref<boolean>(false);
	const currentUser = ref<KeycloakTokenParsed | null>(null);

	const keycloak: Keycloak = new Keycloak({
    url: KC_HOST,
    realm: KC_REALM,
    clientId: KC_CLIENT_ID
	});


	const init = async () => {
		try {
			const authenticated = await keycloak.init({
				onLoad: "check-sso",
				pkceMethod: "S256"
			});

			isAuthenticated.value = authenticated;
			
			if (authenticated) currentUser.value = keycloak.tokenParsed!;
		} catch (error) {
			console.error("Ошибка инициализации Keycloak: ", error);
		}
	};

	const refreshToken = () => {
		if (refreshInterval.value) clearInterval(refreshInterval.value);

		refreshInterval.value = setInterval(async () => {
			if (!keycloak) return;

			try {
				const refreshed = await keycloak.updateToken(60);
	
				if (refreshed) console.log("Токен обновлён!");
			} catch (error) {
				console.error("Ошибка обновления токена, нужно залогиниться снова", error);
				logout();
			}
		}, 50000);
	};

	const redirectToAccount = () => {
		window.location.href = keycloak.createAccountUrl();
	};

	const login = () => {
		keycloak.login();
	};

	const register = () => {
		keycloak.register();
	};

	const logout = () => {
		if (refreshInterval.value) clearInterval(refreshInterval.value);
		
		isAuthenticated.value = false;
		currentUser.value = null;
		
		keycloak.logout();
	};


	return {
		keycloak,
		currentUser,
		isAuthenticated,
		redirectToAccount,
		refreshToken,
		register,
		logout,
		login,
		init
	}
});