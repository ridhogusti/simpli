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
              <FormGoodsReceipt :GoodsReceipt="GoodsReceipt" :Title="title" :errorMessage="errorMessage"></FormGoodsReceipt>
              <div class="botton-submit text-md-center">
                <v-btn round class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save">
                  <v-icon left>save</v-icon> Save</v-btn>
                <v-btn round class="lightBlueGreyBackground blueyPurpleColor" :loading="loadingBtnSave2" :disabled="loadingBtnSave2" @click.prevent="saveandapprove">
                  <v-icon left>save</v-icon> Save And Approve</v-btn>
               
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
                Are you sure you want to cancel this list?
              </div>
              <br>
              <hr class="hrDialog">
              <v-layout align-content-center justify-center row wrap>
                <v-flex lg3>
                  <v-btn round class="btnYdialog" color="primary" @click.native="deleted">Yes, cancel</v-btn>
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
  import FormGoodsReceipt from '@/components/goodsreceipt/Form'
  import {
    GET_PURCHASEORDER,
    UPDATE_PURCHASEORDER,
    DELETE_PURCHASEORDER,
    CREATE_GOODSRECEIPT, 
    CREATE_APPROVE_GOODSRECEIPT,
    GET_GOODSRECEIPT_FROM_PO 
  } from '@/store/actions.type'
import { GET_GOODSRECEIPT } from '../../store/actions.type';
  
  export default {
    components: {
      FormGoodsReceipt
    },
    props: ['id'],
    data() {
      return {
        edit: true,
        loadingPage: true,
        title: 'CREATE GOODSRECEIPT',
        errorMessage : [],
        alertMessage:{
          status:false,
          messages:[]
        },
        alert: {
          status: false,
          type: 'success',
          message: ''
        },
        loadingBtnSave: false,
        loadingBtnSave2: false,
        dialog: false,
        GoodsReceipt: {
          ListGoodsReceiptItem: [
            {
              ProductName: null,
              ProductSKU: null,
              ProductDescription: null,
              ProductId: null,
              description: null,
              Quantity: null,
            }
          ],
          // 
          DueDate: null,
          GoodsReceiptNo:"",
          ReffrenceNo:null,
          DocumentType:null,
          Date: null,
          Notes: '',
          Status: null,
          SupplierId:null,
          WarehouseId:null
        }
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
      checkForm:function(e) {
        
        e.preventDefault();
      },
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
      save() {
        // if(this.name && this.age) return true;
        this.errorMessage = [];
        console.log(this.GoodsReceipt);
        if (this.$refs.form.validate()) {
          this.loadingBtnSave = true
          if(this.GoodsReceipt.Status == null){
            this.GoodsReceipt.Status=0,
            this.GoodsReceipt.DocumentType = 1,
            this.GoodsReceipt.GoodsReceiptNo=""
          }
          // this.GoodsReceipt.ListGoodsReceiptItem.forEach(element => {
          //   element.ReffrenceId = element.Id
          //   delete element.Id
          // });
          delete this.GoodsReceipt.Id

          this.$store.dispatch(CREATE_GOODSRECEIPT, this.GoodsReceipt)
            .then((response) => {
              this.loadingBtnSave = false
              this.$router.push({
                path: '/goodsreceipt'
              })
              console.log(response);
              
            }).catch((err) => {
              console.log(err.message);
              console.log(err.response.data.errorMessage);
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
              // this.alert = {
              //     status: true,
              //     type: 'error',
              //     message: err.message
              //   }
              this.loadingBtnSave = false
            })
        }else{
          if(!this.GoodsReceipt.SupplierId) this.errorMessage.push("Supplier required.");
          if(!this.GoodsReceipt.WarehouseId) this.errorMessage.push("Warehouse required.");
          if(!this.GoodsReceipt.DueDate) this.errorMessage.push("Due Date Required")
          if(!this.GoodsReceipt.Date) this.errorMessage.push("Date Required")
          if(this.GoodsReceipt.ListGoodsReceiptItem.length < 1 ) this.errorMessage.push("List GoodsReceipt Required")
          // if(!this.GoodsReceipt.ReffrenceNo) this.errorMessage.push("Reffrence No required.");
          this.alertMessage = {
            status: true,
            messages: this.errorMessage
          }
        }
        this.loadingBtnSave = false
        
        
        
      },
      saveandapprove() {
        this.errorMessage = [];
        console.log(this.GoodsReceipt);
        if (this.$refs.form.validate()) {
          this.loadingBtnSave2 = true
        if(this.GoodsReceipt.Status == null){
          this.GoodsReceipt.Status=0,
          this.GoodsReceipt.DocumentType = 1
        }
        this.$store.dispatch(CREATE_APPROVE_GOODSRECEIPT, this.GoodsReceipt)
          .then((response) => {
            this.loadingBtnSave2 = false
            this.$router.push({
              path: '/goodsreceipt'
            })
            console.log(response);
            
          }).catch((err) => {
          this.loadingBtnSave2 = false

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
          })
        }else{
          if(!this.GoodsReceipt.SupplierId) this.errorMessage.push("Supplier required.");
          if(!this.GoodsReceipt.WarehouseId) this.errorMessage.push("Warehouse required.");
          if(!this.GoodsReceipt.DueDate) this.errorMessage.push("Due Date Required")
          if(!this.GoodsReceipt.Date) this.errorMessage.push("Date Required")
          if(this.GoodsReceipt.ListGoodsReceiptItem.length < 1 ) this.errorMessage.push("List GoodsReceipt Required")
          // if(!this.GoodsReceipt.ReffrenceNo) this.errorMessage.push("Reffrence No required.");
          this.alertMessage = {
            status: true,
            messages: this.errorMessage
          }
        }
        this.loadingBtnSave = false
      }
    },
    async created() {
  
      await this.$store.dispatch('GET_SUPLLIER_OF_PURCHASEORDER')
      await this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASEORDER')
      await this.$store.dispatch('GET_PAYMENTTERM_OF_PURCHASEORDER')
      if(this.id !=1){
        await this.$store.dispatch(GET_GOODSRECEIPT_FROM_PO, this.id).then(
          result =>{
            this.GoodsReceipt = result.data
            console.log(result);
            
          }
        )

      //   await this.$store.dispatch(GET_PURCHASEORDER, this.id).then(
      //   result => {
      //       this.GoodsReceipt.DueDate = result.data.DueDate
      //       this.GoodsReceipt.ListGoodsReceiptItem= result.data.ListPurchaseOrderItem,
      //       this.GoodsReceipt.GoodsReceiptNo = null,
      //       this.GoodsReceipt.ReffrenceNo = result.data.InvoiceNo,
      //       this.GoodsReceipt.DocumentType=null,
      //       this.GoodsReceipt.Date=result.data.Date,
      //       this.GoodsReceipt.Notes=result.data.Notes,
      //       this.GoodsReceipt.Status=0,
      //       this.GoodsReceipt.DocumentType = 1,
      //       this.GoodsReceipt.SupplierId=result.data.SupplierId,
      //       this.GoodsReceipt.WarehouseId=result.data.WarehouseId
      //   }
      // )
      }
      
      this.loadingPage = false

      console.log(this.GoodsReceipt);
      
  
    }
  }
</script>