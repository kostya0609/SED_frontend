<template>
	<el-button
		:type="type"
		:icon="icon"
		@click.stop="handleClick()"
	>
		<template
			#default
			v-if="title"
		>
			{{ title }}
		</template>
	</el-button>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
	title: {
		type: String,
		required: false,
	},
	path: {
		type: String,
		required: false,
	},
	fallbackPath: {
		type: String,
		required: false,
		default: null,
	},
	goBack: {
		type: Boolean,
		required: false,
		default: false,
	},
	type: {
		type: String,
		required: false,
		default: 'primary'
	},
	icon: {
		type: String,
		required: false,
		default: null,
	},
});

const emit = defineEmits(['click']);

const handleClick = () => {
	if (props.goBack) {
		if (router.options.history.state.back) {
			router.back();
		} else {
			props.fallbackPath ? router.replace(props.fallbackPath) : router.back();
		}
	} else if (props.path) {
		router.push(props.path);
	} else {
		emit('click');
	}
};
</script>