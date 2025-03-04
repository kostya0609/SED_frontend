<template>

    <el-button
        link
        type="primary"
    >
        <el-icon size="20">
            <Plus @click="handleClick" />
        </el-icon>
    </el-button>

</template>
<script setup>

import { useStaticRolePartitionRepo } from '@/plugins/roles/entities/static-role-partition/api';
import { notify } from "@/plugins/roles/shared/utils";

const emit = defineEmits(['setLoading'])

const StaticRolePartitionRepo = useStaticRolePartitionRepo();
const handleClick = async () => {
    try {
        emit('setLoading', true, false);
        await StaticRolePartitionRepo.add();
    } catch (e) {
        notify.fetchError(e.message);
        throw e;
    } finally {
        emit('setLoading', false, true);
    }
};

</script>