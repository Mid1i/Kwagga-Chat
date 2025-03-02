import type { IUser } from "./User";


export interface IMessagePreview {
	id: number;
	text: string;
	datetime: string;
	senderId: number;
	unread?: boolean;
};

export interface IMessage extends Omit<IMessagePreview, "senderId"> {
	sender: IUser;
	partner: IUser;
};
