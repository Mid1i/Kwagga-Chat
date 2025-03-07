// Действия для управления скроллбаром с клавиатуры
export const KEYBOARD_ACTIONS: Record<string, (container: HTMLElement) => number> = {
	ArrowDown: (container) => container.scrollTop += 50,
	ArrowUp: (container) => container.scrollTop -= 50,
	PageDown: (container) => container.scrollTop += container.clientHeight,
	PageUp: (container) => container.scrollTop -= container.clientHeight
};

// Дни недели по порядковым номерам
export const WEEK_DAYS: Record<number, string> = {
	0: "Вс",
	1: "Пн",
	2: "Вт",
	3: "Ср",
	4: "Чт",
	5: "Пт",
	6: "Сб"
};

// День в милисекундах
export const DAY_MS = 24 * 60 * 60 * 1000;

// Неделя в милисекундах
export const WEEK_MS = 7 * DAY_MS;

// Год в милисекундах
export const YEAR_MS = 365 * DAY_MS;