<template>
	<Preloader :loading="loading">
		<el-link
			:href="templateLink"
			type="primary"
			class="ms-5"
			:underline="false"
			target="_blank"
		>
			Перейти в шаблон процесса "{{ route.process_template.title }}"
		</el-link>
		<el-form
			:model="route"
			:rules="rules"
			label-width="auto"
			label-position="left"
			ref="form"
			class="form"
		>
			<el-form-item
				prop="title"
				label="Название маршрута согласования"
				label-position="top"
				class="ps-5 mt-2"
			>
				<el-input
					v-model="route.title"
					placeholder="Введите название маршрута согласования"
					clearable
				/>
			</el-form-item>

			<el-form-item
				label="Активность"
				prop="is_active"
				label-position="top"
				class="ps-5 mt-2"
			>
				<el-switch v-model="route.is_active" />
			</el-form-item>

			<el-timeline>
				<el-timeline-item
					v-for="(stage, idx) in route.stages"
					:key="stage.id"
					:timestamp="stage.title"
					placement="top"
					hollow
					size="large"
				>
					<Stage
						v-model:stage="route.stages[idx]"
						v-model:loading="loading"
					/>
				</el-timeline-item>
			</el-timeline>

			<div class="form-item__button">
				<DeleteRoute
					:route="route"
					v-model:loading="loading"
				/>

				<el-button
					type="primary"
					@click="submit"
				>
					Сохранить изменения
				</el-button>
			</div>

		</el-form>
	</Preloader>
</template>
<script setup>
import Stage from './Stage.vue';
import { inject, ref, reactive, computed } from 'vue';
import { Preloader } from '@/plugins/approval-routes/shared/ui';
import { DeleteRoute } from '@/plugins/approval-routes/features/delete-route';

const updated = inject('updated');
const created = inject('created');

const loading = defineModel('loading');
const route = defineModel('route', { required: true, type: Object });

const templateLink = computed(() => window.location.origin + '/business-process-factory/all-process/detail/' + route.value.process_template.id);

const form = ref();
const rules = reactive({
	title: { required: true, message: 'Необходимо ввести название маршрута' },
	is_active: { required: true, message: 'Необходимо выбрать статус маршрута' },
});

const submit = async () =>
	form.value.validate(async (isValid) => {
		if (!isValid) return null;

		try {
			loading.value = true;

			const payload = {
				id: route.value.id || null,
				title: route.value.title,
				process_template_id: route.value.process_template.id,
				is_active: route.value.is_active,
				stages: route.value.stages,
			};

			if (!payload.id) {
				route.value = await created(payload);
			} else {
				route.value = await updated(payload);
			}
		} catch (e) {
			throw e;
		} finally {
			loading.value = false;
		}
	});
</script>

<style scoped>
.form-item__button {
	display: flex;
	justify-content: end;
}
</style>