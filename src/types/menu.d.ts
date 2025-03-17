export interface IMenuItem {
	icon: string;
	text: string;
	isDelete?: boolean;
	onClick: () => void;
};