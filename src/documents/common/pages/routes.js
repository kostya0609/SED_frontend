import DocumentListPage from './DocumentListPage.vue';
import SelectRouteElementPage from './SelectRouteElementPage.vue';
import NeedActionListPage from './NeedActionListPage.vue';

import {DOCUMENT_lIST_KEY, NEED_ACTION_lIST_KEY, SELECT_ROUTE_ELEMENT_KEY} from "@documents/common/shared/symbols";

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 */
export const routes = [
    {
        path: '/',
        component: DocumentListPage,
        name: DOCUMENT_lIST_KEY,
    },
    {
        path: '/need-action',
        component: NeedActionListPage,
        name: NEED_ACTION_lIST_KEY,
    },
    {
        path: '/documents/select-route-element',
        component: SelectRouteElementPage,
        name: SELECT_ROUTE_ELEMENT_KEY,
    }
];