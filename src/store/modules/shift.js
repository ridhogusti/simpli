/*eslint-disable*/ 
// store  Shift or service  Shift
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_SHIFTS, GET_SHIFTS, GET_SHIFT, CREATE_SHIFT, UPDATE_SHIFT, DELETE_SHIFT } from '@/store/actions.type'

// initial state
const state = {
  dialogState:false,
  shifts: [],
  shift: {},
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
  getShifts: (state) => {
  },
  getShiftError: (state) => {
    return state.error
  },

}
// actions
const actions = {

  //get sorting shift
  GET_SORTING_SHIFTS(context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_SHIFTS, context.state.tablestate)
  },
  // get pagination shift
  GET_PAGINATION_SHIFT(context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_SHIFTS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_SHIFTS({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_SHIFTS)
  },
  // action get state Shift
  [GET_STATE_SHIFTS](context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/shift/state', {
        params: context.state.tablestate
      })
        .then((result) => {
          context.commit('SET_SHIFTS', { results: result.data })
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  // action get Shifts
  [GET_SHIFTS](context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/shift/list')
        .then((result) => {
          context.commit('SET_SHIFTS', { results: result.data })
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action get  Shift by ...
  [GET_SHIFT](context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/shift', slug)
        .then((result) => {
          resolve(result)
          context.commit('SET_SHIFT', result.data)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action create Shift
  [CREATE_SHIFT](context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/shift', formData)
        .then((result) => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_SHIFT', result.data)
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action update Shift
  [UPDATE_SHIFT](context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.shift.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/shift/' + id, datas)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action delete Shift
  [DELETE_SHIFT](context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/shift/' + slug)
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
  SET_SHIFTS(state, { results }) {
    state.shifts = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_SHIFT(state, result) {
    state.shift = result
  },
  CLEAR_SHIFT(state) {
    state.shift = {}
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
  ADD_SHIFT(state, result) {
    state.shifts.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
