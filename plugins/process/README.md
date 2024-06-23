# Плагин бизнес-процессов

## Установка

```
git submodule add https://gitlab.bitrix.bsi.local/common/plugin_process.git ./src/plugins/process
```

## Обновление

Переходим в каталог с плагином:

```bash
cd ./src/plugins/process
```

Переключаем на главную ветку (выполняем только один раз после установки подмодуля):

```bash
git checkout main
```

Забираем изменения с репозитория:

```bash
git pull
```

## Компоненты

Плагин бизнес-процессов состоит из 3-х основных компонентов:

1. ProcessProvider - компонент, через который передаются нужные данные для работы БП;
2. Process - основной компонент БП;
3. Interaction - компонент модуля взаимодействия.

### Компонент ProcessProvider

Атрибуты компонента ProcessProvider:

| Атрибут | Тип       | Описание                                                            |
| -------------- | ------------ | --------------------------------------------------------------------------- |
| document       | объект | Объект документа                                             |
| template-id    | число   | Id шаблона процесса                                          |
| executor-id    | число   | Id пользователя, который создал документ   |
| user-id        | число   | Id текущего пользователя                                |
| access         | объект | Объект с правами доступа: {full: false, execute: true} |

Описание объекта access

| Свойство | Тип  | Описание                                                                  |
| ---------------- | ------- | --------------------------------------------------------------------------------- |
| full             | boolean | Полные права                                                           |
| execute          | boolean | Права на запуск и редактирование участников |

В атрибут document должен передаваться документ, над которым мы работаем, также обязательно передать ссылку на этот документ как показано в примере ниже. Ссылка нужна для правильного формирования уведомлений.

Пример:

```html
<template>
<ProcessProvider
     :document="document"
     :template-id="10"
     :executor-id="document.user_id"
     :user-id="user.id"
     :access="{full: false, execute: true}"
    >
	<!-- Детальная страницы документа -->
</ProcessProvider>
</template>
```

### Компонент Process

Атрибутов не содержит, но есть ряд событий:

| Событие | Название              | Описание                                                                                                                                                                                                                                            |
| -------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onCreated      | Создан                  | Вызывается в момент создания БП, когда мы нажимаем кнопку "Принудительно создать процесс"                                                                                        |
| onDeleted      | Удален                  | Вызывается в момент удаления БП, когда мы нажимаем кнопку "Удалить процесс"                                                                                                                   |
| onRunned       | Запущен                | Вызывается в моментзапуска БП, когда нажимаем на кнопку "Запустить процесс"                                                                                                                  |
| onCancelled    | Аннулирован        | Вызывается в момент аннулирования процесса, к примеру, когда было принято отрицательное решение или принудительно аннулировали процесс |
| onDecided      | Принято решение | Вызываеся в момент принятия решения участником                                                                                                                                                                     |
| onCompleted    | Выполнен              | Вызывается когда процесс был выполнен                                                                                                                                                                                      |

Слоты

| Название | Параметры | Описание                                                                                           |
| ---------------- | ------------------ | ---------------------------------------------------------------------------------------------------------- |
| head             | { process }        | В параметрах приходид объект, в котором есть свойство process |

Пример:

```html
<template>
	<Process
		@created="onCreated"
        	@deleted="onDeleted"
        	@runned="onRunned"
        	@cancelled="onCancelled"
        	@decided="onDecided"
		@completed="onCompleted"
		v-slot:head="{process}"
      >
	{{ process.title }} (ID {{ process.id }})
</Process>

</template>
```

### Компонент Interaction

Компонент модуля взаимодействия - расширения версия истории, где участники/инициатор также могут принимать решения. Есть один аттрибут ref - ссылка на данный компонент, через которую можно принудительно обновить комментарии в данном компоненте.

Пример:

```html
<template>
  <Interaction ref="interactionRef" />
</template>
```

```js
const refInteraction = ref();

/** Обновит (заново запросит) все комментарии в модуле взаимодействия */
await refInteraction.value.updateComments();
```

## Пример использования

На детальной страницы документа подключаем компонент ProcessProvider - это компонент обвертка для подключения других компонентов БП, здесь задаются все необходимые данные, с которыми работает БП.

```html
<ProcessProvider
     :document="document"
     :template-id="10"
     :executor-id="document.user_id"
     :user-id="user.id"
     :full-access="{full: true, execute: true}"
    >
      <el-tabs
        type="border-card"
        v-model="page"
      >

        <el-tab-pane
          label="Информация о документе"
          name="info"
        >
	<!-- Компонент с информацией о документе -->
        </el-tab-pane>

        <el-tab-pane
          label="Бизнес процесс"
          name="process"
        >
          <Process
            @created="onCreated"
            @deleted="onDeleted"
            @runned="onRunned"
            @cancelled="onCancelled"
            @decided="onDecided"
            @completed="onCompleted"
          />
        </el-tab-pane>

        <el-tab-pane
          label="Взаимодейстия"
          name="interaction"
        >
          <Interaction ref="refInteraction" />
        </el-tab-pane>

        <el-tab-pane
          label="История"
          name="history"
        >
	<!-- Компонент с историей документа -->
        </el-tab-pane>
      </el-tabs>
    </ProcessProvider>
```

Примерная структура скрипта (`<script setup>`)

```js
import { ref, reactive, inject, provide, computed } from "vue";
import { useRoute } from 'vue-router';
import preLoader from "@/components/pre_loader";
import info from "@/pages/meetings/detail/components/info";
import History from "@/pages/meetings/detail/components/history";
import { TEMPLATE_ACTION } from '@/plugins/process/constants';
import { MeetingRepo } from "@/repositories";

const route = useRoute();

const loading = ref(false);
const user = inject('user');
const notify = inject('notify');
const updateNeedActionCount = inject('updateNeedActionCount');

const document = reactive({
  id: '',
  name: '',
  date_start: '',
  date_stop: '',
  status: '',
  history: [],
  user: null,
});

const document = computed(() => ({ ...document, link: location.pathname }));

const page = ref('process');
const refInteraction = ref();

const updateDocument = async () => {
  try {
    loading.value = true;
    const result = await DocumentRepo.get({
      meeting_id: route.params.id,
      user_id: user.id,
    });

    document.id = result.id;
    document.name = result.name;
    document.date_start = result.date_start;
    document.date_stop = result.date_stop;
    document.status = result.status;
    document.history = result.history;
    document.user = result.user;

  } catch (e) {
    // Здесь можно показать уведомления об ошибка запроса
    throw e;
  } finally {
    loading.value = false;
  }
};

await updateDocument();

/**
 * Обработка события: бизнес-процесс создан
 */
const onCreated = async () => {
  await updateDocument();
  await updateNeedActionCount();
};

/**
 * Обработка события: бизнес-процесс был удален
 */
const onDeleted = async () => {
  await updateDocument();
  await updateNeedActionCount();
};

/**
 * Обработка события: бизнес-процесс запущен
 */
const onRunned = async () => {
  await updateDocument();
  await updateNeedActionCount();
};

/**
 * Обработка события: Аннулирование бизнес-процесса
 */
const onCancelled = async () => {
  await updateDocument();
  await updateNeedActionCount();
};

/**
 * Обработка события: принято решение в бизнес-процессе
 */
const onDecided = async (action) => {
  await updateDocument();
  await updateNeedActionCount();

  if (action.template_action_id === TEMPLATE_ACTION.MAKE_COMMENT_AND_NOTIFY_EXECUTOR) {
    page.value = 'interaction';
    await refInteraction.value.updateComments();
  }
};

/**
 * Обработка события: бизнес-процесс выполнен
 */
const onCompleted = async () => {
  console.log('completed');
  await updateDocument();
  await updateNeedActionCount();
};

provide('goToProcess', () => {
  page.value = 'process';
});
```
