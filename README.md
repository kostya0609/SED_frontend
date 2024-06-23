# Модуль СЭД

## Установка

```bash
git clone https://gitlab.bitrix.bsi.local/bitrix24/sed_frontend.git SED --recurse-submodules
```

```bash
cd SED
```

```bash
npm i
```

## Запуск

```bash
npm run dev
```

## Структура проекта

### Основное приложение

**Путь: src/common;**

Здесь содержатся основные настройки приложения, общие страницы и переиспользуемые утилиты для всего проекта.

src/common/app/config - основные настройки для всего приложения (компоненты, плагины, модули и главное меню)

### Модуль для работы с документами

**Путь: src/documents**

src/documents/common - общий функционал модуля (страницы, настройки и пр.)

### Модуль документа Поручение

**Путь: src/documents/directive**

### Модуль документа ЭСЗ

**Путь: src/documents/esz**

### Модуль документа Ознакомления

**Путь: src/documents/review**

### Модуль отчета

**Путь: src/report**
