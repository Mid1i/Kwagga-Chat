// СТАТУСЫ API-ЗАПРОСОВ
export type StatusAPI = "loading" | "success" | "error";

export type MethodAPI = "get" | "post" | "put" | "delete";

// ИНТЕРФЕЙС ПОЛЬЗОВАТЕЛЯ
export interface IUser {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	isOnline: boolean;
	dateOfRegistration: string;
};

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

// ИНТЕРФЕЙС ЧАТА
export interface IChat {
	id: number;
	recepient: IUser;
	lastMessage: IMessage;
	unreadMessages: number;
};

// ИНТЕРФЕЙС ВЫБРАННОГО ЧАТА
export interface ICurrentChat extends IChat {
	color: string;
};

// ИНТЕРФЕЙС ИСТОРИИ СООБЩЕНИЙ
export interface IHistory {
	date: string;
	messages: IMessage[];
};