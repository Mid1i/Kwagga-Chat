// ИНТЕРФЕЙС ПОЛЬЗОВАТЕЛЯ
export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	isOnline?: boolean;
	dateOfRegistration?: string;
};