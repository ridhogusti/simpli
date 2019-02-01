// store  Employee or service  Employee
import ApiService from '@/common/api.service'
// import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_EMPLOYEES, GET_EMPLOYEES_NO_ACCOUNT, GET_EMPLOYEES, GET_EMPLOYEE, CREATE_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from '@/store/actions.type'

// initial state
const state = {
  dialogState: false,
  employees: [],
  employee: {},
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
  gender: [],
  applicationuser: []
}
// getters
const getters = {
  getEmployees: (state) => {
  },
  getEmployeeError: (state) => {
    return state.error
  },
  getGenderOfEmployee: (state) => {
    return state.gender
  }
}
// actions
const actions = {

  // get sorting employee
  GET_SORTING_EMPLOYEES (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_EMPLOYEES, context.state.tablestate)
  },
  // get pagination employee
  GET_PAGINATION_EMPLOYEE (context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_EMPLOYEES, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_EMPLOYEES ({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_EMPLOYEES)
  },
  // action get state Employee
  [GET_STATE_EMPLOYEES] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/employee/state', {
        params: context.state.tablestate
      })
        .then((result) => {
          context.commit('SET_EMPLOYEES', { results: result.data })
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  // action get Employees
  [GET_EMPLOYEES] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/employee/list')
        .then((result) => {
          context.commit('SET_EMPLOYEES', { results: result.data })
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action get  Employee by ...
  [GET_EMPLOYEE] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/employee', slug)
        .then((result) => {
          resolve(result)
          context.commit('SET_EMPLOYEE', result.data)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action create Employee
  [CREATE_EMPLOYEE] (context, formData) {
    console.log(formData)
    return new Promise((resolve, reject) => {
      ApiService.post('/api/employee', formData)
        .then((result) => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_EMPLOYEE', result.data)
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action update Employee
  [UPDATE_EMPLOYEE] (context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.employee.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/employee/' + id, datas)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action delete Employee
  [DELETE_EMPLOYEE] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/employee/' + slug)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },

  // action get employee no account ...
  [GET_EMPLOYEES_NO_ACCOUNT] (context, param = '') {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/account/GetEmployeesNoAccount', {
        params: param
      })
      .then((result) => {
        console.log(result)
        resolve(result)
        context.commit('SET_EMPLOYEES', {results: result})
      }).catch((err) => {
        reject(err)
      })
    })
  },
  // get'+Gender+'Of'+Employee
  GET_GENDER_OF_EMPLOYEE (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/Employee/gender')
        .then((result) => {
          context.state.gender = result.data
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  }

}
// mutations
const mutations = {
  SET_EMPLOYEES (state, { results }) {
    state.employees = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_EMPLOYEE (state, result) {
    state.employee = result
  },
  CLEAR_EMPLOYEE (state) {
    state.employee = {}
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
  ADD_EMPLOYEE (state, result) {
    console.log(result)
    state.employees.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
