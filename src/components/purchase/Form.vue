<template>
  <div>
    <Header :hiddenComponentPO="hiddenComponentPO" :changeSelectGR="changeSelectGR" :GrinPo="GrinPo" :myFunctionGR="myFunctionGR" :selectedGR="selectedGR" :PurchaseOrder="PurchaseOrder" :Purchase="Purchase" :showDialogSupplier="showDialogSupplier" :showDialogWarehouse="showDialogWarehouse"
      :showDialogPaymentTerm="showDialogPaymentTerm" :setDueDate="setDueDate" :myFunctionSupplier="myFunctionSupplier" :menu="menu" :menusatu="menusatu" :saveDueDate="saveDueDate" :saveDate="saveDate" :Title="Title" :modereadonly="modereadonly" :modereadonlyCreate="modereadonlyCreate"
    />
    <br>
    <Content :hiddenButtonAdd="hiddenButtonAdd" :productUnit="productUnit" :Purchase="Purchase" :headers="headers" :formatPrice="formatPrice" :lineTotal="lineTotal" :myFunction="myFunction" :changeTipeDiscount="changeTipeDiscount" :addRow="addRow" :removeRow="removeRow"
      :modereadonly="modereadonly" :modereadonlyCreate="modereadonlyCreate" />
    <br>
    <Footer :Purchase="Purchase" :changeTipeDiscountGrand="changeTipeDiscountGrand" :formatPrice="formatPrice" :subTotall="subTotall" :grandDiscountt="grandDiscountt" :grandTaxx="grandTaxx" :grandTotall="grandTotall" :modereadonly="modereadonly" />
  
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
  import Header from '@/components/purchase/subcomponents/Header'
  import Content from '@/components/purchase/subcomponents/Content'
  import Footer from '@/components/purchase/subcomponents/Footer'
  import FormDialogSupllier from '@/components/supplier/FormDialog'
  import moment from 'moment'
  import FormDialogPaymentTerm from '@/components/paymentterm/FormDialog'
  import FormDialogWarehouse from '@/components/warehouse/FormDialog'
  import {
    GET_PRODUCT,
    GET_SUPPLIER,
    GET_PAYMENTTERM,
    GET_PRODUCTUNIT,
    GET_PURCHASEORDER
  } from '../../store/actions.type.js'
  import _ from "underscore"
  
  export default {
    props: ['Purchase', 'Retur', 'Title', 'modereadonly', 'PurchaseOrder', 'hiddenButtonAdd', 'modereadonlyCreate', 'selectedGR', 'changeSelectGR', 'hiddenComponentPO', 'myFunctionGR',
      'GrinPo'
    ],
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
        TipeDiscount: 'percentage',
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
            text: 'Price / Unit',
            align: 'center',
            value: 'price'
          },
          {
            text: 'Quantity',
            align: 'center',
            value: 'quantity'
          },
          {
            text: 'Discount',
            align: 'center',
            value: 'discount',
            width: '15%'
          },
          {
            text: 'Tax',
            align: 'center',
            value: 'tax'
          },
          {
            text: 'Line Total',
            align: 'center',
            value: 'linetotal'
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
        return this.$store.state.purchase.purchase;
      },
      items() {
        return this.$store.state.purchase.purchase.ListPurchaseItem;
      },
      testMoment: function() {
        return moment(new Date()).format('YYYY')
      }
    },
    methods: {
      formatPrice(value) {
        let val = (value / 1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        // return value.toFixed(4)
        // return val
      },
      grandDiscountt: function() {
        var dp = this.Purchase.DiscountPercentage
        var splitDP = String(dp).split('+')
        var t = 0
        var subTotal = this.Purchase.SubTotal
        var tempSubTotal = subTotal
        var temp = []

        
        if (dp == 0) {
          t = 0
        }else if (this.Purchase.DiscountPercentage === '') {
          t = 0
        }else {
          for (let i = 0; i < splitDP.length; i++) {
            dp = parseFloat(splitDP[i]) / 100 * tempSubTotal
            temp[i] = dp
            t = tempSubTotal - dp
            tempSubTotal = t
          }
        }

        var hasil = 0

        for (let i = 0; i < temp.length; i++) {
          hasil += temp[i]
        }
        
        // if (isNaN(tempSubTotal) && this.Purchase.DiscountPercentage === '') {
        //   tempSubTotal = t
        // }

        this.grandDiscount = hasil
        return this.grandDiscount
      },
      grandTaxx: function() {
        var t = 0
        var self = this
        var sumDiscount = []
  
        this.Purchase.ListPurchaseItem.forEach(item => {
          var lineTotal = item.LineTotal
          var dp = self.Purchase.DiscountPercentage
  
          var splitDP = String(dp).split('+')
          var total = 0
          var tempLineTotal = lineTotal
          var temp = []
  
          for (let i = 0; i < splitDP.length; i++) {
            dp = parseFloat(splitDP[i]) / 100 * tempLineTotal
            total = tempLineTotal - dp
            temp[i] = dp
            tempLineTotal = total
          }
          var sumTemp = 0
          for (let j = 0; j < temp.length; j++) {
            sumTemp += temp[j]
          }
          if (item.Tax === 'PPN') {
            var tax = (lineTotal-sumTemp) * 10 / 100
          } else if (item.Tax === 'NoPPN') {
            var tax = (lineTotal-sumTemp) * 0
          }
          sumDiscount.push(tax)
        });

        for (let i = 0; i < sumDiscount.length; i++) {
          t += sumDiscount[i]
        }
        this.Purchase.TaxAmount = t;
        return t
      },
      grandTotall: function() {
        var tax = 0
        if (this.Purchase.TipeDiscount === 'percentage') {
          console.log(this.Purchase.SubTotal, this.grandDiscount, this.Purchase.TaxAmount, 'asoen');
          this.Purchase.TotalPurchase = this.Purchase.SubTotal - this.grandDiscount + this.Purchase.TaxAmount
        } else if (this.Purchase.TipeDiscount === 'amount') {
          this.Purchase.TotalPurchase =
            this.Purchase.SubTotal - this.grandDiscount + this.Purchase.TaxAmount
        }
        return this.Purchase.TotalPurchase
      },
      subTotall: function() {
        var t = 0
        // this.Purchase.ListPurchaseItem.reduce(function(total, item) {
        //   total = total + item.LineTotal
        //   return (t = total)
        // }, 0)
        t = _.reduce(this.Purchase.ListPurchaseItem, function(total, item) {
          return total + item.LineTotal;
        }, 0);
        this.Purchase.SubTotal = t
        return t
      },
  
      lineTotal(index) {
        var t = 0,
          total = 0
        var quantity = 0,
          price = 0
        var discountPercentage = this.Purchase.ListPurchaseItem[index].DiscountPercentage,
          quantity = this.Purchase.ListPurchaseItem[index].Quantity
  
        var splitDiscountPercentage = String(discountPercentage).split('+')
  
        price = this.Purchase.ListPurchaseItem[index].ProductPrice
        total = price * quantity
        var tempTotal = total
        for (let i = 0; i < splitDiscountPercentage.length; i++) {
          if (splitDiscountPercentage[i] !== '') {
            discountPercentage = parseFloat(splitDiscountPercentage[i]) / 100 * tempTotal
            t = tempTotal - discountPercentage
            tempTotal = t
          }
        }
  
        if (isNaN(tempTotal) && this.Purchase.ListPurchaseItem[index].DiscountPercentage === '') {
          tempTotal = total
        }
        this.Purchase.ListPurchaseItem[index].LineTotal = tempTotal
  
        return this.Purchase.ListPurchaseItem[index].LineTotal
      },
      subTaxx: function() {
        var t = 0
        this.Purchase.ListPurchaseItem.reduce(function(total, item) {
          total = total + item.tax
          return (t = total)
        }, 0)
        this.grandTax = t
        return t
      },
      myFunction(index) {
        var self = this
        console.log('teosut');
        setTimeout(function() {
          self.$store
            .dispatch(
              "GET_PRODUCTUNIT_PURCHASE",
              self.Purchase.ListPurchaseItem[index].ProductUnitId
            )
            .then(response => {
              console.log(response, 'dari myfunction');
              self.Purchase.ListPurchaseItem[index].ProductId = response.data.ProductId
              self.Purchase.ListPurchaseItem[index].ProductDescription = response.data.Description
              self.Purchase.ListPurchaseItem[index].ProductPrice = response.data.PriceListItem.ProductPrice
              self.Purchase.ListPurchaseItem[index].ProductName = response.data.Name
              self.Purchase.ListPurchaseItem[index].ProductSKU = response.data.SKU
              self.Purchase.ListPurchaseItem[index].Tax = response.data.Tax.Name
              self.Purchase.ListPurchaseItem[index].UnitId = response.data.UnitId
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
            .dispatch(GET_SUPPLIER, self.Purchase.SupplierId)
            .then(response => {
              console.log(response, 'dari supplier');
              self.Purchase.PaymentTermId = self.$store.state.supplier.supplier.PaymentTermId
            })
            .catch(err => {
              console.log('gagal')
            })
        }, 10)
      },
      changeTipeDiscount(tipe, index) {
        console.log(tipe, index)
        console.log(this.Purchase.ListPurchaseItem[index].ProductPrice * this.Purchase.ListPurchaseItem[index].Quantity)
        this.Purchase.ListPurchaseItem[index].DiscountAmount = this.Purchase.ListPurchaseItem[index].ProductPrice * this.Purchase.ListPurchaseItem[index].Quantity * (this.Purchase.ListPurchaseItem[index].DiscountPercentage / 100)
        this.Purchase.ListPurchaseItem[index].TipeDiscount = tipe
      },
      changeTipeTax(tipe, index) {
        this.Purchase.ListPurchaseItem[index].tipeTax = tipe
      },
      changeTipeDiscountGrand(tipe) {
        console.log(tipe)
        this.Purchase.TipeDiscount = tipe
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
          this.Purchase.ListPurchaseItem.splice(index + 1, 0, {
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
        this.Purchase.ListPurchaseItem.splice(index, 1)
      },
      selectedItem: function(product) {
        console.log(product)
      },
      setToggleDiscount1: function() {
        console.log('test1')
        for (var i = 0; i < this.Purchase.ListPurchaseItem.length; i++) {
          if (this.Purchase.ListPurchaseItem[i].TipeDiscount === 'amount') {
            this.Purchase.ListPurchaseItem[i].toggle_discount = 0
          } else if (
            this.Purchase.ListPurchaseItem[i].TipeDiscount === 'percentage'
          ) {
            this.Purchase.ListPurchaseItem[i].toggle_discount = 1
          }
        }
      },
      setToggleDiscount2: function() {
        console.log('test2')
        if (this.Purchase.TipeDiscount === 'amount') {
          this.Purchase.toggle_discount = 0
        } else if (this.Purchase.TipeDiscount === 'percentage') {
          this.Purchase.toggle_discount = 1
        }
      },
      setDueDate: function() {
        // console.log(new Date(), 'tanggal')
        var self = this
        setTimeout(function() {
          // console.log(self.Purchase.PaymentTermId, 'id paymentterm')
          self.$store
            .dispatch(GET_PAYMENTTERM, self.Purchase.PaymentTermId)
            .then(response => {
              // console.log(response.data.DaysOf)
              if (self.Purchase.PaymentTermId === '') {
                self.Purchase.DueDate = moment(self.Purchase.Date)
                  .add(1, 'days')
                  .format('YYYY-MM-DD')
              } else {
                self.Purchase.DueDate = moment(self.Purchase.Date)
                  .add(response.data.DaysOf, 'days')
                  .format('YYYY-MM-DD')
                self.Purchase.Date = moment(self.Purchase.Date)
                  .format('YYYY-MM-DD')
              }
            })
        }, 1000)
      }
    },
    async created() {
      await this.$store.dispatch('GET_PRODUCT_OF_PURCHASE')
      await this.$store.dispatch('GET_PRODUCTUNIT_OF_PURCHASE').then(result => {
        this.productUnit = result.data
      })
      await this.$store.dispatch('GET_TAX_OF_PURCHASE')
      await this.myFunctionSupplier()
      this.Purchase.Date = await moment(new Date()).format('YYYY-MM-DD')
      await this.setDueDate()
    }
  }
</script>
