// store  OrderItem or service  OrderItem
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_ORDERITEMS,GET_ORDERITEMS, GET_ORDERITEM,  CREATE_ORDERITEM,UPDATE_ORDERITEM,DELETE_ORDERITEM} from '@/store/actions.type'

// initial state
const state = {
orderitems:[],
orderitem:{},
error:{},
tablestate :{
              SortColumnName: '',
              IsDescending: false,
              NumberOfRowSkip: 0,
              NumberOfPages: NUMBER_OF_PAGES,
              RowPerPage: ROW_PER_PAGE,
              SearchKeyword: ''
            },
paginations:{
              currentPage: 1,
              pageLength: 1,
              rowsPerPage: ROW_PER_PAGE
            },
product:[],
order:[],
}
// getters
const getters = {
getOrderItems:(state)=>{
},
getOrderItemError:(state)=>{
    return state.error
},
getProductOfOrderItem:(state)=>{
                return state.product
              },getOrderOfOrderItem:(state)=>{
                return state.order
              },
}
// actions
const actions = {

          //get sorting orderitem
          GET_SORTING_ORDERITEMS (context, params) {
            context.state.tablestate.SortColumnName = params.SortColumnName
            context.state.tablestate.IsDescending = params.IsDescending
            context.dispatch(GET_STATE_ORDERITEMS, context.state.tablestate)
          },
          // get pagination orderitem
          GET_PAGINATION_ORDERITEM (context, page) {
            let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
            context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
            context.dispatch(GET_STATE_ORDERITEMS, context.state.tablestate)
            context.state.paginations.currentPage = page
          },
          // search table state
          GET_SEARCH_ORDERITEMS ({commit, dispatch, state}, keyword) {
            state.tablestate.SearchKeyword = keyword
            state.tablestate.NumberOfRowSkip = 0
            dispatch(GET_STATE_ORDERITEMS)
          },
          // action get state OrderItem
          [GET_STATE_ORDERITEMS] (context, params) {
            if (typeof params !== 'undefined') {
              context.state.tablestate = params
            }
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.query('/api/orderitem/state', {
                params: context.state.tablestate
              })
              .then((result) => {
                context.commit('SET_ORDERITEMS', {results: result.data})
                resolve(result)
              }).catch((err) => {
                reject(err)
              })
            })
          },
          // action get OrderItems
          [GET_ORDERITEMS] (context) {
            context.commit('CLEAR_ERROR')
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.get('/api/orderitem/list')
              .then((result) => {
                context.commit('SET_ORDERITEMS', {results: result.data})
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
            })
          },
          // action get  OrderItem by ...
          [GET_ORDERITEM] (context, slug) {
            context.commit('CLEAR_ERROR')
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.get('/api/orderitem', slug)
              .then((result) => {
                resolve(result)
                context.commit('SET_ORDERITEM', result.data)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
            })
          },
          // action create OrderItem
          [CREATE_ORDERITEM] (context, formData) {
            return new Promise((resolve, reject) => {
              ApiService.post('/api/orderitem', formData)
              .then((result) => {
                context.commit('CLEAR_ERROR')
                context.commit('ADD_ORDERITEM', result.data)
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
            })
          },
          // action update OrderItem
          [UPDATE_ORDERITEM] (context, datas) {
            context.commit('CLEAR_ERROR')
            let id = context.state.orderitem.Id
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.put('/api/orderitem/' + id, datas)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
            })
          },
          // action delete OrderItem
          [DELETE_ORDERITEM] (context, slug) {
            context.commit('CLEAR_ERROR')
            return new Promise((resolve, reject) => {
              ApiService.delete('/api/orderitem/' + slug)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
            })
          },
          
              //get'+Product+'Of'+OrderItem
                GET_PRODUCT_OF_ORDERITEM (context, params) {
                  return new Promise((resolve, reject) => {
                    ApiService.setHeader()
                    ApiService.get('/api/product')
                    .then((result) => {
                      this.state.product.products = result.data
                      resolve(result)
                    }).catch((err) => {
                      reject(err)
                    })
                  })
                },
              
              //get'+Order+'Of'+OrderItem
                GET_ORDER_OF_ORDERITEM (context, params) {
                  return new Promise((resolve, reject) => {
                    ApiService.setHeader()
                    ApiService.get('/api/order')
                    .then((result) => {
                      this.state.order.orders = result.data
                      resolve(result)
                    }).catch((err) => {
                      reject(err)
                    })
                  })
                },
              
}
// mutations
const mutations = {
SET_ORDERITEMS (state, {results}) {
            state.orderitems = results.data
            state.paginations.pageLength = results.numberOfPages
          },
          SET_ORDERITEM (state, result) {
            state.orderitem = result
          },
          CLEAR_ORDERITEM (state) {
            state.orderitem = {}
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
          ADD_ORDERITEM (state, result) {
            state.orderitems.push(result)
          }
}
export default {
  state,
  getters,
  actions,
  mutations
}
