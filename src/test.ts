import type { Chat } from "@/interfaces/Chat";
import { User } from "@/interfaces/User";


export const USER_1: User = {
	id: 1,
	firstName: "Михаил",
	lastName: "Чернов"
};

export const USER_2: User = {
	id: 2,
	firstName: "Рустам",
	lastName: "Худоян"
};

export const CHATS: Chat[] = [
	{
		id: 1,
		partner: USER_2,
		lastMessage: {
			id: 1,
			text: "Выходи",
			datetime: "2025-02-27T15:30:00.000"
		},
		unreadMessages: 2
	},
	{
		id: 2,
		partner: USER_2,
		lastMessage: {
			id: 1,
			text: "Привет! Это тестовое сообщение",
			datetime: "2025-02-27T12:30:00.000"
		},
		unreadMessages: 1
	},
	{
		id: 3,
		partner: USER_2,
		lastMessage: {
			id: 1,
			text: "Что-то написано",
			datetime: "2025-02-27T10:30:00.000",
			unread: false
		},
		unreadMessages: 0
	},
	{
		id: 4,
		partner: USER_2,
		lastMessage: {
			id: 1,
			text: "Я на мосту",
			datetime: "2025-01-27T22:30:00.000"
		},
		unreadMessages: 10
	},
	{
		id: 5,
		partner: USER_2,
		lastMessage: {
			id: 1,
			text: "Спишь?",
			datetime: "2025-02-27T00:30:00.000",
			unread: true
		},
		unreadMessages: 0
	}
];