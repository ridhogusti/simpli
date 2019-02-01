// store  CashUp or service  CashUp
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_CASHUPS, GET_CASHUPS, GET_CASHUP, CREATE_CASHUP, UPDATE_CASHUP, DELETE_CASHUP } from '@/store/actions.type'

// initial state
const state = {
  dialogState: false,
  cashups: [],
  cashup: {},
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
  employeeitemshift: []
}
// getters
const getters = {
  getCashUps: (state) => {
  },
  getCashUpError: (state) => {
    return state.error
  },
  getPaymentMethodOfCashUp: (state) => {
    return state.paymentmethod
  }, getEmployeeItemShiftOfCashUp: (state) => {
    return state.employeeitemshift
  },
}
// actions
const actions = {

  //get sorting cashup
  GET_SORTING_CASHUPS(context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_CASHUPS, context.state.tablestate)
  },
  // get pagination cashup
  GET_PAGINATION_CASHUP(context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_CASHUPS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_CASHUPS({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_CASHUPS)
  },
  // action get state CashUp
  [GET_STATE_CASHUPS](context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/cashup/state', {
        params: context.state.tablestate
      })
        .then((result) => {
          context.commit('SET_CASHUPS', { results: result.data })
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  // action get CashUps
  [GET_CASHUPS](context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/cashup/list')
        .then((result) => {
          context.commit('SET_CASHUPS', { results: result.data })
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action get  CashUp by ...
  [GET_CASHUP](context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/cashup', slug)
        .then((result) => {
          resolve(result)
          context.commit('SET_CASHUP', result.data)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action create CashUp
  [CREATE_CASHUP](context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/cashup', formData)
        .then((result) => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_CASHUP', result.data)
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action update CashUp
  [UPDATE_CASHUP](context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.cashup.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/cashup/' + id, datas)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action delete CashUp
  [DELETE_CASHUP](context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/cashup/' + slug)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },

  //get'+PaymentMethod+'Of'+CashUp
  GET_PAYMENTMETHOD_OF_CASHUP(context, params) {
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

  //get'+EmployeeItemShift+'Of'+CashUp
  GET_EMPLOYEEITEMSHIFT_OF_CASHUP(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/employeeitemshift')
        .then((result) => {
          this.state.employeeitemshift.employeeitemshifts = result.data
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },

}
// mutations
const mutations = {
  SET_CASHUPS(state, { results }) {
    state.cashups = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_CASHUP(state, result) {
    state.cashup = result
  },
  CLEAR_CASHUP(state) {
    state.cashup = {}
  },
  UPDATE_PAGINATION(state, result) {
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
  ADD_CASHUP(state, result) {
    state.cashups.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
