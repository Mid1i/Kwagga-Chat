import axios from "axios";

import { API_URL } from "@/constants";


const api = axios.create({
	baseURL: API_URL,
	timeout: 10000
});


export default api;