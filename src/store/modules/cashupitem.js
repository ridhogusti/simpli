// store  CashUpItem or service  CashUpItem
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_CASHUPITEMS, GET_CASHUPITEMS, GET_CASHUPITEM, CREATE_CASHUPITEM, UPDATE_CASHUPITEM, DELETE_CASHUPITEM } from '@/store/actions.type'

// initial state
const state = {
  dialogState: false,
  cashupitems: [],
  cashupitem: {},
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
}
// getters
const getters = {
  getCashUpItems: (state) => {
  },
  getCashUpItemError: (state) => {
    return state.error
  },

}
// actions
const actions = {

  //get sorting cashupitem
  GET_SORTING_CASHUPITEMS(context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_CASHUPITEMS, context.state.tablestate)
  },
  // get pagination cashupitem
  GET_PAGINATION_CASHUPITEM(context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_CASHUPITEMS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_CASHUPITEMS({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_CASHUPITEMS)
  },
  // action get state CashUpItem
  [GET_STATE_CASHUPITEMS](context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/cashupitem/state', {
        params: context.state.tablestate
      })
        .then((result) => {
          context.commit('SET_CASHUPITEMS', { results: result.data })
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  // action get CashUpItems
  [GET_CASHUPITEMS](context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/cashupitem/list')
        .then((result) => {
          context.commit('SET_CASHUPITEMS', { results: result.data })
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action get  CashUpItem by ...
  [GET_CASHUPITEM](context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/cashupitem', slug)
        .then((result) => {
          resolve(result)
          context.commit('SET_CASHUPITEM', result.data)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action create CashUpItem
  [CREATE_CASHUPITEM](context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/cashupitem', formData)
        .then((result) => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_CASHUPITEM', result.data)
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action update CashUpItem
  [UPDATE_CASHUPITEM](context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.cashupitem.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/cashupitem/' + id, datas)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action delete CashUpItem
  [DELETE_CASHUPITEM](context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/cashupitem/' + slug)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },

}
// mutations
const mutations = {
  SET_CASHUPITEMS(state, { results }) {
    state.cashupitems = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_CASHUPITEM(state, result) {
    state.cashupitem = result
  },
  CLEAR_CASHUPITEM(state) {
    state.cashupitem = {}
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
  ADD_CASHUPITEM(state, result) {
    state.cashupitems.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
