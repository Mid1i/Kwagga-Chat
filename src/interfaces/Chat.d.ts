import type { Message, MessagePreview } from "./Message";
import type { Person } from "./Person";


export interface Chat {
	id: number;
	partner: Person;
	lastMessage: MessagePreview;
	unreadMessages: number;
};

export interface SelectedChat {
	id: number;
	sender: Person;
	partner: Person;
	history: Message[];
};