import api from "./instance";


export const searchUser = async (username: string) => {
	const response = await api.get(`/users/${username}`);
	return response.data;
};