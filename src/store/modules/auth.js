import ApiService from '@/common/api.service'
import JwtService from '@/common/jwt.service'
import { LOGIN, LOGOUT, CHECK_AUTH } from '@/store/actions.type'
// import axios from 'axios'

const state = {
  user: {},
  error: {},
  isAuth: false
}

const getters = {
  currentUser(state) {
    return state.user
  },

  isAuth(state) {
    return state.isAuth
  }
}

const actions = {
  [LOGIN](context, formDatas) {
    return new Promise((resolve, reject) => {
      ApiService.post('/account/login', formDatas)
        .then((result) => {
          context.commit('SET_AUTH', result.data)
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  [LOGOUT](context) {
    context.commit('PURGE_AUTH')
  },
  [CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      // console.log('Ada')
      // return 1
    } else {
      // console.log('Tidak Ada')
      // return 0
    }
  }
}

const mutations = {
  SET_AUTH(state, datas) {
    state.isAuth = true
    // state.user = user
    state.errors = {}
    JwtService.saveToken(datas.token)
    window.localStorage.setItem('roles', datas.roles)
  },
  PURGE_AUTH(state) {
    state.isAuth = false
    state.user = {}
    state.errors = {}
    // JwtService.destroyToken()
    window.localStorage.clear()
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
  actions,
  getters,
  mutations
}
