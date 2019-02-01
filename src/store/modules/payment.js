
/* eslint-disable */
// store  Payment or service  Payment
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_PAYMENTS, GET_PAYMENTS, GET_PAYMENT, CREATE_PAYMENT, UPDATE_PAYMENT, DELETE_PAYMENT } from '@/store/actions.type'

// initial state
const state = {
  dialogState:false,
  payments: [],
  payment: {},
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
  paymentmethod: [],
  order: []
}
// getters
const getters = {
  getPayments: (state) => {
  },
  getPaymentError: (state) => {
    return state.error
  },
  getPaymentMethodOfPayment: (state) => {
    return state.paymentmethod
  },
getOrderOfPayment: (state) => {
    return state.order
  }
}
// actions
const actions = {

  // get sorting payment
  GET_SORTING_PAYMENTS (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_PAYMENTS, context.state.tablestate)
  },
  // get pagination payment
  GET_PAGINATION_PAYMENT (context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_PAYMENTS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_PAYMENTS ({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_PAYMENTS)
  },
  // action get state Payment
  [GET_STATE_PAYMENTS] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/payment/state', {
        params: context.state.tablestate
      })
        .then((result) => {
          context.commit('SET_PAYMENTS', { results: result.data })
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  // action get Payments
  [GET_PAYMENTS] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/payment/list')
        .then((result) => {
          context.commit('SET_PAYMENTS', { results: result.data })
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action get  Payment by ...
  [GET_PAYMENT] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/payment', slug)
        .then((result) => {
          resolve(result)
          context.commit('SET_PAYMENT', result.data)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action create Payment
  [CREATE_PAYMENT] (context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/payment', formData)
        .then((result) => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_PAYMENT', result.data)
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action update Payment
  [UPDATE_PAYMENT] (context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.payment.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/payment/' + id, datas)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action delete Payment
  [DELETE_PAYMENT] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/payment/' + slug)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },

  // get'+PaymentMethod+'Of'+Payment
  GET_PAYMENTMETHOD_OF_PAYMENT (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/paymentmethod')
        .then((result) => {
          this.state.paymentmethod.paymentmethods = result.data
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },

  // get'+Order+'Of'+Payment
  GET_ORDER_OF_PAYMENT (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/order')
        .then((result) => {
          this.state.order.orders = result.data
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  }

}
// mutations
const mutations = {
  SET_PAYMENTS (state, { results }) {
    state.payments = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_PAYMENT (state, result) {
    state.payment = result
  },
  CLEAR_PAYMENT (state) {
    state.payment = {}
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
  SET_ERROR: (state, { result }) => {
    state.error = {
      status: true, type: 'error', message: result
    }
  },
  CLEAR_ERROR: (state) => {
    state.error = {
      status: false, type: 'error', message: ''
    }
  },
  ADD_PAYMENT (state, result) {
    state.payments.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
