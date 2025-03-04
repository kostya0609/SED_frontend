<template>
	<div class="instruction">
		<div class="instruction__head">Инструкции:</div>
		<ul class="instruction__list">
			<li
				v-for="link in links"
				:key="link.title"
			>
				<el-link
					:href="link.link"
					:underline="false"
					target="_blank"
					type="danger"
					icon="Reading"
					class="instruction__link"
				>
					{{ link.title }}
				</el-link>
			</li>
		</ul>
	</div>
</template>
<script setup>
defineProps({
	links: {
		type: Array,
		required: true,
	}
});
</script>
<style scoped lang="scss">
.instruction {
	margin-top: 30px;

	&__head {
		color: #F56C6C;
		font-weight: bold;
	}

	&__list {
		list-style-type: none;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		padding-inline-start: 40px;
		line-height: normal;

		&>li+li {
			margin-top: .25rem;
		}
	}

	&__link {
		gap: 5px;
	}
}
</style>