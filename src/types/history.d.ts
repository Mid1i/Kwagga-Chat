import type { IMessage } from "@/types";


// ИНТЕРФЕЙС ИСТОРИИ СООБЩЕНИЙ
export interface IHistory {
	id: number;
	date: string;
	messages: IMessage[];
};