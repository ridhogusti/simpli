/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/accounts'
import employee from './modules/employee'
import userStore from './modules/users'
import auth from './modules/auth'
import lang from './modules/lang'
import paymentmethod from './modules/paymentmethod'
import product from './modules/product'
import productcategory from './modules/productcategory'
import payment from './modules/payment'
import order from './modules/order'
import brand from './modules/brand'
import productunit from './modules/productunit'
import productvariant from './modules/productvariant'
import department from './modules/department'
import orderitem from './modules/orderitem'
import member from './modules/member'
import shift from './modules/shift'
import cashup from './modules/cashup'
import cashupitem from './modules/cashupitem'
import employeeitemshift from './modules/employeeitemshift'
import purchase from './modules/purchase'
import purchaseorder from './modules/purchaseorder'
import stockadjustment from './modules/stockadjustment'
import GoodsReceiptStore from './modules/goodsreceipt'
import pricelist from './modules/pricelist'
import purchaseretur from './modules/purchaseretur'
import purchaseitem from './modules/purchaseitem'
import supplier from './modules/supplier'
import warehouse from './modules/warehouse';
import warehousetype from './modules/warehousetype';
import tax from './modules/tax'
import paymentterm from './modules/paymentterm'
import unit from './modules/unit'
import stockmovement from './modules/stockmovement'
import stocktransfer from './modules/stocktransfer'
import stock from './modules/stock'
// component store
Vue.use(Vuex)
const store = new Vuex.Store({
modules: {
account,
employee,
userStore,
auth,
lang,
paymentmethod,
product,
productcategory,
payment,
order,
brand,
productunit,
productvariant,
department,
orderitem,
member,
shift,
cashup,
cashupitem,
employeeitemshift,
purchase,
GoodsReceiptStore,
pricelist,
purchaseretur,
purchaseitem,
supplier,
warehouse,
warehousetype,
tax,
paymentterm,
unit,
stockmovement,
stock,
purchaseorder,
stockadjustment,
stocktransfer
// module store
}
})
export default store
