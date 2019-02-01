// store   StockAdjustment or service   StockAdjustment
import ApiService from '@/common/api.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import {
  GET_STATE_STOCKADJUSTMENTS,
  GET_STOCKADJUSTMENTS,
  GET_STOCKADJUSTMENT,
  CREATE_STOCKADJUSTMENT,
  CREATE_APPROVE_STOCKADJUSTMENT,
  UPDATE_STOCKADJUSTMENT,
  DELETE_STOCKADJUSTMENT,
  UPDATE_APPROVE_STOCKADJUSTMENT,
  CANCEL_STOCKADJUSTMENT
} from '@/store/actions.type'

// initial state
const state = {
  stockadjustments: [],
  stockadjustmentInvoiceCount: 0,
  stockadjustment: {},
  error: {},
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
  getStockAdjustments: state => {},
  getStockAdjustmentError: state => {
    return state.error
  },
  getSupllierOfStockAdjustment: state => {
    return state.supllier
  },
  getPaymentTermOfStockAdjustment: state => {
    return state.paymentterm
  },
  getWarehouseOfStockAdjustment: state => {
    return state.warehouse
  }
}
// actions
const actions = {
  // get sorting stockadjustment
  GET_SORTING_STOCKADJUSTMENTS (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_STOCKADJUSTMENTS, context.state.tablestate)
  },
  // get pagination stockadjustment
  GET_PAGINATION_STOCKADJUSTMENT (context, page) {
    let tmpNumberOfRowSkip =
      (page - 1) * context.state.tablestate.NumberOfPages
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_STOCKADJUSTMENTS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_STOCKADJUSTMENTS ({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_STOCKADJUSTMENTS)
  },
  GET_SHOW_STOCKADJUSTMENT ({ commit, dispatch, state }, keyword) {
    state.tablestate.NumberOfPages = keyword
    state.tablestate.RowPerPage = keyword
    state.tablestate.NumberOfRowSkip = 0
    state.paginations.currentPage = 1
    dispatch(GET_STATE_STOCKADJUSTMENTS)
  },

  GET_STATUS_STOCKADJUSTMENT ({ commit, dispatch, state }, keyword) {
    if (keyword[0] === 'All') {
      state.tablestate.SearchBy = ''
      state.tablestate.KeywordBy = ''
    } else {
      state.tablestate.SearchBy = keyword[1]
      state.tablestate.KeywordBy = ''
      for (let i = 0; i < keyword[0].length; i++) {
        state.tablestate.KeywordBy =
          state.tablestate.KeywordBy + ' ' + keyword[0][i]
      }
    }
    dispatch(GET_STATE_STOCKADJUSTMENTS)
  },

  RESET_STOCKADJUSTMENT (context) {
    context.commit('RESETT_STOCKADJUSTMENT')
  },

  GET_ALL_STOCKADJUSTMENT_COUNT (context) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/stockadjustment/stockadjustmentcount')
        .then(result => {
          context.commit('SET_COUNT_STOCKADJUSTMENT', result.data)
        })
    })
  },
  // action get state  StockAdjustment
  [GET_STATE_STOCKADJUSTMENTS] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    context.commit('CLEAR_STOCKADJUSTMENT')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/stockadjustment/state', {
        params: context.state.tablestate,
        type: 0
      })
        .then(result => {
          context.commit('SET_STOCKADJUSTMENTS', { results: result.data })
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // action get  StockAdjustments
  [GET_STOCKADJUSTMENTS] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/stockadjustment/list')
        .then(result => {
          context.commit('SET_STOCKADJUSTMENTS', { results: result.data })
          resolve(result)
        })
        .catch(err => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action get   StockAdjustment by ...
  [GET_STOCKADJUSTMENT] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/stockadjustment', slug)
        .then(result => {
          resolve(result)
          context.commit('SET_STOCKADJUSTMENT', result.data)
        })
        .catch(err => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action create  StockAdjustment
  [CREATE_STOCKADJUSTMENT] (context, formData) {
    console.log(formData, 'di stockadjustment')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.post('/api/stockadjustment', formData)
        .then(result => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_STOCKADJUSTMENT', result.data)
          resolve(result)
        })
        .catch(err => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action create approve  StockAdjustment
  [CREATE_APPROVE_STOCKADJUSTMENT] (context, formData) {
    console.log(formData, 'test')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.post('/api/stockadjustment/SaveAndApproveStockAdjustment', formData)
        .then(result => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_STOCKADJUSTMENT', result.data)
          resolve(result)
        })
        .catch(err => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action update  StockAdjustment
  [UPDATE_STOCKADJUSTMENT] (context, datas) {
    context.commit('CLEAR_ERROR')
    // let id = context.state.stockadjustment.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/stockadjustment/' + datas.Id, datas)
        .then(result => {
          context.dispatch(GET_STATE_STOCKADJUSTMENTS, context.state.tablestate)
          resolve(result)
        })
        .catch(err => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  [UPDATE_APPROVE_STOCKADJUSTMENT] (context, formData) {
    console.log(formData, 'test')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.post('/api/stockadjustment/UpdateAndApproveStockAdjustment/' + formData.Id)
        .then(result => {
          context.dispatch(GET_STATE_STOCKADJUSTMENTS, context.state.tablestate)
          resolve(result)
        })
        .catch(err => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  [CANCEL_STOCKADJUSTMENT] (context, formData) {
    console.log(formData, 'test')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.post('/api/stockadjustment/cancel/' + formData.Id)
        .then(result => {
          context.dispatch(GET_STATE_STOCKADJUSTMENTS, context.state.tablestate)
          resolve(result)
        })
        .catch(err => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action delete  StockAdjustment
  [DELETE_STOCKADJUSTMENT] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/stockadjustment/' + slug)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },

  GET_SUPLLIER_OF_STOCKADJUSTMENT_BY_ID (context, slug) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/supplier', slug)
        .then(result => {
          console.log(result.data, 'di supplier aeou')
          resolve(result)
          context.commit('SET_SUPPLIER_ID', result.data)
        })
        .catch(err => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // get'+Supllier+'Of'+ StockAdjustment
  GET_SUPLLIER_OF_STOCKADJUSTMENT (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/supplier')
        .then(result => {
          this.state.supplier.suppliers = result.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // get'+PaymentTerm+'Of'+ StockAdjustment
  GET_PAYMENTTERM_OF_STOCKADJUSTMENT (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/paymentterm')
        .then(result => {
          this.state.paymentterm.paymentterms = result.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // get'+Warehouse+'Of'+ StockAdjustment
  GET_WAREHOUSE_OF_STOCKADJUSTMENT (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/warehouse')
        .then(result => {
          console.log(result.data, 'test')
          this.state.warehouse.warehouses = result.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  GET_PRODUCTUNIT_STOCKADJUSTMENT (context, slug) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/productunit', slug)
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

  GET_PRODUCTBYWAREHOUS_OF_STOCKADJUSTMENT (context, slug) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/stockadjustment/getbywarehouseid', slug)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  GET_PRODUCTUNIT_OF_STOCKADJUSTMENT (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/productunit/stockadjustment')
        .then(result => {
          console.log(result)
          // this.state.product.products = result.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // get'+Warehouse+'Of'+ StockAdjustment
  GET_PRODUCT_OF_STOCKADJUSTMENT (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/product/stockadjustment')
        .then(result => {
          this.state.product.products = result.data
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // get'+Warehouse+'Of'+ StockAdjustment
  GET_TAX_OF_STOCKADJUSTMENT (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/tax')
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
  SET_STOCKADJUSTMENTS (state, { results }) {
    state.stockadjustments = results.data.filter(item => item.Type === 0)
    state.paginations.pageLength = results.numberOfPages
    state.paginations.totalItems = results.totalItems
    state.paginations.rowsPerPage = results.rowsPerPage
  },
  SET_SUPPLIER_ID (state, result) {
    console.log(result, 'aosenuth')
    state.supplier_id = result
  },
  SET_STOCKADJUSTMENT (state, result) {
    console.log(result)
    // state.goodsreceipt = result
    state.stockadjustment = result
  },
  SET_COUNT_STOCKADJUSTMENT (state, result) {
    state.stockadjustmentInvoiceCount = result
  },
  CLEAR_STOCKADJUSTMENT (state) {
    state.stockadjustment = {}
  },
  UPDATE_PAGINATION (state, result) {
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
      type: 'error',
      message: result
    }
  },
  CLEAR_ERROR: state => {
    state.error = {
      status: false,
      type: 'error',
      message: ''
    }
  },
  ADD_STOCKADJUSTMENT (state, result) {
    state.stockadjustments.push(result)
  },
  RESETT_STOCKADJUSTMENT (state) {
    console.log(this.state)
    this.state.stockadjustment = {
      stockadjustments: [],
      stockadjustment: {},
      error: {},
      tablestate: {
        SortColumnName: '',
        IsDescending: true,
        NumberOfRowSkip: 0,
        NumberOfPages: 10,
        RowPerPage: 10,
        SearchKeyword: '',
        SearchBy: '',
        KeywordBy: ''
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
