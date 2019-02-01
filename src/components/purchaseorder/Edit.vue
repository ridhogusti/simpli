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
              <FormPurchaseOrder :productUnit="productunit" :PurchaseOrder="purchaseorder" :Title="title"></FormPurchaseOrder>
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
  import FormPurchaseOrder from '@/components/purchaseorder/Form'
  import {
    GET_PURCHASEORDER,
    UPDATE_PURCHASEORDER,
    DELETE_PURCHASEORDER
  } from '@/store/actions.type'
  
  export default {
    components: {
      FormPurchaseOrder
    },
    props: ['id'],
    data() {
      return {
        edit: true,
        loadingPage: true,
        title: 'EDIT PURCHASEORDER',
        alert: {
          status: false,
          type: 'success',
          message: ''
        },
        loadingBtnSave: false,
        dialog: false,
        productunit: [],
        // purchaseorder: {
        //   ListPurchaseOrderItem: [{
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
        //   TotalPurchaseOrder: 0,
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
      purchaseorder() {
        return this.$store.state.purchaseorder.purchaseorder
      }
    },
    mounted() {},
    methods: {
      deleted() {
        this.$store.dispatch(DELETE_PURCHASEORDER, this.id)
          .then((response) => {
            this.$router.push({
              path: '/purchaseorder'
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
        this.$store.dispatch(UPDATE_PURCHASEORDER, this.purchaseorder)
          .then((response) => {
            this.loadingBtnSave = false
            this.$router.push({
              path: '/purchaseorder'
            })
          }).catch((err) => {
            this.alert = {
              status: true,
              type: 'error',
              message: err.message
            }
            this.loadingBtnSave = false
          })
      }
    },
    async created() {
      await this.$store.dispatch('GET_SUPLLIER_OF_PURCHASEORDER')
      await this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASEORDER')
      await this.$store.dispatch('GET_PAYMENTTERM_OF_PURCHASEORDER')
       await this.$store.dispatch('GET_PRODUCTUNIT_OF_PURCHASE').then(result => {
         for (let i = 0; i < result.data.length; i++){
          this.productunit.push(
            {}
          )
           this.productunit[i].ProductId = result.data[i].ProductId
          this.productunit[i].ProductUnitId = result.data[i].Id
          this.productunit[i].ProductDescription = result.data[i].Description
          this.productunit[i].ProductPrice = result.data[i].PriceListItem.Price
          this.productunit[i].ProductName = result.data[i].Name
          this.productunit[i].ProductSKU = result.data[i].SKU
          this.productunit[i].Barcode = result.data[i].Barcode
          this.productunit[i].Tax = result.data[i].Tax.Name
          this.productunit[i].UnitId = result.data[i].UnitId
         }
      })
      await this.$store.dispatch(GET_PURCHASEORDER, this.id)
      await this.$store.dispatch('GET_TAX_OF_PURCHASE')

      this.loadingPage = false
    }
  }
</script>