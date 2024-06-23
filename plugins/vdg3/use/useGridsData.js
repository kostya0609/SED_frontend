import { reactive } from "vue";

const gridsData = reactive({});

export const useGridsData = () => {

  const defaultGridData = {
    paginationData: { page: 1, count: 10 },
    sortData: { name: "id", order: "desc" },
    filterData: {},
    showValueFilter: [],
    activeProfile: null,
  };

  /**
  * @param {string} grid_name;
  */
  const readGridData = async (grid_name) => {
    let data = localStorage.getItem('gridsData');
    if (data) {

      let obj = JSON.parse(data);

      if (obj[grid_name]) gridsData[grid_name] = obj[grid_name];
    };
  };

  const writeGridData = async () => {
    localStorage.setItem('gridsData', JSON.stringify(gridsData));
  };

  /**
  * @param {object[]} initData; 
  */
  const initGridsData = (initData) => {
    initData.forEach(data => {
      gridsData[data.name] = {...defaultGridData };
    });
  };

  return { gridsData, readGridData, writeGridData, initGridsData}
}


