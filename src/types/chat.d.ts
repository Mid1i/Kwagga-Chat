import type { IMessage } from "@/types";
import type { IUser } from "@/types";


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