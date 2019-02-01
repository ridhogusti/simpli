// store  WarehouseType or service  WarehouseType
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_WAREHOUSETYPES, GET_WAREHOUSETYPES, GET_WAREHOUSETYPE, CREATE_WAREHOUSETYPE, UPDATE_WAREHOUSETYPE, DELETE_WAREHOUSETYPE} from '@/store/actions.type'

// initial state
const state = {
  dialogState: false,
  warehousetypes: [],
  warehousetype: {},
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
  getWarehouseTypes: (state) => {
    return state.warehousetypes
  },
  getWarehouseTypeError: (state) => {
    return state.error
  }

}
// actions
const actions = {

          // get sorting warehousetype
  GET_SORTING_WAREHOUSETYPES (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_WAREHOUSETYPES, context.state.tablestate)
  },
          // get pagination warehousetype
  GET_PAGINATION_WAREHOUSETYPE (context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_WAREHOUSETYPES, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
          // search table state
  GET_SEARCH_WAREHOUSETYPES ({commit, dispatch, state}, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_WAREHOUSETYPES)
  },
          // action get state WarehouseType
  [GET_STATE_WAREHOUSETYPES] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/warehousetype/state', {
        params: context.state.tablestate
      })
              .then((result) => {
                context.commit('SET_WAREHOUSETYPES', {results: result.data})
                resolve(result)
              }).catch((err) => {
                reject(err)
              })
    })
  },
  async GetWarehouseTypes (context) {
    context.commit('CLEAR_ERROR')
    try {
      ApiService.setHeader()
      const _response = await ApiService.get('/api/warehousetype')
      context.commit('SET_WAREHOUSETYPES', {results: _response})
      return _response
    } catch (error) {
      context.commit('SET_ERROR', {result: error.message})
      return error
    }
  },
  PostWarehouseType (context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/warehousetype', formData)
              .then((result) => {
                context.commit('CLEAR_ERROR')
                context.commit('ADD_WAREHOUSETYPE', result.data)
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
    })
  },
          // action get WarehouseTypes
  [GET_WAREHOUSETYPES] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/warehousetype/list')
              .then((result) => {
                context.commit('SET_WAREHOUSETYPES', {results: result.data})
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
    })
  },
          // action get  WarehouseType by ...
  [GET_WAREHOUSETYPE] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/warehousetype', slug)
              .then((result) => {
                resolve(result)
                context.commit('SET_WAREHOUSETYPE', result.data)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
    })
  },
          // action create WarehouseType
  [CREATE_WAREHOUSETYPE] (context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/warehousetype', formData)
              .then((result) => {
                context.commit('CLEAR_ERROR')
                context.commit('ADD_WAREHOUSETYPE', result.data)
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
    })
  },
          // action update WarehouseType
  [UPDATE_WAREHOUSETYPE] (context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.warehousetype.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/warehousetype/' + id, datas)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
    })
  },
          // action delete WarehouseType
  [DELETE_WAREHOUSETYPE] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/warehousetype/' + slug)
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
  SET_WAREHOUSETYPES (state, {results}) {
    state.warehousetypes = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_WAREHOUSETYPE (state, result) {
    state.warehousetype = result
  },
  CLEAR_WAREHOUSETYPE (state) {
    state.warehousetype = {}
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
  ADD_WAREHOUSETYPE (state, result) {
    state.warehousetypes.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
