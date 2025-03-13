import { WEEK_DAYS, MONTHES } from "@/constants";


// Добавление ведущих нулей
export const leadingZeros = (num: string | number): string => num.toString().padStart(2, "0");

// Форматирование даты (времени) в формат "10.01.2025" (11:30)
export const formattedDatetime = (date: Date, separator: string): string => {
	const dateArray = (separator === ":") ? [date.getHours(), date.getMinutes()] : [date.getDate(), date.getMonth() + 1, date.getFullYear()];
	return dateArray.map(leadingZeros).join(separator);
};

// Форматирование дня недели (по его порядковому номеру)
export const formattedWeekDay = (date: Date): string => WEEK_DAYS[date.getDay()];

// Форматирование даты для истории чата в формат "2 марта"
export const formattedDate = (date: Date): string => {
	const month = date.getMonth();
	return `${date.getMonth()} ${MONTHES[month]}`;
};