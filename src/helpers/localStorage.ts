export const getItem = (key: string): string | null => localStorage.getItem(key);

export const setItem = (key: string, value: any): void => localStorage.setItem(key, value);