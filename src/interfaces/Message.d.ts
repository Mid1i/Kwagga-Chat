import { Person } from "./Person";


export interface MessagePreview {
	id: number;
	text: string;
	datetime: string;
	unread?: boolean;
};

export interface Message extends Omit<MessagePreview, "senderId"> {
	sender: Person;
	partner: Person;
};
