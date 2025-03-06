import type { IMessage } from "./Message";
import type { IUser } from "./User";


export interface IChat {
	id: number;
	recepient: IUser;
	lastMessage: IMessage;
	unreadMessages: number;
};