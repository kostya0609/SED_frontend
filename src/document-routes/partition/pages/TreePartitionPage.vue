<template>
    <Preloader :loading="loading">
        <el-tree
            :data="partitionsTree"
            :props="partitionProps"
        />
    </Preloader>
</template>
<script setup>
import { Preloader } from '@common/shared/ui';
import { usePartition } from "@document-routes/partition/entities/partition";

const { partitionsTree, initPartitionsTree, loading } = usePartition();

const partitionProps = {
    label: 'title',
    children: 'children',
}

await initPartitionsTree();

</script>