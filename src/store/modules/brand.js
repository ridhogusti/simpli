// store  Brand or service  Brand
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import {
  ROW_PER_PAGE,
  NUMBER_OF_PAGES
} from '@/common/config'
import {
  GET_STATE_BRANDS,
  GET_BRANDS,
  GET_BRAND,
  CREATE_BRAND,
  UPDATE_BRAND,
  DELETE_BRAND
} from '@/store/actions.type'

// initial state
const state = {
  dialogState: false,
  brands: [],
  brand: {},
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
  getBrands: (state) => {},
  getBrandError: (state) => {
    return state.error
  },

}
// actions
const actions = {

  //get sorting brand
  GET_SORTING_BRANDS(context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_BRANDS, context.state.tablestate)
  },
  // get pagination brand
  GET_PAGINATION_BRAND(context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_BRANDS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_BRANDS({
    commit,
    dispatch,
    state
  }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_BRANDS)
  },
  // action get state Brand
  [GET_STATE_BRANDS](context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/brand/state', {
          params: context.state.tablestate
        })
        .then((result) => {
          context.commit('SET_BRANDS', {
            results: result.data
          })
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  // action get Brands
  [GET_BRANDS](context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/brand/list')
        .then((result) => {
          context.commit('SET_BRANDS', {
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
  // action get  Brand by ...
  [GET_BRAND](context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/brand', slug)
        .then((result) => {
          resolve(result)
          context.commit('SET_BRAND', result.data)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', {
            result: err.message
          })
        })
    })
  },
  // action create Brand
  [CREATE_BRAND](context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/brand', formData)
        .then((result) => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_BRAND', result.data)
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', {
            result: err.message
          })
          reject(err)
        })
    })
  },
  // action update Brand
  [UPDATE_BRAND](context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.brand.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/brand/' + id, datas)
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
  // action delete Brand
  [DELETE_BRAND](context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/brand/' + slug)
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

}
// mutations
const mutations = {
  SET_BRANDS(state, {
    results
  }) {
    state.brands = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_BRAND(state, result) {
    state.brand = result
  },
  CLEAR_BRAND(state) {
    state.brand = {}
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
  ADD_BRAND(state, result) {
    state.brands.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
