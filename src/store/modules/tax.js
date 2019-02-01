// store  Tax or service  Tax
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_TAXS, GET_TAXS, GET_TAX, CREATE_TAX, UPDATE_TAX, DELETE_TAX} from '@/store/actions.type'

// initial state
const state = {
  dialogState: false,
  taxs: [],
  tax: {},
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
  getTaxs: (state) => {
  },
  getTaxError: (state) => {
    return state.error
  }

}
// actions
const actions = {

          // get sorting tax
  GET_SORTING_TAXS (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_TAXS, context.state.tablestate)
  },
          // get pagination tax
  GET_PAGINATION_TAX (context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_TAXS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
          // search table state
  GET_SEARCH_TAXS ({commit, dispatch, state}, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_TAXS)
  },
          // action get state Tax
  [GET_STATE_TAXS] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/tax/state', {
        params: context.state.tablestate
      })
              .then((result) => {
                context.commit('SET_TAXS', {results: result.data})
                resolve(result)
              }).catch((err) => {
                reject(err)
              })
    })
  },
          // action get Taxs
  [GET_TAXS] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/tax/list')
              .then((result) => {
                context.commit('SET_TAXS', {results: result.data})
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
    })
  },
          // action get  Tax by ...
  [GET_TAX] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/tax', slug)
              .then((result) => {
                resolve(result)
                context.commit('SET_TAX', result.data)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
    })
  },
          // action create Tax
  [CREATE_TAX] (context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/tax', formData)
              .then((result) => {
                context.commit('CLEAR_ERROR')
                context.commit('ADD_TAX', result.data)
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
    })
  },
          // action update Tax
  [UPDATE_TAX] (context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.tax.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/tax/' + id, datas)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
    })
  },
          // action delete Tax
  [DELETE_TAX] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/tax/' + slug)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
    })
  }

}
// mutations
const mutations = {
  SET_TAXS (state, {results}) {
    state.taxs = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_TAX (state, result) {
    state.tax = result
  },
  CLEAR_TAX (state) {
    state.tax = {}
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
  ADD_TAX (state, result) {
    state.taxs.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
