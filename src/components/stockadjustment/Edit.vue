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
        <v-alert v-model="alert.status" :type="alert.type" dismissible>
          {{alert.message}}
        </v-alert>
      </div>
      <v-layout row>
        <v-flex xs12 sm12>
          <v-card-text>
            <v-form ref="form">
              <FormStockAdjustment :Warehouse="Warehouse" :lineTotal="lineTotal" :diff="diff" :getProduct="getProduct" :StockAdjustment="stockadjustment" :Title="title"></FormStockAdjustment>
              <div class="botton-submit text-md-center">
                <v-btn round class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save">
                  <v-icon left>save</v-icon> Save</v-btn>
                <v-btn round class="error" dark :loading="loadingBtnDelete" :disabled="loadingBtnDelete" @click.native.stop="dialog = true">
                  <v-icon left>delete</v-icon> Delete</v-btn>
              </div>
            </v-form>
          </v-card-text>
  
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
  
      <div>
        <v-dialog content-class="dialog_modal" v-model="dialog" max-width="500">
          <v-card class="card_modal" justify-center align-center>
            <v-card-title class="red headerModal">
              <v-layout row wrap>
                <v-flex xs2> </v-flex>
                <v-flex xs8 class="titleModal">
                  Delete Confirmation
                </v-flex>
              </v-layout>
            </v-card-title>
            <hr class="devider">
            <v-card-text class="text-xs-center">
              <img src="../../assets/img/delete-icon-large.svg" aspect-ratio="1.7" contains tyle="width: 21px; height: 21px" />
              <div class="descriptionDelete">
                Are you sure you want to delete this list?
              </div>
              <br>
              <hr class="hrDialog">
              <v-layout align-content-center justify-center row wrap>
                <v-flex lg3>
                  <v-btn round class="btnYdialog" color="primary" @click.native="deleted">Yes, delete</v-btn>
                </v-flex>
                <v-flex lg3>
                  <v-btn round class="btnNdialog" color="" @click.native="dialog = false">Cancel</v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
  
  
          </v-card>
        </v-dialog>
      </div>
  
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'vue-moment'
  import FormStockAdjustment from '@/components/stockadjustment/Form'
  import {
    GET_STOCKADJUSTMENT,
    UPDATE_STOCKADJUSTMENT,
    DELETE_STOCKADJUSTMENT
  } from '@/store/actions.type'
  
  export default {
    components: {
      FormStockAdjustment
    },
    props: ['id'],
    data() {
      return {
        edit: true,
        loadingPage: true,
        title: 'EDIT STOCKADJUSTMENT',
        Warehouse: [],
        alert: {
          status: false,
          type: 'success',
          message: ''
        },
        loadingBtnSave: false,
        dialog: false,
        // stockadjustment: {
        //   ListStockAdjustmentItem: [{
        //     ProductName: '',
        //     ProductPrice: 0,
        //     ProductSKU: '',
        //     ProductDescription: '',
        //     tipeDiscount: 'amount',
        //     toggle_discount: 0,
        //     ProductId: '',
        //     description: '',
        //     price: 0,
        //     Quantity: 0,
        //     DiscountAmount: 0,
        //     DiscountPercentage: 0,
        //     Tax: '',
        //     LineTotal: 0
        //   }],
        //   DueDate: null,
        //   Date: null,
        //   Notes: '',
        //   TotalStockAdjustment: 0,
        //   DiscountAmount: 0,
        //   DiscountPercentage: 0,
        //   SubTotal: 0,
        //   TaxAmount: 0,
        //   TaxPercentage: 0,
        //   Status: 'Active'
        // }
      }
    },
    computed: {
      stockadjustment() {
        return this.$store.state.stockadjustment.stockadjustment
      }
    },
    mounted() {},
    methods: {
      deleted() {
        this.$store.dispatch(DELETE_STOCKADJUSTMENT, this.id)
          .then((response) => {
            this.$router.push({
              path: '/stockadjustment'
            })
          }).catch((err) => {
            this.alert = {
              status: true,
              type: 'error',
              message: err.message
            }
          });
      },
      save() {
        this.loadingBtnSave = true
        console.log(this.stockadjustment, 'stockadjustment');
        this.$store.dispatch(UPDATE_STOCKADJUSTMENT, this.stockadjustment)
          .then((response) => {
            this.loadingBtnSave = false
            this.$router.push({
              path: '/stockadjustment'
            })
          }).catch((err) => {
            this.alert = {
              status: true,
              type: 'error',
              message: err.message
            }
            this.loadingBtnSave = false
          })
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
        // this.stockadjustment.ListStockAdjustmentItem[index].ProductCode = this.stockadjustment.ListStockAdjustmentItem[index].SKU
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
      await this.$store.dispatch(GET_STOCKADJUSTMENT, this.id)
      this.loadingPage = false
    }
  }
</script>