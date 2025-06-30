<template>
	<ul class="partition-list">
		<!-- Вывод разделов и подразделов -->
		<template
			v-for="partition in partitions"
			:key="'partition_' + partition.id"
		>
			<li class="partition">
				<el-button
					text
					@click="changeActiveItem(partition)"
					class="partition-button"
					:class="{ 'partition-button--active': activeItem === partition }"
				>
					<template #icon>
						<el-icon class="partition-button__icon">
							<ArrowRight />
						</el-icon>
					</template>
					{{ partition.title }}
				</el-button>
				<PartitionList
					:partitions="partition.children"
					:routes="partition.routes"
					v-model="activeDocumentTemplate"
					v-show="activeItem === partition"
				/>
			</li>
		</template>

		<!-- Вывод маршрутов разделов -->
		<template
			v-for="route in routes"
			:key="'route_' + route.id"
		>
			<li>
				<el-button
					text
					@click="changeActiveItem(route)"
					class="partition-button"
					:class="{ 'partition-button--active': activeItem === route }"
				>
					<template #icon>
						<el-icon class="partition-button__icon">
							<ArrowRight />
						</el-icon>
					</template>
					{{ route.title }}
				</el-button>
				<PartitionList
					v-if="route.document_templates.length"
					:templates="route.document_templates"
					v-model="activeDocumentTemplate"
					v-show="activeItem === route"
				/>
			</li>
		</template>

		<!-- Вывод шаблонов документов маршрута -->
		<li
			v-for="template in templates"
			:key="'template_' + template.id"
			class="template"
		>
			<el-button
				text
				@click="changeActiveDocumentTemplate(template)"
				class="partition-button template__button"
				:class="{ 'partition-button--active template__button--active': activeItem === template }"
				:disabled="documentType !== template.type_id"
				:title="documentType !== template.type_id ? 'Тип родительского документа не соответствует типу данного шаблона' : ''"
			>
				<template #icon>
					<el-icon>
						<Document />
					</el-icon>
				</template>
				{{ template.type.title }}. {{ template.title }}
			</el-button>			
			
			<!-- <PartitionList
				v-if="template.children && template.children.length"
				:templates="template.children"
				v-model="activeDocumentTemplate"
				v-model:active-item="activeItem"
			/> -->
		</li>
	</ul>
</template>
<script setup>
import { injectLocal } from '@vueuse/core';

const documentType = injectLocal('documentType');

const props = defineProps({
	partitions: {
		type: Array,
		default: [],
	},
	routes: {
		type: Array,
		default: [],
	},
	templates: {
		type: Array,
		default: [],
	},
});

const activeDocumentTemplate = defineModel({ type: Object, default: null });
const activeItem = defineModel('activeItem', { required: false, default: null });

const changeActiveDocumentTemplate = (template) => {
	changeActiveItem(template);
	activeDocumentTemplate.value = template;
};

const changeActiveItem = (item) => {
	if (activeItem.value === item) {
		activeItem.value = null;
	} else {
		activeItem.value = item;
	}
};
</script>
<style scoped lang="scss">
.partition-list {
	list-style: none;
}

.partition-button {
	width: 100%;
	justify-content: flex-start;
	border: 1px solid transparent;

	&__icon {
		transition: .35s;
	}


	&:hover {
		background-color: var(--el-color-info-light-9) !important;
	}

	&:focus-visible {
		outline: none !important;
		border-color: var(--el-color-primary);
	}

	&--active &__icon {
		transform: rotate(90deg);
		transition: .35s;
	}
}

.template {


	&__button--active {
		background-color: var(--el-color-info-light-9);
		transition: .3s;
	}
}
</style>