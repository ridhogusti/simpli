// module acccount
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import {
  GET_STATE_ACCOUNTS,
  GET_ACCOUNTS,
  GET_ACCOUNT,
  CREATE_ACCOUNT,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
  SEARCH_ACCOUNTS,
  GET_EMPLOYEES_NO_ACCOUNT,
  GET_ROLEGROUP_OF_ACCOUNT
} from '@/store/actions.type'

const state = {
  error: {},
  accounts: [],
  account: {},
  employees: [],
  pagination: {
    NumberOfPages: NUMBER_OF_PAGES,
    NumberOfRowSkip: 0,
    RowPerPage: ROW_PER_PAGE
  },
  rolegroup: [
    // { Name: 'Superuser', Id: 1 },
    // { Name: 'Manager', Id: 3 }
  ]
}

const getters = {
  accounts (state) {
    return state.accounts
  },
  accountPaging (state) {
    let cekLS = LsService.getAccountPaging()
    if (cekLS !== null) {
      cekLS = JSON.parse(cekLS)
      let tmp = {
        IsDescending: cekLS.IsDescending,
        NumberOfPages: cekLS.NumberOfPages,
        NumberOfRowSkip: cekLS.NumberOfRowSkip,
        RowPerPage: cekLS.RowPerPage,
        SearchKeyword: cekLS.SearchKeyword,
        SortColumnName: cekLS.SortColumnName
      }
      return tmp
    } else {
      return state.pagination
    }
  },
  getRoleGroupOfAccount (state) {
    return state.rolegroup
  },
  getEmployeesNoAccount (state) {
    return state.employees
  }
}

const actions = {
  GET_USER_MESSAGEBROKER(){
    ApiService.setHeader();
    return ApiService.get(`/account/GetAllUserMessageBroker`)
  },
  POST_MESSAGEBROKERUSER(context, data){
    ApiService.setHeader();
    return ApiService.post('/account/PostUserMessageBroker', data)
  },
  PUT_MESSAGEBROKERUSER(context, data){
    ApiService.setHeader();
    return ApiService.put('/account/PutUserMessageBroker', data)
  },
  DELETE_MESSAGEBROKERUSER(context, data){
    ApiService.setHeader();
    return ApiService.delete('/account/DeleteUserMessageBroker', data)
  },
  // action get state accounts
  [GET_STATE_ACCOUNTS] (context, params = '') {
    if (params !== '') {
      context.commit('UPDATE_PAGIATION', params)
    }
    // LsService.saveAccountPaging(JSON.stringify(context.state.pagination))
    console.log(JSON.stringify(context.state.pagination))
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/accounts/state', {
        params: context.state.pagination
      })
      .then((result) => {
        context.commit('SET_ACCOUNTS', {results: result.data})
        LsService.saveAccountPaging(JSON.stringify(context.state.pagination))
        resolve(result)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  // action get accounts
  [GET_ACCOUNTS] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/account/list')
      .then((result) => {
        context.commit('SET_ACCOUNTS', {results: result.data})
        resolve(result)
      }).catch((err) => {
        context.commit('SET_ERROR', {result: err.message})
        reject(err)
      })
    })
  },
  // action get account by ...
  [GET_ACCOUNT] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/account/get', slug)
      .then((result) => {
        resolve(result)
        context.commit('SET_ACCOUNT', result.data)
        // context.dispatch(GET_ROLEGROUP_OF_ACCOUNT)
      }).catch((err) => {
        reject(err)
        context.commit('SET_ERROR', {result: err.message})
      })
    })
  },
  // action create accout
  [CREATE_ACCOUNT] (context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/account/register', formData)
      .then((result) => {
        context.commit('CLEAR_ERROR')
        resolve(result)
      }).catch((err) => {
        console.log(err)
        context.commit('SET_ERROR', {result: err.message})
        reject(err)
      })
    })
  },
  // action update account
  [UPDATE_ACCOUNT] (context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.account.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/account/edit/' + id, datas)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
        context.commit('SET_ERROR', {result: err.message})
      })
    })
  },
  // action delete account
  [DELETE_ACCOUNT] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/account/delete/' + slug)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
        context.commit('SET_ERROR', {result: err.message})
      })
    })
  },
  [SEARCH_ACCOUNTS] (context, keyword) {
    context.state.pagination.SearchKeyword = keyword
    context.dispatch(GET_ACCOUNTS)
  },
  // // action get employee no account ...
  // [GET_EMPLOYEES_NO_ACCOUNT] (context, param = '') {
  //   return new Promise((resolve, reject) => {
  //     ApiService.setHeader()
  //     ApiService.query('/account/GetEmployeesNoAccount', {
  //       params: param
  //     })
  //     .then((result) => {
  //       resolve(result)
  //       context.commit('SET_EMPLOYEES', {results: result.data})
  //     }).catch((err) => {
  //       reject(err)
  //     })
  //   })
  // },
  [GET_ROLEGROUP_OF_ACCOUNT] (context) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/account/GetRole')
      .then((result) => {
        resolve(result)
        context.state.rolegroup = result.data
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

const mutations = {
  SET_ACCOUNTS (state, {results}) {
    state.accounts = results
  },
  SET_ACCOUNT (state, result) {
    state.account = result
  },
  CLEAR_ACCOUNT (state) {
    state.account = {}
  },
  UPDATE_PAGIATION (state, result) {
    let tmpPaging = {
      SortColumnName: result.sortBy,
      IsDescending: result.descending,
      NumberOfRowSkip: ((result.page - 1) * NUMBER_OF_PAGES),
      NumberOfPages: NUMBER_OF_PAGES,
      RowPerPage: ROW_PER_PAGE
    }
    state.pagination = tmpPaging
  },
  SET_EMPLOYEES (state, {results}) {
    state.employees = results
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
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
