<template>
  <div>
    <div v-if="loadingPage" class="text-xs-center">
      <v-container text-xs-center fluid grid-list-md>
        <v-dialog v-model="loadingPage" persistent hide-overlay width="300px">
          <v-card color="primary" dark>
            <v-card-text>
              Please stand by
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-container>
    </div>
    <v-container v-else class="body" fluid grid-list-md>
      <div v-if="alert.status">
        <v-alert v-model="alert.status" :type="alert.type" dismissible>{{alert.message}}</v-alert>
      </div>
      <v-layout row>
        <v-flex xs12 sm12>
  
          <v-card-text>
            <v-form ref="form">
              <FormStockTransfer :loadingPage="loadingPage" :getProduct="getProduct" :StockTransfer="stocktransfer" :productUnit="productunit" :Title="title"></FormStockTransfer>
              <hr class="hrfooter">
              <v-layout row wrap>
                <v-flex xs6>
                  <div v-if="hiddenComponentCreate != true" class="button-submit text-md-left">
                    <v-btn round class="tealishBackground" :loading="loadingBtnPayment" :disabled="loadingBtnPayment" >
                      <v-icon left>save</v-icon> Make Payment</v-btn>
                    <v-btn round class="lightBlueGreyBackground blueyPurpleColor" :disabled="hiddenComponentCreate" >
                      <v-icon left>email</v-icon> Email</v-btn>
                    <v-btn round class="lightBlueGreyBackground blueyPurpleColor" :disabled="hiddenComponentCreate" >
                      <v-icon left>local_printshop</v-icon> Print</v-btn>
                    <v-btn round class="lightBlueGreyBackground blueyPurpleColor" :disabled="hiddenComponentCreate" >
                      <v-icon left>cancel</v-icon> Void</v-btn>
                  </div>
                </v-flex>
                <v-flex xs6>
                  <div class="button-submit text-md-right">
                    <v-btn round class="blueyPurpleBackground whiteColor" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save">
                      <v-icon left>save</v-icon> Save</v-btn>
                    <v-btn round class="blueyPurpleBackground whiteColor" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="saveAndApprove">
                      <v-icon left>save</v-icon> Save And Aprrove</v-btn>
                    <v-btn round class="lightBlueGreyBackground blueyPurpleColor" @click="cancel"> Cancel</v-btn>
                  </div>
                </v-flex>
              </v-layout>
              <hr class="hrfooter">
            </v-form>
          </v-card-text>
  
          <v-card-text>
            <div class="title">
              DOCUMENT AUDIT TRAIL
            </div>
            <br>
  
            <v-card class="retangle1">
              <br>
              <v-layout class="documentAuditTrail" row wrap>
                <v-flex lg1 class="text-xs-center">
                  <img src="../../assets/img/approved-icon.svg" alt="">
                </v-flex>
                <v-flex lg2>
                  <div class="dateDocument">
                    01-10-2018
                  </div>
                  <div class="timeDocument">
                    10:00:00 AM
                  </div>
                </v-flex>
                <v-flex lg6>
                  <span class="nameDocument">The name</span> has approved form StockTransfer
                </v-flex>
              </v-layout>
              <v-layout class="documentAuditTrail" row wrap>
                <v-flex lg1 class="text-xs-center">
                  <img src="../../assets/img/rejected-icon.svg" alt="">
                </v-flex>
                <v-flex lg2>
                  <div class="dateDocument">
                    01-10-2018
                  </div>
                  <div class="timeDocument">
                    10:00:00 AM
                  </div>
                </v-flex>
                <v-flex lg6>
                  <span class="nameDocument">The name</span> has rejected approval form StockTransfer
                </v-flex>
              </v-layout>
              <v-layout class="documentAuditTrail" row wrap>
                <v-flex lg1 class="text-xs-center">
                  <img src="../../assets/img/requested-icon.svg" alt="">
                </v-flex>
                <v-flex lg2>
                  <div class="dateDocument">
                    01-10-2018
                  </div>
                  <div class="timeDocument">
                    10:00:00 AM
                  </div>
                </v-flex>
                <v-flex lg6>
                  <span class="nameDocument">The name</span> has requested approval form StockTransfer
                </v-flex>
              </v-layout>
            </v-card>
          </v-card-text>
  
          <br>
          <v-card-text class="pa-0 white lighten-1">
            <v-layout class="backToList" justify-center row wrap>
              <router-link to="/stocktransfer">
                <v-subheader>
                  <v-icon color="#6747cd">mdi-chevron-left-circle-outline</v-icon>
                  Back to List
                </v-subheader>
              </router-link>
            </v-layout>
  
          </v-card-text>
        </v-flex>
      </v-layout>
  
    </v-container>
  </div>
</template>

<style src="./test.css">
  .body {
    background-color: #f2f2f2;
  }
  
  .button-submit {
    font-family: LouisGeorgeCafe;
  }
</style>


<script>
  import FormStockTransfer from '@/components/stocktransfer/Form'
  import {
    CREATE_STOCKTRANSFER,
    CREATE_APPROVE_STOCKTRANSFER
  } from '@/store/actions.type'
  
  export default {
    components: {
      FormStockTransfer
    },
    data() {
      return {
        title: 'CREATE STOCK TRANSFER',
        loadingPage: true,
        alert: {
          status: false,
          type: 'success',
          message: ''
        },
        hiddenComponentCreate: false,
        loadingBtnSave: false,
        loadingBtnSave2: false,
        loadingBtnPayment: false,
        productunit: [],
        stocktransfer: {
          ListStockTransferItem: [{
            ProductName: '',
            ProductPrice: null,
            ProductSKU: '',
            ProductDescription: '',
            TipeDiscount: 'percentage',
            ToggleDiscount: 1,
            ProductId: '',
            Quantity: null,
            DiscountAmount: 0,
            DiscountPercentage: 0,
            Tax: '',
            LineTotal: 0
          }],
          SupplierId: null,
          WarehouseOriginId: null,
          WarehouseDestinationId:null,
          DueDate: null,
          Date: null,
          Notes: '',
          TotalPurchase: 0,
          TipeDiscount: 'percentage',
          DiscountAmount: 0,
          DiscountPercentage: 0,
          SubTotal: 0,
          TaxAmount: 0,
          TaxPercentage: 0,
          Status: 'Open',
          PaymentTermId: '',
          StockTransferNo: '-',
          Type: 0,
          ToggleDiscount: 1
        }
      }
    },
    methods: {
      cancel() {
        this.$refs.form.reset()
      },
      checkNull() {
        if (this.stocktransfer.DiscountAmount == null) {
          this.stocktransfer.DiscountAmount = 0;
        }
        if (this.stocktransfer.DiscountPercentage == null) {
          this.stocktransfer.DiscountPercentage = 0;
        }
        for (var i = 0; i < this.stocktransfer.ListStockTransferItem.length; i++) {
          if (this.stocktransfer.ListStockTransferItem[i].DiscountAmount == null) {
            this.stocktransfer.ListStockTransferItem[i].DiscountAmount = 0;
          }
          if (this.stocktransfer.ListStockTransferItem[i].DiscountPercentage == null) {
            this.stocktransfer.ListStockTransferItem[i].DiscountPercentage = 0;
          }
        }
      },
      save() {
        console.log(this.stocktransfer);
        console.log('test')
        
        if (this.$refs.form.validate()) {
          console.log('test 3')
          this.alert.status = false
          this.loadingBtnSave = true
          this.stocktransfer.Status =0
          this.$store.dispatch(CREATE_STOCKTRANSFER, this.stocktransfer)
            .then((response) => {
              this.alert = {
                status: true,
                type: 'success',
                message: 'Data is submited.'
              }
              this.$router.push({
                path: '/stocktransfer'
              })
            }).catch((err) => {
              console.log('gagal')
              this.alert = {
                status: true,
                type: 'error',
                message: err.message
              }
              this.loadingBtnSave = false
            })
        }else{
          console.log("errror validate");
          
        }
      },
      getProduct() {
        console.log(this.stocktransfer);
        
        var self = this
        console.log(this.stocktransfer.WarehouseId)
        this.$store
            .dispatch("GET_PRODUCTBYWAREHOUS_OF_STOCKADJUSTMENT",this.stocktransfer.WarehouseOriginId)
            .then(response => {
              console.log(response, 'dari function Stock Transfer');
              // this.stocktransfer.ListStockTransferItem = response.data
              this.productunit = response.data
              console.log(this.stocktransfer);
              
            })
            .catch(err => {
              console.log('gagal', err)
            })
      },
      saveAndApprove() {
        if (this.$refs.form.validate()) {
          console.log('test 3')
          this.alert.status = false
          this.loadingBtnSave = true
          this.stocktransfer.Status =1
          this.$store.dispatch(CREATE_APPROVE_STOCKTRANSFER, this.stocktransfer)
            .then((response) => {
              this.alert = {
                status: true,
                type: 'success',
                message: 'Data is submited.'
              }
              this.$router.push({
                path: '/stocktransfer'
              })
            }).catch((err) => {
              console.log('gagal')
              this.alert = {
                status: true,
                type: 'error',
                message: err.message
              }
              this.loadingBtnSave = false
            })
        }else{
          console.log("errror validate");
          
        }
      }
    },
    async created() {

      
      await this.$store.dispatch('GET_SUPLLIER_OF_PURCHASEORDER')
  
      await this.$store.dispatch('GET_PAYMENTTERM_OF_PURCHASEORDER')
  
      await this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASEORDER')
      // await this.$store.dispatch('GET_PRODUCTUNIT_OF_PURCHASE').then(result => {
      //    console.log(result, 'testu')
      //   this.productunit = result.data
      // })
      await this.$store.dispatch('GET_TAX_OF_PURCHASE')
      this.hiddenComponentCreate = true
      this.loadingPage = false
  
    }
  }
</script>
