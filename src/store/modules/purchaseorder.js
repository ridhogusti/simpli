// store  PurchaseOrder or service  PurchaseOrder
import ApiService from "@/common/api.service";
import LsService from "@/common/ls.service";
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from "@/common/config";
import {
  GET_STATE_PURCHASEORDERS,
  GET_PURCHASEORDERS,
  GET_PURCHASEORDER,
  CREATE_PURCHASEORDER,
  CREATE_APPROVE_PURCHASEORDER,
  UPDATE_PURCHASEORDER,
  DELETE_PURCHASEORDER,
  GET_ALL_PURCHASEORDER_COUNT
} from "@/store/actions.type";

// initial state
const state = {
  purchaseorders: [],
  purchaseorderInvoiceCount: 0,
  purchaseorder: {},
  error: {},
  tablestate: {
    SortColumnName: "",
    IsDescending: true,
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
  supplier: [],
  supplier_id: {},
  paymentterm: [],
  warehouse: [],
  product: [],
  tax: [],
  modelState: {}
};
// getters
const getters = {
  getPurchaseOrders: state => {},
  getPurchaseOrderError: state => {
    return state.error;
  },
  getSupllierOfPurchaseOrder: state => {
    return state.supllier;
  },
  getPaymentTermOfPurchaseOrder: state => {
    return state.paymentterm;
  },
  getWarehouseOfPurchaseOrder: state => {
    return state.warehouse;
  }
};
// actions
const actions = {
  // get sorting purchaseorder
  GET_SORTING_PURCHASEORDERS(context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName;
    context.state.tablestate.IsDescending = params.IsDescending;
    context.dispatch(GET_STATE_PURCHASEORDERS, context.state.tablestate);
  },
  // get pagination purchaseorder
  GET_PAGINATION_PURCHASEORDER(context, page) {
    let tmpNumberOfRowSkip =
      (page - 1) * context.state.tablestate.NumberOfPages;
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip;
    context.dispatch(GET_STATE_PURCHASEORDERS, context.state.tablestate);
    context.state.paginations.currentPage = page;
  },
  // search table state
  GET_SEARCH_PURCHASEORDERS({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword;
    state.tablestate.NumberOfRowSkip = 0;
    dispatch(GET_STATE_PURCHASEORDERS);
  },
  GET_SHOW_PURCHASEORDER({ commit, dispatch, state }, keyword) {
    state.tablestate.NumberOfPages = keyword;
    state.tablestate.RowPerPage = keyword;
    state.tablestate.NumberOfRowSkip = 0;
    state.paginations.currentPage = 1;
    dispatch(GET_STATE_PURCHASEORDERS);
  },

  GET_STATUS_PURCHASEORDER({ commit, dispatch, state }, keyword) {
    if (keyword[0] == "All") {
      state.tablestate.SearchBy = "";
      state.tablestate.KeywordBy = "";
    } else {
      state.tablestate.SearchBy = keyword[1];
      state.tablestate.KeywordBy = "";
      for (let i = 0; i < keyword[0].length; i++) {
        state.tablestate.KeywordBy =
          state.tablestate.KeywordBy + " " + keyword[0][i];
      }
    }
    dispatch(GET_STATE_PURCHASEORDERS);
  },

  RESET_PURCHASEORDER(context) {
    context.commit("RESETT_PURCHASEORDER");
  },

  GET_ALL_PURCHASEORDER_COUNT(context) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.query("/api/purchaseorder/purchaseordercount")
        .then(result => {
          context.commit("SET_COUNT_PURCHASEORDER", result.data)
        })
    })
  },
  // action get state PurchaseOrder
  [GET_STATE_PURCHASEORDERS](context, params) {
    if (typeof params !== "undefined") {
      context.state.tablestate = params;
    }
    context.commit("CLEAR_PURCHASEORDER");
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.query("/api/purchaseorder/state", {
        params: context.state.tablestate,
        type: 0
      })
        .then(result => {
          context.commit("SET_PURCHASEORDERS", { results: result.data });
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // action get PurchaseOrders
  [GET_PURCHASEORDERS](context) {
    context.commit("CLEAR_ERROR");
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/purchaseorder/list")
        .then(result => {
          context.commit("SET_PURCHASEORDERS", { results: result.data });
          resolve(result);
        })
        .catch(err => {
          context.commit("SET_ERROR", { result: err.message });
          reject(err);
        });
    });
  },
  // action get  PurchaseOrder by ...
  [GET_PURCHASEORDER](context, slug) { context.commit("CLEAR_ERROR");
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/purchaseorder", slug)
        .then(result => {
          console.log(result.data, "result purcahse order kak yani");
          resolve(result);
          context.commit("SET_PURCHASEORDER", result.data);
        })
        .catch(err => {
          reject(err);
          context.commit("SET_ERROR", { result: err.message });
        });
    });
  },
  // action create PurchaseOrder
  [CREATE_PURCHASEORDER](context, formData) {
    console.log(formData, "di purchaseorder");
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.post("/api/purchaseorder", formData)
        .then(result => {
          context.commit("CLEAR_ERROR");
          context.commit("ADD_PURCHASEORDER", result.data);
          resolve(result);
        })
        .catch(err => {
          context.commit("SET_ERROR", { result: err.message });
          reject(err);
        });
    });
  },
  // action create approve PurchaseOrder
  [CREATE_APPROVE_PURCHASEORDER](context, formData) {
    console.log(formData, "test");
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.post("/api/purchaseorder/ApprovePurchaseOrder", formData)
        .then(result => {
          context.commit("CLEAR_ERROR");
          context.commit("ADD_PURCHASEORDER", result.data);
          resolve(result);
        })
        .catch(err => {
          context.commit("SET_ERROR", { result: err.message });
          reject(err);
        });
    });
  },
  // action update PurchaseOrder
  [UPDATE_PURCHASEORDER](context, datas) {
    context.commit("CLEAR_ERROR");
    // let id = context.state.purchaseorder.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.put("/api/purchaseorder/" + datas.Id, datas)
        .then(result => {
          context.dispatch(GET_STATE_PURCHASEORDERS, context.state.tablestate);
          resolve(result);
        })
        .catch(err => {
          reject(err);
          context.commit("SET_ERROR", { result: err.message });
        });
    });
  },
  // action delete PurchaseOrder
  [DELETE_PURCHASEORDER](context, slug) {
    context.commit("CLEAR_ERROR");
    return new Promise((resolve, reject) => {
      ApiService.delete("/api/purchaseorder/" + slug)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
          context.commit("SET_ERROR", { result: err.message });
        });
    });
  },

  GET_SUPLLIER_OF_PURCHASEORDER_BY_ID(context, slug) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/supplier", slug)
        .then(result => {
          console.log(result.data, "di supplier aeou");
          resolve(result);
          context.commit("SET_SUPPLIER_ID", result.data);
        })
        .catch(err => {
          reject(err);
          context.commit("SET_ERROR", { result: err.message });
        });
    });
  },
  // get'+Supllier+'Of'+PurchaseOrder
  GET_SUPLLIER_OF_PURCHASEORDER(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/supplier")
        .then(result => {
          this.state.supplier.suppliers = result.data;
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // get'+PaymentTerm+'Of'+PurchaseOrder
  GET_PAYMENTTERM_OF_PURCHASEORDER(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/paymentterm")
        .then(result => {
          this.state.paymentterm.paymentterms = result.data;
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // get'+Warehouse+'Of'+PurchaseOrder
  GET_WAREHOUSE_OF_PURCHASEORDER(context, params) {
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


  GET_PRODUCTUNIT_PURCHASEORDER(context, slug) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/productunit", slug)
        .then(result => {
          console.log(result, 'getproductunitpurcahse');
          // this.state.product.products = result.data;
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  GET_PRODUCTUNIT_OF_PURCHASEORDER(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/productunit/purchaseorder")
        .then(result => {
          console.log(result)
          // this.state.product.products = result.data;
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // get'+Warehouse+'Of'+PurchaseOrder
  GET_PRODUCT_OF_PURCHASEORDER(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/product/purchaseorder")
        .then(result => {
          this.state.product.products = result.data;
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // get'+Warehouse+'Of'+PurchaseOrder
  GET_TAX_OF_PURCHASEORDER(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("/api/tax")
        .then(result => {
          this.state.tax.taxs = result.data;
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
  SET_PURCHASEORDERS(state, { results }) {
    console.log(results);
    console.log(results.data.filter(item => item.Type === 0));
    
    state.purchaseorders = results.data.filter(item => item.Type === 0);
    state.paginations.pageLength = results.numberOfPages;
    state.paginations.totalItems = results.totalItems;
    state.paginations.rowsPerPage = results.rowsPerPage;
  },
  SET_SUPPLIER_ID(state, result) {
    console.log(result, "aosenuth");
    state.supplier_id = result;
  },
  SET_PURCHASEORDER(state, result) {
    console.log(result)
    // state.goodsreceipt = result
    state.purchaseorder = result
  },
  SET_COUNT_PURCHASEORDER(state, result) {
    state.purchaseorderInvoiceCount = result;
  },
  CLEAR_PURCHASEORDER(state) {
    state.purchaseorder = {};
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
  ADD_PURCHASEORDER(state, result) {
    state.purchaseorders.push(result);
  },
  RESETT_PURCHASEORDER(state) {
    console.log(this.state);
    this.state.purchaseorder = {
      purchaseorders: [],
      purchaseorder: {},
      error: {},
      tablestate: {
        SortColumnName: "",
        IsDescending: true,
        NumberOfRowSkip: 0,
        NumberOfPages: 10,
        RowPerPage: 10,
        SearchKeyword: "",
        SearchBy: "",
        KeywordBy: ""
      },
      paginations: {
        currentPage: 1,
        pageLength: 1,
        rowsPerPage: 10
      },
      supplier: [],
      supplier_id: {},
      paymentterm: [],
      warehouse: [],
      product: [],
      tax: [],
      modelState: {}
    };
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
