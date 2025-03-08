import type { IUser } from "./User";


export interface IMessage {
	id: number;
	text: string;
	sender: IUser;
	recepient: IUser;
	datetime: string;
	isUnread?: boolean;
};
