// Добавление ведущих нулей
export const leadingZeros = (num: string | number): string => num.toString().padStart(2, "0");

// Форматирование даты (времени) в формат "10.01.2025" (11:30)
export const formattedDatetime = (date: Date, separator: string) => {
	const dateArray = (separator === ":") ? [date.getHours(), date.getMinutes()] : [date.getDate(), date.getMonth() + 1, date.getFullYear()];
	return dateArray.map(leadingZeros).join(separator);
};