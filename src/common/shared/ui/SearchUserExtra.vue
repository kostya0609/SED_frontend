<template>
    <div class="search">
        <el-select
            v-if="!disabled"
            v-model="searchType"
            class="search__type"
        >
            <el-option
                v-for="item in searchTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </el-select>

        <SearchUser
            v-if="searchType === 'FIO'"
            v-model="users"
            class="search__users"
            :multiple="multiple"
            :options="multiple ? users : users ? [users] : []"
            :disabled="disabled"
        />

        <SearchStaticRole
            v-if="searchType === 'staticRole'"
            v-model="role"
            class="search__role"
        />

        <el-button
            v-if="searchType === 'staticRole'"
            type="primary"
            class="search__btn"
            @click="getUsersByRole"
            :disabled="!role"
        >
            <el-icon><Select /></el-icon>
        </el-button>

    </div>

</template>


<script setup>
import { SearchUser, SearchStaticRole } from "@common/shared/ui";
import { StaticRoleRepo } from '@common/shared/api/index.js';
import { ref } from "vue";
import { notify } from '@common/shared/utils';

const users = defineModel();
const props = defineProps({
    multiple: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    }
});

const loading = ref(false);

const role = ref(null);

const searchType = ref('FIO');
const searchTypeList = [
    { value: 'FIO', label: 'ФИО' },
    { value: 'staticRole', label: 'Статичная роль' },
];

const getUsersByRole = async () => {
    if (!role.value) return;

    try {
        loading.value = true;
        const result = await StaticRoleRepo.getUsersByRoleId(role.value.value);

        if (!result || !result.length) {
            notify.error('Добавление участников', 'У выбранной статичной роли отсутствуют участники.');
            return;
        };

        if (!props.multiple && result.length > 1) {
            notify.error('Добавление участников', 'Допускается только один участник, но у выбранной статичной роли больше одного участника.');
            return;
        };

        if (props.multiple)
            result.forEach(el => {
                if (!users.value.find(user => user.id === el.id)) users.value.push(el);
            });
        else users.value = result[0];

        searchType.value = 'FIO';
        role.value = null;

    } catch (e) {
        notify.error(e.message);
        throw e;
    } finally {
        loading.value = false;
    }

};

</script>

<style scoped lang="scss">
.search {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    width: 100%;

    &__type {
        flex: 0 0 90px;
        

    }

    &__users {
        flex: 1 0 150px;
    }

    &__role {
        flex: 1 0 150px;
    }
}

</style>