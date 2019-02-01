/*eslint-disable*/
// store  PaymentMethod or service  PaymentMethod
import ApiService from '@/common/api.service'
// import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import {
  GET_STATE_PAYMENTMETHODS,
  GET_PAYMENTMETHODS,
  GET_PAYMENTMETHOD,
  CREATE_PAYMENTMETHOD,
  UPDATE_PAYMENTMETHOD,
  DELETE_PAYMENTMETHOD
} from '@/store/actions.type'

// initial state
const state = {
  dialogState: false,
  paymentmethods: [],
  paymentmethod: {},
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
  status: [
    {Id: 1, Name: 'Active'},
    {Id: 0, Name: 'In-Active'}
  ]
}
// getters
const getters = {
  getPaymentMethods: state => {},
  getPaymentMethodError: state => {
    return state.error
  },
  getStatusOfPaymentMethod (state) {
    return state.status
  }
}
// actions
const actions = {
  // get sorting paymentmethod
  GET_SORTING_PAYMENTMETHODS (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_PAYMENTMETHODS, context.state.tablestate)
  },
  // get pagination paymentmethod
  GET_PAGINATION_PAYMENTMETHOD (context, page) {
    let tmpNumberOfRowSkip =
      (page - 1) * context.state.tablestate.NumberOfPages
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_PAYMENTMETHODS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_PAYMENTMETHODS ({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_PAYMENTMETHODS)
  },
  // action get state PaymentMethod
  [GET_STATE_PAYMENTMETHODS] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/paymentmethod/state', {
        params: context.state.tablestate
      })
        .then(result => {
          context.commit('SET_PAYMENTMETHODS', { results: result.data })
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // action get PaymentMethods
  [GET_PAYMENTMETHODS] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/paymentmethod/list')
        .then(result => {
          context.commit('SET_PAYMENTMETHODS', { results: result.data })
          resolve(result)
        })
        .catch(err => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action get  PaymentMethod by ...
  [GET_PAYMENTMETHOD] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/paymentmethod', slug)
        .then(result => {
          resolve(result)
          context.commit('SET_PAYMENTMETHOD', result.data)
        })
        .catch(err => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action create PaymentMethod
  [CREATE_PAYMENTMETHOD] (context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.post('/api/paymentmethod', formData)
        .then(result => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_PAYMENTMETHOD', result.data)
          resolve(result)
        })
        .catch(err => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action update PaymentMethod
  [UPDATE_PAYMENTMETHOD] (context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.paymentmethod.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/paymentmethod/' + id, datas)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action delete PaymentMethod
  [DELETE_PAYMENTMETHOD] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/paymentmethod/' + slug)
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
  SET_PAYMENTMETHODS (state, { results }) {
    state.paymentmethods = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_PAYMENTMETHOD (state, result) {
    state.paymentmethod = result
  },
  CLEAR_PAYMENTMETHOD (state) {
    state.paymentmethod = {}
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
  ADD_PAYMENTMETHOD (state, result) {
    state.paymentmethods.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
