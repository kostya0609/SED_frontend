<template>
	<el-popover
		:title="role.title"
		:width="400"
		trigger="click"
	>
		<template #reference>
			<el-button
				type="primary"
				link
				class="role-link-button"
			>
				{{ role.title }}
			</el-button>
		</template>
		<template #default>
			<el-text type="info">{{ role.description }}</el-text>
			<el-divider class="role-info__divider" />

			<el-alert
				type="warning"
				:closable="false"
				show-icon
				title="Данная роль не может быть проверена"
				v-if="typeRole === ITEM_TYPE.DYNAMIC_ROLE && !role.can_check"
			/>
			<template v-else>
				<el-alert
					type="warning"
					title="Участники роли не найдены!"
					:closable="false"
					v-if="participantsIsNotFound"
					class="role-info__divider"
				/>
				<template v-if="participants.length">
					<el-scrollbar max-height="400px">
						<ul
							v-if="participants.length"
							class="role-user-list"
						>
							<li
								v-for="user in participants"
								:key="user.id"
							>
								<UserLink
									:user="user"
									photo-size="small"
								/>
							</li>
						</ul>
					</el-scrollbar>
				</template>
				<template v-else>
					<el-button
						size="small"
						@click="showParticipants"
						v-if="!participants.length"
						:loading="loading"
					>
						Посмотреть участников
					</el-button>
				</template>
			</template>
		</template>
	</el-popover>
</template>
<script setup>
import { ref } from 'vue';
import UserLink from './UserLink.vue';
import { ElMessage } from 'element-plus';

const props = defineProps({
	role: { type: Object, required: false },
	typeRole: { type: Number, required: true },
	userId: { type: Number, required: true },
	api: {
		type: Object,
		required: true,
		default: {
			getStaticUsers: null,
			getDynamicUsers: null,
		},
		validate(value) {
			return typeof value.getStaticUsers === 'function' &&
				typeof value.getDynamicUsers === 'function';
		},
	}
});

const loading = ref(false);
const participants = ref([]);
const participantsIsNotFound = ref(false);

const ITEM_TYPE = {
	USER: 1,
	STATIC_ROLE: 2,
	DYNAMIC_ROLE: 3,
};

const showParticipants = async () => {
	try {
		loading.value = true;

		if (props.typeRole === ITEM_TYPE.STATIC_ROLE) {
			participants.value = await props.api.getStaticUsers(props.role.id);
		} else if (props.typeRole === ITEM_TYPE.DYNAMIC_ROLE) {
			participants.value = await props.api.getDynamicUsers(props.role.id, props.userId);
		} else {
			throw new Error('Неверный тип роли!');
		}

		if (!participants.value.length) {
			participantsIsNotFound.value = true;
		}
	} catch (e) {
		ElMessage({
			type: 'error',
			title: 'Произошла ошибка!',
			message: e.message,
			duration: 3000,
		});
		console.error(e);
	} finally {
		loading.value = false;
	}
};
</script>
<style lang="scss" scoped>
.role-info__divider {
	margin: 12px 0;
}

.role-user-list {
	display: flex;
	flex-direction: column;
	gap: .25rem;
	margin: 0;
	padding: 0;
	list-style: none;
}
</style>