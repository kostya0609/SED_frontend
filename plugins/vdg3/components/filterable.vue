<script>
import { inject, nextTick, h, resolveComponent, Transition, ref, reactive, computed, onRenderTracked } from "vue";
import Minus from '@element-plus/icons/lib/Minus'
import Plus from '@element-plus/icons/lib/Plus'
import Check from '@element-plus/icons/lib/Check'
import Close from '@element-plus/icons/lib/Close'
import { Search } from "@element-plus/icons";
import {useGrids } from '../';

export default {
  name: 'Filterable',
  components: {},
  props: ['name'],
  setup(props) {
    //const grid = inject(props.name);
    const { instanceGrids } = useGrids();
    let grid = instanceGrids[props.name];

    const showFilter = ref(false); // признак что надо показывать основное окно фильтра
    const activeProfile = ref(grid.filter.activeProfile ? grid.filter.activeProfile : 0);     // активный - выбранный профиль.. подкрашивается синим
    const profileName = ref(null);  // имя нового профиля
    const creatingProfile = ref(false); // признак, чтоб отрисовать поле ввода имени нового профиля и кнопки добавить / отменить
    const showValue = reactive(grid.filter.showValue ? grid.filter.showValue : []); // информация о данных фильтра...отрисовывается в окне Фильтр + поиск в приложении
    const filtered = ref(showValue.length > 0 ? true : false); // признак того, что данные были отфильтраваны(нажимали кнопку Найти)
    const dontCloseFilter = ref(false); // признак того чтоб основное окно фильтра не закрылось
    const datePickerOpen = ref(false);//признак что открыт элемент datePicker

    async function onSubmit() {
      showValue.length = 0;
      for (let key in grid.filter.data) {
        if (grid.filter.data[key].type == 'number' && grid.filter.data[key].min > 0 && grid.filter.data[key].show) {
          let obj = {
            name: grid.filter.data[key].name,
            value: ''
          };
          if (grid.filter.data[key].operation == '><') {
            obj.value = grid.filter.data[key].min + ' - ' + grid.filter.data[key].max;
          } else
            obj.value = grid.filter.data[key].operation + ' ' + grid.filter.data[key].min;

          showValue.push(obj);
        } else if (grid.filter.data[key].type == 'date' && grid.filter.data[key].min && grid.filter.data[key].show) {
          let obj = {
            name: grid.filter.data[key].name,
            value: ''
          };
          if (grid.filter.data[key].operation == '><') {
            obj.value = grid.filter.data[key].min + ' - ' + (grid.filter.data[key].max ? grid.filter.data[key].max : '');
          } else
            obj.value = grid.filter.data[key].operation + ' ' + grid.filter.data[key].min;

          showValue.push(obj);
        } else if (grid.filter.data[key].type == 'list' && grid.filter.data[key].value && grid.filter.data[key].value.length && grid.filter.data[key].show) {

          let obj = {
            name: grid.filter.data[key].name,
            value: ''
          };
          if (grid.filter.data[key].value instanceof Array) {
            let arr = grid.filter.data[key].value.map(el => {
              return grid.filter.data[key].option.filter(op => {
                return el == op.value;
              })[0].label;
            })
            obj.value = arr.join();
          } else
            obj.value = grid.filter.data[key].option.filter(option => {
              return option.value == grid.filter.data[key].value;
            })[0].label;

          showValue.push(obj);
        } else if (grid.filter.data[key].type == 'searchList' && grid.filter.data[key].value && grid.filter.data[key].value.length && grid.filter.data[key].show) {
          let obj = {
            name: grid.filter.data[key].name,
            value: ''
          };
          if (grid.filter.data[key].value instanceof Array) {
            let arr = grid.filter.data[key].changeOption.map(el => {
              return el.label;
            })
            obj.value = arr.join();
          } else
            obj.value = grid.filter.data[key].changeOption.filter(option => {
              return option.value == grid.filter.data[key].value;
            })[0].label;
          showValue.push(obj);
        }
      }
      let len = showValue.length - 3;
      showValue.splice(3);
      if (len > 0)
        showValue.push({
          name: 'ещё',
          value: len
        });
      //ниже убрать поля которые не участвуют в фильтрации
      let dataFilterToSend = {};
      for (let key in grid.filter.data) {
        grid.filter.data[key].show ? dataFilterToSend[key] = grid.filter.data[key] : ''
      }

      // ниже если фильтр на основе дефолтового то сохранить его как текущий #Активный фильтр, если остался старый активный то его удалить

      if (activeProfile.value === 0) {
        let i = null, id = null;
        grid.filter.profiles.forEach((el, idx) => { if (el.name === '#Актуальный фильтр') { i = idx; id = el.id } });
        if (i > 0) {
          let result = await grid.loadJson('/grid/filter/preset/delete', { preset_id: id });
          //ниже удалить его из массива профилей
          if (result.status == 'success') { grid.filter.profiles.splice(i, 1) }
        }

        profileName.value = '#Актуальный фильтр';
        await createProfile()
      } else {
        //ниже чтобы удалить #Активный профиль если он был и с него перешли на другой или обновить его если он же и остался
        let i = null, id = null;
        grid.filter.profiles.forEach((el, idx) => { if (el.name === '#Актуальный фильтр') { i = idx; id = el.id } });

        //ниже замут если новый профиль создали на основе #Актуального фильтра и потом нажали Найти по нему, то Актуальный надо правильно удалить и новый созданый чтоб имел правильный порядковый номер
        let newActiveProfile = activeProfile.value;
        i < newActiveProfile ? newActiveProfile = newActiveProfile - 1 : '';

        if (i && i != activeProfile.value) await deleteProfile(i, id, newActiveProfile); else await saveUpdatedProfile(i, id);
      }

      grid.filter.filter(dataFilterToSend, showValue, activeProfile);
      filtered.value = true;
      showFilter.value = false;
    };
    function clear() {
      showValue.length = 0;
      if (filtered.value) {
        filtered.value = false;
        grid.filter.clear({});
        activeProfile.value = 0;
      } else {
        for (let key in grid.filter.data) {
          switch (grid.filter.data[key].type) {
            case 'number':
              grid.filter.data[key].min = '';
              grid.filter.data[key].max = '';
              grid.filter.data[key].operation = '=';
              break;
            case 'list':
              grid.filter.data[key].value = grid.filter.data[key].multiple ? [] : '';
              break;
            case 'searchList':
              grid.filter.data[key].value = grid.filter.data[key].multiple ? [] : '';
              break;
            case 'date':
              grid.filter.data[key].min = '';
              grid.filter.data[key].max = '';
              grid.filter.data[key].operation = '=';
              break;
          }
        }
      }
    };
    async function showFilterDropMenu($event) {
      grid.system.filterDropMenu.show = true;
      await nextTick();
      let rect = document.querySelector('.vdg_filterRow_onDropMenu.' + props.name).getBoundingClientRect();

      if (($event.clientY + rect.height) > window.innerHeight)
        grid.system.filterDropMenu.top = window.innerHeight - rect.height - 10;
      else
        grid.system.filterDropMenu.top = $event.clientY;

      if (($event.clientX + rect.width) > window.innerWidth)
        grid.system.filterDropMenu.left = window.innerWidth - rect.width - 20;
      else
        grid.system.filterDropMenu.left = $event.clientX;
      document.addEventListener('click', hideFilterDropMenu);
    };
    function hideFilterDropMenu($event) {
      if ($event.target.closest('.vdg_filterRow_onDropMenu.' + props.name) == null) {
        grid.system.filterDropMenu.show = false;
        document.removeEventListener('click', hideFilterDropMenu)
      }
    };
    function hideFilter($event) {
      if ($event.target.closest('.vdg_filterWrapper.' + props.name) == null && !dontCloseFilter.value && !datePickerOpen.value) {
        showFilter.value = false;
        document.removeEventListener('click', hideFilter)
      } else {
        dontCloseFilter.value = false;
      }
      // let filter = document.querySelector('.vdg_filterContentBlock' + props.name);
      // let clickOutSide = $event.composedPath().includes(filter);
    };
    async function openFilterWindow() {
      //ниже если загружается дефолтовый фильтр то проверить не осталось ли с прошлой сессии старого #Актуального фильтра и если он есть то удалить его
      if (activeProfile.value === 0) {
        let i = null, id = null;
        grid.filter.profiles.forEach((el, idx) => { if (el.name === '#Актуальный фильтр') { i = idx; id = el.id } });

        i > 0 ? await deleteProfile(i, id) : '';
      } else {
        await selectProfile(grid.filter.profiles[activeProfile.value], activeProfile.value);
      }
      showFilter.value = true;
      document.addEventListener('click', hideFilter);
    };

    //ниже функции для работы с профилями пользователя
    async function createProfile() {
      if (!profileName.value) return;  // если имя профиля не ввели то нечего сохранять

      // подготовить объект фильтра который сейчас настроил пользователь и добавить его к профилям в случае успешного добавления на бэк
      let profileData = {};
      for (let key in grid.filter.data) {
        if (grid.filter.data[key].type == 'number' || grid.filter.data[key].type == 'date')
          profileData[key] = {
            name: grid.filter.data[key].name,
            type: grid.filter.data[key].type,
            show: grid.filter.data[key].show,
            min: grid.filter.data[key].min,
            max: grid.filter.data[key].max,
            operation: grid.filter.data[key].operation,
          }
        else {
          profileData[key] = {
            name: grid.filter.data[key].name,
            type: grid.filter.data[key].type,
            show: grid.filter.data[key].show,
            value: grid.filter.data[key].value ? grid.filter.data[key].value : [],
            multiple: grid.filter.data[key].multiple,
          }
          if (grid.filter.data[key].type == 'list')
            profileData[key].option = grid.filter.data[key].option ? grid.filter.data[key].option : []
          else
            profileData[key].option = grid.filter.data[key].changeOption ? grid.filter.data[key].changeOption : [];
        }
      };

      //ниже подготовить новый профиль для отправки на бэк и убрать из него поля которые show = false, чтоб не сохранять их на бэке
      let sendProfile = {};
      for (const [key, value] of Object.entries(profileData)) {
        if (profileData[key].show) sendProfile[key] = { ...value }
      }

      //ниже отправили новый профиль на бэк
      let result = await grid.loadJson('/grid/filter/preset/add', {
        name: profileName.value,
        grid_id: grid.gridId,
        data: sendProfile,
      });
      if (result.status == 'success') {
        grid.filter.profiles.push(
          { id: result.preset_id, name: profileName.value, data: profileData }
        );

        //сделать новый профиль активным(синим)
        activeProfile.value = grid.filter.profiles.length - 1;
        setTimeout(() => grid.filter.filterValueChange = false, 0)
        creatingProfile.value = false;
        profileName.value = null;
      }

      // this.$notify({
      //   title                     : 'Добавление профиля',
      //   message                   : result.message,
      //   type                      : result.status,
      //   dangerouslyUseHTMLString  : true,
      //   duration                  : 5000,
      //   showClose                 : true
      // });
      dontCloseFilter.value = true;
    };
    async function saveUpdatedProfile(i, id) {
      //ниже подготовить измененный профиль для отправки на бэк и убрать из него поля которые show = false, чтоб не сохранять их на бэке
      let sendProfile = {};
      for (const [key, value] of Object.entries(grid.filter.data)) {
        if (grid.filter.data[key].show) sendProfile[key] = { ...value }
      }

      let result = await grid.loadJson('/grid/filter/preset/edit', {
        preset_id: id,
        data: sendProfile
      });
      //ниже обновить данные у текущего профиля на новые после изменения их пользователем
      if (result.status == 'success') {
        grid.filter.profiles[i].data = { ...grid.filter.profiles[i].data, ...sendProfile }
        grid.filter.filterValueChange = false;
      }
      // this.$notify({
      //   title                     : 'Обновление данных профиля',
      //   message                   : result.message,
      //   type                      : result.status,
      //   dangerouslyUseHTMLString  : true,
      //   duration                  : 5000,
      //   showClose                 : true
      // });

      dontCloseFilter.value = true;
    };
    async function deleteProfile(old_i, id, new_i) {
      let result = await grid.loadJson('/grid/filter/preset/delete', {
        preset_id: id,
      });
      if (result.status == 'success') {
        //ниже удалить его из массива профилей
        grid.filter.profiles.splice(old_i, 1);
        grid.methods.normalizeFilterData(grid.filter.profiles[0].data); //вернуть дефолтовый профиль... он всегда нулевой в массиве профилей
        new_i ? activeProfile.value = new_i : activeProfile.value = 0;
      }
      // this.$notify({
      //   title                     : 'Удаление профиля',
      //   message                   : result.message,
      //   type                      : result.status,
      //   dangerouslyUseHTMLString  : true,
      //   duration                  : 5000,
      //   showClose                 : true
      // });
      dontCloseFilter.value = true;
    };
    async function selectProfile(el, i) {

      // for (let prop of Object.getOwnPropertyNames(filterData)) {
      //   delete filterData[prop];
      // }

      //ниже загружаем данные выбранного профиля
      activeProfile.value = i;
      creatingProfile.value = false;
      for (let key in el.data) {
        grid.filter.data[key].show = el.data[key].show;
        ('min' in el.data[key]) ? grid.filter.data[key].min = el.data[key].min : '';
        ('max' in el.data[key]) ? grid.filter.data[key].max = el.data[key].max : '';
        ('operation' in el.data[key]) ? grid.filter.data[key].operation = el.data[key].operation : '';

        if ('option' in el.data[key]) {
          if (grid.filter.data[key].type === 'list') grid.filter.data[key].option = el.data[key].option
          else { grid.filter.data[key].option = el.data[key].option; grid.filter.data[key].changeOption = el.data[key].option }
        }

        ('value' in el.data[key]) ? grid.filter.data[key].value = el.data[key].value : '';
      }
      setTimeout(() => grid.filter.filterValueChange = false, 0) // если ранее пользовались фильтром по умолчанию то сбросить признак изменения значений полей и их видимости
    };

    const showFilterDropMenuButton = computed(() => {
      let show = false;
      for (let key in grid.filter.data) {
        if (!grid.filter.data[key].show) { show = true; break }
      }
      return show
    });

    return { grid, showFilter, activeProfile, profileName, creatingProfile, filtered, dontCloseFilter, datePickerOpen, showValue, openFilterWindow, onSubmit, clear, showFilterDropMenu, createProfile, deleteProfile, selectProfile, hideFilter, saveUpdatedProfile, showFilterDropMenuButton }
  },

  render() {


    // рисуется форма профилей с помощью функции profilesForm, в ней функцией userProfiles отрисовываются сами строки с профилями
    const profilesForm = () => {
      return this.grid.filter.showProfiles ?
        h(
          'div',
          {
            class: 'vdg_profileWrapper'
          },
          h(
            'div',
            {
              class: 'vdg_profileRow'
            },
            [
              h(
                'label',
                {
                  class: 'vdg_profileRow_label'
                },
                'Выбор профиля'
              ),
              userProfiles(),
              (!this.creatingProfile) ? h(
                'div',
                {
                  class: 'vdg_profileRow_fields'
                },
                h(
                  'button',
                  {
                    class: ['vdg_profileRow_addRow', 'el-button', 'el-button--default'],
                    onClick: $event => { this.creatingProfile = true; this.dontCloseFilter = true; }
                  },
                  [
                    'Создать новый профиль',
                    h(
                      resolveComponent('el-icon'),
                      () => [h(Plus)]
                    )
                  ]
                )
              ) : null,

              this.creatingProfile ? h(
                'div',
                {
                  class: 'vdg_profileRow_fields'
                },
                h(
                  resolveComponent('el-input'),
                  {
                    class: 'vdg_profileRow_addRow_input',
                    placeholder: 'Введите название профиля',
                    'modelValue': this.profileName,
                    'onUpdate:modelValue': value => this.profileName = value,
                  },
                  () => [
                    'Создать новый профиль',
                    h(
                      resolveComponent('el-icon'),
                      null,
                      h(Plus)
                    )
                  ]
                )
              ) : null,
              this.creatingProfile ? h(
                'div',
                {
                  class: 'vdg_profileRow_fields'
                },
                [
                  h(
                    'button',
                    {
                      class: ['vdg_profileRow_addRow', 'el-button', 'el-button--default'],
                      onClick: $event => this.createProfile(),
                    },
                    [
                      'Сохранить',
                      h(
                        resolveComponent('el-icon'),
                        () => [h(Check)]
                      )
                    ]
                  ),
                  h(
                    'button',
                    {
                      class: ['vdg_profileRow_addRow', 'el-button', 'el-button--default'],
                      onClick: $event => {
                        this.creatingProfile = false;
                        this.dontCloseFilter = true;
                        this.profileName = null;
                      }
                    },
                    [
                      'Отменить',
                      h(
                        resolveComponent('el-icon'),
                        () => [h(Close)]
                      )
                    ]
                  )
                ]
              ) : null,
            ]
          )
        )
        : ''

    };

    const userProfiles = () => {
      let content = [];
      this.grid.filter.profiles.map((el, i) => {
        content.push(
          h(
            'div',
            {
              class: 'vdg_profileRow_fields', key: i,
            },
            [
              h(
                'button',
                {
                  class: ['vdg_profileRow_element', 'el-button', 'el-button--default', { selected: i == this.activeProfile }],
                  onClick: $event => this.selectProfile(el, i),
                },
                el.name
              ),

              (i > 0 && this.grid.filter.profiles[i].name !== '#Актуальный фильтр') ? h(
                'button',
                {
                  class: ['vdg_profileRow_elementRemove', 'el-button', 'el-button--default'],
                  onClick: $event => this.deleteProfile(i, this.grid.filter.profiles[i].id),
                },
                h(
                  resolveComponent('el-icon'),
                  () => [h(Minus)]
                ),
              ) : null,

              (this.grid.filter.filterValueChange && this.activeProfile > 0 && i == this.activeProfile) ? h(
                h(
                  'button',
                  {
                    class: ['vdg_profileRow_elementUpdate', 'el-button', 'el-button--default'],
                    onClick: $event => this.saveUpdatedProfile(i, this.grid.filter.profiles[i].id),
                  },
                  [

                    h(
                      resolveComponent('el-icon'),
                      () => [h(Check)]
                    )
                  ]
                )
              ) : null,
            ]
          )
        )
      });
      return content;
    };

    const filterMain = () => {
      let content = []
      for (const [key, dataValue] of Object.entries(this.grid.filter.data)) {

        if (dataValue.type == 'number' && dataValue.show) {
          content.push(
            h(
              'div',
              { class: 'vdg_filterRow', key: key },
              [
                h('label', { class: 'vdg_filterRow_label' }, dataValue.name),
                h('div',
                  { class: 'vdg_filterRow_fields' },
                  [
                    h(resolveComponent('el-select'),
                      {
                        class: 'vdg_filterRow_changeFieldsNumber',
                        'modelValue': this.grid.filter.data[key].operation,
                        'onUpdate:modelValue': value => { this.grid.filter.data[key].operation = value; this.grid.filter.filterValueChange = true; },
                      },
                      () => {
                        return dataValue.change.map(el => {
                          return h(resolveComponent('el-option'),
                            { label: el.label, value: el.value },
                            '')
                        })
                      }
                    ),
                    h(resolveComponent('el-input'),
                      {
                        class: 'vdg_filterRow_changeValue',
                        'modelValue': Number(this.grid.filter.data[key].min) ? this.grid.filter.data[key].min : null,
                        'onUpdate:modelValue': value => { this.grid.filter.data[key].min = value; this.grid.filter.filterValueChange = true },
                        placeholder: 'Введите значение'
                      }
                    ),
                    this.grid.filter.data[key].operation == '><' ? h(
                      resolveComponent('el-input'),
                      {
                        class: 'vdg_filterRow_changeValue',
                        'modelValue': Number(this.grid.filter.data[key].max) ? this.grid.filter.data[key].max : null,
                        'onUpdate:modelValue': value => { this.grid.filter.data[key].max = value; this.grid.filter.filterValueChange = true },
                        placeholder: 'Введите значение'
                      }
                    ) : '',
                    h(resolveComponent('el-button'),
                      {
                        class: ['vdg_filterRow_hideFields', 'el-button', 'el-button--default'],
                        onClick: $event => {
                          this.grid.filter.data[key].show = false;
                          this.grid.filter.filterValueChange = true;
                          this.dontCloseFilter = true;
                        }
                      },
                      () => [h(
                        resolveComponent('el-icon'),
                        () => [h(Close),]
                      )]
                    ),
                  ]
                ),
                // для проверки корректности работы v-model
                //h('label', {class : 'vdg_filterRow_label'},this.grid.filter.data[key].operation),
                //h('label', {class : 'vdg_filterRow_label'},this.grid.filter.data[key].min),
                //h('label', {class : 'vdg_filterRow_label'},this.grid.filter.data[key].max)
              ]
            )
          )
        };

        if (dataValue.type == 'date' && dataValue.show) {
          content.push(
            h('div',
              { class: 'vdg_filterRow', key: key },
              [
                h('label', { class: 'vdg_filterRow_label' }, dataValue.name),
                h('div',
                  { class: 'vdg_filterRow_fields' },
                  [
                    h(resolveComponent('el-select'),
                      {
                        class: 'vdg_filterRow_changeFieldsNumber',
                        'modelValue': this.grid.filter.data[key].operation,
                        'onUpdate:modelValue': value => { this.grid.filter.data[key].operation = value; this.grid.filter.filterValueChange = true; }
                      },
                      () => {
                        return dataValue.change.map(el => {
                          return h(resolveComponent('el-option'),
                            { label: el.label, value: el.value },
                            '')
                        })
                      }
                    ),
                    h(resolveComponent('el-date-picker'),
                      {
                        class: 'vdg_filterRow_changeValue',
                        type: 'date',
                        format: 'DD.MM.YYYY',
                        valueFormat: 'DD.MM.YYYY',
                        placeholder: 'Введите значение',
                        //pickerOptions : { firstDayOfWeek: 1 },
                        'onVisibleChange': value => this.datePickerOpen = value,
                        'modelValue': this.grid.filter.data[key].min,
                        'onUpdate:modelValue': value => { this.grid.filter.data[key].min = value; this.grid.filter.filterValueChange = true; this.dontCloseFilter = true; },
                      }
                    ),
                    this.grid.filter.data[key].operation == '><' ? h(
                      resolveComponent('el-date-picker'),
                      {
                        class: 'vdg_filterRow_changeValue',
                        type: 'date',
                        format: 'DD.MM.YYYY',
                        valueFormat: 'DD.MM.YYYY',
                        placeholder: 'Введите значение',
                        //pickerOptions : '{ firstDayOfWeek: 1 }',
                        'onVisibleChange': value => this.datePickerOpen = value,
                        'modelValue': this.grid.filter.data[key].max,
                        'onUpdate:modelValue': value => { this.grid.filter.data[key].max = value; this.grid.filter.filterValueChange = true; },
                      }
                    ) : '',
                    h(resolveComponent('el-button'),
                      {
                        class: ['vdg_filterRow_hideFields', 'el-button', 'el-button--default'],
                        onClick: $event => { this.grid.filter.data[key].show = false; this.grid.filter.filterValueChange = true; this.dontCloseFilter = true; }
                      },
                      () => [h(
                        resolveComponent('el-icon'),
                        () => [h(Close)]
                      )]
                    ),
                  ]
                ),
                // для проверки корректности работы v-model
                //h('label', {class : 'vdg_filterRow_label'},this.grid.filter.data[key].operation),
                // h('label', {class : 'vdg_filterRow_label'},this.grid.filter.data[key].min),
                // h('label', {class : 'vdg_filterRow_label'},this.grid.filter.data[key].max)
              ]
            )
          )
        };

        if (dataValue.type == 'list' && dataValue.show) {
          content.push(
            h(
              'div',
              { class: 'vdg_filterRow', key: key },
              [
                h('label', { class: 'vdg_filterRow_label' }, dataValue.name),
                h('div',
                  { class: 'vdg_filterRow_fields' },
                  [
                    h(resolveComponent('el-select'),
                      {
                        class: 'vdg_filterRow_changeFieldsList',
                        multiple: dataValue.multiple,
                        onFocus: async () => {
                          if (this.grid.filter.data[dataValue.key].focus) {
                            await this.grid.filter.data[dataValue.key].focus() ? this.grid.filter.data[dataValue.key].option = await this.grid.filter.data[dataValue.key].focus() : '';
                          }
                        },
                        'modelValue': this.grid.filter.data[key].value,
                        'onUpdate:modelValue': value => { this.grid.filter.data[key].value = value; this.grid.filter.filterValueChange = true; }
                      },
                      () => {
                        return dataValue.option.map(el => {
                          return h(resolveComponent('el-option'),
                            { label: el.label, value: el.value },
                            '')
                        })
                      }
                    ),
                    h(resolveComponent('el-button'),
                      {
                        class: ['vdg_filterRow_hideFields', 'el-button', 'el-button--default'],
                        onClick: $event => { this.grid.filter.data[key].show = false; this.grid.filter.filterValueChange = true; this.dontCloseFilter = true; }
                      },
                      () => [h(
                        resolveComponent('el-icon'),
                        () => [h(Close)]
                      )]
                    ),
                  ]
                ),
                // для поверки что v-model работает корректно
                // this.grid.filter.data[key].value.map(el => {
                // return h('label', {class : 'vdg_filterRow_label'},el)
                //}),
              ]
            )
          )
        };

        if (dataValue.type == 'searchList' && dataValue.show) {
          content.push(
            h('div',
              { class: 'vdg_filterRow', key: key },
              [
                h('label', { class: 'vdg_filterRow_label' }, dataValue.name),
                h('div',
                  { class: 'vdg_filterRow_fields' },
                  [
                    h(resolveComponent('el-select'),
                      {
                        class: 'vdg_filterRow_changeFieldsList',
                        multiple: dataValue.multiple,
                        filterable: true,
                        remote: true,
                        reserveKeyword: true,
                        loading: false,
                        remoteMethod: async (query) => {
                          if (!query) return;

                          this.grid.loading = true;
                          let newOption = [];
                          await this.grid.filter.data[dataValue.key].query ? newOption = await this.grid.filter.data[dataValue.key].query(query) : [];

                          this.grid.filter.data[dataValue.key].changeOption.forEach(el => {
                            let res
                            res = newOption.filter(op => {
                              return el.value == op.value
                            })[0]
                            if (!res) newOption.push(el)
                          })

                          this.grid.filter.data[dataValue.key].option = newOption;
                          this.grid.loading = false;
                        },
                        ref: 'search',
                        placeholder: 'Введите значение',
                        onFocus: async () => {
                          if (this.grid.filter.data[dataValue.key].focus) {
                            await this.grid.filter.data[dataValue.key].focus() ? this.grid.filter.data[dataValue.key].option = await this.grid.filter.data[dataValue.key].focus() : '';
                          }
                        },
                        onRemoveTag: (value) => {
                          this.grid.filter.data[dataValue.key].changeOption = this.grid.filter.data[dataValue.key].changeOption.filter(el => {
                            return el.value != value;
                          });
                        },
                        onChange: (value) => {
                          if (value instanceof Array) {
                            let arr = [];
                            value.forEach(el => {

                              let res;

                              res = this.grid.filter.data[dataValue.key].changeOption.filter(op => {
                                return el == op.value;
                              })[0];

                              if (!res) {
                                res = this.grid.filter.data[dataValue.key].option.filter(op => {
                                  return el == op.value;
                                })[0];
                              }
                              arr.push(res);

                            });

                            this.grid.filter.data[dataValue.key].changeOption = arr;
                          } else {
                            this.grid.filter.data[dataValue.key].changeOption = [];
                            if (value) {
                              this.grid.filter.data[dataValue.key].changeOption.push(this.grid.filter.data[dataValue.key].option.filter(op => {
                                return value == op.value;
                              })[0]);
                            }
                          }
                          this.$refs.search.query = '';
                        },
                        'modelValue': this.grid.filter.data[key].value,
                        'onUpdate:modelValue': value => { this.grid.filter.data[key].value = value; this.grid.filter.filterValueChange = true; }
                      },
                      () => {
                        return dataValue.option.map(el => {
                          return h(resolveComponent('el-option'),
                            { label: el.label, value: el.value },
                            '')
                        })
                      }
                    ),
                    h(resolveComponent('el-button'),
                      {
                        class: ['vdg_filterRow_hideFields', 'el-button', 'el-button--default'],
                        onClick: $event => { this.grid.filter.data[key].show = false; this.grid.filter.filterValueChange = true; this.dontCloseFilter = true; }
                      },
                      () => [h(
                        resolveComponent('el-icon'),
                        () => [h(Close)]
                      )]
                    ),
                  ]
                ),
                // для поверки что v-model работает корректно
                //this.grid.filter.data[key].value.map(el => {
                // return h('label', {class : 'vdg_filterRow_label'},el)
                //}),
              ]
            )
          )
        };

      };
      return content;
    };

    const filterDropMenu = () => {
      let content = []
      for (const [key, dataValue] of Object.entries(this.grid.filter.data)) {
        if (!this.grid.filter.data[key].show) {
          content.push(
            h(
              'div',
              {
                key: key,
                class: 'vdg_filterDropMenuWrapper_item',
                onClick: $event => { this.grid.filter.data[key].show = true; this.grid.filter.filterValueChange = true; this.grid.system.filterDropMenu.show = false; this.dontCloseFilter = true; }
              },
              dataValue.name
            )
          )
        }
      }
      return content
    };

    return this.grid.filter.show ? h(
      'div',
      { class: ['vdg_filterWrapper', this.name] },
      [
        h(
          'div',
          { class: 'vdg_labelFilterWrapper' },
          h(
            'div',
            {
              class: 'vdg_inputFilterBlock',
              onClick: $event => this.openFilterWindow(),
            },
            [
              this.showValue.map(el => {
                return h('span', { class: 'vdg_valueFilter' }, el.name + ' : ' + el.value)
              }),
              h(resolveComponent('el-input'),
                {
                  class: 'vdg_inputFilter',
                  placeholder: 'Фильтр + поиск',
                },
              ),
              this.showValue.length > 0 ? h(
                resolveComponent('el-button'),
                {
                  text: true,
                  class: 'vdg_filterCloseButton',
                  onClick: $event => { this.clear(); $event.stopPropagation() }
                },
                () => 'X') : '',
            ]
          ),
        ),
        h(Transition,
          { name: 'el-fade-in-linear' },
          () => [this.showFilter ? h(
            'div',
            {
              class: ['vdg_filterContentBlock', { 'vdg_filterContentBlockWithProfiles': this.grid.filter.showProfiles }],
            },
            [
              profilesForm(),
              h(
                'div',
                {},
                [
                  h(resolveComponent('el-scrollbar'), { class: 'vdg_filterMainContainer_scrollbar' },
                    h('div', { class: 'vdg_filterMainContainer' }, filterMain())
                  ),
                  h('div', { class: 'vdg_filterButtonContainer' }, [
                    h('div', { class: 'vdg_filterRow_fields' },
                      [this.showFilterDropMenuButton ?
                        h('div',
                          [
                            h(resolveComponent('el-button'),
                              { class: ['vdg_filterRow_onDropMenu', this.name], onClick: $event => { this.showFilterDropMenu($event) } },
                              () => '+'
                            ),
                          ]) : '',
                      ]),
                    h(resolveComponent('el-button'),
                      { class: ['vdg_filterRow_clearFilter', 'el-button', 'el-button--default'], onClick: $event => this.clear() },
                      () => [this.filtered ? 'Сбросить' : 'Очистить']
                    ),
                    h(resolveComponent('el-button'),
                      {
                        class: ['vdg_filterRow_submitFilter', 'el-button', 'el-button--primary'],
                        onClick: $event => { this.onSubmit() }
                      },
                      'Найти'
                    ),
                  ])
                ],
              ),
            ],
          ) : '',
          ],
        ),

        // //  ниже это аналог drop down со списком полей для фильтра
        this.grid.system.filterDropMenu.show ?
          h(

            h('div', {
              class: ['vdg_filterDropMenuWrapper', this.name],
              style: {
                top: this.grid.system.filterDropMenu.top + 'px',
                left: this.grid.system.filterDropMenu.left + 'px',
              },
            },
              h(
                resolveComponent('el-scrollbar'),
                {},
                h('div', {class: 'vdg_filterDropMenu_scrollbar'}, filterDropMenu())
              )
            )

          ) : '',

      ]
    ) : '';
  }
}
</script>