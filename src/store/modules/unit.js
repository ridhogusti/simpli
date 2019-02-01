// store  Unit or service  Unit
import ApiService from "@/common/api.service";
import LsService from "@/common/ls.service";
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from "@/common/config";
import {
  GET_STATE_UNITS,
  GET_UNITS,
  GET_UNIT,
  CREATE_UNIT,
  UPDATE_UNIT,
  DELETE_UNIT
} from "@/store/actions.type";

// initial state
const state = {
  status: "",
  dialogState: false,
  units: [],
  unit: {},
  error: {},
  tablestate: {
    SortColumnName: "",
    IsDescending: false,
    NumberOfRowSkip: 0,
    NumberOfPages: NUMBER_OF_PAGES,
    RowPerPage: ROW_PER_PAGE,
    SearchKeyword: ""
  },
  paginations: {
    currentPage: 1,
    pageLength: 1,
    rowsPerPage: ROW_PER_PAGE
  }
};
// getters
const getters = {
  getUnits: state => {},
  getUnitError: state => {
    return state.error;
  }
};
// actions
const actions = {
  //get sorting unit
  GET_SORTING_UNITS(context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName;
    context.state.tablestate.IsDescending = params.IsDescending;
    context.dispatch(GET_STATE_UNITS, context.state.tablestate);
  },
  // get pagination unit
  GET_PAGINATION_UNIT(context, page) {
    let tmpNumberOfRowSkip =
      (page - 1) * context.state.tablestate.NumberOfPages;
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip;
    context.dispatch(GET_STATE_UNITS, context.state.tablestate);
    context.state.paginations.currentPage = page;
  },
  // search table state
  GET_SEARCH_UNITS({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword;
    state.tablestate.NumberOfRowSkip = 0;
    dispatch(GET_STATE_UNITS);
  },
  // action get state Unit
  [GET_STATE_UNITS](context, params) {
    if (typeof params !== "undefined") {
      context.state.tablestate = params;
    }
    context.commit("CLEAR_UNIT");
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      console.log(context.state.tablestate);
      ApiService.query("/api/unit/state", {
        params: context.state.tablestate
      })
        .then(result => {
          context.commit("SET_UNITS", { results: result.data });
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // action get Units
  [GET_UNITS](context) {
    context.commit("CLEAR_ERROR");
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/unit/list")
        .then(result => {
          context.commit("SET_UNITS", { results: result.data });
          resolve(result);
        })
        .catch(err => {
          context.commit("SET_ERROR", { result: err.message });
          reject(err);
        });
    });
  },
  // action get  Unit by ...
  [GET_UNIT](context, slug) {
    context.commit("CLEAR_ERROR");
    console.log(slug, "di unit");
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/unit", slug)
        .then(result => {
          resolve(result);
          context.commit("SET_UNIT", result.data);
        })
        .catch(err => {
          reject(err);
          context.commit("SET_ERROR", { result: err.message });
        });
    });
  },
  // action create Unit
  [CREATE_UNIT](context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post("/api/unit", formData)
        .then(result => {
          context.commit("CLEAR_ERROR");
          context.commit("ADD_UNIT", result.data);
          context.commit("SET_STATUS");
          resolve(result);
        })
        .catch(err => {
          context.commit("SET_ERROR", { result: err.message });
          reject(err);
        });
    });
  },
  // action update Unit
  [UPDATE_UNIT](context, datas) {
    context.commit("CLEAR_ERROR");
    let id = context.state.unit.UnitId;
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.put("/api/unit/" + id, datas)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
          context.commit("SET_ERROR", { result: err.message });
        });
    });
  },
  // action delete Unit
  [DELETE_UNIT](context, slug) {
    context.commit("CLEAR_ERROR");
    return new Promise((resolve, reject) => {
      ApiService.delete("/api/unit/" + slug)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
          context.commit("SET_ERROR", { result: err.message });
        });
    });
  }
};
// mutations
const mutations = {
  SET_UNITS(state, { results }) {
    state.units = results.data;
    state.paginations.pageLength = results.numberOfPages;
  },
  SET_STATUS() {
    state.status = "berhasil";
  },
  SET_UNIT(state, result) {
    state.unit = result;
  },
  CLEAR_UNIT(state) {
    state.unit = {};
  },
  UPDATE_PAGINATION(state, result) {
    let tmpPaging = {
      SortColumnName: result.sortBy,
      IsDescending: result.descending,
      NumberOfRowSkip: (result.page - 1) * NUMBER_OF_PAGES,
      NumberOfPages: NUMBER_OF_PAGES,
      RowPerPage: ROW_PER_PAGE
    };
    state.pagination = tmpPaging;
  },
  SET_ERROR: (state, { result }) => {
    state.error = {
      status: true,
      type: "error",
      message: result
    };
  },
  CLEAR_ERROR: state => {
    state.error = {
      status: false,
      type: "error",
      message: ""
    };
  },
  ADD_UNIT(state, result) {
    state.units.push(result);
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
