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
              <FormStockAdjustment :Warehouse="Warehouse" :lineTotal="lineTotal" :diff="diff" :getProduct="getProduct" :loadingPage="loadingPage" :StockAdjustment="stockadjustment" :Title="title"></FormStockAdjustment>
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
                    <v-btn round class="blueyPurpleBackground whiteColor" :loading="loadingBtnSaveApprove" :disabled="loadingBtnSaveApprove" @click.prevent="saveApprove">
                      <v-icon left>save</v-icon> Save And Approve</v-btn>
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
                  <span class="nameDocument">The name</span> has approved form StockAdjustment
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
                  <span class="nameDocument">The name</span> has rejected approval form StockAdjustment
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
                  <span class="nameDocument">The name</span> has requested approval form StockAdjustment
                </v-flex>
              </v-layout>
            </v-card>
          </v-card-text>
  
          <br>
          <v-card-text class="pa-0 white lighten-1">
            <v-layout class="backToList" justify-center row wrap>
              <router-link to="/stockadjustment">
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

<style src="../../assets/css/style.css">
  .body {
    background-color: #f2f2f2;
  }
  
  .button-submit {
    font-family: LouisGeorgeCafe;
  }
</style>


<script>
  import FormStockAdjustment from '@/components/stockadjustment/Form'
  import _ from 'underscore'
  import {
    CREATE_STOCKADJUSTMENT,
    CREATE_APPROVE_STOCKADJUSTMENT
  } from '@/store/actions.type'
  
  export default {
    components: {
      FormStockAdjustment
    },
    data() {
      return {
        title: 'CREATE STOCK ADJUSTMENT',
        Warehouse: [],
        loadingPage: true,
        alert: {
          status: false,
          type: 'success',
          message: ''
        },
        hiddenComponentCreate: false,
        loadingBtnSave: false,
        loadingBtnSaveApprove: false,
        loadingBtnSave2: false,
        loadingBtnPayment: false,
        stockadjustment: {
          ListStockAdjustmentItem: [],
          WarehouseId: null,
          Warehouse: [],
          Date: null,
          Notes: '',
          Status: 0,
          StockAdjustmentNo: '-'
        }
      }
    },
    methods: {
      cancel() {
        this.$refs.form.reset()
      },
      getProduct() {
        var self = this
        console.log(this.stockadjustment.WarehouseId)
        this.$store
            .dispatch("GET_PRODUCTBYWAREHOUS_OF_STOCKADJUSTMENT",this.stockadjustment.WarehouseId)
            .then(response => {
              console.log(response, 'dari myfunction');
              this.stockadjustment.ListStockAdjustmentItem = response.data
            })
            .catch(err => {
              console.log('gagal', err)
            })
      },
      save() {
        const warehouse = this.Warehouse.filter(item => item.Id == this.stockadjustment.WarehouseId)
        this.stockadjustment.WarehouseName = warehouse[0].Name
        this.stockadjustment.Date = '2018-11-06'
        delete this.stockadjustment.Warehouse
        const ListStockAdjustmentItem = this.stockadjustment.ListStockAdjustmentItem;
        const reject = _.reject(this.stockadjustment.ListStockAdjustmentItem, o => {
          return o.AdjustmentQuantityDiff == 0;
        });
        this.stockadjustment.ListStockAdjustmentItem = reject;
        
        if (this.$refs.form.validate()) {
          console.log('test 3')
          this.alert.status = false
          this.loadingBtnSave = true
          this.$store.dispatch(CREATE_STOCKADJUSTMENT, this.stockadjustment)
            .then((response) => {
              this.alert = {
                status: true,
                type: 'success',
                message: 'Data is submited.'
              }
              this.$router.push({
                path: '/stockadjustment'
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
      saveApprove() {
        const warehouse = this.Warehouse.filter(item => item.Id == this.stockadjustment.WarehouseId)
        this.stockadjustment.WarehouseName = warehouse[0].Name
        this.stockadjustment.Date = '2018-11-06'
        delete this.stockadjustment.Warehouse
        const ListStockAdjustmentItem = this.stockadjustment.ListStockAdjustmentItem;
        const reject = _.reject(this.stockadjustment.ListStockAdjustmentItem, o => {
          return o.AdjustmentQuantityDiff == 0;
        });
        this.stockadjustment.ListStockAdjustmentItem = reject;
        
        if (this.$refs.form.validate()) {
          console.log('test 3')
          this.alert.status = false
          this.loadingBtnSaveApprove = true
          this.$store.dispatch(CREATE_APPROVE_STOCKADJUSTMENT, this.stockadjustment)
            .then((response) => {
              this.alert = {
                status: true,
                type: 'success',
                message: 'Data is submited.'
              }
              this.$router.push({
                path: '/stockadjustment'
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
      diff(index) {
        var Quantity = this.stockadjustment.ListStockAdjustmentItem[index].Quantity
        var RealQuantity = this.stockadjustment.ListStockAdjustmentItem[index].RealQuantity
        var diff = 0
        if (RealQuantity == null || RealQuantity == '') {
            diff = 0
        }
        else if (RealQuantity > Quantity) {
          diff = parseInt(RealQuantity) - Quantity
        }else if (RealQuantity < Quantity) {
          diff = RealQuantity - Quantity
        }
        else if (RealQuantity == Quantity) {
          diff = 0
        }
        this.stockadjustment.ListStockAdjustmentItem[index].ProductCode = this.stockadjustment.ListStockAdjustmentItem[index].SKU
        this.stockadjustment.ListStockAdjustmentItem[index].AdjustmentQuantityDiff = diff
        return diff
      },
      lineTotal(index) {
        var harga = this.stockadjustment.ListStockAdjustmentItem[index].Price
        var TotalDiff = this.diff(index) * harga
        this.stockadjustment.ListStockAdjustmentItem[index].AdjustmentTotalDiff = TotalDiff
        return TotalDiff
      },
    },
    async created() {
      await this.$store.dispatch('GET_WAREHOUSE_OF_STOCKADJUSTMENT').then(result => {
        this.Warehouse = result.data
      })
      this.hiddenComponentCreate = true
      this.loadingPage = false
    }
  }
</script>
