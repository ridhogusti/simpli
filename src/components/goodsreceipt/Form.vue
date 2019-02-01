<template>
  <div>
    <Header 
      :GoodsReceipt="GoodsReceipt" 
      :showDialogSupplier="showDialogSupplier" 
      :showDialogWarehouse="showDialogWarehouse" 
      :showDialogPaymentTerm="showDialogPaymentTerm" 
      :setDueDate="setDueDate" 
      :myFunctionSupplier="myFunctionSupplier" 
      :menu="menu" 
      :menusatu="menusatu"
      :saveDueDate="saveDueDate" 
      :saveDate="saveDate" 
      :Title="Title" 
      :modereadonly="modereadonly"
      :errorMessage="errorMessage" />
    <br>
    <Content :errorMessage="errorMessage" :productUnit="productUnit" :GoodsReceipt="GoodsReceipt" :headers="headers" :formatPrice="formatPrice" :lineTotal="lineTotal" :myFunction="myFunction" :changeTipeDiscount="changeTipeDiscount" :addRow="addRow" :removeRow="removeRow" :modereadonly="modereadonly" />
    <br>
    <Footer :errorMessage="errorMessage" :GoodsReceipt="GoodsReceipt" :changeTipeDiscountGrand="changeTipeDiscountGrand" :formatPrice="formatPrice" :subTotall="subTotall" :grandDiscountt="grandDiscountt" :grandTaxx="grandTaxx" :grandTotall="grandTotall" :modereadonly="modereadonly" />
  
    <FormDialogSupllier/>
    <FormDialogPaymentTerm/>
    <FormDialogWarehouse/>
  </div>
</template>

<style lang="css">
  .body {
    background-color: #f2f2f2;
  }
</style>

<script>
  import Header from '@/components/goodsreceipt/subcomponents/Header'
  import Content from '@/components/goodsreceipt/subcomponents/Content'
  import Footer from '@/components/goodsreceipt/subcomponents/Footer'
  import FormDialogSupllier from '@/components/supplier/FormDialog'
  import moment from 'moment'
  import FormDialogPaymentTerm from '@/components/paymentterm/FormDialog'
  import FormDialogWarehouse from '@/components/warehouse/FormDialog'
  import {
    GET_PRODUCT,
    GET_SUPPLIER,
    GET_PAYMENTTERM,
GET_PRODUCTUNIT
  } from '../../store/actions.type.js'
  import _ from "underscore"
  
  export default {
    props: [
      'GoodsReceipt',
      'Retur', 
      'Title', 
      'modereadonly',
      'errorMessage'],
    components: {
      FormDialogSupllier,
      FormDialogPaymentTerm,
      FormDialogWarehouse,
      Header,
      Content,
      Footer
    },
    data() {
      return {
        test: '',
        subTotal: 0,
        TipeDiscount: 'amount',
        toggle_discount: 0,
        grandTotal: 0,
        grandDiscount: 0,
        grandTax: 0,
        discountAmount: 0,
        discountPercentage: 0,
        date: null,
        menu: false,
        menusatu: false,
        productUnit: [],
        headers: [{
            text: 'No.',
            align: 'center',
            sortable: false,
            value: 'no'
          },
          {
            text: 'Product Name',
            value: 'productname',
            align: 'center'
          },
          {
            text: 'Description',
            align: 'center',
            value: 'description'
          },
          
          {
            text: 'Quantity',
            align: 'center',
            value: 'quantity'
          },
          
          {
            text: 'Action',
            align: 'center',
            value: 'action'
          }
        ]
      }
    },
    computed: {
      itemsHeader() {
        return this.$store.state.purchaseorder.purchaseorder;
      },
      items() {
        return this.$store.state.purchaseorder.purchaseorder.ListGoodsReceiptItem;
      },
      testMoment: function() {
        return moment(new Date()).format('YYYY')
      }
    },
    methods: {
      formatPrice(value) {
        let val = (value / 1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      },
      grandDiscountt: function() {
        var da = this.GoodsReceipt.DiscountAmount
        var dp = this.GoodsReceipt.DiscountPercentage
  
        if (this.GoodsReceipt.TipeDiscount === 'amount') {
          this.grandDiscount = da
          return this.GoodsReceipt.DiscountAmount
        } else if (this.GoodsReceipt.TipeDiscount === 'percentage') {
          dp = this.GoodsReceipt.DiscountPercentage / 100 * this.GoodsReceipt.SubTotal
          this.grandDiscount = dp
          return dp
        }
      },
      grandTaxx: function() {
        var t = 0
        t = _.reduce(this.GoodsReceipt.ListGoodsReceiptItem, function(total, item) {
          if (item.Tax === 'PPN') {
            total = total + item.LineTotal * (10 / 100)
          } else if (item.Tax === 'NoPPN') {
            total = total + 0
          }
          return (t = total);
        }, 0);
        // this.GoodsReceipt.ListGoodsReceiptItem.reduce(function(total, item) {
        //   console.log(item, ' di form purchaseorder')
        //   if (item.Tax === 'PPN') {
        //     total = total + item.LineTotal * (10 / 100)
        //   } else if (item.Tax === 'NoPPN') {
        //     total = total + 0
        //   }
        //   return (t = total)
        // }, 0)
        this.GoodsReceipt.TaxAmount = t
        return t
      },
      grandTotall: function() {
        var tax = 0
        if (this.GoodsReceipt.TipeDiscount === 'percentage') {
          this.GoodsReceipt.TotalPurchase = this.GoodsReceipt.SubTotal - this.grandDiscount + this.GoodsReceipt.TaxAmount
        } else if (this.GoodsReceipt.TipeDiscount === 'amount') {
          this.GoodsReceipt.TotalPurchase =
            this.GoodsReceipt.SubTotal - this.grandDiscount + this.GoodsReceipt.TaxAmount
        }
        return this.GoodsReceipt.TotalPurchase
      },
      subTotall: function() {
        var t = 0
        // this.GoodsReceipt.ListGoodsReceiptItem.reduce(function(total, item) {
        //   total = total + item.LineTotal
        //   return (t = total)
        // }, 0)
        t = _.reduce(this.GoodsReceipt.ListGoodsReceiptItem, function(total, item) {
          return total + item.LineTotal;
        }, 0);
        this.GoodsReceipt.SubTotal = t
        return t
      },
  
      lineTotal(index) {
        var t = 0,
          total = 0
        var quantity = 0,
          price = 0
        var discountPercentage = this.GoodsReceipt.ListGoodsReceiptItem[index]
          .DiscountPercentage,
          discountAmount = this.GoodsReceipt.ListGoodsReceiptItem[index].DiscountAmount
        quantity = this.GoodsReceipt.ListGoodsReceiptItem[index].Quantity
        price = this.GoodsReceipt.ListGoodsReceiptItem[index].ProductPrice
        total = price * quantity
        discountPercentage = discountPercentage / 100 * total
  
        if (this.GoodsReceipt.ListGoodsReceiptItem[index].TipeDiscount === 'amount') {
          t = total - discountAmount
        } else if (
          this.GoodsReceipt.ListGoodsReceiptItem[index].TipeDiscount === 'percentage'
        ) {
          t = total - discountPercentage
        }
        this.GoodsReceipt.ListGoodsReceiptItem[index].LineTotal = t
        return this.GoodsReceipt.ListGoodsReceiptItem[index].LineTotal
      },
      subTaxx: function() {
        var t = 0
        this.GoodsReceipt.ListGoodsReceiptItem.reduce(function(total, item) {
          total = total + item.tax
          return (t = total)
        }, 0)
        this.grandTax = t
        return t
      },
      myFunction(index) {
        var self = this
        setTimeout(function() {
          self.$store
            .dispatch(
              "GET_PRODUCTUNIT_PURCHASE",
              self.GoodsReceipt.ListGoodsReceiptItem[index].ProductUnitId
            )
            .then(response => {
              console.log(response, 'dari myfunction');
              self.GoodsReceipt.ListGoodsReceiptItem[index].ProductId = response.data.ProductId
              self.GoodsReceipt.ListGoodsReceiptItem[index].ProductDescription = response.data.Description
              self.GoodsReceipt.ListGoodsReceiptItem[index].ProductPrice = response.data.PriceListItem.Price
              self.GoodsReceipt.ListGoodsReceiptItem[index].ProductName = response.data.Name
              self.GoodsReceipt.ListGoodsReceiptItem[index].ProductSKU = response.data.SKU
              self.GoodsReceipt.ListGoodsReceiptItem[index].Tax = response.data.Tax.Name
              self.GoodsReceipt.ListGoodsReceiptItem[index].UnitId = response.data.UnitId
            })
            .catch(err => {
              console.log('gagal', err)
            })
        }, 10)
      },
      myFunctionSupplier() {
        console.log('function supplier');
        var self = this
        setTimeout(function() {
          self.$store
            .dispatch(GET_SUPPLIER, self.GoodsReceipt.SupplierId)
            .then(response => {
              console.log(response, 'dari supplier');
              self.GoodsReceipt.PaymentTermId = self.$store.state.supplier.supplier.PaymentTermId
            })
            .catch(err => {
              console.log('gagal')
            })
        }, 10)
      },
      changeTipeDiscount(tipe, index) {
        console.log(tipe, index)
        console.log(this.GoodsReceipt.ListGoodsReceiptItem[index].ProductPrice * this.GoodsReceipt.ListGoodsReceiptItem[index].Quantity)
        this.GoodsReceipt.ListGoodsReceiptItem[index].DiscountAmount = this.GoodsReceipt.ListGoodsReceiptItem[index].ProductPrice * this.GoodsReceipt.ListGoodsReceiptItem[index].Quantity * (this.GoodsReceipt.ListGoodsReceiptItem[index].DiscountPercentage / 100)
        this.GoodsReceipt.ListGoodsReceiptItem[index].TipeDiscount = tipe
      },
      changeTipeTax(tipe, index) {
        this.GoodsReceipt.ListGoodsReceiptItem[index].tipeTax = tipe
      },
      changeTipeDiscountGrand(tipe) {
        console.log(tipe)
        this.GoodsReceipt.TipeDiscount = tipe
      },
      changeTipeTaxGrand(tipe) {
        this.tipeTax = tipe
      },
      saveDueDate(duedate) {
        console.log(this.$refs, 'tesut')
        this.$refs.menu.save(duedate)
      },
  
      saveDate(date) {
        console.log(this.$refs, 'asnothu')
        this.$refs.menusatu.save(date)
      },
  
      showDialogSupplier() {
        this.$store.state.supplier.dialogState = true
      },
  
      showDialogPaymentTerm() {
        this.$store.state.paymentterm.dialogState = true
      },
  
      showDialogWarehouse() {
        this.$store.state.warehouse.dialogState = true
      },
  
      addRow: function(index) {
        try {
          this.GoodsReceipt.ListGoodsReceiptItem.splice(index + 1, 0, {
            TipeDiscount: 'amount',
            ToggleDiscount: 0,
            ProductId: '',
            ProductName: '',
            ProductDescription: '',
            ProductPrice: 0,
            ProductQuantity: 0,
            DiscountAmount: 0,
            DiscountPercentage: 0,
            Tax: 0,
            LineTotal: 0,
            Quantity: 0
          })
        } catch (e) {
          console.log(e)
        }
      },
      removeRow: function(index) {
        this.GoodsReceipt.ListGoodsReceiptItem.splice(index, 1)
      },
      selectedItem: function(product) {
        console.log(product)
      },
      setToggleDiscount1: function() {
        console.log('test1')
        for (var i = 0; i < this.GoodsReceipt.ListGoodsReceiptItem.length; i++) {
          if (this.GoodsReceipt.ListGoodsReceiptItem[i].TipeDiscount === 'amount') {
            this.GoodsReceipt.ListGoodsReceiptItem[i].toggle_discount = 0
          } else if (
            this.GoodsReceipt.ListGoodsReceiptItem[i].TipeDiscount === 'percentage'
          ) {
            this.GoodsReceipt.ListGoodsReceiptItem[i].toggle_discount = 1
          }
        }
      },
      setToggleDiscount2: function() {
        console.log('test2')
        if (this.GoodsReceipt.TipeDiscount === 'amount') {
          this.GoodsReceipt.toggle_discount = 0
        } else if (this.GoodsReceipt.TipeDiscount === 'percentage') {
          this.GoodsReceipt.toggle_discount = 1
        }
      },
      setDueDate: function() {
        // console.log(new Date(), 'tanggal')
        var self = this
        setTimeout(function() {
          // console.log(self.GoodsReceipt.PaymentTermId, 'id paymentterm')
          self.$store
            .dispatch(GET_PAYMENTTERM, self.GoodsReceipt.PaymentTermId)
            .then(response => {
              // console.log(response.data.DaysOf)
              if (self.GoodsReceipt.PaymentTermId === '') {
                self.GoodsReceipt.DueDate = moment(self.GoodsReceipt.Date)
                  .add(1, 'days')
                  .format('YYYY-MM-DD')
              } else {
                self.GoodsReceipt.DueDate = moment(self.GoodsReceipt.Date)
                  .add(response.data.DaysOf, 'days')
                  .format('YYYY-MM-DD')
              }
            })
        }, 1000)
      }
    },
    async created() {
      await this.$store.dispatch('GET_PRODUCT_OF_PURCHASE')
      await this.$store.dispatch('GET_PRODUCTUNIT_OF_PURCHASE').then(result => {
        console.log(result, 'dari unit');
       this.productUnit = result.data
      })
      console.log(this.GoodsReceipt);
      
  
      await this.$store.dispatch('GET_TAX_OF_PURCHASE')
  
      this.GoodsReceipt.Date = await moment(new Date()).format('YYYY-MM-DD')
      await this.setDueDate()
      // console.log('aoeunth');
    }
  }
</script>
