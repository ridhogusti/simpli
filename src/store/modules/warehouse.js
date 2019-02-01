// store  Warehouse or service  Warehouse
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_WAREHOUSES, GET_WAREHOUSES, GET_WAREHOUSE, CREATE_WAREHOUSE, UPDATE_WAREHOUSE, DELETE_WAREHOUSE} from '@/store/actions.type'

// initial state
const state = {
  dialogState: false,
  warehouses: [],
  warehouse: {},
  error: {},
  tablestate: {
    SortColumnName: '',
    IsDescending: true,
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
  warehousetype: []
}
// getters
const getters = {
  getWarehouses: (state) => {
  },
  getWarehouseError: (state) => {
    return state.error
  },
  getWarehouseTypeOfWarehouse: (state) => {
    return state.warehousetype
  }
}
// actions
const actions = {

          // get sorting warehouse
  GET_SORTING_WAREHOUSES (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_WAREHOUSES, context.state.tablestate)
  },
          // get pagination warehouse
  GET_PAGINATION_WAREHOUSE (context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_WAREHOUSES, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
          // search table state
  GET_SEARCH_WAREHOUSES ({commit, dispatch, state}, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_WAREHOUSES)
  },
          // action get state Warehouse
  [GET_STATE_WAREHOUSES] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    context.commit("CLEAR_WAREHOUSE");
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/warehouse/state', {
        params: context.state.tablestate
      })
      .then((result) => {
        console.log(result, 'taoseuth')
        context.commit('SET_WAREHOUSES', {results: result.data})
        resolve(result)
      }).catch((err) => {
        reject(err)
      })
    })
  },
          // action get Warehouses
  [GET_WAREHOUSES] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/warehouse/list')
              .then((result) => {
                console.log(result, 'result warehouse')
                context.commit('SET_WAREHOUSES', {results: result.data})
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
    })
  },
          // action get  Warehouse by ...
  [GET_WAREHOUSE] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/warehouse', slug)
              .then((result) => {
                resolve(result)
                context.commit('SET_WAREHOUSE', result.data)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
    })
  },
          // action create Warehouse
  [CREATE_WAREHOUSE] (context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/warehouse', formData)
              .then((result) => {
                context.commit('CLEAR_ERROR')
                context.commit('ADD_WAREHOUSE', result.data)
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
    })
  },
          // action update Warehouse
  [UPDATE_WAREHOUSE] (context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.warehouse.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/warehouse/' + id, datas)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
    })
  },
          // action delete Warehouse
  [DELETE_WAREHOUSE] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/warehouse/' + slug)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
    })
  },

              // get'+WarehouseType+'Of'+Warehouse
  GET_WAREHOUSETYPE_OF_WAREHOUSE (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/warehousetype')
                    .then((result) => {
                      this.state.warehousetype.warehousetypes = result.data
                      resolve(result)
                    }).catch((err) => {
                      reject(err)
                    })
    })
  }

}
// mutations
const mutations = {
  SET_WAREHOUSES (state, {results}) {
    state.warehouses = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_WAREHOUSE (state, result) {
    state.warehouse = result
  },
  CLEAR_WAREHOUSE (state) {
    state.warehouse = {}
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
  ADD_WAREHOUSE (state, result) {
    state.warehouses.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
