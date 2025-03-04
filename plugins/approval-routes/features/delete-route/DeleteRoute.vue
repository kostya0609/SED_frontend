<template>
    <el-button
        type="danger"
        @click.stop="deleteApproveRoute(route)"
    >
        Удалить маршрут
    </el-button>
</template>

<script setup>

import { inject } from 'vue';
import { ElMessageBox } from 'element-plus';
import { notify } from '@/plugins/approval-routes/shared/utils';
import { useApprovalRoute, useActiveRoute } from '@/plugins/approval-routes/entities/approval-route';

const deleted = inject('deleted');

defineProps({ route: { type: Object, required: true } });

const loading = defineModel('loading');

const { deleteRoute } = useApprovalRoute();
const { setActiveRoute } = useActiveRoute();

const deleteApproveRoute = async (route) => {
    ElMessageBox.confirm(`Вы уверены, что хотите удалить маршрут согласовния ${route.title || ''} ?`, {
        type: 'warning',
        callback: async (action) => {
            if (action !== 'confirm') {
                return;
            }

            try {
                loading.value = true;

                route.id && await deleted(route);

                deleteRoute(route);
				
                setActiveRoute(null);

            } catch (e) {
                notify.fetchError(e.message);
                throw e;
            } finally {
                loading.value = false;
            }

        },
    });

};

</script>