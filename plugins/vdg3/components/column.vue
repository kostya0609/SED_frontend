<script>
import {h, inject, nextTick, resolveComponent} from 'vue';
import {useGrids } from '../';
import { ElEmpty } from 'element-plus';

export default {
    name : 'Column',
    props : ['name'],
    setup(props){
        //let grid = inject(props.name);
        
        const { instanceGrids } = useGrids();
        let grid = instanceGrids[props.name];

        return {grid};
    },
    watch : {
    // Наблюдаем за переменной для удаления события скрытия контекстного меню
        'grid.system.context.show' : function(val) {
            if(!val)
                document.removeEventListener('click',this.hideContext);
        }
    },
    methods : {
        hideContext : function(e){
            if(e.target.closest('.context-menu-wrapper.' + this.name) == null)
                this.grid.system.context.show = false;
        },
        showContext : async function($event,element){
            this.grid.system.context.show = true;
            this.grid.system.context.row = element;
            await nextTick();
           let rect = document.querySelector('.vdg_contextMenuWrapper.' + this.name).getBoundingClientRect();

            if(($event.clientY + rect.height) > window.innerHeight)
                this.grid.system.context.top = window.innerHeight - rect.height - 10;
            else
                this.grid.system.context.top = $event.clientY;

            if(($event.clientX + rect.width) > window.innerWidth)
                this.grid.system.context.left = window.innerWidth - rect.width - 20;
            else
                this.grid.system.context.left = $event.clientX;

            document.addEventListener('click',this.hideContext);
        },
        // Рекурсивно отсоовываем вложенности пришедшей колони
        getContentGrid : function(column, columnName, element){
            if (column instanceof Object) {

                if (!('tag' in column))
                    column.tag = 'span';

                if (!('params' in column))
                    column.params = {};

                return h(
                   column.tag,
                   column.params,
                   [this.getContentGrid(column.value)],
                );
            } else {
                return h(
                    'span',
                    {},
                    column
                );
            }
        },
    },
    render(){
        let row = [];
        
        const emptyElement = h(ElEmpty, {
            description: ''
        });

        this.grid.elements.forEach((element, index) => {
            

            let max = 0;
            for (const [key, resultElement] of Object.entries(element)) {
                if(max < resultElement[resultElement.length - 1].end)
                    max = resultElement[resultElement.length - 1].end;
            }

            let columnElement = [];
            this.grid.system.columnKey.forEach(columnName => {

                if (!(columnName in element)) {
                    throw new Error(`Не удалось найти поле "${columnName}", проверьте передаваемые данные!`);
                }

                element[columnName].forEach((column, index) => {

                    let endRow = column.end;

                    //Оставить на случай если на большой вложенности возникнут глюки
                    //Отвечает за высоту колонки
                    //if(this.grid.header[columnName].child.length == 0)
                    if (element[columnName].length <= 1)
                        endRow = (element[columnName].length - 1 == index ? max : column.end);

                    let columnValues;

                    let defaultParentParams = {
                        class: ['vdg_contentWrapper_columnContent', columnName],
                        style: {
                            'grid-row': column.start + '/' + endRow
                        }
                    };

                    // Если value обьект то генерируем версту переданую в нем
                    if (column.value instanceof Object) {

                        if (!('tag' in column))
                            column.tag = 'span';

                        if (!('params' in column))
                            column.params = {};

                        // Дальше рекурсивно генерируем всю вложеность

                        columnValues = h(
                            column.value.tag,
                            column.value.params,
                            [this.getContentGrid(column.value.value, columnName, element)]
                        );

                        // Возможность передать параметры ячейке родителю
                        if (!('parentParams' in column.value))
                            column.value.parentParams = {};

                        // Возможность передать Событие клика ячейке родителю
                        if ('onClick' in column.value.parentParams)
                            defaultParentParams.onClick = eval(column.value.parentParams.onClick);

                        if ('style' in column.value.parentParams) {
                            defaultParentParams.style = {
                                ...defaultParentParams.style,
                                ...column.value.parentParams.style
                            };
                        }

                        if ('class' in column.value.parentParams) {
                            defaultParentParams.class.concat(column.value.parentParams.class);
                        }

                    } else {
                        columnValues = h(
                            'span',
                            {},
                            column.value
                        );
                    }

                    // Иконка для контекстного меню
                    if(columnName == 'icon' && ('context' in element || this.grid.context.length)){
                        columnValues = [h(
                            resolveComponent('el-icon'),
                            {
                                onClick : async $event => {
                                    $event.stopPropagation();
                                    this.showContext($event,element);
                                }
                            },
                            () => [h(
                                resolveComponent('expand'),
                                {},
                                ''
                            )]
                        )];
                    }


                    columnElement.push(h(
                        'div',
                        defaultParentParams,
                        columnValues
                    ));
                    if (element[columnName][index + 1] && endRow < element[columnName][index + 1].start) {
                        columnElement.push(h(
                            'div',
                            {
                                class: 'vdg_contentWrapper_columnContent',
                                style: {
                                    'grid-row': endRow + '/' + element[columnName][index + 1].start
                                }
                            },
                            ''
                        ));
                    }
                    if (!element[columnName][index + 1] && endRow < max) {
                        columnElement.push(h(
                            'div',
                            {
                                class: 'vdg_contentWrapper_columnContent',
                                style: {
                                    'grid-row': endRow + '/' + max
                                }
                            },
                            ''
                        ));
                    }

                });
            });

            row.push(h(
                'div',
                {
                    class : 'vdg_contentWrapper_rowContent',
                    style : {
                        'grid-template-columns' : this.grid.system.gtc,
                    },
                    onContextmenu : $event => {
                        if('context' in element || this.grid.context.length) {
                            $event.preventDefault();
                            this.showContext($event, element);
                        }
                    },
                },
                columnElement
            )
            );

        });

        return h(
            'div',
            {
                class : ['vdg_contentWrapper', this.name],
                style : {
                    width : this.grid.system.scrollWidth+'px',
                    'clip-path' : 'inset(0px)',
                }
            },
            row.length ? row : [emptyElement]
        );
    }
};
</script>