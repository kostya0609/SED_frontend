import { ref, reactive } from "vue";
import { routes } from "@/plugins/access/pages";
import { USE_BACK_BUTTON_KEY, API_OPTIONS_KEY } from "@/plugins/access/shared/symbols";
export default {
  install(app, options) {

    options.API = options.API || {};
    options.registerRoutes(routes, options.prefix);

    const module = ref(options.global ? '' : options.module)

    app.provide('_global', options.global);
    app.provide('_module', module);
    app.provide('_user_id', window._userId);
    app.provide(USE_BACK_BUTTON_KEY, options.useBackButton);
    app.provide(API_OPTIONS_KEY, options.API);

  }
};