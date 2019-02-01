// store  StockMovement or service  StockMovement
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_STOCKMOVEMENTS,GET_STOCKMOVEMENTS, GET_STOCKMOVEMENT,  CREATE_STOCKMOVEMENT,UPDATE_STOCKMOVEMENT,DELETE_STOCKMOVEMENT} from '@/store/actions.type'

// initial state
const state = {
stockmovements:[],
stockmovement:{},
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
warehouse:[],
product:[],
unit:[],
}
// getters
const getters = {
getStockMovements:(state)=>{
},
getStockMovementError:(state)=>{
    return state.error
},
getWarehouseOfStockMovement:(state)=>{
                return state.warehouse
              },getProductOfStockMovement:(state)=>{
                return state.product
              },getUnitOfStockMovement:(state)=>{
                return state.unit
              },
}
// actions
const actions = {

          //get sorting stockmovement
          GET_SORTING_STOCKMOVEMENTS (context, params) {
            context.state.tablestate.SortColumnName = params.SortColumnName
            context.state.tablestate.IsDescending = params.IsDescending
            context.dispatch(GET_STATE_STOCKMOVEMENTS, context.state.tablestate)
          },
          // get pagination stockmovement
          GET_PAGINATION_STOCKMOVEMENT (context, page) {
            let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
            context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
            context.dispatch(GET_STATE_STOCKMOVEMENTS, context.state.tablestate)
            context.state.paginations.currentPage = page
          },
          // search table state
          GET_SEARCH_STOCKMOVEMENTS ({commit, dispatch, state}, keyword) {
            state.tablestate.SearchKeyword = keyword
            state.tablestate.NumberOfRowSkip = 0
            dispatch(GET_STATE_STOCKMOVEMENTS)
          },
          // action get state StockMovement
          [GET_STATE_STOCKMOVEMENTS] (context, params) {
            if (typeof params !== 'undefined') {
              context.state.tablestate = params
            }
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.query('/api/stockmovement/state', {
                params: context.state.tablestate
              })
              .then((result) => {
                context.commit('SET_STOCKMOVEMENTS', {results: result.data})
                resolve(result)
              }).catch((err) => {
                reject(err)
              })
            })
          },
          // action get StockMovements
          [GET_STOCKMOVEMENTS] (context) {
            context.commit('CLEAR_ERROR')
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.get('/api/stockmovement/list')
              .then((result) => {
                context.commit('SET_STOCKMOVEMENTS', {results: result.data})
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
            })
          },
          // action get  StockMovement by ...
          [GET_STOCKMOVEMENT] (context, slug) {
            context.commit('CLEAR_ERROR')
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.get('/api/stockmovement', slug)
              .then((result) => {
                resolve(result)
                context.commit('SET_STOCKMOVEMENT', result.data)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
            })
          },
          // action create StockMovement
          [CREATE_STOCKMOVEMENT] (context, formData) {
            return new Promise((resolve, reject) => {
              ApiService.post('/api/stockmovement', formData)
              .then((result) => {
                context.commit('CLEAR_ERROR')
                context.commit('ADD_STOCKMOVEMENT', result.data)
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
            })
          },
          // action update StockMovement
          [UPDATE_STOCKMOVEMENT] (context, datas) {
            context.commit('CLEAR_ERROR')
            let id = context.state.stockmovement.Id
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.put('/api/stockmovement/' + id, datas)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
            })
          },
          // action delete StockMovement
          [DELETE_STOCKMOVEMENT] (context, slug) {
            context.commit('CLEAR_ERROR')
            return new Promise((resolve, reject) => {
              ApiService.delete('/api/stockmovement/' + slug)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
            })
          },
          
              //get'+Warehouse+'Of'+StockMovement
                GET_WAREHOUSE_OF_STOCKMOVEMENT (context, params) {
                  return new Promise((resolve, reject) => {
                    ApiService.setHeader()
                    ApiService.get('/api/warehouse')
                    .then((result) => {
                      this.state.warehouse.warehouses = result.data
                      resolve(result)
                    }).catch((err) => {
                      reject(err)
                    })
                  })
                },
              
              //get'+Product+'Of'+StockMovement
                GET_PRODUCT_OF_STOCKMOVEMENT (context, params) {
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
              
              //get'+Unit+'Of'+StockMovement
                GET_UNIT_OF_STOCKMOVEMENT (context, params) {
                  return new Promise((resolve, reject) => {
                    ApiService.setHeader()
                    ApiService.get('/api/unit')
                    .then((result) => {
                      this.state.unit.units = result.data
                      resolve(result)
                    }).catch((err) => {
                      reject(err)
                    })
                  })
                },
              
}
// mutations
const mutations = {
SET_STOCKMOVEMENTS (state, {results}) {
            state.stockmovements = results.data
            state.paginations.pageLength = results.numberOfPages
          },
          SET_STOCKMOVEMENT (state, result) {
            state.stockmovement = result
          },
          CLEAR_STOCKMOVEMENT (state) {
            state.stockmovement = {}
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
          ADD_STOCKMOVEMENT (state, result) {
            state.stockmovements.push(result)
          }
}
export default {
  state,
  getters,
  actions,
  mutations
}
