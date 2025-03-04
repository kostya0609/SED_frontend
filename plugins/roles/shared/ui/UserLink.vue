<template>
    <div>
        <el-link
            v-if="!disablePhoto"
            :underline="false"
            :href="user.link"
            target="_blank"
            class="photo"
            :style="`background-image: url('${user.photo ?? '/assets/img/no_photo.png'}');`"
        />
        <el-link
            :underline="false"
            :href="user.link"
            target="_blank"
        >
        {{ fullName ? user.full_name : user.abbreviated_name}}
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
	},
	fullName: {
		type: Boolean,
		default: true,
	}
})

</script>

<style>
.photo {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    background-size: cover;
    margin-right: 5px;
}
</style>