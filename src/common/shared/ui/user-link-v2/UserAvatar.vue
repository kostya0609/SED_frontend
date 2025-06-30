<template>
	<div
		class="avatar"
		:style="avatarStyle"
	></div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	photo: {
		type: String,
		default: ''
	},
	gender: {
		type: String,
		required: true
	}
});

const getDefaultAvatar = (gender) => {
	const path = gender === 'F'
		? '/images/female.jpg'
		: '/images/male.jpg';

	if (process.env.NODE_ENV == 'development') {
		return path;
	}

	return `/sed/dist${path}`;
};

const avatarStyle = computed(() => ({
	width: '36px',
	height: '36px',
	minWidth: '36px',
	minHeight: '36px',

	borderRadius: '50%',
	backgroundImage: `url('${props.photo || getDefaultAvatar(props.gender)}')`,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat'
}));
</script>

<style scoped>
.avatar {
	/* Дополнительные стили при необходимости */
}
</style>