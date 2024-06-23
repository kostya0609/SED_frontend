import * as ElementPlusIconsVue from '@element-plus/icons-vue';

/**
 * @type {import("@/common/shared/types").ComponentItem[]}
 */
export const components = [
	...Object.entries(ElementPlusIconsVue).map(([name, component]) => ({ name, component })),
];