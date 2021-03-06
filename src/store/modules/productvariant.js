// store  ProductVariant or service  ProductVariant
import ApiService from '@/common/api.service'
// import LsService from/ '@/common/ls.service'
import {
  ROW_PER_PAGE,
  NUMBER_OF_PAGES
} from '@/common/config'
import {
  GET_STATE_PRODUCTVARIANTS,
  GET_PRODUCTVARIANTS,
  GET_PRODUCTVARIANT,
  CREATE_PRODUCTVARIANT,
  UPDATE_PRODUCTVARIANT,
  DELETE_PRODUCTVARIANT
} from '@/store/actions.type'

// initial state
const state = {
  productvariants: [],
  productvariant: {},
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
  getProductVariants: (state) => {},
  getProductVariantError: (state) => {
    return state.error
  }

}
// actions
const actions = {

  // get sorting productvariant
  GET_SORTING_PRODUCTVARIANTS (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_PRODUCTVARIANTS, context.state.tablestate)
  },
  // get pagination productvariant
  GET_PAGINATION_PRODUCTVARIANT (context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_PRODUCTVARIANTS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_PRODUCTVARIANTS ({
    commit,
    dispatch,
    state
  }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_PRODUCTVARIANTS)
  },
  // action get state ProductVariant
  [GET_STATE_PRODUCTVARIANTS] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/productvariant/state', {
        params: context.state.tablestate
      })
        .then((result) => {
          context.commit('SET_PRODUCTVARIANTS', {
            results: result.data
          })
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  // action get ProductVariants
  [GET_PRODUCTVARIANTS] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/productvariant/list')
        .then((result) => {
          context.commit('SET_PRODUCTVARIANTS', {
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
  // action get  ProductVariant by ...
  [GET_PRODUCTVARIANT] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/productvariant', slug)
        .then((result) => {
          resolve(result)
          context.commit('SET_PRODUCTVARIANT', result.data)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', {
            result: err.message
          })
        })
    })
  },
  // action create ProductVariant
  [CREATE_PRODUCTVARIANT] (context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/productvariant', formData)
        .then((result) => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_PRODUCTVARIANT', result.data)
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', {
            result: err.message
          })
          reject(err)
        })
    })
  },
  // action update ProductVariant
  [UPDATE_PRODUCTVARIANT] (context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.productvariant.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/productvariant/' + id, datas)
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
  // action delete ProductVariant
  [DELETE_PRODUCTVARIANT] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/productvariant/' + slug)
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
  SET_PRODUCTVARIANTS (state, {
    results
  }) {
    state.productvariants = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_PRODUCTVARIANT (state, result) {
    state.productvariant = result
  },
  CLEAR_PRODUCTVARIANT (state) {
    state.productvariant = {}
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
  ADD_PRODUCTVARIANT (state, result) {
    state.productvariants.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
