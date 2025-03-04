<template>
	<!-- Если компонент одиночный и при этом выключенный -->
	<template v-if="!componentIsMultiple && componentIsDisabled">
		<UserListItem
			v-model="items[0]"
			@delete="handleDelete"
			v-if="items.length"
			disabled
		/>
		<el-alert
			type="warning"
			title="Пользователь не выбран"
			:closable="false"
			v-else
		/>
	</template>

	<!-- Иначе, если компонент множественный -->
	<el-collapse
		v-model="activeNames"
		class="user-list__collapse"
		v-else
	>
		<el-collapse-item
			:title="`Пользователи и роли${items.length ? ' (' + items.length + ')' : ''}`"
			:name="1"
		>
			<ul class="user-list">
				<li
					v-for="(item, index) in items"
					:key="item.id"
				>
					<UserListItem
						v-model="items[index]"
						@delete="handleDelete"
						@change="handleChange"
					/>
				</li>
			</ul>
		</el-collapse-item>
	</el-collapse>
</template>
<script setup>
import { inject } from 'vue';
import UserListItem from './UserListItem.vue';

const componentIsMultiple = inject('multiple');
const componentIsDisabled = inject('disabled');

const items = defineModel();
const activeNames = defineModel('active');
const emit = defineEmits(['delete', 'change']);

const handleDelete = (row) => {
	const _items = items.value.filter(item => item !== row);
	emit('delete', row, _items);
};

const handleChange = () => {
	emit('change', items.value);
};
</script>
<style lang="scss" scoped>
.user-list {
	&__collapse {
		border: none;
		--el-collapse-header-height: 20px;

		&:deep(.el-collapse-item__header) {
			border: none;
		}

		&:deep(.el-collapse-item__wrap) {
			border: none;
		}

		&:deep(.el-collapse-item__content) {
			padding-bottom: 0;
		}

		&:deep(.el-collapse-item:last-child) {
			margin-bottom: 0;
		}
	}
}

.user-list {
	display: flex;
	flex-direction: column;
	margin: .5rem 0 0 0;
	padding: 0;
	list-style: none;
}
</style>