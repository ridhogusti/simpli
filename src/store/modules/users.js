// library axios
import axios from 'axios'

// api users
let ApiUser = 'http://localhost:7977/api/token'

// let headersX = new Headers()/j
// headersX.append('Content-Type', 'applicationson')
// headersX.append('Content-Type', 'application/x-www-form-urlencoded')
// headersX.append('Accept', 'application/json')
// headersX.append('Access-Control-Allow-Origin', '*')
// headersX.append('Access-Control-Allow-Credentials', 'true')
// headersX.append('GET', 'POST', 'OPTIONS')

let axiosConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  }
}

const state = {
  user: {},
  iniUsername: 'admin',
  iniPassword: 'admin',
  getRole: (role) => {
    let roles = window.localStorage.getItem('userRoles')
    if (roles !== null) {
      roles = roles.split(',')
      const _role = find(roles, (data) => {
        return data === role
      })
      return _role
    }
    return ''
  },
  getBreadCrumbs () {
    let path = window.location.pathname
    let breadcrumbs = [{
      name: 'HOME',
      href: '/home/',
      disabled: false
    }]
    path = path.substr(1)
    let array = path.split('/')
    var temp = ''
    for (var i = 0; i < 2; i++) {
      if (array[i] !== '') {
        if (array[i] !== 'home') {
          temp += '/' + array[i] + '/'
          let disabled = false
          if (i === array.length - 1) {
            disabled = true
          }
          breadcrumbs.push({
            name: array[i].toUpperCase(),
            href: temp,
            disabled: disabled
          })
        }
      }
    }
    return breadcrumbs
  }
}

const actions = {
  loginUser ({commit, state}) {
    // token ku
    // let dataLogin = {
    //   username: state.user.Username,
    //   password: state.user.Password
    // }
    let dataLogin = 'username=' + state.user.Username + '&password=' + state.user.Password
    return new Promise((resolve, reject) => {
      axios.post(ApiUser, dataLogin, {
        axiosConfig
      })
      .then((response) => {
        window.localStorage.setItem('mytoken', response.data.token)
        window.localStorage.setItem('myroles', response.data.roles)
        resolve(response)
        console.log(response.data)
      }).catch((err) => {
        alert(err.message)
        // alert(err.headers)
        console.log(err.message)
        reject(err)
      })
    })
  },
  logoutUser ({commit, state}) {
    return new Promise((resolve, reject) => {
      if (window.localStorage.removeItem('mytoken') === false) {
        let err = { message: 'error logout' }
        reject(err)
      } else {
        resolve('success')
      }
    })
  },
  cekLogin ({commit, state}) {
    let cek = window.localStorage.getItem('mytoken')
    return new Promise((resolve, reject) => {
      if (cek === null) {
        let err = 'must login'
        reject(err)
      } else {
        let success = 'good'
        resolve(success)
      }
    })
  }
}

export default{
  state,
  actions
}
