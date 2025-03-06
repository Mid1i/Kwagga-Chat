// Действия для управления скроллбаром с клавиатуры
export const KEYBOARD_ACTIONS: Record<string, (container: HTMLElement) => number> = {
	ArrowDown: (container) => container.scrollTop += 50,
	ArrowUp: (container) => container.scrollTop -= 50,
	PageDown: (container) => container.scrollTop += container.clientHeight,
	PageUp: (container) => container.scrollTop -= container.clientHeight
};