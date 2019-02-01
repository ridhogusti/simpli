// store  ProductUnit or service  ProductUnit
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_PRODUCTUNITS,GET_PRODUCTUNITS, GET_PRODUCTUNIT,  CREATE_PRODUCTUNIT,UPDATE_PRODUCTUNIT,DELETE_PRODUCTUNIT} from '@/store/actions.type'

// initial state
const state = {
productunits:[],
productunit:{},
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
}
// getters
const getters = {
getProductUnits:(state)=>{
},
getProductUnitError:(state)=>{
    return state.error
},
getProductOfProductUnit:(state)=>{
                return state.product
              },
}
// actions
const actions = {

          //get sorting productunit
          GET_SORTING_PRODUCTUNITS (context, params) {
            context.state.tablestate.SortColumnName = params.SortColumnName
            context.state.tablestate.IsDescending = params.IsDescending
            context.dispatch(GET_STATE_PRODUCTUNITS, context.state.tablestate)
          },
          // get pagination productunit
          GET_PAGINATION_PRODUCTUNIT (context, page) {
            let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
            context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
            context.dispatch(GET_STATE_PRODUCTUNITS, context.state.tablestate)
            context.state.paginations.currentPage = page
          },
          // search table state
          GET_SEARCH_PRODUCTUNITS ({commit, dispatch, state}, keyword) {
            state.tablestate.SearchKeyword = keyword
            state.tablestate.NumberOfRowSkip = 0
            dispatch(GET_STATE_PRODUCTUNITS)
          },
          // action get state ProductUnit
          [GET_STATE_PRODUCTUNITS] (context, params) {
            if (typeof params !== 'undefined') {
              context.state.tablestate = params
            }
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.query('/api/productunit/state', {
                params: context.state.tablestate
              })
              .then((result) => {
                context.commit('SET_PRODUCTUNITS', {results: result.data})
                resolve(result)
              }).catch((err) => {
                reject(err)
              })
            })
          },
          // action get ProductUnits
          [GET_PRODUCTUNITS] (context) {
            context.commit('CLEAR_ERROR')
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.get('/api/productunit/list')
              .then((result) => {
                context.commit('SET_PRODUCTUNITS', {results: result.data})
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
            })
          },
          // action get  ProductUnit by ...
          [GET_PRODUCTUNIT] (context, slug) {
            context.commit('CLEAR_ERROR')
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.get('/api/productunit', slug)
              .then((result) => {
                resolve(result)
                context.commit('SET_PRODUCTUNIT', result.data)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
            })
          },
          // action create ProductUnit
          [CREATE_PRODUCTUNIT] (context, formData) {
            return new Promise((resolve, reject) => {
              ApiService.post('/api/productunit', formData)
              .then((result) => {
                context.commit('CLEAR_ERROR')
                context.commit('ADD_PRODUCTUNIT', result.data)
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
            })
          },
          // action update ProductUnit
          [UPDATE_PRODUCTUNIT] (context, datas) {
            context.commit('CLEAR_ERROR')
            let id = context.state.productunit.Id
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.put('/api/productunit/' + id, datas)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
            })
          },
          // action delete ProductUnit
          [DELETE_PRODUCTUNIT] (context, slug) {
            context.commit('CLEAR_ERROR')
            return new Promise((resolve, reject) => {
              ApiService.delete('/api/productunit/' + slug)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
            })
          },
          
              //get'+Product+'Of'+ProductUnit
                GET_PRODUCT_OF_PRODUCTUNIT (context, params) {
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
              
}
// mutations
const mutations = {
SET_PRODUCTUNITS (state, {results}) {
            state.productunits = results.data
            state.paginations.pageLength = results.numberOfPages
          },
          SET_PRODUCTUNIT (state, result) {
            state.productunit = result
          },
          CLEAR_PRODUCTUNIT (state) {
            state.productunit = {}
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
          ADD_PRODUCTUNIT (state, result) {
            state.productunits.push(result)
          }
}
export default {
  state,
  getters,
  actions,
  mutations
}
