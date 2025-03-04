<template>
	<div
		class="user-link"
		v-if="!styleV2"
	>
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
			{{ fullName ? user.full_name : user.abbreviated_name }}
		</el-link>
	</div>
	<UserLink
		:user="user"
		:disable-photo="disablePhoto"
		:full-name="fullName"
		v-else
	/>
</template>

<script setup>
import { UserLink } from './user-link-v2';

defineProps({
	user: {
		type: Object,
		required: true
	},
	disablePhoto: {
		type: Boolean,
		default: false,
	},
	fullName: {
		type: Boolean,
		default: true,
	},
	styleV2: {
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