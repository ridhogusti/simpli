// store  Supplier or service  Supplier
import ApiService from '@/common/api.service'
// import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_SUPPLIERS, GET_SUPPLIERS, GET_SUPPLIER, CREATE_SUPPLIER, UPDATE_SUPPLIER, DELETE_SUPPLIER } from '@/store/actions.type'

// initial state
const state = {
  dialogState: false,
  suppliers: [],
  supplier: {},
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
  getSuppliers: (state) => {
  },
  getSupplierError: (state) => {
    return state.error
  }
}
// actions
const actions = {
  // get sorting supplier
  GET_SORTING_SUPPLIERS (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_SUPPLIERS, context.state.tablestate)
  },
  // get pagination supplier
  GET_PAGINATION_SUPPLIER (context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_SUPPLIERS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_SUPPLIERS ({ commit, dispatch, state }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_SUPPLIERS)
  },
  // action get state Supplier
  [GET_STATE_SUPPLIERS] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/supplier/state', {
        params: context.state.tablestate
      })
      .then((result) => {
        context.commit('SET_SUPPLIERS', { results: result.data })
        resolve(result)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  // action get Suppliers
  [GET_SUPPLIERS] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/supplier')
      .then((result) => {
        context.commit('SET_SUPPLIERS', { results: result.data })
        resolve(result)
      }).catch((err) => {
        context.commit('SET_ERROR', { result: err.message })
        reject(err)
      })
    })
  },
  // action get  Supplier by ...
  [GET_SUPPLIER] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/supplier', slug)
      .then((result) => {
        // console.log(result.data,'di supplier')
        resolve(result)
        context.commit('SET_SUPPLIER', result.data)
      }).catch((err) => {
        reject(err)
        context.commit('SET_ERROR', { result: err.message })
      })
    })
  },
  // action create Supplier
  [CREATE_SUPPLIER] (context, formData) {
    console.log(context)
    return new Promise((resolve, reject) => {
      console.log(formData)
      ApiService.post('/api/supplier', formData)
        .then((result) => {
          context.commit('CLEAR_ERROR')
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', { result: err.message })
          reject(err)
        })
    })
  },
  // action update Supplier
  [UPDATE_SUPPLIER] (context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.supplier.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/supplier/' + id, datas)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
        context.commit('SET_ERROR', { result: err.message })
      })
    })
  },
  // action delete Supplier
  [DELETE_SUPPLIER] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/supplier/' + slug)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
        context.commit('SET_ERROR', { result: err.message })
      })
    })
  },


  GET_PAYMENTTERM_OF_SUPPLIER (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/paymentterm')
      .then((result) => {
        this.state.paymentterm.paymentterms = result.data
        resolve(result)
      }).catch((err) => {
        reject(err)
      })
    })
  },
}
// mutations
const mutations = {
  SET_SUPPLIERS (state, { results }) {
    state.suppliers = results
    state.paginations.pageLength = results.numberOfPages
  },
  SET_SUPPLIER (state, result) {
    state.supplier = result
  },
  CLEAR_SUPPLIER (state) {
    state.supplier = {}
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
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
