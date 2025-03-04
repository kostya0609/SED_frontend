<template>
	<div>
		<el-button
			@click="handleClick"
			:icon="!isShow ? 'View' : 'Hide'"
		>
			<template v-if="!isShow">Показать информацию о процессе</template>
			<template v-else>Скрыть информацию о процессе</template>
		</el-button>
		<div
			class="process-info__items"
			v-show="isShow"
		>
			<ProcessDescription />
			<HistoryParticipants />
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import HistoryParticipants from './HistoryParticipants.vue';
import ProcessDescription from './ProcessDescription.vue';

const isShow = ref(false);

const handleClick = () => {
	isShow.value = !isShow.value;
};
</script>
<style scoped lang="scss">
.process-info {
	&__items {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-top: 1rem;
	}
}
</style>