import { reactive, ref, computed } from "vue";
import { initGrid } from '../';
import { useGridsData } from './useGridsData.js';
import { notify } from '../shared/utils/notify.js';

import { loadJson } from '../shared/api';

const instanceGrids = reactive({});

const APIGrids = {};

const { gridsData, readGridData, writeGridData } = useGridsData();

export const useGrids = () => {

  /**
  * @param {object[]} initData;
  * @param {number} userId;
  * @param {object} API;
  * 
  */
  const initGrids = (initData, userId, API, module) => {

    initData.forEach(data => {

      instanceGrids[data.name] = initGrid(
        {
          setting: true,
          header: {...data.header},
          context: data.context,
          pagination: {
            show: 'full',
            defaultSize: gridsData[data.name].paginationData.count,
            page: gridsData[data.name].paginationData.page,
            changeSize: function (value) {
              gridsData[data.name].paginationData.count = value;
              updateGrid(data.name, true);
            },
            changePage: function (value) {
              gridsData[data.name].paginationData.page = value;
              updateGrid(data.name, true);
            },
            ...data.pagination,
          },
          filter: {
            profiles: [],
            show: true,
            showProfiles: true,
            showValue: gridsData[data.name].showValueFilter,
            activeProfile: gridsData[data.name].activeProfile,
            filter: function (filterData_new, showValueFilter_new, activeProfile_new) {
              for (let prop of Object.getOwnPropertyNames(gridsData[data.name].filterData)) {
                delete gridsData[data.name].filterData[prop];
              }
              let normalFilter = {};
              for (let key in filterData_new) {
                if ((filterData_new[key].type === 'number' || filterData_new[key].type === 'date') && filterData_new[key].min) normalFilter[key] = filterData_new[key];
                if ((filterData_new[key].type === 'list' || filterData_new[key].type === 'searchList') && filterData_new[key].value.length > 0) normalFilter[key] = filterData_new[key];
              }
                
              gridsData[data.name].showValueFilter = showValueFilter_new;
  
              Object.assign(gridsData[data.name].filterData, {...normalFilter});
             
              gridsData[data.name].activeProfile = activeProfile_new.value;
              updateGrid(data.name, true);
            },
            clear: function () {
              for (let prop of Object.getOwnPropertyNames(gridsData[data.name].filterData)) {
                delete gridsData[data.name].filterData[prop];
              };

              gridsData[data.name].activeProfile = null;
              updateGrid(data.name, true);
            },
            ...data.filter,          },
          gridId: null,
          networkSetting: {
            domain: process.env.NODE_ENV == 'production' ?
              API.PROD_URL ? API.PROD_URL : `${window.location.origin}/api`
              :
              API.DEV_URL ? API.DEV_URL : 'http://localhost',
            module,
            userId: window._userId ?? userId,
          },
          loading: false,
          loadJson: function (url, data) {
            return fetch(
              this.networkSetting.domain + url,
              {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data, function (key, val) {
                  return (typeof val === 'function') ? '' + val : val;
                })
              }
            ).then(res => {
              return new Promise((resolve, reject) => {
                if (!res.ok)
                  throw new Error('Response server - status code ' + res.status);
                else {
                  res.json().then(json => {
                    resolve(json)
                  }).catch(err => {
                    reject(err);
                  })
                }
              })
            }).catch(err => {
              return new Promise((resolve, reject) => {
                reject({ status: 'error', message: 'Некорректный ответ сервера', system: err.message })
              })
            });
          },
          sortContent: function (sortData_new) {
            Object.assign(gridsData[data.name].sortData, {...sortData_new});
            updateGrid(data.name, true);
          },
        }
      );

      APIGrids[data.name] = { API, url: data.url ?? '' };
    });
    // console.log('instanceGrids from init', instanceGrids);
  };


  /**
  * @param {string} name;
  * @param {boolean} updateLocalStorage;
  */
  const updateGrid = async (name, updateLocalStorage) => {

    // if (updateLocalStorage) writeGridData()
    // else readGridData(name);

    let filter = gridsData[name].filterData;
    let sort = gridsData[name].sortData;

    let gridElements = [];

    try {
      instanceGrids[name].loading = true;

      let domain = process.env.NODE_ENV == 'production' ?
        APIGrids[name].API.PROD_URL ? APIGrids[name].API.PROD_URL : `${window.location.origin}/api`
        :
        APIGrids[name].API.DEV_URL ? APIGrids[name].API.DEV_URL : 'http://localhost';

      let url = APIGrids[name].url;

      let result = await loadJson(domain, url, {
        count: instanceGrids[name].pagination.defaultSize,
        page: instanceGrids[name].pagination.page,
        filter: filter,
        sort: sort.name ? sort : { name: 'id', order: 'asc' },
      });

      if (result.success && result.data) {
        gridElements = result.data.items;

        instanceGrids[name].pagination.total = result.data.total;
        instanceGrids[name].methods.addElements(gridElements);
      }
      else throw new Error('Произошла ошибка при выполнении запроса не сервере');


    } catch (e) {
      notify.fetchError(e.message);
      throw e;
    } finally {
      instanceGrids[name].loading = false;
    }
  };

  const resetGrid = async (name) => {
    instanceGrids[name].pagination.total = 0;

    instanceGrids[name].methods.addElements([]);
  }

  return { instanceGrids, initGrids, updateGrid, resetGrid }
};

