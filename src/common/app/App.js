import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import './styles/style.scss';
import { createApp } from 'vue';
import * as config from './config';
import AppComponent from './App.vue';
import { registerModules, registerPlugins, registerComponents } from './providers';


dayjs.locale('ru');

if (process.env.NODE_ENV == 'development') {
	window._userId = import.meta.env.VITE_DEV_USER_ID || 14956;
	window._token = '$2y$10$NMJZxfAaRIJpLeroZdnB5OQrFlm/o.2Hyx.mZWtADsWN9eyLanpOy';
}

const app = createApp(AppComponent);

registerModules(app, config.modules);
registerPlugins(app, config.plugins);
registerComponents(app, config.components);

export { app };