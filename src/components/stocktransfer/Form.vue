<template>
  <div>
    <Header :getProduct="getProduct" :StockTransfer="StockTransfer" :showDialogSupplier="showDialogSupplier" :showDialogWarehouse="showDialogWarehouse" :showDialogPaymentTerm="showDialogPaymentTerm" :setDueDate="setDueDate" :myFunctionSupplier="myFunctionSupplier" :menu="menu" :menusatu="menusatu"
      :saveDueDate="saveDueDate" :saveDate="saveDate" :Title="Title" :modereadonly="modereadonly" />
    <br>
    <Content :productUnit="productUnit" :StockTransfer="StockTransfer" :headers="headers" :formatPrice="formatPrice" :lineTotal="lineTotal" :myFunction="myFunction" :changeTipeDiscount="changeTipeDiscount" :addRow="addRow" :removeRow="removeRow" :modereadonly="modereadonly"
    />
    <br>
    <Footer :StockTransfer="StockTransfer" :changeTipeDiscountGrand="changeTipeDiscountGrand" :formatPrice="formatPrice" :subTotall="subTotall" :grandDiscountt="grandDiscountt" :grandTaxx="grandTaxx" :grandTotall="grandTotall" :modereadonly="modereadonly"
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
  import Header from '@/components/stocktransfer/subcomponents/Header'
  import Content from '@/components/stocktransfer/subcomponents/Content'
  import Footer from '@/components/stocktransfer/subcomponents/Footer'
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
    props: ['StockTransfer', 'Retur', 'Title','getProduct', 'modereadonly', 'productUnit'],
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
        return this.$store.state.purchaseorder.purchaseorder.ListStockTransferItem;
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

        var dp = this.StockTransfer.DiscountPercentage
        var splitDP = String(dp).split('+')
        var t = 0
        var subTotal = this.StockTransfer.SubTotal
        var tempSubTotal = subTotal
        var temp = []

        
        if (dp == 0) {
          t = 0
        }else if (this.StockTransfer.DiscountPercentage === '') {
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
        console.log(this.StockTransfer.ListStockTransferItem);
        
        this.StockTransfer.ListStockTransferItem.forEach(item => {
          var lineTotal = item.LineTotal
          var dp = self.StockTransfer.DiscountPercentage

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

        this.StockTransfer.TaxAmount = t
        return t
      },
      grandTotall: function() {
        var tax = 0
        if (this.StockTransfer.TipeDiscount === 'percentage') {
          this.StockTransfer.TotalPurchase = this.StockTransfer.SubTotal - this.grandDiscount + this.StockTransfer.TaxAmount
        } else if (this.StockTransfer.TipeDiscount === 'amount') {
          this.StockTransfer.TotalPurchase =
            this.StockTransfer.SubTotal - this.grandDiscount + this.StockTransfer.TaxAmount
        }
        return this.StockTransfer.TotalPurchase
      },
      subTotall: function() {
        var t = 0
        // this.StockTransfer.ListStockTransferItem.reduce(function(total, item) {
        //   total = total + item.LineTotal
        //   return (t = total)
        // }, 0)
        t = _.reduce(this.StockTransfer.ListStockTransferItem, function(total, item) {
          return total + item.LineTotal;
        }, 0);
        this.StockTransfer.SubTotal = t
        return t
      },
  
      lineTotal(index) {
        var t = 0,
          total = 0
        var quantity = 0,
          price = 0
       
        quantity = this.StockTransfer.ListStockTransferItem[index].TotalQuantity
        price = this.StockTransfer.ListStockTransferItem[index].ProductPrice
        total = price * quantity
        var tempTotal = total

        this.StockTransfer.ListStockTransferItem[index].LineTotal = tempTotal
  
        return this.StockTransfer.ListStockTransferItem[index].LineTotal
      },
      subTaxx: function() {
        var t = 0
        this.StockTransfer.ListStockTransferItem.reduce(function(total, item) {
          total = total + item.tax
          return (t = total)
        }, 0)
        this.grandTax = t
        return t
      },
      myFunction(index) {
        var self = this
        console.log("masuk function ");
        
        setTimeout(function() {
          self.$store
            .dispatch(
              "GET_PRODUCTUNIT_PURCHASE",
              self.StockTransfer.ListStockTransferItem[index].ProductUnitId
            )
            .then(response => {
              console.log(response.data, 'dari myfunction stock transfer');
              self.StockTransfer.ListStockTransferItem[index].ProductId = response.data.ProductId
              self.StockTransfer.ListStockTransferItem[index].ProductDescription = response.data.Description
              self.StockTransfer.ListStockTransferItem[index].ProductPrice = response.data.PriceListItem.Price
              self.StockTransfer.ListStockTransferItem[index].ProductName = response.data.Product.Name
              self.StockTransfer.ListStockTransferItem[index].ProductSKU = response.data.SKU
              self.StockTransfer.ListStockTransferItem[index].Barcode = response.data.Barcode
              self.StockTransfer.ListStockTransferItem[index].Tax = response.data.Tax.Name
              self.StockTransfer.ListStockTransferItem[index].UnitId = response.data.UnitId
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
            .dispatch(GET_SUPPLIER, self.StockTransfer.SupplierId)
            .then(response => {
              console.log(response, 'dari supplier');
              self.StockTransfer.PaymentTermId = self.$store.state.supplier.supplier.PaymentTermId
            })
            .catch(err => {
              console.log('gagal')
            })
        }, 10)
      },
      changeTipeDiscount(tipe, index) {
        console.log(tipe, index)
        console.log(this.StockTransfer.ListStockTransferItem[index].ProductPrice * this.StockTransfer.ListStockTransferItem[index].TotalQuantity)
        this.StockTransfer.ListStockTransferItem[index].DiscountAmount = this.StockTransfer.ListStockTransferItem[index].ProductPrice * this.StockTransfer.ListStockTransferItem[index].TotalQuantity * (this.StockTransfer.ListStockTransferItem[index].DiscountPercentage / 100)
        this.StockTransfer.ListStockTransferItem[index].TipeDiscount = tipe
      },
      changeTipeTax(tipe, index) {
        this.StockTransfer.ListStockTransferItem[index].tipeTax = tipe
      },
      changeTipeDiscountGrand(tipe) {
        console.log(tipe)
        this.StockTransfer.TipeDiscount = tipe
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
          this.StockTransfer.ListStockTransferItem.splice(index + 1, 0, {
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
            TotalQuantity: 0
          })
        } catch (e) {
          console.log(e)
        }
      },
      removeRow: function(index) {
        this.StockTransfer.ListStockTransferItem.splice(index, 1)
      },
      selectedItem: function(product) {
        console.log(product)
      },
      setToggleDiscount1: function() {
        console.log('test1')
        for (var i = 0; i < this.StockTransfer.ListStockTransferItem.length; i++) {
          if (this.StockTransfer.ListStockTransferItem[i].TipeDiscount === 'amount') {
            this.StockTransfer.ListStockTransferItem[i].toggle_discount = 0
          } else if (
            this.StockTransfer.ListStockTransferItem[i].TipeDiscount === 'percentage'
          ) {
            this.StockTransfer.ListStockTransferItem[i].toggle_discount = 1
          }
        }
      },
      setToggleDiscount2: function() {
        console.log('test2')
        if (this.StockTransfer.TipeDiscount === 'amount') {
          this.StockTransfer.toggle_discount = 0
        } else if (this.StockTransfer.TipeDiscount === 'percentage') {
          this.StockTransfer.toggle_discount = 1
        }
      },
      setDueDate: function() {
        // console.log(new Date(), 'tanggal')
        var self = this
        setTimeout(function() {
          // console.log(self.StockTransfer.PaymentTermId, 'id paymentterm')
          self.$store
            .dispatch(GET_PAYMENTTERM, self.StockTransfer.PaymentTermId)
            .then(response => {
              // console.log(response.data.DaysOf)
              if (self.StockTransfer.PaymentTermId === '') {
                self.StockTransfer.DueDate = moment(self.StockTransfer.Date)
                  .add(1, 'days')
                  .format('YYYY-MM-DD')
              } else {
                self.StockTransfer.DueDate = moment(self.StockTransfer.Date)
                  .add(response.data.DaysOf, 'days')
                  .format('YYYY-MM-DD')
                self.StockTransfer.Date = moment(self.StockTransfer.Date)
                  .format('YYYY-MM-DD')
              }
            })
        }, 1000)
      }
    },
    async created() {
     
      this.StockTransfer.Date = await moment(new Date()).format('YYYY-MM-DD')
      await this.setDueDate()
    }
  }
</script>
