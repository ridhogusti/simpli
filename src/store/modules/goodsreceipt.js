/*eslint-disable*/
// store  PurchaseOrder or service  PurchaseOrder
import ApiService from '@/common/api.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import {
  GET_STATE_GOODSRECEIPTS,
  GET_GOODSRECEIPTS,
  GET_GOODSRECEIPT,
  CREATE_GOODSRECEIPT,
  CREATE_APPROVE_GOODSRECEIPT,
  UPDATE_GOODSRECEIPT,
  DELETE_GOODSRECEIPT,
  GET_GOODSRECEIPT_FROM_PO
} from '@/store/actions.type'

// initial state
const state = {
  goodsreceiptsArray: [],
  purchaseorderInvoiceCount: 0,
  error: {},
  GoodsReceipt: {},
  tablestate: {
    SortColumnName: '',
    IsDescending: true,
    NumberOfRowSkip: 0,
    NumberOfPages: NUMBER_OF_PAGES,
    RowPerPage: ROW_PER_PAGE,
    SearchKeyword: '',
    SearchBy: '',
    KeywordBy: ''
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
}
// getters
const getters = {

}
// actions
const actions = {
  // get sorting purchaseorder
  GET_SORTING_GOODSRECEIPTS(context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_GOODSRECEIPTS, context.state.tablestate)
  },
  // get pagination purchaseorder
  GET_PAGINATION_GOODSRECEIPT(context, page) {
    let tmpNumberOfRowSkip =
      (page - 1) * context.state.tablestate.NumberOfPages
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_GOODSRECEIPTS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_GOODSRECEIPTS({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_GOODSRECEIPTS)
  },
  GET_SHOW_GOODSRECEIPT({ commit, dispatch, state }, keyword) {
    state.tablestate.NumberOfPages = keyword
    state.tablestate.RowPerPage = keyword
    dispatch(GET_STATE_GOODSRECEIPTS)
  },

  GET_STATUS_GOODSRECEIPT({ commit, dispatch, state }, keyword) {
    if (keyword[0] == "All") {
      state.tablestate.SearchBy = ""
      state.tablestate.KeywordBy = ""
    } else {
      state.tablestate.SearchBy = keyword[1]
      state.tablestate.KeywordBy = ""
      for (let i = 0; i < keyword[0].length; i++) {
        state.tablestate.KeywordBy =
          state.tablestate.KeywordBy + " " + keyword[0][i]
      }
    }
    dispatch(GET_STATE_GOODSRECEIPTS)
  },

  RESET_GOODSRECEIPT(context) {
    context.commit("RESETT_GOODSRECEIPT")
  },

  GET_ALL_GOODSRECEIPT_COUNT(context) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query("/api/goodsreceipt/goodsreceiptcount")
        .then(result => {
          context.commit("SET_COUNT_GOODSRECEIPT", result.data)
        })
    })
  },
  // action get state PurchaseOrder
  [GET_STATE_GOODSRECEIPTS](context, params) {
    if (typeof params !== "undefined") {
      context.state.tablestate = params
    }
    context.commit("CLEAR_GOODSRECEIPT")
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query("/api/goodsreceipt/state", {
        params: context.state.tablestate,
        type: 0
      })
        .then(result => {
          context.commit("SET_GOODSRECEIPTS", { results: result.data })
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // action get PurchaseOrders
  [GET_GOODSRECEIPTS](context) {
    context.commit("CLEAR_ERROR")
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get("/api/goodsreceipt/list")
        .then(result => {
          context.commit("SET_GOODSRECEIPTS", { results: result.data })
          resolve(result)
        })
        .catch(err => {
          context.commit("SET_ERROR", { result: err.message })
          reject(err)
        })
    })
  },
  // action get  PurchaseOrder by ...
  [GET_GOODSRECEIPT](context, slug) {
      console.log("Masuk lohh");
      
    context.commit("CLEAR_ERROR")
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get("/api/goodsreceipt", slug)
        .then(result => {
          console.log(result, "result purcahse")
          resolve(result)
          context.commit("SET_GOODSRECEIPT", result.data)
        })
        .catch(err => {
          reject(err)
          context.commit("SET_ERROR", { result: err.message })
        })
    })
  },
  // actiion get Purchase Order Mapping to GoodsReceipt 
  [GET_GOODSRECEIPT_FROM_PO](context, slug) {
    console.log("Masuk lohh");
  context.commit("CLEAR_ERROR")
  return new Promise((resolve, reject) => {
    ApiService.setHeader()
    ApiService.get("/api/goodsreceipt/GetFromPurchaseOrder", slug)
      .then(result => {
        console.log(result, "result purcahse")
        resolve(result)
        context.commit("SET_GOODSRECEIPT", result.data)
      })
      .catch(err => {
        reject(err)
        context.commit("SET_ERROR", { result: err.message })
      })
  })
},
  // action create PurchaseOrder
  [CREATE_GOODSRECEIPT](context, formData) {
    console.log(formData, "di goodsreceipt")
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.post('/api/goodsreceipt', formData)
        .then(result => {
          context.commit('CLEAR_ERROR')
          context.commit("ADD_GOODSRECEIPT", result.data)
          resolve(result)
        })
        .catch(err => {
          context.commit("SET_ERROR", { result: err.message })
          reject(err)
          console.log(formData)
        })
    })
  },
  // action create approve PurchaseOrder
  [CREATE_APPROVE_GOODSRECEIPT](context, formData) {
    console.log(formData, "test")
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.post("/api/goodsreceipt/ApprovePurchaseOrder", formData)
        .then(result => {
          context.commit("CLEAR_ERROR")
          context.commit("ADD_GOODSRECEIPT", result.data)
          resolve(result)
        })
        .catch(err => {
          context.commit("SET_ERROR", { result: err.message })
          reject(err)
        })
    })
  },
  // action update PurchaseOrder
  [UPDATE_GOODSRECEIPT](context, datas) {
    context.commit("CLEAR_ERROR")
    // let id = context.state.purchaseorder.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put("/api/goodsreceipt/" + datas.Id + "/" +datas.saveAndApproves, datas)
        .then(result => {
          context.dispatch(GET_STATE_GOODSRECEIPTS, context.state.tablestate)
          resolve(result)
          console.log(result);
          
        })
        .catch(err => {
          reject(err)
          context.commit("SET_ERROR", { result: err.message })
        })
    })
  },
  // action delete PurchaseOrder
  [DELETE_GOODSRECEIPT](context, slug) {
    context.commit("CLEAR_ERROR")
    return new Promise((resolve, reject) => {
      ApiService.delete("/api/goodsreceipt/" + slug)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
          context.commit("SET_ERROR", { result: err.message })
        })
    })
  },

  GET_SUPLLIER_OF_GOODSRECEIPT_BY_ID(context, slug) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get("/api/supplier", slug)
        .then(result => {
          console.log(result.data, "di supplier aeou")
          resolve(result)
          context.commit("SET_SUPPLIER_ID", result.data)
        })
        .catch(err => {
          reject(err)
          context.commit("SET_ERROR", { result: err.message })
        })
    })
  },
  // get'+Supllier+'Of'+PurchaseOrder
  GET_SUPLLIER_OF_GOODSRECEIPT(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get("/api/supplier")
        .then(result => {
          this.state.supplier.suppliers = result.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // get'+PaymentTerm+'Of'+PurchaseOrder
  GET_PAYMENTTERM_OF_GOODSRECEIPT(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get("/api/paymentterm")
        .then(result => {
          this.state.paymentterm.paymentterms = result.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // get'+Warehouse+'Of'+PurchaseOrder
  GET_WAREHOUSE_OF_GOODSRECEIPT(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get("/api/warehouse")
        .then(result => {
          this.state.warehouse.warehouses = result.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },


  GET_PRODUCTUNIT_GOODSRECEIPT(context, slug) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get("/api/productunit", slug)
        .then(result => {
          console.log(result, 'getproductunitpurcahse')
          // this.state.product.products = result.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  GET_PRODUCTUNIT_OF_GOODSRECEIPT(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get("/api/productunit/purchaseorder")
        .then(result => {
          // this.state.product.products = result.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // get'+Warehouse+'Of'+PurchaseOrder
  GET_PRODUCT_OF_GOODSRECEIPT(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get("/api/product/purchaseorder")
        .then(result => {
          this.state.product.products = result.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // get'+Warehouse+'Of'+PurchaseOrder
  GET_TAX_OF_GOODSRECEIPT(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get("/api/tax")
        .then(result => {
          this.state.tax.taxs = result.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
// mutations
const mutations = {
  SET_GOODSRECEIPTS(state, { results }) {
    state.goodsreceiptsArray = results.data
    state.paginations.pageLength = results.numberOfPages
    state.paginations.totalItems = results.totalItems
    state.paginations.rowsPerPage = results.rowsPerPage
    console.log(state.goodsreceiptsArray)
    console.log(results.data);
    
    
  },
  SET_SUPPLIER_ID(state, result) {
    console.log(result, "aosenuth")
    state.supplier_id = result
  },
  SET_GOODSRECEIPT(state, result) {
    state.GoodsReceipt = result
    console.log(state.GoodsReceipt);
    
  },
  SET_COUNT_GOODSRECEIPT(state, result) {
    state.purchaseorderInvoiceCount = result
  },
  CLEAR_GOODSRECEIPT(state) {
    state.purchaseorder = {}
  },
  UPDATE_PAGINATION(state, result) {
    let tmpPaging = {
      SortColumnName: result.sortBy,
      IsDescending: result.descending,
      NumberOfRowSkip: (result.page - 1) * NUMBER_OF_PAGES,
      NumberOfPages: NUMBER_OF_PAGES,
      RowPerPage: ROW_PER_PAGE
    }
    state.pagination = tmpPaging
  },
  SET_ERROR: (state, { result }) => {
    state.error = {
      status: true,
      type: "error",
      message: result
    }
  },
  CLEAR_ERROR: state => {
    state.error = {
      status: false,
      type: "error",
      message: ""
    }
  },
  ADD_GOODSRECEIPT(state, result) {
    state.goodsreceiptsArray.push(result)
  },
  RESETT_GOODSRECEIPT(state) {
    console.log(this.state)
    this.state.purchaseorder = {
      goodsreceiptsArray: [],
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
    }
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
