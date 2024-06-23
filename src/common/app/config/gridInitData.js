export const gridInitData = [
    {
        name: 'documentsList',
        url: '/sed/documents/v1/documents/list',
        header: {
            id: {
                name: 'ID',
                width: 100,
                show: false,
                sort: 100,
                contentSort: 'desc'
            },
            number: {
                name: 'Номер',
                width: 100,
                show: true,
                sort: 200,
                contentSort: 'desc'
            },
            type: {
                name: 'Тип документа',
                width: 200,
                show: true,
                sort: 300,
                contentSort: 'asc'
            },
            theme: {
                name: 'Тема документа',
                width: 300,
                show: true,
                sort: 400,
                //contentSort: 'asc'
            },
            status_title: {
                name: 'Статус',
                width: 150,
                show: true,
                sort: 500,
                contentSort: 'asc'
            },
            executor: {
                name: 'Инициатор',
                width: 300,
                show: true,
                sort: 600,
                // contentSort: 'asc'
            },
            created_at: {
                name: 'Дата создания',
                width: 200,
                show: true,
                sort: 700,
            },
        },
        context: [
            {
                text: 'Перейти в документ',
                function: (e, row) => {
                    return { action: 'detail', instance: row };
                }
            },
            {
                text: 'Редактировать документ',
                function: (e, row) => {
                    return { action: 'edit', instance: row };
                }

            },
        ],
        pagination: {
            show: 'full'
        },
        filter: {
            show: true,
            showProfiles: true,
        }
    },

    {
        name: 'needActionList',
        url: '/sed/documents/v1/documents/need-action-list',
        header: {
            id: {
                name: 'ID',
                width: 100,
                show: false,
                sort: 100,
                contentSort: 'desc'
            },
            number: {
                name: 'Номер',
                width: 100,
                show: true,
                sort: 200,
                contentSort: 'desc'
            },
            type: {
                name: 'Тип документа',
                width: 200,
                show: true,
                sort: 300,
                contentSort: 'asc'
            },
            theme: {
                name: 'Тема документа',
                width: 300,
                show: true,
                sort: 400,
                //contentSort: 'asc'
            },
            status_title: {
                name: 'Статус',
                width: 150,
                show: true,
                sort: 500,
                contentSort: 'asc'
            },
            executor: {
                name: 'Инициатор',
                width: 300,
                show: true,
                sort: 600,
                // contentSort: 'asc'
            },
            created_at: {
                name: 'Дата создания',
                width: 200,
                show: true,
                sort: 700,
            },
        },
        context: [
            {
                text: 'Перейти в документ',
                function: (e, row) => {
                    return { action: 'detail', instance: row };
                }
            },
            {
                text: 'Редактировать документ',
                function: (e, row) => {
                    return { action: 'edit', instance: row };
                }

            },
        ],
        pagination: {
            show: 'full'
        },
        filter: {
            show: true,
            showProfiles: true,
        }
    }
];