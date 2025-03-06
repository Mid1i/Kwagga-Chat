import type { IMessage } from "./Message";


export interface IHistory {
	date: string;
	messages: IMessage[];
};