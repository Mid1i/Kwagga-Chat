import axios from "axios";


const api = axios.create({
	url: import.meta.env.VITE_API_URL,
	timeout: 10000
});

export default api;