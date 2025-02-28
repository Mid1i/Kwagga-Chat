import type { Message, MessagePreview } from "./Message";
import type { User } from "./User";


export interface Chat {
	id: number;
	partner: User;
	lastMessage: MessagePreview;
	unreadMessages: number;
};

export interface SelectedChat {
	id: number;
	sender: User;
	partner: User;
	history: Message[];
};