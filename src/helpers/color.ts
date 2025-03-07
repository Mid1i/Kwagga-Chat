// Генерация цвета для аватара профиля на основе `username`
export const generateColor = (username: string): string => {
	let hash = 0;

	for (let i = 0; i < username.length; i++) {
		hash = (hash * 31 + username.charCodeAt(i)) >>> 0;
	}

	const r = (hash >> 16) & 0xFF;
	const g = (hash >> 8) & 0xFF;
	const b = hash & 0xFF;

	const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	// В зависимости от яркости цвета (слишком яркий или слишком тёмный), инвертируем его (Math.max(0, Math.min(255, 255 - c))) или оставляем
	return `rgb(${[r, g, b].map(c => (brightness > 128 || brightness < 50) ? Math.max(0, Math.min(255, 255 - c)) : c).join(", ")})`;
};