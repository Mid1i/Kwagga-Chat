export const leadingZeros = (num: string | number): string => num.toString().padStart(2, "0");

export const formattedTime = (date: Date): string => [date.getHours(), date.getMinutes()].map(leadingZeros).join(":");

export const formattedDate = (date: Date): string => [date.getDate(), date.getMonth() + 1, date.getFullYear()].map(leadingZeros).join(".");