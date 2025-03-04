<template>
	<el-select v-model="type">
		<el-option
			label="ФИО"
			:value="ITEM_TYPE.USER"
		/>
		<el-option
			label="Статичная роль"
			:value="ITEM_TYPE.STATIC_ROLE"
		/>
		<el-option
			label="Динамическая роль"
			:value="ITEM_TYPE.DYNAMIC_ROLE"
		/>
	</el-select>
</template>
<script setup>
import { ITEM_TYPE } from './constants';

const type = defineModel({ default: ITEM_TYPE.USER });
</script>