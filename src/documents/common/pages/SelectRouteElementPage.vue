<template>
	<el-row :gutter="20">
		<el-col :span="3">
			Элемент
		</el-col>
		<el-col :span="6">
			<SelectRouteElement />
		</el-col>
	</el-row>
</template>
<script setup>
import { useBackButton } from '@/plugins/menu';
import { SelectRouteElement } from '@documents/common/features/select-route-element';

useBackButton({ fallbackPath: '/sed' });
</script>