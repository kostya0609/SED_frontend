<template>
	<el-menu
		:default-active="activeIndex"
		mode="horizontal"
		class="menu"
		:router="true"
		:ellipsis="false"
	>
		<template
			v-for="item of menu"
			:key="item.path"
		>
			<el-menu-item :index="item.path">
				<Counter
					v-if="item.count"
					:title="item.title"
					:count="item.count"
				/>
				<template v-else>
					{{ item.title }}
				</template>
			</el-menu-item>
		</template>

		<el-menu-item class="menu__right-element">
			<ActionButton
				v-for="button of getAllActionButtons(activeMenuItem, actionButtons)"
				:key="button.title"
				:type="button.type"
				:title="button.title"
				:path="button.path"
				:icon="button.icon"
				:goBack="!!button.goBack"
				:fallback-path="button.fallbackPath"
				@click="button.onClick"
				class="menu__action-button"
			/>
		</el-menu-item>
	</el-menu>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { Counter } from '../features/counter';
import { ActionButton } from '../features/action-button';
import { computed, ref, watch, inject } from 'vue';
import {
	getNormalizedRoutePath,
	getMenuItemByPath,
	getReplacementsMenu,
	getInitialMenuByPath,
	prepareMenu
} from '../shared/utils';

const defaultMenu = inject('menu');
const actionButtons = inject('actionButtons');

const props = defineProps({
	rights: {
		type: Array,
		required: true,
	},
});

const route = useRoute();
const menu = ref([]);
const activeMenuItem = ref(null);
const activeIndex = computed(() => getNormalizedRoutePath(route));
const allMenu = computed(() => [...getReplacementsMenu(defaultMenu.value), defaultMenu.value]);

const getAllActionButtons = (menuItem, buttonsFromGlobal) => {
	const buttonsFromMenu = menuItem ? menuItem.buttons || [] : [];
	return [...buttonsFromMenu, ...buttonsFromGlobal];
};

watch([() => route.path, () => props.rights], () => {
	const normalizedPath = getNormalizedRoutePath(route);
	const initialMenu = getInitialMenuByPath(allMenu.value, normalizedPath);

	if (!initialMenu) {
		menu.value = [];
		activeMenuItem.value = null;
		return;
	}

	menu.value = prepareMenu(initialMenu, props.rights);
	activeMenuItem.value = getMenuItemByPath(menu.value, normalizedPath);

	
	if (activeMenuItem.value && activeMenuItem.value.replaceMenu) {
		menu.value = prepareMenu(activeMenuItem.value.replaceMenu, props.rights);
		activeMenuItem.value = getMenuItemByPath(menu.value, normalizedPath);
	}
	
}, { immediate: true });

watch(() => defaultMenu.value, (defaultMenu) => {
	menu.value = defaultMenu;
});
</script>
	
<style scoped lang="scss">
.menu {
	align-items: center;

	&__right-element {
		margin-left: auto !important;
		padding: 12px;
		padding-right: 0;

		&:hover,
		&:focus {
			background: none !important;
		}
	}

	&__action-button {
		text-transform: uppercase;
	}
}

:deep(.badge .el-badge__content) {
	transform: none !important;
	right: unset !important;
}
</style>