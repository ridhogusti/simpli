// store  Purchase or service  Purchase
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import {
  GET_STATE_PURCHASES_RETUR,
  GET_PURCHASES_RETUR,
  GET_PURCHASE_RETUR,
  CREATE_PURCHASE_RETUR,
  CREATE_APPROVE_PURCHASE_RETUR,
  UPDATE_PURCHASE_RETUR,
  DELETE_PURCHASE_RETUR
} from '@/store/actions.type'

// initial state
const state = {
  purchasereturs: [],
  purchaseretur: {},
  error: {},
  tablestate: {
    SortColumnName: '',
    IsDescending: true,
    NumberOfRowSkip: 0,
    NumberOfPages: NUMBER_OF_PAGES,
    RowPerPage: ROW_PER_PAGE,
    SearchKeyword: '',
    Type: 1
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
  getPurchasesRetur: state => {},
  getPurchasereturError: state => {
    return state.error
  },
  getSupllierOfPurchaseretur: state => {
    return state.supllier
  },
  getPaymentTermOfPurchaseretur: state => {
    return state.paymentterm
  },
  getWarehouseOfPurchaseretur: state => {
    return state.warehouse
  }
}
// actions
const actions = {
  // get sorting purchase
  GET_SORTING_PURCHASES_RETUR (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_PURCHASES_RETUR, context.state.tablestate)
  },
  // get pagination purchase
  GET_PAGINATION_PURCHASE_RETUR (context, page) {
    let tmpNumberOfRowSkip =
      (page - 1) * context.state.tablestate.NumberOfPages
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_PURCHASES_RETUR, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_PURCHASES ({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_PURCHASES_RETUR)
  },
  // action get state Purchase
  [GET_STATE_PURCHASES_RETUR] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    context.commit('CLEAR_PURCHASE_RETUR')
    console.log('retur');
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/purchase/state', {
        params: context.state.tablestate
      })
        .then(result => {
          context.commit('SET_PURCHASES_RETUR', { results: result.data })
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // action get Purchases
  [GET_PURCHASES_RETUR] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/purchase/list')
        .then(result => {
          context.commit('SET_PURCHASES_RETUR', { results: result.data })
          resolve(result)
        })
        .catch(err => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action get  Purchase by ...
  [GET_PURCHASE_RETUR] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/purchase', slug)
        .then(result => {
          console.log(result, 'result purcahse')
          resolve(result)
          context.commit('SET_PURCHASE_RETUR', result.data)
        })
        .catch(err => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action create Purchase
  [CREATE_PURCHASE_RETUR] (context, formData) {
    console.log(formData, 'di purchase')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.post('/api/purchase/ApprovePurchase', formData)
        .then(result => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_PURCHASE_RETUR', result.data)
          resolve(result)
        })
        .catch(err => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },

  // action update Purchase
  [UPDATE_PURCHASE_RETUR] (context, datas) {
    context.commit('CLEAR_ERROR')
    // console.log(id, 'testlagi')
    // let id = context.state.purchaseretur.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/purchase/' + datas.Id, datas)
        .then(result => {
          console.log(result, 'ini result nya')
          context.dispatch(GET_STATE_PURCHASES_RETUR, context.state.tablestate)
          resolve(result)
        })
        .catch(err => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },

  GET_SUPLLIER_OF_PURCHASE_BY_ID (context, slug) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/supplier', slug)
      .then((result) => {
        console.log(result.data, 'di supplier aeou')
        resolve(result)
        context.commit('SET_SUPPLIER_ID', result.data)
      }).catch((err) => {
        reject(err)
        context.commit('SET_ERROR', { result: err.message })
      })
    })
  },
  // get'+Supllier+'Of'+Purchase
  // GET_SUPLLIER_OF_PURCHASE (context, params) {
  //   return new Promise((resolve, reject) => {
  //     ApiService.setHeader()
  //     ApiService.get('/api/supplier')
  //       .then(result => {
  //         this.state.supplier.suppliers = result.data
  //         resolve(result)
  //       })
  //       .catch(err => {
  //         reject(err)
  //       })
  //   })
  // },

  // get'+PaymentTerm+'Of'+Purchase
  // GET_PAYMENTTERM_OF_PURCHASE (context, params) {
  //   return new Promise((resolve, reject) => {
  //     ApiService.setHeader()
  //     ApiService.get('/api/paymentterm')
  //       .then(result => {
  //         this.state.paymentterm.paymentterms = result.data
  //         resolve(result)
  //       })
  //       .catch(err => {
  //         reject(err)
  //       })
  //   })
  // },

  // get'+Warehouse+'Of'+Purchase
  // GET_WAREHOUSE_OF_PURCHASE (context, params) {
  //   return new Promise((resolve, reject) => {
  //     ApiService.setHeader()
  //     ApiService.get('/api/warehouse')
  //       .then(result => {
  //         this.state.warehouse.warehouses = result.data
  //         resolve(result)
  //       })
  //       .catch(err => {
  //         reject(err)
  //       })
  //   })
  // },

  // get'+Warehouse+'Of'+Purchase
  // GET_PRODUCT_OF_PURCHASE (context, params) {
  //   return new Promise((resolve, reject) => {
  //     ApiService.setHeader()
  //     ApiService.get('/api/product/purchase')
  //       .then(result => {
  //         this.state.product.products = result.data
  //         resolve(result)
  //       })
  //       .catch(err => {
  //         reject(err)
  //       })
  //   })
  // },
  // get'+Warehouse+'Of'+Purchase
  // GET_TAX_OF_PURCHASE (context, params) {
  //   return new Promise((resolve, reject) => {
  //     ApiService.setHeader()
  //     ApiService.get('/api/tax')
  //       .then(result => {
  //         this.state.tax.taxs = result.data
  //         resolve(result)
  //       })
  //       .catch(err => {
  //         reject(err)
  //       })
  //   })
  // }
}
// mutations
const mutations = {
  SET_PURCHASES_RETUR (state, { results }) {
    state.purchasereturs = results.data.filter(item => item.Type === 1)
    state.paginations.pageLength = results.numberOfPages
  },
  SET_SUPPLIER_ID (state, result) {
    state.supplier_id = result
  },
  SET_PURCHASE_RETUR (state, result) {
    state.purchaseretur = result
  },
  CLEAR_PURCHASE_RETUR (state) {
    state.purchaseretur = {}
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
  ADD_PURCHASE_RETUR (state, result) {
    state.purchasereturs.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
