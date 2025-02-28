import type { User } from "./User";


export interface MessagePreview {
	id: number;
	text: string;
	datetime: string;
	unread?: boolean;
};

export interface Message extends Omit<MessagePreview, "senderId"> {
	sender: User;
	partner: User;
};
