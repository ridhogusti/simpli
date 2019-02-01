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
              <FormPurchaseOrder :loadingPage="loadingPage" :PurchaseOrder="purchaseorder" :Title="title"></FormPurchaseOrder>
              <hr class="hrfooter">
              <v-layout row wrap>
                <v-flex xs6>
                  <div class="button-submit text-md-left">
                    <v-btn round class="tealishBackground" :loading="loadingBtnPayment" :disabled="loadingBtnPayment" @click.prevent="save">
                      <v-icon left>save</v-icon> Make Payment</v-btn>
                    <v-btn round class="lightBlueGreyBackground blueyPurpleColor" @click.prevent="saveEmail">
                      <v-icon left>email</v-icon> Email</v-btn>
                    <v-btn round class="lightBlueGreyBackground blueyPurpleColor" @click.prevent="savePrint">
                      <v-icon left>local_printshop</v-icon> Print</v-btn>
                    <v-btn round class="lightBlueGreyBackground blueyPurpleColor" @click="saveVoid">
                      <v-icon left>cancel</v-icon> Void</v-btn>
                  </div>
                </v-flex>
                <v-flex xs6>
                  <div class="button-submit text-md-right">
                    <v-btn round class="blueyPurpleBackground whiteColor" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save">
                      <v-icon left>save</v-icon> Save</v-btn>
                    <v-btn round class="lightBlueGreyBackground blueyPurpleColor" @click.prevent="saveApprove" :loading="loadingBtnSave2" :disabled="loadingBtnSave2">
                      <v-icon left>save</v-icon> Save & Approve</v-btn>
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
                  <span class="nameDocument">The name</span> has approved form PurchaseOrder
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
                  <span class="nameDocument">The name</span> has rejected approval form PurchaseOrder
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
                  <span class="nameDocument">The name</span> has requested approval form PurchaseOrder
                </v-flex>
              </v-layout>
            </v-card>
          </v-card-text>
  
          <br>
          <v-card-text class="pa-0 white lighten-1">
            <v-layout class="backToList" justify-center row wrap>
              <router-link to="/purchaseorder">
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
  import FormPurchaseOrder from '@/components/goodsreceipt/Form'
  import {
    CREATE_PURCHASEORDER,
    CREATE_APPROVE_PURCHASEORDER
  } from '@/store/actions.type'
  
  export default {
    components: {
      FormPurchaseOrder
    },
    data() {
      return {
        title: 'CREATE PURCHASE ORDER',
        loadingPage: true,
        alert: {
          status: false,
          type: 'success',
          message: ''
        },
        loadingBtnSave: false,
        loadingBtnSave2: false,
        loadingBtnPayment: false,
        purchaseorder: {
          ListPurchaseOrderItem: [{
            ProductName: '',
            ProductPrice: null,
            ProductSKU: '',
            ProductDescription: '',
            TipeDiscount: 'amount',
            ToggleDiscount: null,
            ProductId: '',
            Quantity: null,
            DiscountAmount: null,
            DiscountPercentage: null,
            Tax: '',
            LineTotal: 0
          }],
          SupplierId: null,
          WarehouseId: null,
          DueDate: null,
          Date: null,
          Notes: '',
          TotalPurchase: 0,
          TipeDiscount: 'amount',
          DiscountAmount: null,
          DiscountPercentage: null,
          SubTotal: 0,
          TaxAmount: 0,
          TaxPercentage: 0,
          Status: 'Open',
          PaymentTermId: '',
          InvoiceNo: '-',
          Type: 0,
          ToggleDiscount: 0
        }
      }
    },
    methods: {
      cancel() {
        this.$refs.form.reset()
      },
      checkNull() {
        if (this.purchaseorder.DiscountAmount == null) {
          this.purchaseorder.DiscountAmount = 0;
        }
        if (this.purchaseorder.DiscountPercentage == null) {
          this.purchaseorder.DiscountPercentage = 0;
        }
        for (var i = 0; i < this.purchaseorder.ListPurchaseOrderItem.length; i++) {
          if (this.purchaseorder.ListPurchaseOrderItem[i].DiscountAmount == null) {
            this.purchaseorder.ListPurchaseOrderItem[i].DiscountAmount = 0;
          }
          if (this.purchaseorder.ListPurchaseOrderItem[i].DiscountPercentage == null) {
            this.purchaseorder.ListPurchaseOrderItem[i].DiscountPercentage = 0;
          }
        }
      },
      save() {
        console.log(this.purchaseorder);
        console.log('test')
        for (var i = 0; i < this.purchaseorder.ListPurchaseOrderItem.length; i++) {
          console.log(this.purchaseorder.ListPurchaseOrderItem[i].TipeDiscount, 'ini tipe discount')
          if (this.purchaseorder.ListPurchaseOrderItem[i].TipeDiscount == 'amount') {
            this.purchaseorder.ListPurchaseOrderItem[i].DiscountPercentage = 0;
          } else if (this.purchaseorder.ListPurchaseOrderItem[i].TipeDiscount == 'percentage') {
            this.purchaseorder.ListPurchaseOrderItem[i].DiscountAmount = 0;
          }
        }
        if (this.purchaseorder.TipeDiscount == 'amount') {
          this.purchaseorder.DiscountPercentage = 0
        }
        if (this.purchaseorder.TipeDiscount == 'percentage') {
          this.purchaseorder.DiscountAmount = 0
        }
        this.checkNull();
        if (this.$refs.form.validate()) {
          console.log('test 3')
          this.alert.status = false
          this.loadingBtnSave = true
          this.$store.dispatch(CREATE_PURCHASEORDER, this.purchaseorder)
            .then((response) => {
              this.alert = {
                status: true,
                type: 'success',
                message: 'Data is submited.'
              }
              this.$router.push({
                path: '/purchaseorder'
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
        }
      },
      saveApprove(event) {
        for (var i = 0; i < this.purchaseorder.ListPurchaseOrderItem.length; i++) {
          console.log(this.purchaseorder.ListPurchaseOrderItem[i].TipeDiscount, 'ini tipe discount')
          if (this.purchaseorder.ListPurchaseOrderItem[i].TipeDiscount == 'amount') {
            this.purchaseorder.ListPurchaseOrderItem[i].DiscountPercentage = 0;
          } else if (this.purchaseorder.ListPurchaseOrderItem[i].TipeDiscount == 'percentage') {
            this.purchaseorder.ListPurchaseOrderItem[i].DiscountAmount = 0;
          }
        }
        if (this.purchaseorder.TipeDiscount == 'amount') {
          this.purchaseorder.DiscountPercentage = 0
        }
        if (this.purchaseorder.TipeDiscount == 'percentage') {
          this.purchaseorder.DiscountAmount = 0
        }
        this.purchaseorder.Status = 'Active'
        if (this.$refs.form.validate()) {
          this.alert.status = false
          this.loadingBtnSave2 = true
          this.$store.dispatch(CREATE_APPROVE_PURCHASEORDER, this.purchaseorder)
            .then((response) => {
              this.alert = {
                status: true, 
                type: 'success',
                message: 'Data is submited.'
              }
              this.$router.push({
                path: '/purchaseorder'
              })
              // this.$refs.form.reset()
              this.loadingBtnSave2 = false
            }).catch((err) => {
              console.log(err)
              console.log('gagal')
              this.alert = {
                status: true,
                type: 'error',
                message: err.message
              }
              this.loadingBtnSave2 = false
            })
        }
      }
    },
    async created() {
  
      await this.$store.dispatch('GET_SUPLLIER_OF_PURCHASEORDER')
  
      await this.$store.dispatch('GET_PAYMENTTERM_OF_PURCHASEORDER')
  
      await this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASEORDER')
      this.loadingPage = false
  
    }
  }
</script>
