<template>
	<el-card
		shadow="never"
		class="dynamic-roles"
	>
		<template #header>
			<div class="dynamic-roles__header">
				<span>Динамические роли</span>
			</div>
		</template>

		<el-table
			:data="dynamicRoles"
			:show-header="false"
			table-layout="auto"
			scrollbar-always-on
		>
        <el-table-column prop="title"/>

			<el-table-column
				prop="_actions"
				align="right"
			>
				<template #default="scope">
					<el-space>

						<el-button
							icon="CloseBold"
							type="danger"
							size="small"
							@click="detachRole(scope.row.id)"
						/>
					</el-space>
				</template>
			</el-table-column>

		</el-table>		

	</el-card>
</template>
<script setup>

const dynamicRoles = defineModel('dynamicRoles');

const detachRole = async (id) => {
	dynamicRoles.value = dynamicRoles.value.filter(role => role.id !== id);
};

</script>
<style scoped lang="scss">
.dynamic-roles {
	&__header {
		display: flex;
		justify-content: space-between;
		gap: .5rem;
	}

}
</style>