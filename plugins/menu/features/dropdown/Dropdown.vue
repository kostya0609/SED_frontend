<template>
	<el-dropdown
		v-bind="{ ...params }"
		@command="handleChangeCommand"
		:type="params.type || 'primary'"
		title=""
	>
		<template #default>
			<el-button
				v-if="!params['split-button']"
				v-bind="{ ...params }"
				:type="params.type || 'primary'"
				title=""
				class="dropdown-button"
			>
				<span>{{ params.title }}</span>
				<el-icon>
					<ArrowDown />
				</el-icon>
			</el-button>
			<template v-else>
				{{ params.title }}
			</template>
		</template>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
					v-for="item in params.items"
					:key="item.title"
					v-bind="{ ...item }"
					:command="item"
				>
					{{ item.title }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
	params: {
		type: Object,
		required: true,
	}
});

const handleChangeCommand = (command) => {
	if (command.path) {
		router.push(command.path);
	} else if (command.handle) {
		command.handle(command);
	}
};
</script>
<style scoped>
::v-deep(.dropdown-button>span) {
	gap: .25rem;
}
</style>