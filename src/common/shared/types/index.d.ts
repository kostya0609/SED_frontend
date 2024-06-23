import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

interface Params {
	[key: string]: any;
}

export interface ComponentItem {
	name: string;
	component: any;
	disabled?: boolean;
}

export interface PluginItem {
	plugin: any;
	params: Params;
	disabled?: boolean;
}

export interface ModuleItem {
	module: any;
	params: Params;
	disabled?: boolean;
}

export type registerModules = (app: App<any>, modules: ModuleItem[]) => void;

export type registerPlugins = (app: App<any>, plugins: PluginItem[]) => void;

export type registerComponents = (app: App<any>, components: ComponentItem[]) => void;

export type registerRoutes = (routes: RouteRecordRaw[]) => void;

export interface ModuleOptions {
	[key: string]: any;
	registerRoutes: registerRoutes;
}

export interface Module {
	install(app: App<any>, options: ModuleOptions): void;
}