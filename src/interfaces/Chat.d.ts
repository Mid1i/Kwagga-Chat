import type { IMessage, IMessagePreview } from "./Message";
import type { IUser } from "./User";


export interface IChat {
	id: number;
	partner: IUser;
	lastMessage: IMessagePreview;
	unreadMessages: number;
};

export interface ISelectedChat {
	id: number;
	sender: IUser;
	partner: IUser;
	history: IMessage[];
};