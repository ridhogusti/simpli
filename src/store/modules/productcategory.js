// store  ProductCategory or service  ProductCategory
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_PRODUCTCATEGORYS, GET_PRODUCTCATEGORYS, GET_PRODUCTCATEGORY, CREATE_PRODUCTCATEGORY, UPDATE_PRODUCTCATEGORY, DELETE_PRODUCTCATEGORY } from '@/store/actions.type'

// initial state
const state = {
  dialogState: false,
  productcategorys: [],
  productcategory: {},
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
  getProductCategorys: (state) => {
  },
  getProductCategoryError: (state) => {
    return state.error
  },

}
// actions
const actions = {

  //get sorting productcategory
  GET_SORTING_PRODUCTCATEGORYS(context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_PRODUCTCATEGORYS, context.state.tablestate)
  },
  // get pagination productcategory
  GET_PAGINATION_PRODUCTCATEGORY(context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_PRODUCTCATEGORYS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_PRODUCTCATEGORYS({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_PRODUCTCATEGORYS)
  },
  // action get state ProductCategory
  [GET_STATE_PRODUCTCATEGORYS](context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/productcategory/state', {
        params: context.state.tablestate
      })
        .then((result) => {
          context.commit('SET_PRODUCTCATEGORYS', { results: result.data })
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  // action get ProductCategorys
  [GET_PRODUCTCATEGORYS](context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/productcategory/list')
        .then((result) => {
          context.commit('SET_PRODUCTCATEGORYS', { results: result.data })
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action get  ProductCategory by ...
  [GET_PRODUCTCATEGORY](context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/productcategory', slug)
        .then((result) => {
          resolve(result)
          context.commit('SET_PRODUCTCATEGORY', result.data)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action create ProductCategory
  [CREATE_PRODUCTCATEGORY](context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/productcategory', formData)
        .then((result) => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_PRODUCTCATEGORY', result.data)
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action update ProductCategory
  [UPDATE_PRODUCTCATEGORY](context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.productcategory.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/productcategory/' + id, datas)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', { result: err.message })
        })
    })
  },
  // action delete ProductCategory
  [DELETE_PRODUCTCATEGORY](context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/productcategory/' + slug)
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
  SET_PRODUCTCATEGORYS(state, { results }) {
    state.productcategorys = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_PRODUCTCATEGORY(state, result) {
    state.productcategory = result
  },
  CLEAR_PRODUCTCATEGORY(state) {
    state.productcategory = {}
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
  ADD_PRODUCTCATEGORY(state, result) {
    state.productcategorys.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
