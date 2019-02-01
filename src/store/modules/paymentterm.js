// store  PaymentTerm or service  PaymentTerm
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_PAYMENTTERMS,GET_PAYMENTTERMS, GET_PAYMENTTERM,  CREATE_PAYMENTTERM,UPDATE_PAYMENTTERM,DELETE_PAYMENTTERM} from '@/store/actions.type'

// initial state
const state = {
  dialogState: false,
paymentterms:[],
paymentterm:{},
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
}
// getters
const getters = {
getPaymentTerms:(state)=>{
},
getPaymentTermError:(state)=>{
    return state.error
},

}
// actions
const actions = {

          //get sorting paymentterm
          GET_SORTING_PAYMENTTERMS (context, params) {
            context.state.tablestate.SortColumnName = params.SortColumnName
            context.state.tablestate.IsDescending = params.IsDescending
            context.dispatch(GET_STATE_PAYMENTTERMS, context.state.tablestate)
          },
          // get pagination paymentterm
          GET_PAGINATION_PAYMENTTERM (context, page) {
            let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
            context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
            context.dispatch(GET_STATE_PAYMENTTERMS, context.state.tablestate)
            context.state.paginations.currentPage = page
          },
          // search table state
          GET_SEARCH_PAYMENTTERMS ({commit, dispatch, state}, keyword) {
            state.tablestate.SearchKeyword = keyword
            state.tablestate.NumberOfRowSkip = 0
            dispatch(GET_STATE_PAYMENTTERMS)
          },
          // action get state PaymentTerm
          [GET_STATE_PAYMENTTERMS] (context, params) {
            if (typeof params !== 'undefined') {
              context.state.tablestate = params
            }
            context.commit('CLEAR_PAYMENTTERM')
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.query('/api/paymentterm/state', {
                params: context.state.tablestate
              })
              .then((result) => {
                context.commit('SET_PAYMENTTERMS', {results: result.data})
                resolve(result)
              }).catch((err) => {
                reject(err)
              })
            })
          },
          // action get PaymentTerms
          [GET_PAYMENTTERMS] (context) {
            context.commit('CLEAR_ERROR')
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.get('/api/paymentterm/list')
              .then((result) => {
                context.commit('SET_PAYMENTTERMS', {results: result.data})
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
            })
          },
          // action get  PaymentTerm by ...
          [GET_PAYMENTTERM] (context, slug) {
            context.commit('CLEAR_ERROR')
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.get('/api/paymentterm', slug)
              .then((result) => {
                resolve(result)
                context.commit('SET_PAYMENTTERM', result.data)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
            })
          },
          // action create PaymentTerm
          [CREATE_PAYMENTTERM] (context, formData) {
            return new Promise((resolve, reject) => {
              console.log(formData)
              ApiService.setHeader()
              ApiService.post('/api/paymentterm', formData)
              .then((result) => {
                context.commit('CLEAR_ERROR')
                context.commit('ADD_PAYMENTTERM', result.data)
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
            })
          },
          // action update PaymentTerm
          [UPDATE_PAYMENTTERM] (context, datas) {
            context.commit('CLEAR_ERROR')
            let id = context.state.paymentterm.Id
            return new Promise((resolve, reject) => {
              ApiService.setHeader()
              ApiService.put('/api/paymentterm/' + id, datas)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
            })
          },
          // action delete PaymentTerm
          [DELETE_PAYMENTTERM] (context, slug) {
            context.commit('CLEAR_ERROR')
            return new Promise((resolve, reject) => {
              ApiService.delete('/api/paymentterm/' + slug)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
            })
          },
          
}
// mutations
const mutations = {
SET_PAYMENTTERMS (state, {results}) {
            state.paymentterms = results.data
            state.paginations.pageLength = results.numberOfPages
          },
          SET_PAYMENTTERM (state, result) {
            state.paymentterm = result
          },
          CLEAR_PAYMENTTERM (state) {
            state.paymentterm = {}
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
          ADD_PAYMENTTERM (state, result) {
            state.paymentterms.push(result)
          }
}
export default {
  state,
  getters,
  actions,
  mutations
}
