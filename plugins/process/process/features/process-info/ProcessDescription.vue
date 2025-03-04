<template>
	<div class="process-description">
		<el-descriptions
			:column="1"
			border
			title="Общая информация"
			class="process-description__common"
			v-if="activeProcess.isCreated()"
		>
			<el-descriptions-item label="Название процесса">
				{{ activeProcess.process.title }}
			</el-descriptions-item>
			<el-descriptions-item label="ID процесса">
				<Copy v-if="activeProcess.process">{{ activeProcess.process.id }}</Copy>
				<template v-else>NULL</template>
			</el-descriptions-item>
			<el-descriptions-item label="Инициатор процесса">
				<UserLink :user="activeProcess.process.user" />
				(<Copy>{{ activeProcess.process.user_id }}</Copy>)
			</el-descriptions-item>
			<el-descriptions-item label="Инициатор документа">
				<UserLink :user="activeProcess.process.document_user" />
				(<Copy>{{ activeProcess.process.document_user_id }}</Copy>)
			</el-descriptions-item>
			<el-descriptions-item label="Дата создания процесса">
				<template v-if="activeProcess.process && activeProcess.process.created_at">
					<Copy>{{ formatDateTime(activeProcess.process.created_at) }}</Copy>
				</template>
				<template v-else>NULL</template>
			</el-descriptions-item>
			<el-descriptions-item label="Дата запуска процесса">
				<template v-if="activeProcess.process && activeProcess.process.executed_at">
					<Copy>{{ formatDateTime(activeProcess.process.executed_at) }}</Copy>
				</template>
				<template v-else>Процесс еще не запускался</template>
			</el-descriptions-item>
			<el-descriptions-item label="Кол-во перезапусков">
				{{ activeProcess.process.restart_count }}
			</el-descriptions-item>
		</el-descriptions>

		<el-descriptions
			:column="1"
			border
			title="Входные параметры"
			class="process-description__input"
		>
			<el-descriptions-item label="ID инициатора процесса">
				<Copy>{{ executorId }}</Copy>
			</el-descriptions-item>
			<el-descriptions-item label="ID текущего пользователя">
				<Copy>{{ userId }}</Copy>
			</el-descriptions-item>
			<el-descriptions-item label="ID документа">
				<Copy>{{ documentId }}</Copy>
			</el-descriptions-item>
			<el-descriptions-item label="ID шаблона процесса">
				<Copy>{{ templateId }}</Copy>
			</el-descriptions-item>
			<el-descriptions-item label="Права">
				<el-button
					link
					type="primary"
					@click="console.log({ ...access })"
				>
					Вывести в консоль
				</el-button>
			</el-descriptions-item>
			<el-descriptions-item label="Документ">
				<el-button
					link
					type="primary"
					@click="console.log({ ...document })"
				>
					Вывести в консоль
				</el-button>
			</el-descriptions-item>
			<el-descriptions-item label="Модуль">
				<Copy>{{ moduleName }}</Copy>
			</el-descriptions-item>
		</el-descriptions>
	</div>
</template>
<script setup>
import { formatDateTime, UserLink, Copy, useProcessProvider, useActiveProcess } from '@/plugins/process/common';

const {
	executorId,
	userId,
	documentId,
	templateId,
	access,
	document,
	moduleName
} = useProcessProvider();
const { activeProcess } = useActiveProcess();
</script>
<style scoped lang="scss">
.process-description {
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;

	&__common {
		flex: 1;
	}

	&__input {
		flex: 1;
	}
}
</style>