export interface MenuButton {
	title?: string;
	path?: string;
	type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
	icon?: string;
	goBack?: boolean;
	fallbackPath?: string;
	onClick?: () => void;
}

export interface Menu {
	title?: string;
	path?: string;
	buttons?: MenuButton[];
	count?: number;
	rights: string[];
	replaceMenu?: Menu;
}

export interface useActionButtonsReturn {
	buttons: MenuButton[];
	getButtonIndex: (button: MenuButton) => number;
	getButton: (index: number) => MenuButton;
	addButton: (button: MenuButton) => number;
	updateButton: (index: number, button: MenuButton) => void;
	removeButton: (index: number) => void;
	clearButtons: () => void;
}

export interface useMenuReturn {
	menu: Menu[];
	hasItem: (index: number) => boolean;
	getItemIndex: (item: Menu) => number;
	getItem: (index: number) => Menu;
	addItem: (item: Menu) => number;
	updateItem: (index: number, item: Menu) => void;
	removeItem: (index: number) => void;
}

export interface useCounterReturn {
	getCounter: (index: number) => number;
	setCounter: (index: number, count: number) => void;
	clearCounter: (index) => void;
	increment: (index: number) => void;
	decrement: (index: number) => void;
}

export type useActionButtons = () => useActionButtonsReturn;
export type useMenu = () => useMenuReturn;
export type useCounter = () => useCounterReturn;