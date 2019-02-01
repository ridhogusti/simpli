<template>
  <div>
    {{ subTotall() }}
    <Header :PurchaseOrder="PurchaseOrder" :showDialogSupplier="showDialogSupplier" :showDialogWarehouse="showDialogWarehouse" :showDialogPaymentTerm="showDialogPaymentTerm" :setDueDate="setDueDate" :myFunctionSupplier="myFunctionSupplier" :menu="menu" :menusatu="menusatu"
      :saveDueDate="saveDueDate" :saveDate="saveDate" :Title="Title" :modereadonly="modereadonly" />
    <br>
    <Content :productUnit="productUnit" :PurchaseOrder="PurchaseOrder" :headers="headers" :formatPrice="formatPrice" :lineTotal="lineTotal" :myFunction="myFunction" :changeTipeDiscount="changeTipeDiscount" :addRow="addRow" :removeRow="removeRow" :modereadonly="modereadonly"
    />
    <br>
    <Footer :PurchaseOrder="PurchaseOrder" :changeTipeDiscountGrand="changeTipeDiscountGrand" :formatPrice="formatPrice" :subTotall="subTotall" :grandDiscountt="grandDiscountt" :grandTaxx="grandTaxx" :grandTotall="grandTotall" :modereadonly="modereadonly"
    />
  
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
  import Header from '@/components/purchaseorder/subcomponents/Header'
  import Content from '@/components/purchaseorder/subcomponents/Content'
  import Footer from '@/components/purchaseorder/subcomponents/Footer'
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
    props: ['PurchaseOrder', 'Retur', 'Title', 'modereadonly', 'productUnit'],
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
        return this.$store.state.purchaseorder.purchaseorder;
      },
      items() {
        return this.$store.state.purchaseorder.purchaseorder.ListPurchaseOrderItem;
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

        var dp = this.PurchaseOrder.DiscountPercentage
        var splitDP = String(dp).split('+')
        var t = 0
        var subTotal = this.PurchaseOrder.SubTotal
        var tempSubTotal = subTotal
        var temp = []

        
        if (dp == 0) {
          t = 0
        }else if (this.PurchaseOrder.DiscountPercentage === '') {
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
        

        this.grandDiscount = hasil
        return this.grandDiscount
    
      },
      grandTaxx: function() {
        var t = 0
        var self = this
        var sumDiscount = []

        this.PurchaseOrder.ListPurchaseOrderItem.forEach(item => {
          var lineTotal = item.LineTotal
          var dp = self.PurchaseOrder.DiscountPercentage

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
            var tax = (lineTotal - sumTemp) * 0
          }
          sumDiscount.push(tax)

        });

        for (let i = 0; i < sumDiscount.length; i++) {
          t += sumDiscount[i]
        }

        this.PurchaseOrder.TaxAmount = t
        return t
      },
      grandTotall: function() {
        var tax = 0
        if (this.PurchaseOrder.TipeDiscount === 'percentage') {
          this.PurchaseOrder.TotalPurchase = this.PurchaseOrder.SubTotal - this.grandDiscount + this.PurchaseOrder.TaxAmount
        } else if (this.PurchaseOrder.TipeDiscount === 'amount') {
          this.PurchaseOrder.TotalPurchase =
            this.PurchaseOrder.SubTotal - this.grandDiscount + this.PurchaseOrder.TaxAmount
        }
        return this.PurchaseOrder.TotalPurchase
      },
      subTotall: function() {
        var t = 0
        var quantity = this.PurchaseOrder.ListPurchaseOrderItem[0].Quantity
        var discount = this.PurchaseOrder.ListPurchaseOrderItem[0].DiscountPercentage
        // t = this.PurchaseOrder.ListPurchaseOrderItem[0].LineTotal
        t = _.reduce(this.PurchaseOrder.ListPurchaseOrderItem, function(total, item) {
          return total + item.LineTotal;
        }, 0)
        this.PurchaseOrder.SubTotal = t
        return this.PurchaseOrder.SubTotal
      },
  
      lineTotal(index) {
        var t = 0,
          total = 0
        var quantity = 0,
          price = 0
        var discountPercentage = this.PurchaseOrder.ListPurchaseOrderItem[index]
          .DiscountPercentage,
        quantity = this.PurchaseOrder.ListPurchaseOrderItem[index].Quantity

        var splitDiscountPercentage = String(discountPercentage).split('+')
        
        price = this.PurchaseOrder.ListPurchaseOrderItem[index].ProductPrice
        total = price * quantity
        var tempTotal = total

         for (let i = 0; i < splitDiscountPercentage.length; i++) {
           if (splitDiscountPercentage[i] !== '') {
             discountPercentage = parseFloat(splitDiscountPercentage[i]) / 100 * tempTotal
            t = tempTotal - discountPercentage
            tempTotal = t
          }
        }
  
        if (isNaN(tempTotal) && this.PurchaseOrder.ListPurchaseOrderItem[index].DiscountPercentage === '') {
          tempTotal = total
        }else if (isNaN(tempTotal) && this.PurchaseOrder.ListPurchaseOrderItem[index].DiscountPercentage === undefined) {
          tempTotal = total
        }else if (isNaN(tempTotal) && this.PurchaseOrder.ListPurchaseOrderItem[index].DiscountPercentage === null) {
          tempTotal = total
        }
        this.PurchaseOrder.ListPurchaseOrderItem[index].LineTotal = tempTotal
  
        return this.PurchaseOrder.ListPurchaseOrderItem[index].LineTotal
      },
      subTaxx: function() {
        var t = 0
        this.PurchaseOrder.ListPurchaseOrderItem.reduce(function(total, item) {
          total = total + item.tax
          return (t = total)
        }, 0)
        this.grandTax = t
        return t
      },
      myFunction(index, item) {
        console.log(item, 'item')
        // var self = this
        // setTimeout(function() {
        //   self.$store
        //     .dispatch(
        //       "GET_PRODUCTUNIT_PURCHASE",
        //       self.PurchaseOrder.ListPurchaseOrderItem[index].ProductUnitId
        //     )
        //     .then(response => {
        //       console.log(response, 'dari myfunction');
        //       self.PurchaseOrder.ListPurchaseOrderItem[index].ProductId = response.data.ProductId
        //       self.PurchaseOrder.ListPurchaseOrderItem[index].ProductDescription = response.data.Description
        //       self.PurchaseOrder.ListPurchaseOrderItem[index].ProductPrice = response.data.PriceListItem.Price
        //       self.PurchaseOrder.ListPurchaseOrderItem[index].ProductName = response.data.Name
        //       self.PurchaseOrder.ListPurchaseOrderItem[index].ProductSKU = response.data.SKU
        //       self.PurchaseOrder.ListPurchaseOrderItem[index].Barcode = response.data.Barcode
        //       self.PurchaseOrder.ListPurchaseOrderItem[index].Tax = response.data.Tax.Name
        //       self.PurchaseOrder.ListPurchaseOrderItem[index].UnitId = response.data.UnitId
        //     })
        //     .catch(err => {
        //       console.log('gagal', err)
        //     })
        // }, 10)
      },
      myFunctionSupplier() {
        console.log('function supplier');
        var self = this
        setTimeout(function() {
          self.$store
            .dispatch(GET_SUPPLIER, self.PurchaseOrder.SupplierId)
            .then(response => {
              console.log(response, 'dari supplier');
              self.PurchaseOrder.PaymentTermId = self.$store.state.supplier.supplier.PaymentTermId
            })
            .catch(err => {
              console.log('gagal')
            })
        }, 10)
      },
      changeTipeDiscount(tipe, index) {
        console.log(tipe, index)
        console.log(this.PurchaseOrder.ListPurchaseOrderItem[index].ProductPrice * this.PurchaseOrder.ListPurchaseOrderItem[index].Quantity)
        this.PurchaseOrder.ListPurchaseOrderItem[index].DiscountAmount = this.PurchaseOrder.ListPurchaseOrderItem[index].ProductPrice * this.PurchaseOrder.ListPurchaseOrderItem[index].Quantity * (this.PurchaseOrder.ListPurchaseOrderItem[index].DiscountPercentage / 100)
        this.PurchaseOrder.ListPurchaseOrderItem[index].TipeDiscount = tipe
      },
      changeTipeTax(tipe, index) {
        this.PurchaseOrder.ListPurchaseOrderItem[index].tipeTax = tipe
      },
      changeTipeDiscountGrand(tipe) {
        console.log(tipe)
        this.PurchaseOrder.TipeDiscount = tipe
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
          this.PurchaseOrder.ListPurchaseOrderItem.splice(index + 1, 0, {
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
        this.PurchaseOrder.ListPurchaseOrderItem.splice(index, 1)
      },
      selectedItem: function(product) {
        console.log(product)
      },
      setToggleDiscount1: function() {
        console.log('test1')
        for (var i = 0; i < this.PurchaseOrder.ListPurchaseOrderItem.length; i++) {
          if (this.PurchaseOrder.ListPurchaseOrderItem[i].TipeDiscount === 'amount') {
            this.PurchaseOrder.ListPurchaseOrderItem[i].toggle_discount = 0
          } else if (
            this.PurchaseOrder.ListPurchaseOrderItem[i].TipeDiscount === 'percentage'
          ) {
            this.PurchaseOrder.ListPurchaseOrderItem[i].toggle_discount = 1
          }
        }
      },
      setToggleDiscount2: function() {
        console.log('test2')
        if (this.PurchaseOrder.TipeDiscount === 'amount') {
          this.PurchaseOrder.toggle_discount = 0
        } else if (this.PurchaseOrder.TipeDiscount === 'percentage') {
          this.PurchaseOrder.toggle_discount = 1
        }
      },
      setDueDate: function() {
        // console.log(new Date(), 'tanggal')
        var self = this
        setTimeout(function() {
          // console.log(self.PurchaseOrder.PaymentTermId, 'id paymentterm')
          self.$store
            .dispatch(GET_PAYMENTTERM, self.PurchaseOrder.PaymentTermId)
            .then(response => {
              // console.log(response.data.DaysOf)
              if (self.PurchaseOrder.PaymentTermId === '') {
                self.PurchaseOrder.DueDate = moment(self.PurchaseOrder.Date)
                  .add(1, 'days')
                  .format('YYYY-MM-DD')
              } else {
                self.PurchaseOrder.DueDate = moment(self.PurchaseOrder.Date)
                  .add(response.data.DaysOf, 'days')
                  .format('YYYY-MM-DD')
                self.PurchaseOrder.Date = moment(self.PurchaseOrder.Date)
                  .format('YYYY-MM-DD')
              }
            })
        }, 1000)
      }
    },
    async created() {
     
      this.PurchaseOrder.Date = await moment(new Date()).format('YYYY-MM-DD')
      await this.setDueDate()
    }
  }
</script>
