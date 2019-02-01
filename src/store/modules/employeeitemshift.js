/*eslint-disable*/ 
// store  EmployeeItemShift or service  EmployeeItemShift
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_EMPLOYEEITEMSHIFTS, GET_EMPLOYEEITEMSHIFTS, GET_EMPLOYEEITEMSHIFT, CREATE_EMPLOYEEITEMSHIFT, UPDATE_EMPLOYEEITEMSHIFT, DELETE_EMPLOYEEITEMSHIFT } from '@/store/actions.type'

// initial state
const state = {
  dialogState: false,
  employeeitemshifts: [],
  employeeitemshift: {},
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
  employee: [],
  shift: [],
}
// getters
const getters = {
  getEmployeeItemShifts: (state) => {
  },
  getEmployeeItemShiftError: (state) => {
    return state.error
  },
  getEmployeeOfEmployeeItemShift: (state) => {
    return state.employee
  }, getShiftOfEmployeeItemShift: (state) => {
    return state.shift
  },
}
// actions
const actions = {

  //get sorting employeeitemshift
  GET_SORTING_EMPLOYEEITEMSHIFTS(context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_EMPLOYEEITEMSHIFTS, context.state.tablestate)
  },
  // get pagination employeeitemshift
  GET_PAGINATION_EMPLOYEEITEMSHIFT(context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_EMPLOYEEITEMSHIFTS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_EMPLOYEEITEMSHIFTS({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_EMPLOYEEITEMSHIFTS)
  },
  // action get state EmployeeItemShift
  [GET_STATE_EMPLOYEEITEMSHIFTS](context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/employeeitemshift/state', {
        params: context.state.tablestate
      })
        .then((result) => {
          context.commit('SET_EMPLOYEEITEMSHIFTS', { results: result.data })
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  // action get EmployeeItemShifts
  [GET_EMPLOYEEITEMSHIFTS](context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/employeeitemshift/list')
        .then((result) => {
          context.commit('SET_EMPLOYEEITEMSHIFTS', { results: result.data })
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action get  EmployeeItemShift by ...
  [GET_EMPLOYEEITEMSHIFT](context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/employeeitemshift', slug)
        .then((result) => {
          resolve(result)
          context.commit('SET_EMPLOYEEITEMSHIFT', result.data)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action create EmployeeItemShift
  [CREATE_EMPLOYEEITEMSHIFT](context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/employeeitemshift', formData)
        .then((result) => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_EMPLOYEEITEMSHIFT', result.data)
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action update EmployeeItemShift
  [UPDATE_EMPLOYEEITEMSHIFT](context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.employeeitemshift.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/employeeitemshift/' + id, datas)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action delete EmployeeItemShift
  [DELETE_EMPLOYEEITEMSHIFT](context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/employeeitemshift/' + slug)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },

  //get'+Employee+'Of'+EmployeeItemShift
  GET_EMPLOYEE_OF_EMPLOYEEITEMSHIFT(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/employee')
        .then((result) => {
          this.state.employee.employees = result.data
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },

  //get'+Shift+'Of'+EmployeeItemShift
  GET_SHIFT_OF_EMPLOYEEITEMSHIFT(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/shift')
        .then((result) => {
          this.state.shift.shifts = result.data
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },

}
// mutations
const mutations = {
  SET_EMPLOYEEITEMSHIFTS(state, { results }) {
    state.employeeitemshifts = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_EMPLOYEEITEMSHIFT(state, result) {
    state.employeeitemshift = result
  },
  CLEAR_EMPLOYEEITEMSHIFT(state) {
    state.employeeitemshift = {}
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
  ADD_EMPLOYEEITEMSHIFT(state, result) {
    state.employeeitemshifts.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
