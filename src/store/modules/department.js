// store  Department or service  Department
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import {
  ROW_PER_PAGE,
  NUMBER_OF_PAGES
} from '@/common/config'
import {
  GET_STATE_DEPARTMENTS,
  GET_DEPARTMENTS,
  GET_DEPARTMENT,
  CREATE_DEPARTMENT,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT
} from '@/store/actions.type'

// initial state
const state = {
  dialogState: false,
  departments: [],
  department: {},
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
  }
}
// getters
const getters = {
  getDepartments: (state) => { },
  getDepartmentError: (state) => {
    return state.error
  }

}
// actions
const actions = {

  // get sorting department
  GET_SORTING_DEPARTMENTS (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_DEPARTMENTS, context.state.tablestate)
  },
  // get pagination department
  GET_PAGINATION_DEPARTMENT (context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_DEPARTMENTS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_DEPARTMENTS ({
    commit,
    dispatch,
    state
  }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_DEPARTMENTS)
  },
  // action get state Department
  [GET_STATE_DEPARTMENTS] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/department/state', {
        params: context.state.tablestate
      })
        .then((result) => {
          context.commit('SET_DEPARTMENTS', {
            results: result.data
          })
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  // action get Departments
  [GET_DEPARTMENTS] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/department/list')
        .then((result) => {
          context.commit('SET_DEPARTMENTS', {
            results: result.data
          })
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', {
            result: err.message
          })
          reject(err)
        })
    })
  },
  // action get  Department by ...
  [GET_DEPARTMENT] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/department', slug)
        .then((result) => {
          resolve(result)
          context.commit('SET_DEPARTMENT', result.data)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', {
            result: err.message
          })
        })
    })
  },
  // action create Department
  [CREATE_DEPARTMENT] (context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/department', formData)
        .then((result) => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_DEPARTMENT', result.data)
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', {
            result: err.message
          })
          reject(err)
        })
    })
  },
  // action update Department
  [UPDATE_DEPARTMENT] (context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.department.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/department/' + id, datas)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', {
            result: err.message
          })
        })
    })
  },
  // action delete Department
  [DELETE_DEPARTMENT] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/department/' + slug)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', {
            result: err.message
          })
        })
    })
  }

}
// mutations
const mutations = {
  SET_DEPARTMENTS (state, {
    results
  }) {
    state.departments = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_DEPARTMENT (state, result) {
    state.department = result
  },
  CLEAR_DEPARTMENT (state) {
    state.department = {}
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
  SET_ERROR: (state, {
    result
  }) => {
    state.error = {
      status: true,
      type: 'error',
      message: result
    }
  },
  CLEAR_ERROR: (state) => {
    state.error = {
      status: false,
      type: 'error',
      message: ''
    }
  },
  ADD_DEPARTMENT (state, result) {
    state.departments.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
