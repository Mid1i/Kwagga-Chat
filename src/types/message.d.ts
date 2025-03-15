import type { IUser } from "@/types";


// ИНТЕРФЕЙС СООБЩЕНИЯ
export interface IMessage {
	id: number;
	text: string;
	sender: IUser;
	recepient: IUser;
	datetime: string;
	isUnread?: boolean;
};

// ИНТЕРФЕЙС НЕОТПРАВЛЕННОГО СООБЩЕНИЯ (ЧЕРНОВИК)
export interface IUnsentMessage {
	id: number;
	chatId: number;
	text: string;
};