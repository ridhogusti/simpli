// store   StockAdjustment or service   StockAdjustment
import ApiService from '@/common/api.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import {
  GET_STATE_STOCKTRANSFERS,
  GET_STOCKTRANSFERS,
  GET_STOCKTRANSFER,
  CREATE_STOCKTRANSFER,
  CREATE_APPROVE_STOCKTRANSFER,
  UPDATE_STOCKTRANSFER,
  DELETE_STOCKTRANSFER
} from '@/store/actions.type'

// initial state
const state = {
  stocktransfers: [],
  stocktransfersInvoiceCount: 0,
  stocktransfer: {},
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
  getStockTransfers: state => {},
  getStockTransferError: state => {
    return state.error
  },
  getSupllierOfStockTransfer: state => {
    return state.supllier
  },
  getPaymentTermOfStockTransfer: state => {
    return state.paymentterm
  },
  getWarehouseOfStockTransfer: state => {
    return state.warehouse
  }
}
// actions
const actions = {
  // get sorting stockadjustment
  GET_SORTING_STOCKTRANSFERS (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_STOCKTRANSFERS, context.state.tablestate)
  },
  // get pagination stockadjustment
  GET_PAGINATION_STOCKTRANSFER (context, page) {
    let tmpNumberOfRowSkip =
      (page - 1) * context.state.tablestate.NumberOfPages
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_STOCKTRANSFERS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_STOCKTRANSFERS ({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_STOCKTRANSFERS)
  },
  GET_SHOW_STOCKTRANSFER ({ commit, dispatch, state }, keyword) {
    state.tablestate.NumberOfPages = keyword
    state.tablestate.RowPerPage = keyword
    state.tablestate.NumberOfRowSkip = 0
    state.paginations.currentPage = 1
    dispatch(GET_STATE_STOCKTRANSFERS)
  },

  GET_STATUS_STOCKTRANSFER ({ commit, dispatch, state }, keyword) {
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
    dispatch(GET_STATE_STOCKTRANSFERS)
  },

  RESET_STOCKTRANSFER (context) {
    context.commit('RESETT_STOCKTRANSFER')
  },

  GET_ALL_STOCKTRANSFER_COUNT (context) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/stocktransfer/stocktransfercount')
        .then(result => {
          context.commit('SET_COUNT_STOCKTRANSFER', result.data)
        })
    })
  },
  // action get state  StockAdjustment
  [GET_STATE_STOCKTRANSFERS] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    console.log(context.state.tablestate + 'state table state testing')
    
    context.commit('CLEAR_STOCKTRANSFER')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/stocktransfer/state', {
        params: context.state.tablestate,
        type: 0
      })
        .then(result => {
          console.log(result.data)
          context.commit('SET_STOCKTRANSFERS', { results: result.data })
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // action get  StockAdjustments
  [GET_STOCKTRANSFERS] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/stocktransfer/list')
        .then(result => {
          context.commit('SET_STOCKTRANSFERS', { results: result.data })
          resolve(result)
        })
        .catch(err => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action get   StockAdjustment by ...
  [GET_STOCKTRANSFER] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/stocktransfer/GetStockTransferById', slug)
        .then(result => {
          console.log(result.data, 'result purcahse order kak yani')
          resolve(result)
          context.commit('SET_STOCKTRANSFER', result.data)
        })
        .catch(err => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action create  StockAdjustment
  [CREATE_STOCKTRANSFER] (context, formData) {
    console.log(formData, 'di stocktransfer')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.post('/api/stocktransfer/PostStockTransfer', formData)
        .then(result => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_STOCKTRANSFER', result.data)
          resolve(result)
        })
        .catch(err => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action create approve  StockAdjustment
  [CREATE_APPROVE_STOCKTRANSFER] (context, formData) {
    console.log(formData, 'test')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.post('/api/stocktransfer/SaveAndApproveStockTransfer', formData)
        .then(result => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_STOCKTRANSFER', result.data)
          resolve(result)
        })
        .catch(err => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action update  StockAdjustment
  [UPDATE_STOCKTRANSFER] (context, datas) {
    context.commit('CLEAR_ERROR')
    // let id = context.state.stockadjustment.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/stocktransfer/' + datas.Id, datas)
        .then(result => {
          context.dispatch(GET_STATE_STOCKTRANSFERS, context.state.tablestate)
          resolve(result)
        })
        .catch(err => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action delete  StockAdjustment
  [DELETE_STOCKTRANSFER] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/stocktransfer/' + slug)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },

  GET_SUPLLIER_OF_STOCKTRANSFER_BY_ID (context, slug) {
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
  GET_SUPLLIER_OF_STOCKTRANSFER (context, params) {
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
  GET_PAYMENTTERM_OF_STOCKTRANSFER (context, params) {
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
  GET_WAREHOUSE_OF_STOCKTRANSFER (context, params) {
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

  GET_PRODUCTUNIT_STOCKTRANSFER (context, slug) {
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

  // GET_PRODUCTBYWAREHOUS_OF_STOCKTRANSFER (context, slug) {
  //   return new Promise((resolve, reject) => {
  //     ApiService.setHeader()
  //     ApiService.get('/api/stocktransfer/getbywarehouseid', slug)
  //       .then(result => {
  //         resolve(result)
  //       })
  //       .catch(err => {
  //         reject(err)
  //       })
  //   })
  // },

  GET_PRODUCTUNIT_OF_STOCKTRANSFER (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/productunit/stocktransfer')
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
  GET_PRODUCT_OF_STOCKTRANSFER (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/product/stocktransfer')
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
  GET_TAX_OF_STOCKTRANSFER (context, params) {
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
  SET_STOCKTRANSFERS (state, { results }) {
    console.log(results)

    state.stocktransfers = results.data
    console.log(state.stocktransfers)
    
    state.paginations.pageLength = results.numberOfPages
    state.paginations.totalItems = results.totalItems
    state.paginations.rowsPerPage = results.rowsPerPage
  },
  SET_SUPPLIER_ID (state, result) {
    console.log(result, 'aosenuth')
    state.supplier_id = result
  },
  SET_STOCKTRANSFER (state, result) {
    console.log(result)
    // state.goodsreceipt = result
    state.stocktransfer = result
  },
  SET_COUNT_STOCKTRANSFER (state, result) {
    state.stocktransfersInvoiceCount = result
  },
  CLEAR_STOCKTRANSFER (state) {
    state.stocktransfer = {}
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
  ADD_STOCKTRANSFER (state, result) {
    state.stocktransfers.push(result)
  },
  RESETT_STOCKTRANSFER (state) {
    console.log(this.state)
    this.state.stocktransfer = {
      stocktransfers: [],
      stocktransfer: {},
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
