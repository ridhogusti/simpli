// store  PurchaseItem or service  PurchaseItem
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_PURCHASEITEMS, GET_PURCHASEITEMS, GET_PURCHASEITEM, CREATE_PURCHASEITEM, UPDATE_PURCHASEITEM, DELETE_PURCHASEITEM} from '@/store/actions.type'

// initial state
const state = {
  purchaseitems: [],
  purchaseitem: {},
  error: {},
  tablestate: {
    SortColumnName: '',
    IsDescending: false,
    NumberOfRowSkip: 0,
    NumberOfPages: NUMBER_OF_PAGES,
    RowPerPage: ROW_PER_PAGE,
    SearchKeyword: ''
  },
  paginations: {
    currentPage: 1,
    pageLength: 1,
    rowsPerPage: ROW_PER_PAGE
  },
  purchase: [],
  product: []
}
// getters
const getters = {
  getPurchaseItems: (state) => {
  },
  getPurchaseItemError: (state) => {
    return state.error
  },
  getPurchaseOfPurchaseItem: (state) => {
    return state.purchase
  },
  getProductOfPurchaseItem: (state) => {
    return state.product
  }
}
// actions
const actions = {

          // get sorting purchaseitem
  GET_SORTING_PURCHASEITEMS (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_PURCHASEITEMS, context.state.tablestate)
  },
          // get pagination purchaseitem
  GET_PAGINATION_PURCHASEITEM (context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_PURCHASEITEMS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
          // search table state
  GET_SEARCH_PURCHASEITEMS ({commit, dispatch, state}, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_PURCHASEITEMS)
  },
          // action get state PurchaseItem
  [GET_STATE_PURCHASEITEMS] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/purchaseitem/state', {
        params: context.state.tablestate
      })
              .then((result) => {
                context.commit('SET_PURCHASEITEMS', {results: result.data})
                resolve(result)
              }).catch((err) => {
                reject(err)
              })
    })
  },
          // action get PurchaseItems
  [GET_PURCHASEITEMS] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/purchaseitem/list')
              .then((result) => {
                context.commit('SET_PURCHASEITEMS', {results: result.data})
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
    })
  },
          // action get  PurchaseItem by ...
  [GET_PURCHASEITEM] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/purchaseitem', slug)
              .then((result) => {
                resolve(result)
                context.commit('SET_PURCHASEITEM', result.data)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
    })
  },
          // action create PurchaseItem
  [CREATE_PURCHASEITEM] (context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/purchaseitem', formData)
              .then((result) => {
                context.commit('CLEAR_ERROR')
                context.commit('ADD_PURCHASEITEM', result.data)
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
    })
  },
          // action update PurchaseItem
  [UPDATE_PURCHASEITEM] (context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.purchaseitem.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/purchaseitem/' + id, datas)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
    })
  },
          // action delete PurchaseItem
  [DELETE_PURCHASEITEM] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/purchaseitem/' + slug)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
    })
  },

              // get'+Purchase+'Of'+PurchaseItem
  GET_PURCHASE_OF_PURCHASEITEM (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/purchase')
                    .then((result) => {
                      this.state.purchase.purchases = result.data
                      resolve(result)
                    }).catch((err) => {
                      reject(err)
                    })
    })
  },

              // get'+Product+'Of'+PurchaseItem
  GET_PRODUCT_OF_PURCHASEITEM (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/product')
                    .then((result) => {
                      this.state.product.products = result.data
                      resolve(result)
                    }).catch((err) => {
                      reject(err)
                    })
    })
  }

}
// mutations
const mutations = {
  SET_PURCHASEITEMS (state, {results}) {
    state.purchaseitems = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_PURCHASEITEM (state, result) {
    state.purchaseitem = result
  },
  CLEAR_PURCHASEITEM (state) {
    state.purchaseitem = {}
  },
  UPDATE_PAGINATION (state, result) {
    let tmpPaging = {
      SortColumnName: result.sortBy,
      IsDescending: result.descending,
      NumberOfRowSkip: ((result.page - 1) * NUMBER_OF_PAGES),
      NumberOfPages: NUMBER_OF_PAGES,
      RowPerPage: ROW_PER_PAGE
    }
    state.pagination = tmpPaging
  },
  SET_ERROR: (state, {result}) => {
    state.error = {
      status: true, type: 'error', message: result
    }
  },
  CLEAR_ERROR: (state) => {
    state.error = {
      status: false, type: 'error', message: ''
    }
  },
  ADD_PURCHASEITEM (state, result) {
    state.purchaseitems.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
