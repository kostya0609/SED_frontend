/** Баг импорта vite через index.js файл - константа menu равняется undefined или выдается ошибка */
import { menu } from '../config/menu';
import { createMenu } from '@/plugins/menu';

export const menuPlugin = createMenu(menu);