<template>
  <div>
    <Header :Warehouse="Warehouse" :getProduct="getProduct" :StockAdjustment="StockAdjustment" :showDialogSupplier="showDialogSupplier" :showDialogWarehouse="showDialogWarehouse" :showDialogPaymentTerm="showDialogPaymentTerm" :menu="menu" :menusatu="menusatu"
      :Title="Title" :modereadonly="modereadonly" />
    <br>
    <Content :diff="diff" :StockAdjustment="StockAdjustment" :headers="headers" :formatPrice="formatPrice" :lineTotal="lineTotal" :modereadonly="modereadonly"
    />
    <br>
    <Footer :StockAdjustment="StockAdjustment" :formatPrice="formatPrice" :subTotall="subTotall" :modereadonly="modereadonly"
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
  import Header from '@/components/stockadjustment/subcomponents/Header'
  import Content from '@/components/stockadjustment/subcomponents/Content'
  import Footer from '@/components/stockadjustment/subcomponents/Footer'
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
    props: ['StockAdjustment', 'Retur', 'Title', 'modereadonly', 'productUnit', 'getProduct', 'diff', 'lineTotal', 'Warehouse'],
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
        menu: false,
        menusatu: false,
        headers: [{
            text: 'No.',
            align: 'center',
            sortable: false,
            value: 'no',
            // width: "5%"
          },
          {
            text: 'Product Name',
            value: 'productname',
            align: 'center',
            // width: "5%"
          },
          {
            text: 'Price',
            align: 'center',
            value: 'price',
            // width: '5%'
          },
          {
            text: 'Current Stock',
            align: 'center',
            value: 'quantity',
            // width: '10%'
          },
          {
            text: 'Unit',
            align: 'center',
            value: 'unit',
            // width: "10%"
          },
          {
            text: 'Diff',
            align: 'center',
            value: 'diff',
            // width: "20%"
          },
          {
            text: 'Total Diff',
            align: 'center',
            value: 'totaldiff',
            // width: "10%"
          }
        ]
      }
    },
    computed: {
      itemsHeader() {
        return this.$store.state.stockadjustment.stockadjustment;
      },
      items() {
        return this.$store.state.stockadjustment.stockadjustment.ListStockAdjustmentItem;
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
      subTotall: function() {
        var t = 0
        // this.StockAdjustment.ListStockAdjustmentItem.reduce(function(total, item) {
        //   total = total + item.LineTotal
        //   return (t = total)
        // }, 0)
        t = _.reduce(this.StockAdjustment.ListStockAdjustmentItem, function(total, item) {
          return total + item.LineTotal;
        }, 0);
        this.StockAdjustment.SubTotal = t
        return t
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
  
    },
    async created() {
    }
  }
</script>
