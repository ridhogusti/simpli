// store  Member or service  Member
import ApiService from '@/common/api.service'
// import LsService from '@/common/ls.service'
import {
  ROW_PER_PAGE,
  NUMBER_OF_PAGES
} from '@/common/config'
import {
  GET_STATE_MEMBERS,
  GET_MEMBERS,
  GET_MEMBER,
  CREATE_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER
} from '@/store/actions.type'

// initial state
const state = {
  members: [],
  member: {},
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
  gender: []
}
// getters
const getters = {
  getMembers: (state) => {},
  getMemberError: (state) => {
    return state.error
  },
  getGenderOfMember: (state) => {
    return state.gender
  }
}
// actions
const actions = {

  // get sorting member
  GET_SORTING_MEMBERS (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_MEMBERS, context.state.tablestate)
  },
  // get pagination member
  GET_PAGINATION_MEMBER (context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_MEMBERS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
  // search table state
  GET_SEARCH_MEMBERS ({
    commit,
    dispatch,
    state
  }, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_MEMBERS)
  },
  // action get state Member
  [GET_STATE_MEMBERS] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/member/state', {
        params: context.state.tablestate
      })
        .then((result) => {
          context.commit('SET_MEMBERS', {
            results: result.data
          })
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  // action get Members
  [GET_MEMBERS] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/member/list')
        .then((result) => {
          context.commit('SET_MEMBERS', {
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
  // action get  Member by ...
  [GET_MEMBER] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/member', slug)
        .then((result) => {
          resolve(result)
          context.commit('SET_MEMBER', result.data)
        }).catch((err) => {
          reject(err)
          context.commit('SET_ERROR', {
            result: err.message
          })
        })
    })
  },
  // action create Member
  [CREATE_MEMBER] (context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/member', formData)
        .then((result) => {
          context.commit('CLEAR_ERROR')
          context.commit('ADD_MEMBER', result.data)
          resolve(result)
        }).catch((err) => {
          context.commit('SET_ERROR', {
            result: err.message
          })
          reject(err)
        })
    })
  },
  // action update Member
  [UPDATE_MEMBER] (context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.member.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/member/' + id, datas)
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
  // action delete Member
  [DELETE_MEMBER] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/member/' + slug)
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

  // get'+Gender+'Of'+Member
  GET_GENDER_OF_MEMBER (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/Member/gender')
        .then((result) => {
          context.state.gender = result.data
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  }

}
// mutations
const mutations = {
  SET_MEMBERS (state, {
    results
  }) {
    state.members = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_MEMBER (state, result) {
    state.member = result
  },
  CLEAR_MEMBER (state) {
    state.member = {}
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
  ADD_MEMBER (state, result) {
    state.members.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
