<template>
	<div class="user-link">
		<el-link
			v-if="!disablePhoto"
			:underline="false"
			:href="user.link"
			class="user-link__photo"
			:style="`background-image: url('${user.photo ?? '/assets/img/no_photo.png'}');`"
		/>
		<el-link
			:underline="false"
			:href="user.link"
			type="primary"
		>
			{{ user.full_name }}
		</el-link>
	</div>
</template>

<script setup>

defineProps({
	user: {
		type: Object,
		required: true
	},
	disablePhoto: {
		type: Boolean,
		default: false,
	}
})

</script>

<style scoped lang="scss">
.user-link {
	&__photo {
		border-radius: 50%;
		width: 32px;
		height: 32px;
		background-size: cover;
		margin-right: 5px;
	}
}
</style>