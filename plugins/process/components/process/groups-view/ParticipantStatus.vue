<template>
	<el-tooltip
		effect="dark"
		:content="status.title"
		placement="top"
	>
		<el-icon :class="status.classes">
			<component
				:is="status.icon"
				:color="status.color"
			/>
		</el-icon>
	</el-tooltip>
</template>
<script setup>
import { computed } from 'vue';
import { PARTICIPANT_STATUS } from '@/plugins/process/constants';

const props = defineProps({
	status: {
		type: Object,
		required: true,
	}
});

const status = computed(() => {
	let title = null;
	let icon = null;
	let color = null;
	let classes = null;

	switch (props.status.id) {
		case PARTICIPANT_STATUS.WAIT:
			title = props.status.title;
			icon = 'Loading';
			color = 'gray';
			classes = 'is-loading';
			break;

		case PARTICIPANT_STATUS.ACTIVE:
			title = props.status.title;
			icon = 'Bell';
			color = 'var(--el-color-primary)';
			classes = 'is-ringing';
			break;

		case PARTICIPANT_STATUS.DECIDED:
			title = props.status.title;
			icon = 'Select';
			color = 'var(--el-color-success)';
			classes = '';
			break;

		default:
			throw new Error(`Нет обработки для статуса №${props.status.id}`);
	}

	return {
		title,
		icon,
		color,
		classes,
	};
});
</script>
<style lang="scss" scoped>
.is-ringing {
  animation: ring 4s .7s ease-in-out infinite;
  transform-origin: 50% 4px;
}

@keyframes ring {
  0% { transform: rotate(0); }
  1% { transform: rotate(30deg); }
  3% { transform: rotate(-28deg); }
  5% { transform: rotate(34deg); }
  7% { transform: rotate(-32deg); }
  9% { transform: rotate(30deg); }
  11% { transform: rotate(-28deg); }
  13% { transform: rotate(26deg); }
  15% { transform: rotate(-24deg); }
  17% { transform: rotate(22deg); }
  19% { transform: rotate(-20deg); }
  21% { transform: rotate(18deg); }
  23% { transform: rotate(-16deg); }
  25% { transform: rotate(14deg); }
  27% { transform: rotate(-12deg); }
  29% { transform: rotate(10deg); }
  31% { transform: rotate(-8deg); }
  33% { transform: rotate(6deg); }
  35% { transform: rotate(-4deg); }
  37% { transform: rotate(2deg); }
  39% { transform: rotate(-1deg); }
  41% { transform: rotate(1deg); }

  43% { transform: rotate(0); }
  100% { transform: rotate(0); }
}
</style>