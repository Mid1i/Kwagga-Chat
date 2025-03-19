import api from "./instance";


export const getChats = async () => {
	const response = await api.get("/chats");
	return response.data;
};

export const getHistory = async (id: number) => {
	const response = await api.get(`/history/${id}`);
	return response.data.history;
};
