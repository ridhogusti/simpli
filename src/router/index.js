import Vue from 'vue'
import Router from 'vue-router'
// Layout Admin Dashboard
import Default from '@/components/UIComponents/Layout'
// Home
import Home from '@/components/Home'
// Employee
import EmployeeList from '@/components/employee/List'
import EmployeeCreate from '@/components/employee/Create'
import EmployeeEdit from '@/components/employee/Edit'
// Account
import AccountList from '@/components/account/List'
import AccountCreate from '@/components/account/Create'
import AccountEdit from '@/components/account/Edit'
// user login
import UserLogin from '@/components/user/Login'
import UserLogout from '@/components/user/Logout'
// PaymentMethod
import PaymentMethodList from '@/components/paymentmethod/List'
import PaymentMethodCreate from '@/components/paymentmethod/Create'
import PaymentMethodEdit from '@/components/paymentmethod/Edit'
// Product
import ProductList from '@/components/product/List'
import ProductCreate from '@/components/product/Create'
import ProductEdit from '@/components/product/Edit'
// ProductCategory
import ProductCategoryList from '@/components/productcategory/List'
import ProductCategoryCreate from '@/components/productcategory/Create'
import ProductCategoryEdit from '@/components/productcategory/Edit'
// Payment
import PaymentList from '@/components/payment/List'
import PaymentCreate from '@/components/payment/Create'
import PaymentEdit from '@/components/payment/Edit'
// Brand
import BrandList from '@/components/brand/List'
import BrandCreate from '@/components/brand/Create'
import BrandEdit from '@/components/brand/Edit'
// ProductUnit
import ProductUnitList from '@/components/productunit/List'
import ProductUnitCreate from '@/components/productunit/Create'
import ProductUnitEdit from '@/components/productunit/Edit'
// ProductVariant
import ProductVariantList from '@/components/productvariant/List'
import ProductVariantCreate from '@/components/productvariant/Create'
import ProductVariantEdit from '@/components/productvariant/Edit'
// Department
import DepartmentList from '@/components/department/List'
import DepartmentCreate from '@/components/department/Create'
import DepartmentEdit from '@/components/department/Edit'
// Order
import OrderList from '@/components/order/List'
import OrderCreate from '@/components/order/Create'
import OrderEdit from '@/components/order/Edit'
// OrderItem
import OrderItemList from '@/components/orderitem/List'
import OrderItemCreate from '@/components/orderitem/Create'
import OrderItemEdit from '@/components/orderitem/Edit'
// Member
import MemberList from '@/components/member/List'
import MemberCreate from '@/components/member/Create'
import MemberEdit from '@/components/member/Edit'
// Shift
import ShiftList from '@/components/shift/List'
import ShiftCreate from '@/components/shift/Create'
import ShiftEdit from '@/components/shift/Edit'
// CashUp
import CashUpList from '@/components/cashup/List'
import CashUpCreate from '@/components/cashup/Create'
import CashUpEdit from '@/components/cashup/Edit'
// CashUpItem
import CashUpItemList from '@/components/cashupitem/List'
import CashUpItemCreate from '@/components/cashupitem/Create'
import CashUpItemEdit from '@/components/cashupitem/Edit'
// EmployeeItemShift
import EmployeeItemShiftList from '@/components/employeeitemshift/List'
import EmployeeItemShiftCreate from '@/components/employeeitemshift/Create'
import EmployeeItemShiftEdit from '@/components/employeeitemshift/Edit'

// Purchase
import PriceListList from '@/components/pricelist/List'
import PriceListCreate from '@/components/pricelist/Create'
import PriceListEdit from '@/components/pricelist/Edit'
import PriceListApprove from '@/components/pricelist/Approve'
// import PriceListDetail from '@/components/pricelist/Detail'

// Purchase
import PurchaseList from '@/components/purchase/List'
import PurchaseCreate from '@/components/purchase/Create'
import PurchaseEdit from '@/components/purchase/Edit'
import PurchaseApprove from '@/components/purchase/Approve'
import PurchaseReturn from '@/components/purchase/Return'
import PurchaseCancel from '@/components/purchase/Cancel'
import PurchaseDetail from '@/components/purchase/Detail'

// Stock Adjustment
import StockAdjustmentList from '@/components/stockadjustment/List'
import StockAdjustmentCreate from '@/components/stockadjustment/Create'
import StockAdjustmentApprove from '@/components/stockadjustment/Approve'
import StockAdjustmentCancel from '@/components/stockadjustment/Cancel'
import StockAdjustmentDetail from '@/components/stockadjustment/Detail'
import StockAdjustmentEdit from '@/components/stockadjustment/Edit'

// PurchaseOrder
import PurchaseOrderList from '@/components/purchaseorder/List'
import PurchaseOrderCreate from '@/components/purchaseorder/Create'
import PurchaseOrderEdit from '@/components/purchaseorder/Edit'
import PurchaseOrderApprove from '@/components/purchaseorder/Approve'
import PurchaseOrderCancel from '@/components/purchaseorder/Cancel'
import PurchaseOrderDetail from '@/components/purchaseorder/Detail'
import PurchaseOrderCompleted from '@/components/purchaseorder/Completed'

// PurchaseRetur
import PurchaseReturList from '@/components/purchaseretur/List'
import PurchaseReturCreate from '@/components/purchaseretur/Create'
import PurchaseReturEdit from '@/components/purchaseretur/Edit'
import PurchaseReturApprove from '@/components/purchaseretur/Approve'
import PurchaseReturDetail from '@/components/purchaseretur/Detail'
// PurchaseItem
import PurchaseItemList from '@/components/purchaseitem/List'
import PurchaseItemCreate from '@/components/purchaseitem/Create'
import PurchaseItemEdit from '@/components/purchaseitem/Edit'
// Supllier
import SupplierList from '@/components/supplier/List'
import SupplierCreate from '@/components/supplier/Create'
import SupplierEdit from '@/components/supplier/Edit'
// Warehouse
import WarehouseList from '@/components/warehouse/List'
import WarehouseCreate from '@/components/warehouse/Create'
import WarehouseEdit from '@/components/warehouse/Edit'
// Warehouse
import WarehouseTypeList from '@/components/warehousetype/List'
import WarehouseTypeCreate from '@/components/warehousetype/Create'
import WarehouseTypeEdit from '@/components/warehousetype/Edit'
// Tax
import TaxList from '@/components/tax/List'
import TaxCreate from '@/components/tax/Create'
import TaxEdit from '@/components/tax/Edit'
// PaymentTerm
import PaymentTermList from '@/components/paymentterm/List'
import PaymentTermCreate from '@/components/paymentterm/Create'
import PaymentTermEdit from '@/components/paymentterm/Edit'
// Unit
import UnitList from '@/components/unit/List'
import UnitCreate from '@/components/unit/Create'
import UnitEdit from '@/components/unit/Edit'
// StockMovement
import StockMovementList from '@/components/stockmovement/List'
import StockMovementCreate from '@/components/stockmovement/Create'
import StockMovementEdit from '@/components/stockmovement/Edit'
// Stock
import StockList from '@/components/stock/List'
import StockCreate from '@/components/stock/Create'
import StockEdit from '@/components/stock/Edit'
// Goods Receipt
import GoodsReceiptList from '@/components/goodsreceipt/List'
import GoodsReceiptCreate from '@/components/goodsreceipt/Create'
import GoodsReceiptEdit from '@/components/goodsreceipt/Edit'
import GoodsReceiptApprove from '@/components/goodsreceipt/Approve'
import GoodsReceiptCancel from '@/components/goodsreceipt/Cancel'
import GoodsReceiptDetail from '@/components/goodsreceipt/Detail'
// Stock Transver
import StockTransferList from '@/components/stocktransfer/List'
import StockTransferCreate from '@/components/stocktransfer/Create'
import StockTransferDetail from '@/components/stocktransfer/Detail'
import StockTransferEdit from '@/components/stocktransfer/Edit'
import StockTransferApprove from '@/components/stocktransfer/Approve'
import StockTransferCancel from '@/components/stocktransfer/Cancel'


// Message Broker
// import MessageBroker from '@/components/setting/MessageBroker'
// end components

Vue.use(Router)
export default new Router({
  mode: 'history',
// routes simpli
  routes: [
    {
      path: '//',
      redirect: '/home',
      meta: 'Home',
      name: 'home',
      component: Default,
      children: [
        {
          path: 'home',
          meta: 'List',
          component: Home
        },
        {
          path: 'employee',
          redirect: '/employee',
          meta: 'Employee',
          name: 'employee',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: EmployeeList
            },
            {
              path: 'create',
              name: 'employee-create',
              meta: 'Create',
              component: EmployeeCreate
            },
            {
              path: 'edit/:id',
              name: 'employee-edit',
              meta: 'Edit',
              props: true,
              component: EmployeeEdit
            }
          ]
        },
        {
          path: 'account',
          redirect: '/account',
          name: 'account',
          meta: 'Account',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: AccountList
            },
            {
              path: 'create',
              name: 'account-create',
              meta: 'Create',
              component: AccountCreate
            },
            {
              path: 'edit/:id',
              name: 'account-edit',
              meta: 'Edit',
              props: true,
              component: AccountEdit
            }
          ]
        },
        {
          path: '/logout',
          name: 'logout',
          component: UserLogout
        },
        {
          path: 'paymentmethod',
          redirect: '/paymentmethod',
          meta: 'PaymentMethod',
          name: 'paymentmethod',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: PaymentMethodList
            },
            {
              path: 'create',
              name: 'paymentmethod-create',
              meta: 'Create',
              component: PaymentMethodCreate
            },
            {
              path: 'edit/:id',
              name: 'paymentmethod-edit',
              meta: 'Edit',
              props: true,
              component: PaymentMethodEdit
            }
          ]
        },
        {
          path: 'product',
          redirect: '/product',
          meta: 'Product',
          name: 'product',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: ProductList
            },
            {
              path: 'create',
              name: 'product-create',
              meta: 'Create',
              component: ProductCreate
            },
            {
              path: 'edit/:id',
              name: 'product-edit',
              meta: 'Edit',
              props: true,
              component: ProductEdit
            }
          ]
        },
        {
          path: 'productcategory',
          redirect: '/productcategory',
          meta: 'ProductCategory',
          name: 'productcategory',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: ProductCategoryList
            },
            {
              path: 'create',
              name: 'productcategory-create',
              meta: 'Create',
              component: ProductCategoryCreate
            },
            {
              path: 'edit/:id',
              name: 'productcategory-edit',
              meta: 'Edit',
              props: true,
              component: ProductCategoryEdit
            }
          ]
        },
        {
          path: 'payment',
          redirect: '/payment',
          meta: 'Payment',
          name: 'payment',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: PaymentList
            },
            {
              path: 'create',
              name: 'payment-create',
              meta: 'Create',
              component: PaymentCreate
            },
            {
              path: 'edit/:id',
              name: 'payment-edit',
              meta: 'Edit',
              props: true,
              component: PaymentEdit
            }
          ]
        },
        {
          path: 'brand',
          redirect: '/brand',
          meta: 'Brand',
          name: 'brand',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: BrandList
            },
            {
              path: 'create',
              name: 'brand-create',
              meta: 'Create',
              component: BrandCreate
            },
            {
              path: 'edit/:id',
              name: 'brand-edit',
              meta: 'Edit',
              props: true,
              component: BrandEdit
            }
          ]
        },
        {
          path: 'productunit',
          redirect: '/productunit',
          meta: 'ProductUnit',
          name: 'productunit',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: ProductUnitList
            },
            {
              path: 'create',
              name: 'productunit-create',
              meta: 'Create',
              component: ProductUnitCreate
            },
            {
              path: 'edit/:id',
              name: 'productunit-edit',
              meta: 'Edit',
              props: true,
              component: ProductUnitEdit
            }
          ]
        },
        {
          path: 'productvariant',
          redirect: '/productvariant',
          meta: 'ProductVariant',
          name: 'productvariant',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: ProductVariantList
            },
            {
              path: 'create',
              name: 'productvariant-create',
              meta: 'Create',
              component: ProductVariantCreate
            },
            {
              path: 'edit/:id',
              name: 'productvariant-edit',
              meta: 'Edit',
              props: true,
              component: ProductVariantEdit
            }
          ]
        },
        {
          path: 'department',
          redirect: '/department',
          meta: 'Department',
          name: 'department',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: DepartmentList
            },
            {
              path: 'create',
              name: 'department-create',
              meta: 'Create',
              component: DepartmentCreate
            },
            {
              path: 'edit/:id',
              name: 'department-edit',
              meta: 'Edit',
              props: true,
              component: DepartmentEdit
            }
          ]
        },
        {
          path: 'order',
          redirect: '/order',
          meta: 'Order',
          name: 'order',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: OrderList
            },
            {
              path: 'create',
              name: 'order-create',
              meta: 'Create',
              component: OrderCreate
            },
            {
              path: 'edit/:id',
              name: 'order-edit',
              meta: 'Edit',
              props: true,
              component: OrderEdit
            }
          ]
        },
        {
          path: 'orderitem',
          redirect: '/orderitem',
          meta: 'OrderItem',
          name: 'orderitem',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: OrderItemList
            },
            {
              path: 'create',
              name: 'orderitem-create',
              meta: 'Create',
              component: OrderItemCreate
            },
            {
              path: 'edit/:id',
              name: 'orderitem-edit',
              meta: 'Edit',
              props: true,
              component: OrderItemEdit
            }
          ]
        },
        {
          path: 'member',
          redirect: '/member',
          meta: 'Member',
          name: 'member',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: MemberList
            },
            {
              path: 'create',
              name: 'member-create',
              meta: 'Create',
              component: MemberCreate
            },
            {
              path: 'edit/:id',
              name: 'member-edit',
              meta: 'Edit',
              props: true,
              component: MemberEdit
            }
          ]
        },
        {
          path: 'shift',
          redirect: '/shift',
          meta: 'Shift',
          name: 'shift',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: ShiftList
            },
            {
              path: 'create',
              name: 'shift-create',
              meta: 'Create',
              component: ShiftCreate
            },
            {
              path: 'edit/:id',
              name: 'shift-edit',
              meta: 'Edit',
              props: true,
              component: ShiftEdit
            }
          ]
        },
        {
          path: 'cashup',
          redirect: '/cashup',
          meta: 'CashUp',
          name: 'cashup',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: CashUpList
            },
            {
              path: 'create',
              name: 'cashup-create',
              meta: 'Create',
              component: CashUpCreate
            },
            {
              path: 'edit/:id',
              name: 'cashup-edit',
              meta: 'Edit',
              props: true,
              component: CashUpEdit
            }
          ]
        },
        {
          path: 'cashupitem',
          redirect: '/cashupitem',
          meta: 'CashUpItem',
          name: 'cashupitem',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: CashUpItemList
            },
            {
              path: 'create',
              name: 'cashupitem-create',
              meta: 'Create',
              component: CashUpItemCreate
            },
            {
              path: 'edit/:id',
              name: 'cashupitem-edit',
              meta: 'Edit',
              props: true,
              component: CashUpItemEdit
            }
          ]
        },
        {
          path: 'employeeitemshift',
          redirect: '/employeeitemshift',
          meta: 'EmployeeItemShift',
          name: 'employeeitemshift',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: EmployeeItemShiftList
            },
            {
              path: 'create',
              name: 'employeeitemshift-create',
              meta: 'Create',
              component: EmployeeItemShiftCreate
            },
            {
              path: 'edit/:id',
              name: 'employeeitemshift-edit',
              meta: 'Edit',
              props: true,
              component: EmployeeItemShiftEdit
            }
          ]
        },
        {
          path: 'goodsreceipt',
          redirect: '/goodsreceipt',
          meta: 'GoodsReceipt',
          name: 'goodsreceipt',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: GoodsReceiptList
            },
            {
              path: 'create/:id',
              name: 'goodsreceipt-create',
              meta: 'Create',
              props: true,
              component: GoodsReceiptCreate
            },
            {
              path: 'edit/:id',
              name: 'goodsreceipt-edit',
              meta: 'Edit',
              props: true,
              component: GoodsReceiptEdit
            },
            {
              path: 'approve/:id',
              name: 'goodsreceipt-approve',
              meta: 'Approve',
              props: true,
              component: GoodsReceiptApprove
            },
            {
              path: 'cancel/:id',
              name: 'goodsreceipt-cancel',
              meta: 'Cancel',
              props: true,
              component: GoodsReceiptCancel
            },
            {
              path: 'detail/:id',
              name: 'goodsreceipt-detail',
              meta: 'Detail',
              props: true,
              component: GoodsReceiptDetail
            }
          ]
        },
        {
          path: 'stocktransfer',
          redirect: '/stocktransfer',
          meta: 'StockTransfer',
          name: 'stocktransfer',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: StockTransferList
            },
            {
              path: 'create',
              name: 'stocktransfer-create',
              meta: 'Create',
              props: true,
              component: StockTransferCreate
            },
            {
              path: 'edit/:id',
              name: 'stocktransfer-edit',
              meta: 'Edit',
              props: true,
              component: StockTransferEdit
            },
            {
              path: 'approve/:id',
              name: 'stocktransfer-approve',
              meta: 'Approve',
              props: true,
              component: StockTransferApprove
            },
            {
              path: 'cancel/:id',
              name: 'stocktransfer-cancel',
              meta: 'Cancel',
              props: true,
              component: StockTransferCancel
            },
            {
              path: 'detail/:id',
              name: 'stocktransfer-detail',
              meta: 'Detail',
              props: true,
              component: StockTransferDetail
            }
          ]
        },
        {
          path: 'purchase',
          redirect: '/purchase',
          meta: 'Purchase',
          name: 'purchase',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: PurchaseList
            },
            {
              path: 'create',
              name: 'purchase-create',
              meta: 'Create',
              component: PurchaseCreate
            },
            {
              path: 'create/:id',
              name: 'purchase-create-po',
              meta: 'Create',
              props: true,
              component: PurchaseCreate
            },
            {
              path: 'edit/:id',
              name: 'purchase-edit',
              meta: 'Edit',
              props: true,
              component: PurchaseEdit
            },
            {
              path: 'approve/:id',
              name: 'purchase-approve',
              meta: 'Approve',
              props: true,
              component: PurchaseApprove
            },
            {
              path: 'cancel/:id',
              name: 'purchase-cancel',
              meta: 'Cancel',
              props: true,
              component: PurchaseCancel
            },
            {
              path: 'return/:id',
              name: 'purchase-return',
              meta: 'Return',
              props: true,
              component: PurchaseReturn
            },
            {
              path: 'detail/:id',
              name: 'purchase-detail',
              meta: 'Detail',
              props: true,
              component: PurchaseDetail
            }
          ]
        },
        {
          path: 'stockadjustment',
          redirect: '/stockadjustment',
          meta: 'StockAdjustment',
          name: 'stockadjustment',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: StockAdjustmentList
            },
            {
              path: 'create',
              name: 'stockadjustment-create',
              meta: 'Create',
              component: StockAdjustmentCreate
            },
            {
              path: 'create/:id',
              name: 'stockadjustment-create-po',
              meta: 'Create',
              props: true,
              component: StockAdjustmentCreate
            },
            {
              path: 'edit/:id',
              name: 'stockadjustment-edit',
              meta: 'Edit',
              props: true,
              component: StockAdjustmentEdit
            },
            {
              path: 'approve/:id',
              name: 'stockadjustment-approve',
              meta: 'Approve',
              props: true,
              component: StockAdjustmentApprove
            },
            {
              path: 'cancel/:id',
              name: 'stockadjustment-cancel',
              meta: 'Cancel',
              props: true,
              component: StockAdjustmentCancel
            },
            // {
            //   path: 'cancel/:id',
            //   name: 'stockadjustment-cancel',
            //   meta: 'Cancel',
            //   props: true,
            //   component: StockAdjustmentCancel
            // },
            // {
            //   path: 'return/:id',
            //   name: 'stockadjustment-return',
            //   meta: 'Return',
            //   props: true,
            //   component: StockAdjustmentReturn
            // },
            {
              path: 'detail/:id',
              name: 'stockadjustment-detail',
              meta: 'Detail',
              props: true,
              component: StockAdjustmentDetail
            }
          ]
        },
        {
          path: 'purchaseorder',
          redirect: '/purchaseorder',
          meta: 'PurchaseOrder',
          name: 'purchaseorder',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: PurchaseOrderList
            },
            {
              path: 'create',
              name: 'purchaseorder-create',
              meta: 'Create',
              component: PurchaseOrderCreate
            },
            {
              path: 'edit/:id',
              name: 'purchaseorder-edit',
              meta: 'Edit',
              props: true,
              component: PurchaseOrderEdit
            },
            {
              path: 'approve/:id',
              name: 'purchaseorder-approve',
              meta: 'Approve',
              props: true,
              component: PurchaseOrderApprove
            },
            {
              path: 'cancel/:id',
              name: 'purchaseorder-cancel',
              meta: 'Cancel',
              props: true,
              component: PurchaseOrderCancel
            },
            {
              path: 'detail/:id',
              name: 'purchaseorder-detail',
              meta: 'Detail',
              props: true,
              component: PurchaseOrderDetail
            },
            {
              path: 'completed/:id',
              name: 'purchaseorder-completed',
              meta: 'Completed',
              props: true,
              component: PurchaseOrderCompleted
            }
          ]
        },
        {
          path: 'pricelist',
          redirect: '/pricelist',
          meta: 'PriceList',
          name: 'pricelist',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: PriceListList
            },
            {
              path: 'create',
              name: 'pricelist-create',
              meta: 'Create',
              component: PriceListCreate
            },
            {
              path: 'edit/:id',
              name: 'pricelist-edit',
              meta: 'Edit',
              props: true,
              component: PriceListEdit
            },
            {
              path: 'approve/:id',
              name: 'pricelist-approve',
              meta: 'Approve',
              props: true,
              component: PriceListApprove
            }
            // {
            //   path: 'detail/:id',
            //   name: 'pricelist-detail',
            //   meta: 'Detail',
            //   props: true,
            //   component: PriceListDetail
            // }
          ]
        },
        {
          path: 'purchaseretur',
          redirect: '/purchaseretur',
          meta: 'PurchaseRetur',
          name: 'purchaseretur',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: PurchaseReturList
            },
            {
              path: 'create',
              name: 'purchaseretur-create',
              meta: 'Create',
              component: PurchaseReturCreate
            },
            {
              path: 'edit/:id',
              name: 'purchaseretur-edit',
              meta: 'Edit',
              props: true,
              component: PurchaseReturEdit
            },
            {
              path: 'approve/:id',
              name: 'purchaseretur-approve',
              meta: 'Approve',
              props: true,
              component: PurchaseReturApprove
            },
            {
              path: 'detail/:id',
              name: 'purchaseretur-detail',
              meta: 'Detail',
              props: true,
              component: PurchaseReturDetail
            }
          ]
        },
        {
          path: 'purchaseitem',
          redirect: '/purchaseitem',
          meta: 'PurchaseItem',
          name: 'purchaseitem',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: PurchaseItemList
            },
            {
              path: 'create',
              name: 'purchaseitem-create',
              meta: 'Create',
              component: PurchaseItemCreate
            },
            {
              path: 'edit/:id',
              name: 'purchaseitem-edit',
              meta: 'Edit',
              props: true,
              component: PurchaseItemEdit
            }
          ]
        },
        {
          path: 'supplier',
          redirect: '/supplier',
          meta: 'Supplier',
          name: 'supplier',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: SupplierList
            },
            {
              path: 'create',
              name: 'supplier-create',
              meta: 'Create',
              component: SupplierCreate
            },
            {
              path: 'edit/:id',
              name: 'supplier-edit',
              meta: 'Edit',
              props: true,
              component: SupplierEdit
            }
          ]
        },
        {
          path: 'warehouse',
          redirect: '/warehouse',
          meta: 'Warehouse',
          name: 'warehouse',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: WarehouseList
            },
            {
              path: 'create',
              name: 'warehouse-create',
              meta: 'Create',
              component: WarehouseCreate
            },
            {
              path: 'edit/:id',
              name: 'warehouse-edit',
              meta: 'Edit',
              props: true,
              component: WarehouseEdit
            }
          ]
        },
        {
          path: 'warehousetype',
          redirect: '/warehousetype',
          meta: 'WarehouseType',
          name: 'warehousetype',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: WarehouseTypeList
            },
            {
              path: 'create',
              name: 'warehousetype-create',
              meta: 'Create',
              component: WarehouseTypeCreate
            },
            {
              path: 'edit/:id',
              name: 'warehousetype-edit',
              meta: 'Edit',
              props: true,
              component: WarehouseTypeEdit
            }
          ]
        },
        {
          path: 'tax',
          redirect: '/tax',
          meta: 'Tax',
          name: 'tax',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: TaxList
            },
            {
              path: 'create',
              name: 'tax-create',
              meta: 'Create',
              component: TaxCreate
            },
            {
              path: 'edit/:id',
              name: 'tax-edit',
              meta: 'Edit',
              props: true,
              component: TaxEdit
            }
          ]
        },
        {
          path: 'paymentterm',
          redirect: '/paymentterm',
          meta: 'PaymentTerm',
          name: 'paymentterm',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: PaymentTermList
            },
            {
              path: 'create',
              name: 'paymentterm-create',
              meta: 'Create',
              component: PaymentTermCreate
            },
            {
              path: 'edit/:id',
              name: 'paymentterm-edit',
              meta: 'Edit',
              props: true,
              component: PaymentTermEdit
            }
          ]
        },
        {
          path: 'unit',
          redirect: '/unit',
          meta: 'Unit',
          name: 'unit',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: UnitList
            },
            {
              path: 'create',
              name: 'unit-create',
              meta: 'Create',
              component: UnitCreate
            },
            {
              path: 'edit/:id',
              name: 'unit-edit',
              meta: 'Edit',
              props: true,
              component: UnitEdit
            }
          ]
        },
        {
          path: 'stockmovement',
          redirect: '/stockmovement',
          meta: 'StockMovement',
          name: 'stockmovement',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: StockMovementList
            },
            {
              path: 'create',
              name: 'stockmovement-create',
              meta: 'Create',
              component: StockMovementCreate
            },
            {
              path: 'edit/:id',
              name: 'stockmovement-edit',
              meta: 'Edit',
              props: true,
              component: StockMovementEdit
            }
          ]
        },
        {
          path: 'stock',
          redirect: '/stock',
          meta: 'Stock',
          name: 'stock',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              meta: 'List',
              component: StockList
            },
            {
              path: 'create',
              name: 'stock-create',
              meta: 'Create',
              component: StockCreate
            },
            {
              path: 'edit/:id',
              name: 'stock-edit',
              meta: 'Edit',
              props: true,
              component: StockEdit
            }
          ]
        },
        {
          path: 'setting',
          redirect: '/setting/messagebroker',
          meta: 'Setting',
          name: 'messagebroker',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'messagebroker',
              meta: 'MessageBroker'
              // component: MessageBroker
            }
          ]
        }
        // add master data
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: UserLogin
    }
  ]
// end routes
})
