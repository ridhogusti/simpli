// store  Order or service  Order
import ApiService from '@/common/api.service'
// import LsService from '@/common/ls.service'
import {
  ROW_PER_PAGE,
  NUMBER_OF_PAGES
} from '@/common/config'
import {
  GET_STATE_ORDERS,
  GET_ORDERS,
  GET_ORDER,
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER
} from '@/store/actions.type'

// initial state
const state = {
  dialogState: false,
  orders: [],
  order: {},
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
  member: []
}
// getters
const getters = {
  getOrders: (state) => { },
  getOrderError: (state) => {
    return state.error
  },
  getEmployeeOfOrder: (state) => {
    return state.employee
  },
  getMemberOfOrder: (state) => {
    return state.member
  }
}
// actions
const actions = {

  // get sorting order
  GET_SORTING_ORDERS(context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_ORDERS, context.state.tablestate)
  },
  // get pagination order
  GET_PAGINATION_ORDER(context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_ORDERS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_ORDERS({
    commit,
    dispatch,
    state
  }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_ORDERS)
  },
  // action get state Order
  [GET_STATE_ORDERS](context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/order/state', {
        params: context.state.tablestate
      })
        .then((result) => {
          context.commit('SET_ORDERS', {
            results: result.data
          })
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  // action get Orders
  [GET_ORDERS](context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/order/list')
        .then((result) => {
          context.commit('SET_ORDERS', {
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
  // action get  Order by ...
  [GET_ORDER](context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/order', slug)
        .then((result) => {
          resolve(result)
          context.commit('SET_ORDER', result.data)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', {
            result: err.message
          })
        })
    })
  },
  // action create Order
  [CREATE_ORDER](context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/order', formData)
        .then((result) => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_ORDER', result.data)
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', {
            result: err.message
          })
          reject(err)
        })
    })
  },
  // action update Order
  [UPDATE_ORDER](context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.order.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/order/' + id, datas)
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
  // action delete Order
  [DELETE_ORDER](context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/order/' + slug)
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

  // get'+Employee+'Of'+Order
  GET_EMPLOYEE_OF_ORDER(context, params) {
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

  // get'+Member+'Of'+Order
  GET_MEMBER_OF_ORDER(context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/member')
        .then((result) => {
          this.state.member.members = result.data
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  }

}
// mutations
const mutations = {
  SET_ORDERS(state, {
    results
  }) {
    state.orders = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_ORDER(state, result) {
    state.order = result
  },
  CLEAR_ORDER(state) {
    state.order = {}
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
  ADD_ORDER(state, result) {
    state.orders.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
