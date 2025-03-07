import type { IHistory } from "@/interfaces/History";
import type { IMessage } from "@/interfaces/Message";
import type { IChat } from "@/interfaces/Chat";
import type { IUser } from "@/interfaces/User";


export const USERS: IUser[] = [
	{
		id: 1,
    firstName: "Иван",
    lastName: "Иванов",
    username: "ivan123",
    email: "ivanov@mail.ru",
    isOnline: true,
    dateOfRegistration: "2025-01-15T10:30:00"
	},
	{
    id: 2,
    firstName: "Мария",
    lastName: "Петрова",
    username: "masha_p",
    email: "maria_petrov@mail.ru",
    isOnline: false,
    dateOfRegistration: "2025-01-20T14:45:00"
  },
	{
    id: 3,
    firstName: "Дмитрий",
    lastName: "Смирнов",
    username: "dmitry_smirnov",
    email: "d.smirnov@rambler.ru",
    isOnline: true,
    dateOfRegistration: "2025-02-05T08:25:00"
  }
];

export const MESSAGES: IMessage[] = [
	{
		id: 1,
    text: "Привет, как ты? Давно не общались!",
    sender: USERS[0],
    recepient: USERS[1],
    datetime: "2025-03-06T12:15:00",
    isUnread: true
	},
	{
    id: 2,
    text: "Добрый день! Как все прошло на встрече?",
    sender: USERS[1],
    recepient: USERS[0],
    datetime: "2025-03-07T12:10:00"
  },
  {
    id: 3,
    text: "Не забудь про отчет до конца недели!",
    sender: USERS[2],
    recepient: USERS[0],
    datetime: "2025-01-05T09:30:00"
  },
  {
    id: 4,
    text: "Спасибо за помощь вчера!",
    sender: USERS[0],
    recepient: USERS[2],
    datetime: "2025-03-05T14:00:00",
    isUnread: true
  },
  {
    id: 5,
    text: "У тебя получится все сделать в срок?",
    sender: USERS[1],
    recepient: USERS[2],
    datetime: "2025-03-04T15:45:00"
  },
  {
    id: 6,
    text: "Поздравляю с новой должностью!",
    sender: USERS[2],
    recepient: USERS[1],
    datetime: "2025-03-04T13:20:00"
  },
  {
    id: 7,
    text: "Что планируешь на выходных?",
    sender: USERS[0],
    recepient: USERS[2],
    datetime: "2025-03-06T11:50:00"
  },
  {
    id: 8,
    text: "Не забудь про звонок в 16:00",
    sender: USERS[1],
    recepient: USERS[0],
    datetime: "2025-03-06T10:40:00"
  },
  {
    id: 9,
    text: "Как тебе новая идея для проекта?",
    sender: USERS[0],
    recepient: USERS[1],
    datetime: "2025-03-04T16:00:00"
  },
  {
    id: 10,
    text: "Привет, ты видел новое обновление на сайте?",
    sender: USERS[2],
    recepient: USERS[0],
    datetime: "2025-03-05T17:10:00",
    isUnread: true
  }
];

export const CHATS: IChat[] = [
	{
		id: 1,
    recepient: USERS[1],
    lastMessage: MESSAGES[1],
    unreadMessages: 1
	},
  {
    id: 2,
    recepient: USERS[0],
    lastMessage: MESSAGES[2],
    unreadMessages: 0
  },
  {
    id: 3,
    recepient: USERS[2],
    lastMessage: MESSAGES[7],
    unreadMessages: 1
  },
  {
    id: 4,
    recepient: USERS[1],
    lastMessage: MESSAGES[5],
    unreadMessages: 0
  },
  {
    id: 5,
    recepient: USERS[0],
    lastMessage: MESSAGES[4],
    unreadMessages: 0
  },
  {
    id: 6,
    recepient: USERS[2],
    lastMessage: MESSAGES[9],
    unreadMessages: 1
  },
  {
    id: 7,
    recepient: USERS[0],
    lastMessage: MESSAGES[3],
    unreadMessages: 1
  },
  {
    id: 8,
    recepient: USERS[1],
    lastMessage: MESSAGES[8],
    unreadMessages: 0
  },
  {
    id: 9,
    recepient: USERS[2],
    lastMessage: MESSAGES[9],
    unreadMessages: 1
  },
  {
    id: 10,
    recepient: USERS[1],
    lastMessage: MESSAGES[6],
    unreadMessages: 0
  }
];

export const HISTORY: IHistory = {
  date: "2025-03-06",
  messages: [
    {
      id: 1,
      text: "Привет, как ты? Давно не общались!",
      sender: USERS[0],
      recepient: USERS[1],
      datetime: "2025-03-06T12:15:00",
      isUnread: true
    },
    {
      id: 2,
      text: "Добрый день! Как все прошло на встрече?",
      sender: USERS[1],
      recepient: USERS[0],
      datetime: "2025-03-06T12:10:00"
    },
    {
      id: 9,
      text: "Как тебе новая идея для проекта?",
      sender: USERS[0],
      recepient: USERS[1],
      datetime: "2025-03-04T16:00:00"
    },
    {
      id: 8,
      text: "Не забудь про звонок в 16:00",
      sender: USERS[1],
      recepient: USERS[0],
      datetime: "2025-03-06T10:40:00"
    }
  ]
};