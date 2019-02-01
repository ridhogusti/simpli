// store  Product or service  Product
import ApiService from '@/common/api.service'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE, NUMBER_OF_PAGES } from '@/common/config'
import { GET_STATE_PRODUCTS, GET_PRODUCTS, GET_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT} from '@/store/actions.type'

// initial state
const state = {
  dialogState: false,
  products: [],
  product: {},
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
  productcategory: [],
  brand: [],
  department: [],
  tax: [],
  unit: []
}
// getters
const getters = {
  getProducts: (state) => {
  },
  getProductError: (state) => {
    return state.error
  },
  getProductCategoryOfProduct: (state) => {
    return state.productcategory
  },
  getBrandOfProduct: (state) => {
    return state.brand
  },
  getDepartmentOfProduct: (state) => {
    return state.department
  },
  getTaxOfProduct: (state) => {
    return state.tax
  },
  getUnitOfProduct: (state) => {
    return state.unit
  }
}
// actions
const actions = {

          // get sorting product
  GET_SORTING_PRODUCTS (context, params) {
    context.state.tablestate.SortColumnName = params.SortColumnName
    context.state.tablestate.IsDescending = params.IsDescending
    context.dispatch(GET_STATE_PRODUCTS, context.state.tablestate)
  },
          // get pagination product
  GET_PAGINATION_PRODUCT (context, page) {
    let tmpNumberOfRowSkip = ((page - 1) * context.state.tablestate.NumberOfPages)
    context.state.tablestate.NumberOfRowSkip = tmpNumberOfRowSkip
    context.dispatch(GET_STATE_PRODUCTS, context.state.tablestate)
    context.state.paginations.currentPage = page
  },
          // search table state
  GET_SEARCH_PRODUCTS ({commit, dispatch, state}, keyword) {
    state.tablestate.SearchKeyword = keyword
    state.tablestate.NumberOfRowSkip = 0
    dispatch(GET_STATE_PRODUCTS)
  },
          // action get state Product
  [GET_STATE_PRODUCTS] (context, params) {
    if (typeof params !== 'undefined') {
      context.state.tablestate = params
    }
    context.commit('CLEAR_PRODUCT')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.query('/api/product/state', {
        params: context.state.tablestate
      })
              .then((result) => {
                context.commit('SET_PRODUCTS', {results: result.data})
                resolve(result)
              }).catch((err) => {
                reject(err)
              })
    })
  },
          // action get Products
  [GET_PRODUCTS] (context) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/product/list')
              .then((result) => {
                context.commit('SET_PRODUCTS', {results: result.data})
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
    })
  },
          // action get  Product by ...
  [GET_PRODUCT] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/product', slug)
              .then((result) => {
                // console.log(result, 'tasoetu')
                resolve(result)
                context.commit('SET_PRODUCT', result.data)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
    })
  },
          // action create Product
  [CREATE_PRODUCT] (context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post('/api/product', formData)
              .then((result) => {
                context.commit('CLEAR_ERROR')
                context.commit('ADD_PRODUCT', result.data)
                resolve(result)
              }).catch((err) => {
                context.commit('SET_ERROR', {result: err.message})
                reject(err)
              })
    })
  },
          // action update Product
  [UPDATE_PRODUCT] (context, datas) {
    context.commit('CLEAR_ERROR')
    let id = context.state.product.Id
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.put('/api/product/' + id, datas)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
    })
  },
          // action delete Product
  [DELETE_PRODUCT] (context, slug) {
    context.commit('CLEAR_ERROR')
    return new Promise((resolve, reject) => {
      ApiService.delete('/api/product/' + slug)
              .then((result) => {
                resolve(result)
              }).catch((err) => {
                reject(err)
                context.commit('SET_ERROR', {result: err.message})
              })
    })
  },

              // get'+ProductCategory+'Of'+Product
  GET_PRODUCTCATEGORY_OF_PRODUCT (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/productcategory')
                  .then((result) => {
                    this.state.productcategory.productcategorys = result.data
                    resolve(result)
                  }).catch((err) => {
                    reject(err)
                  })
    })
  },

              // get'+Brand+'Of'+Product
  GET_BRAND_OF_PRODUCT (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/brand')
                  .then((result) => {
                    this.state.brand.brands = result.data
                    resolve(result)
                  }).catch((err) => {
                    reject(err)
                  })
    })
  },

              // get'+Department+'Of'+Product
  GET_DEPARTMENT_OF_PRODUCT (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/department')
                  .then((result) => {
                    this.state.department.departments = result.data
                    resolve(result)
                  }).catch((err) => {
                    reject(err)
                  })
    })
  },

              // get'+Tax+'Of'+Product
  GET_TAX_OF_PRODUCT (context, params) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader()
      ApiService.get('/api/tax')
                  .then((result) => {
                    this.state.tax.taxs = result.data
                    resolve(result)
                  }).catch((err) => {
                    reject(err)
                  })
    })
  },

              // get'+Unit+'Of'+Product
  GET_UNIT_OF_PRODUCT (context, params) {
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
  }

}
// mutations
const mutations = {
  SET_PRODUCTS (state, {results}) {
    state.products = results.data
    state.paginations.pageLength = results.numberOfPages
  },
  SET_PRODUCT (state, result) {
    state.product = result
  },
  CLEAR_PRODUCT (state) {
    state.product = {}
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
  ADD_PRODUCT (state, result) {
    state.products.push(result)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
