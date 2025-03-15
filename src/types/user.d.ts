// ИНТЕРФЕЙС ПОЛЬЗОВАТЕЛЯ
export interface IUser {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	isOnline: boolean;
	dateOfRegistration: string;
};