// store  PriceList or service  PriceList
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import {
  GET_STATE_PRICELISTS,
  GET_PRICELISTS,
  GET_PRICELIST,
  CREATE_PRICELIST,
  CREATE_APPROVE_PRICELIST,
  UPDATE_PRICELIST,
  DELETE_PRICELIST
} from '@/store/actions.type'

// initial state
const state = {
  pricelists: [],
  pricelist: {},
  error: {},
  tablestate: {
    SortColumnName: '',
    IsDescending: true,
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
  getPriceLists: state => {},
  getPriceListError: state => {
    return state.error
  },
  getSupllierOfPriceList: state => {
    return state.supllier
  },
  getPaymentTermOfPriceList: state => {
    return state.paymentterm
  },
  getWarehouseOfPriceList: state => {
    return state.warehouse
  }
}
// actions
const actions = {
  // get sorting pricelist
  GET_SORTING_PRICELISTS (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_PRICELISTS, context.state.tablestate)
  },
  // get pagination pricelist
  GET_PAGINATION_PRICELIST (context, page) {
    let tmpNumberOfRowSkip =
      (page - 1) * context.state.tablestate.NumberOfPages
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_PRICELISTS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_PRICELISTS ({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_PRICELISTS)
  },
  // action get state PriceList
  [GET_STATE_PRICELISTS] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    context.commit('CLEAR_PRICELIST')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/pricelist/state', {
        params: context.state.tablestate
      })
        .then(result => {
          context.commit('SET_PRICELISTS', { results: result.data })
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // action get PriceLists
  [GET_PRICELISTS] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/pricelist/list')
        .then(result => {
          console.log('test', result)
          context.commit('SET_PRICELISTS', { results: result.data })
          resolve(result)
        })
        .catch(err => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action get  PriceList by ...
  [GET_PRICELIST] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/pricelist', slug)
        .then(result => {
          console.log(result, 'result purcahse')
          resolve(result)
          context.commit('SET_PRICELIST', result.data)
        })
        .catch(err => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action create PriceList
  [CREATE_PRICELIST] (context, formData) {
    console.log(formData, 'di pricelist')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.post('/api/pricelist', formData)
        .then(result => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_PRICELIST', result.data)
          resolve(result)
        })
        .catch(err => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action update PriceList
  [UPDATE_PRICELIST] (context, datas) {
    context.commit('CLEAR_ERROR')
    // let id = context.state.pricelist.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/pricelist/' + datas.Id, datas)
        .then(result => {
          context.dispatch(GET_STATE_PRICELISTS, context.state.tablestate)
          resolve(result)
        })
        .catch(err => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action delete PriceList
  [DELETE_PRICELIST] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/pricelist/' + slug)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  }

}
// mutations
const mutations = {
  SET_PRICELISTS (state, { results }) {
    state.pricelists = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_SUPPLIER_ID (state, result) {
    console.log(result, 'aosenuth')
    state.supplier_id = result
  },
  SET_PRICELIST (state, result) {
    state.pricelist = result
  },
  CLEAR_PRICELIST (state) {
    state.pricelist = {}
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
  ADD_PRICELIST (state, result) {
    state.pricelists.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
