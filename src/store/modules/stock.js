// store  Stock or service  Stock
/*eslint-disable*/
import ApiService from "@/common/api.service";
import LsService from "@/common/ls.service";
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from "@/common/config";
import {
  GET_STATE_STOCKS,
  GET_STOCKS,
  GET_STOCK,
  CREATE_STOCK,
  UPDATE_STOCK,
  DELETE_STOCK
} from "@/store/actions.type";

// initial state
const state = {
  stocks: [],
  stock: {},
  error: {},
  tablestate: {
    SortColumnName: "",
    IsDescending: false,
    NumberOfRowSkip: 0,
    NumberOfPages: NUMBER_OF_PAGES,
    RowPerPage: ROW_PER_PAGE,
    SearchKeyword: "",
    SearchBy: "",
    KeywordBy: ""
  },
  paginations: {
    currentPage: 1,
    pageLength: 1,
    rowsPerPage: ROW_PER_PAGE
  },
  warehouse: [],
  product: [],
  unit: []
};
// getters
const getters = {
  getStocks: state => {},
  getStockError: state => {
    return state.error;
  },
  getWarehouseOfStock: state => {
    return state.warehouse;
  },
  getProductOfStock: state => {
    return state.product;
  },
  getUnitOfStock: state => {
    return state.unit;
  }
};
// actions
const actions = {
  // get sorting stock
  GET_SORTING_STOCKS(context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName;
    context.state.tablestate.IsDescending = params.IsDescending;
    context.dispatch(GET_STATE_STOCKS, context.state.tablestate);
  },
  // get pagination stock
  GET_PAGINATION_STOCK(context, page) {
    let tmpNumberOfRowSkip =
      (page - 1) * context.state.tablestate.NumberOfPages;
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip;
    context.dispatch(GET_STATE_STOCKS, context.state.tablestate);
    context.state.paginations.currentPage = page;
  },
  // search table state
  GET_SEARCH_STOCKS({ commit, dispatch, state }, params) {
    console.log(params, "params");
    state.tablestate.SearchKeyword = params.search;
    state.tablestate.NumberOfRowSkip = 0;
    state.tablestate.KeywordBy = params.keywordby;
    state.tablestate.SearchBy = params.searchby;
    // console.log(keywordby, search, searchby)
    console.log(state.tablestate, "test");
    dispatch(GET_STATE_STOCKS);
  },
  // action get state Stock
  [GET_STATE_STOCKS](context, params) {
    if (typeof params !== "undefined") {
      context.state.tablestate = params;
    }
    context.commit("CLEAR_STOCK");
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.query("/api/stock/state", {
        params: context.state.tablestate
      })
        .then(result => {
          context.commit("SET_STOCKS", { results: result.data });
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // action get Stocks
  [GET_STOCKS](context) {
    context.commit("CLEAR_ERROR");
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/stock/list")
        .then(result => {
          context.commit("SET_STOCKS", { results: result.data });
          resolve(result);
        })
        .catch(err => {
          context.commit("SET_ERROR", { result: err.message });
          reject(err);
        });
    });
  },
  // action get  Stock by ...
  [GET_STOCK](context, slug) {
    context.commit("CLEAR_ERROR");
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/stock", slug)
        .then(result => {
          resolve(result);
          context.commit("SET_STOCK", result.data);
        })
        .catch(err => {
          reject(err);
          context.commit("SET_ERROR", { result: err.message });
        });
    });
  },
  // action create Stock
  [CREATE_STOCK](context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post("/api/stock", formData)
        .then(result => {
          context.commit("CLEAR_ERROR");
          context.commit("ADD_STOCK", result.data);
          resolve(result);
        })
        .catch(err => {
          context.commit("SET_ERROR", { result: err.message });
          reject(err);
        });
    });
  },
  // action update Stock
  [UPDATE_STOCK](context, datas) {
    context.commit("CLEAR_ERROR");
    let id = context.state.stock.Id;
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.put("/api/stock/" + id, datas)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
          context.commit("SET_ERROR", { result: err.message });
        });
    });
  },
  // action delete Stock
  [DELETE_STOCK](context, slug) {
    context.commit("CLEAR_ERROR");
    return new Promise((resolve, reject) => {
      ApiService.delete("/api/stock/" + slug)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
          context.commit("SET_ERROR", { result: err.message });
        });
    });
  },

  // get'+Warehouse+'Of'+Stock
  GET_WAREHOUSE_OF_STOCK(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/warehouse")
        .then(result => {
          this.state.warehouse.warehouses = result.data;
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // get'+Product+'Of'+Stock
  GET_PRODUCT_OF_STOCK(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/product")
        .then(result => {
          this.state.product.products = result.data;
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // get'+Unit+'Of'+Stock
  GET_UNIT_OF_STOCK(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/unit")
        .then(result => {
          this.state.unit.units = result.data;
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
// mutations
const mutations = {
  SET_STOCKS(state, { results }) {
    state.stocks = results.data;
    state.paginations.pageLength = results.numberOfPages;
  },
  SET_STOCK(state, result) {
    state.stock = result;
  },
  CLEAR_STOCK(state) {
    state.stock = {};
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
  ADD_STOCK(state, result) {
    state.stocks.push(result);
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
