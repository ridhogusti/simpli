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
          <ul>
          <li v-for="error in alert.message" :key="error">{{ error }}</li>
        </ul>
        </v-alert>
      </div>
      <div v-if="alertMessage.status">
        <v-alert v-model="alertMessage.status" dismissible>
        <b>Please correct the following error(s):</b>
          <ul>
          <li v-for="error in alertMessage.messages" :key="error">{{ error }}</li>
        </ul>
        </v-alert>
      </div>
      <v-layout row>
        <v-flex xs12 sm12>
          <v-card-text>
            <v-form ref="form">
              <FormPurchaseOrder :GoodsReceipt="goodsReceipt" :Title="title" :Detail="detail"></FormPurchaseOrder>
              <div class="botton-submit text-md-center">
                <v-btn  v-if="goodsReceipt.Status==0" round class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.native="() => {save(false)}">
                  <v-icon left>save</v-icon> Save</v-btn>
                <v-btn v-if="goodsReceipt.Status==0" round class="lightBlueGreyBackground blueyPurpleColor" @click.native="() => {save(true)}" :loading="loadingBtnSave2" :disabled="loadingBtnSave2">
                      <v-icon left>save</v-icon> Save and Approve</v-btn>
                <v-btn v-if="goodsReceipt.Status==1" round class="error" dark :loading="loadingBtnDelete" :disabled="loadingBtnDelete" @click.native.stop="dialog = true">
                  <v-icon left>delete</v-icon> Cancel</v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-card-text class="pa-0 white lighten-1">
            <v-layout class="backToList" justify-center row wrap>
              <router-link to="/goodsreceipt">
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
                  Cancel Confirmation
                </v-flex>
              </v-layout>
            </v-card-title>
            <hr class="devider">
            <v-card-text class="text-xs-center">
              <img src="../../assets/img/delete-icon-large.svg" aspect-ratio="1.7" contains tyle="width: 21px; height: 21px" />
              <div class="descriptionDelete">
                Are you sure you want to Cancel this GoodsReceipt?
              </div>
              <br>
              <hr class="hrDialog">
              <v-layout align-content-center justify-center row wrap>
                <v-flex lg3>
                  <v-btn round class="btnYdialog" color="primary" @click.native="save(true); goodsReceipt.Status = 2">Yes, cancel</v-btn>
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
  import FormPurchaseOrder from '@/components/goodsreceipt/Form'
  import {
    GET_PURCHASEORDER,
    GET_GOODSRECEIPT,
    UPDATE_GOODSRECEIPT,
    DELETE_GOODSRECEIPT
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
        saveAndApproveType:false,
        title: 'EDIT PURCHASEORDER',
        alert: {
          status: false,
          type: 'success',
          message: ''
        },
        alertMessage:{
          status:false,
          messages:[]
        },
        errorMessage:[],
        loadingBtnSave: false,
        loadingBtnSave2:false,
        dialog: false,
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
      goodsReceipt() {
        return this.$store.state.GoodsReceiptStore.GoodsReceipt
      }
    },
    mounted() {},
    methods: {
      deleted() {
        this.$store.dispatch(DELETE_GOODSRECEIPT, this.id)
          .then((response) => {
            this.$router.push({
              path: '/goodsreceipt'
            })
          }).catch((err) => {
            this.alert = {
              status: true,
              type: 'error',
              message: err.message
            }
          });
      },
      save(saveAndApproves) {
        this.errorMessage = [];
        if(this.$refs.form.validate()){
          saveAndApproves ? this.loadingBtnSave2 = true : this.loadingBtnSave = true
          this.goodsReceipt.saveAndApproves = saveAndApproves
        
          this.$store.dispatch(UPDATE_GOODSRECEIPT, this.goodsReceipt)
            .then((response) => {
              saveAndApproves ? this.loadingBtnSave2 = false : this.loadingBtnSave = false

              this.saveAndApproveType= null
              this.$router.push({
              path: '/goodsreceipt'
            })
          }).catch((err) => {
            if(err.response.data.errorMessage.length > 0){
                
                err.response.data.errorMessage.forEach(element => {
                  console.log(element);
                  this.errorMessage.push(element);
                });
                this.alert = {
                  status: true,
                  type: 'error',
                  message: this.errorMessage
                }
            }
            
            saveAndApproves ? this.loadingBtnSave2 = false : this.loadingBtnSave = false
          })
        }else{
          if(!this.GoodsReceipt.SupplierId) this.errorMessage.push("Supplier required.");
          if(!this.GoodsReceipt.WarehouseId) this.errorMessage.push("Warehouse required.");
          if(!this.GoodsReceipt.DueDate) this.errorMessage.push("Due Date Required")
          if(!this.GoodsReceipt.Date) this.errorMessage.push("Date Required")
          // if(!this.GoodsReceipt.ReffrenceNo) this.errorMessage.push("Reffrence No required.");
          this.alertMessage = {
            status: true,
            messages: this.errorMessage
          }
        }        
      }
    },
    async created() {
      console.log(this.id);
      
      await this.$store.dispatch('GET_SUPLLIER_OF_GOODSRECEIPT')
      await this.$store.dispatch('GET_WAREHOUSE_OF_GOODSRECEIPT')
      await this.$store.dispatch('GET_PAYMENTTERM_OF_GOODSRECEIPT')
      await this.$store.dispatch(GET_GOODSRECEIPT, this.id)
      this.loadingPage = false
      console.log(this.$store.state.GoodsReceiptStore.GoodsReceipt);
      
  
    }
  }
</script>