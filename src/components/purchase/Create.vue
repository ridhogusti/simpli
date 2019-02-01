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
            <v-form id="formid" ref="form">
              <FormPurchase :GrinPo="GrinPo" :myFunctionGR="myFunctionGR" id="#formid" :hiddenComponentPO="hiddenComponentPO" :changeSelectGR="changeSelectGR" :modereadonly="modereadonly" :modereadonlyCreate="modereadonlyCreate" :hiddenButtonAdd="hiddenButtonAdd" :selectedGR="selectedGR" :loadingPage="loadingPage"
                :Purchase="purchase" :Title="title" :PurchaseOrder="purchaseorder"></FormPurchase>
              <hr class="hrfooter">
              <v-layout row wrap>
                <v-flex xs6>
                  <div class="button-submit text-md-left">
                    <v-btn v-if="DisableBtn != true" round class="tealishBackground" :loading="loadingBtnPayment" :disabled="loadingBtnPayment" @click.prevent="save">
                      <v-icon left>save</v-icon> Make Payment</v-btn>
                    <v-btn v-if="DisableBtn != true" round class="lightBlueGreyBackground blueyPurpleColor" @click.prevent="saveEmail">
                      <v-icon left>email</v-icon> Email</v-btn>
                    <v-btn v-if="DisableBtn != true" round class="lightBlueGreyBackground blueyPurpleColor" @click.prevent="savePrint">
                      <v-icon left>local_printshop</v-icon> Print</v-btn>
                    <v-btn v-if="DisableBtn != true" round class="lightBlueGreyBackground blueyPurpleColor">
                      <v-icon left>cancel</v-icon> Void</v-btn>
                  </div>
                </v-flex>
  
                <v-flex xs6>
                  <div class="button-submit text-md-right">
                    <v-btn round class="blueyPurpleBackground whiteColor" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save">
                      <v-icon left>save</v-icon> Save</v-btn>
                    <v-btn v-if="DisableBtn != true" round class="lightBlueGreyBackground blueyPurpleColor" @click.prevent="saveApprove" :loading="loadingBtnSave2" :disabled="loadingBtnSave2">
                      <v-icon left>save</v-icon> Save & Approve</v-btn>
                    <v-btn v-if="DisableBtn != true" round class="lightBlueGreyBackground blueyPurpleColor" @click="cancel"> Cancel</v-btn>
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
                  <span class="nameDocument">The name</span> has approved form Purchase
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
                  <span class="nameDocument">The name</span> has rejected approval form Purchase
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
                  <span class="nameDocument">The name</span> has requested approval form Purchase
                </v-flex>
              </v-layout>
            </v-card>
          </v-card-text>
  
  
  
          <br>
          <v-card-text class="pa-0 white lighten-1">
            <v-layout class="backToList" justify-center row wrap>
              <router-link to="/purchase">
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
  import FormPurchase from '@/components/purchase/Form'
  import {
    CREATE_PURCHASE,
    CREATE_APPROVE_PURCHASE,
    GET_PURCHASEORDER
  } from '@/store/actions.type'
  import {
    GET_PURCHASEORDERS
  } from '../../store/actions.type';
  
  export default {
    components: {
      FormPurchase
    },
    props: ['id'],
    data() {
      return {
        title: 'CREATE PURCHASE',
        DisableBtn: false,
        hiddenComponentPO: false,
        modereadonlyCreate: false,
        modereadonly: false,
        loadingPage: true,
        hiddenButtonAdd: false,
        alert: {
          status: false,
          type: 'success',
          message: ''
        },
        selectedGR: {
          selectedGR: []
        },
        GrinPo: [],
        loadingBtnSave: false,
        loadingBtnSave2: false,
        loadingBtnPayment: false,
        purchaseorder: [],
        ReferenceNo: '-',
        purchase: {
          selectedGR: [],
          ListPurchaseItem: [{
            ProductName: '',
            ProductPrice: null,
            ProductSKU: '',
            ProductDescription: '',
            TipeDiscount: 'percentage',
            ToggleDiscount: 1,
            ProductId: '',
            Quantity: null,
            DiscountAmount: null,
            DiscountPercentage: 0,
            Tax: '',
            LineTotal: 0,
            ReferenceId: ''
          }],
          SupplierId: null,
          WarehouseId: null,
          DueDate: null,
          Date: null,
          Notes: '',
          TotalPurchase: 0,
          TipeDiscount: 'percentage',
          DiscountAmount: null,
          DiscountPercentage: 0,
          SubTotal: 0,
          TaxAmount: 0,
          TaxPercentage: 0,
          Status: 'Open',
          PaymentTermId: '',
          InvoiceNo: '-',
          ReferenceNo: '',
          ReferenceNoPo: '',
          Type: 0,
          ToggleDiscount: 1
        }
      }
    },
    methods: {
      myFunctionGR() {
        this.purchase.ListPurchaseItem = []
        console.log('function graeonuh ');
        var self = this
        this.hiddenButtonAdd = true
        this.modereadonlyCreate = true
        this.DisableBtn = true
        // this.selectedGR.selectedGR = []
        this.purchase.selectedGR = []
        this.GrinPo = []
        console.log(self.purchase.ReferenceNoPo);
        setTimeout(function() {
          self.$store
            .dispatch('GET_PURCHASEORDER_CREATE_PI', self.purchase.ReferenceNoPo)
            .then(response => {
              console.log(response, 'dari purchase order');
              self.GrinPo = response.data.grinpo;
              self.purchase.SupplierId = response.data.results.Supllier.Id
              self.purchase.WarehouseId = response.data.results.Warehouse.Id
              self.purchase.PaymentTermId = self.$store.state.supplier.supplier.PaymentTermId
            })
            .catch(err => {
              console.log('gagal')
            })
        }, 10)
      },
      cancel() {
        // console.log(this.$refs.form, 'form');
        this.$refs.form.reset()
      },
      checkNull() {
        if (this.purchase.DiscountAmount == null) {
          this.purchase.DiscountAmount = 0;
        }
        if (this.purchase.DiscountPercentage == null) {
          this.purchase.DiscountPercentage = 0;
        }
        for (var i = 0; i < this.purchase.ListPurchaseItem.length; i++) {
          if (this.purchase.ListPurchaseItem[i].DiscountAmount == null) {
            this.purchase.ListPurchaseItem[i].DiscountAmount = 0;
          }
          if (this.purchase.ListPurchaseItem[i].DiscountPercentage == null) {
            this.purchase.ListPurchaseItem[i].DiscountPercentage = 0;
          }
        }
      },
      save() {
        console.log(this.purchase);
        console.log('test')
        // if (this.ReferenceNo == '-') {
        //   this.ReferenceNo = this.purchase.InvoiceNo
        // }
        // this.purchase.ReferenceNo = this.ReferenceNo;
        for (var i = 0; i < this.purchase.ListPurchaseItem.length; i++) {
          console.log(this.purchase.ListPurchaseItem[i].TipeDiscount, 'ini tipe discount')
          if (this.purchase.ListPurchaseItem[i].TipeDiscount == 'amount') {
            this.purchase.ListPurchaseItem[i].DiscountPercentage = 0;
          } else if (this.purchase.ListPurchaseItem[i].TipeDiscount == 'percentage') {
            this.purchase.ListPurchaseItem[i].DiscountAmount = 0;
          }
        }
        if (this.purchase.TipeDiscount == 'amount') {
          this.purchase.DiscountPercentage = 0
        }
        if (this.purchase.TipeDiscount == 'percentage') {
          this.purchase.DiscountAmount = 0
        }
        this.purchase.Status = 'Active'
        this.checkNull();
        if (this.$refs.form.validate()) {
          console.log('test 3')
          this.alert.status = false
          this.loadingBtnSave = true
          this.$store.dispatch(CREATE_PURCHASE, this.purchase)
            .then((response) => {
              this.alert = {
                status: true,
                type: 'success',
                message: 'Data is submited.'
              }
              this.$router.push({
                path: '/purchase'
              })
              // this.loadingBtnSave = false
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
        for (var i = 0; i < this.purchase.ListPurchaseItem.length; i++) {
          console.log(this.purchase.ListPurchaseItem[i].TipeDiscount, 'ini tipe discount')
          if (this.purchase.ListPurchaseItem[i].TipeDiscount == 'amount') {
            this.purchase.ListPurchaseItem[i].DiscountPercentage = 0;
          } else if (this.purchase.ListPurchaseItem[i].TipeDiscount == 'percentage') {
            this.purchase.ListPurchaseItem[i].DiscountAmount = 0;
          }
        }
        if (this.purchase.TipeDiscount == 'amount') {
          this.purchase.DiscountPercentage = 0
        }
        if (this.purchase.TipeDiscount == 'percentage') {
          this.purchase.DiscountAmount = 0
        }
        this.purchase.Status = 'Active'
        if (this.$refs.form.validate()) {
          this.alert.status = false
          this.loadingBtnSave2 = true
          this.$store.dispatch(CREATE_APPROVE_PURCHASE, this.purchase)
            .then((response) => {
              this.alert = {
                status: true,
                type: 'success',
                message: 'Data is submited.'
              }
              this.$router.push({
                path: '/purchase'
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
      },
      changeSelectGR() {
        this.$vuetify.goTo('#formid', {
          duration: 300,
          offset: 400,
          easing: 'linear'
        })
        this.modereadonlyCreate = true
        this.hiddenButtonAdd = true
        this.DisableBtn = true
        // this.modereadonly = false
        var selectGR = String(this.purchase.selectedGR[0])
        for (let i = 1; i < this.purchase.selectedGR.length; i++) {
          selectGR = selectGR.concat(" ", String(this.purchase.selectedGR[i]));
        }
  
        this.purchase.ReferenceNo = selectGR
  
        this.purchase.ListPurchaseItem = []
        console.log(selectGR, 'select gr');
        this.$store.dispatch("GET_GOODSRECEIPTITEM_PURCHASE", selectGR).then(result => {
          console.log(result.data, 'aoeuueueu')
          var k = 0
          for (let i = 0; i < result.data.length; i++) {
            console.log(i, 'jumlah i');
            console.log(result.data);
            for (let j = 0; j < result.data[i].ListGoodsReceiptItem.length; j++) {
              console.log(j, 'jumlah j');
              console.log(k, 'jumlah k');
              console.log(result.data[i].ListGoodsReceiptItem);
              this.purchase.ListPurchaseItem.push({
                ProductName: '',
                ProductPrice: null,
                ProductUnitId: null,
                ProductSKU: '',
                ProductDescription: '',
                TipeDiscount: 'percentage',
                ToggleDiscount: 1,
                ProductId: '',
                Quantity: null,
                DiscountAmount: null,
                DiscountPercentage: 0,
                Tax: '',
                LineTotal: 0,
                ReferenceId: ''
              })
              this.purchase.ListPurchaseItem[k].ReferenceId = result.data[i].ListGoodsReceiptItem[j].Id
              this.purchase.ListPurchaseItem[k].ProductUnitId = result.data[i].ListGoodsReceiptItem[j].ProductUnitId
              if (result.data[i].ListGoodsReceiptItem[j].SisaQuantity == 0) {
                this.purchase.ListPurchaseItem[k].Quantity = result.data[i].ListGoodsReceiptItem[j].Quantity
              } else {
                this.purchase.ListPurchaseItem[k].Quantity = result.data[i].ListGoodsReceiptItem[j].SisaQuantity
              }
              this.getProductUnit(k)
              console.log(this.purchase.ListPurchaseItem[k].ProductUnitId, 'product unit id');
              k++
              delete this.purchase.ListPurchaseItem[j].Id
            }
            // delete this.purchase.ListGoodsReceiptItem
            // delete this.purchase.Id
          }
  
        })
      },
      getProductUnit(index) {
        var self = this
        console.log('teosut');
        setTimeout(function() {
          self.$store
            .dispatch(
              "GET_PRODUCTUNIT_PURCHASE",
              self.purchase.ListPurchaseItem[index].ProductUnitId
            )
            .then(response => {
              console.log(response, 'dari myfunction');
              self.purchase.ListPurchaseItem[index].ProductId = response.data.ProductId
              self.purchase.ListPurchaseItem[index].ProductDescription = response.data.Description
              self.purchase.ListPurchaseItem[index].ProductPrice = response.data.PriceListItem.Price
              self.purchase.ListPurchaseItem[index].ProductName = response.data.Name
              self.purchase.ListPurchaseItem[index].SKU = response.data.SKU
              // self.purchase.ListPurchaseItem[index].Tax = response.data.Tax.Name
              self.purchase.ListPurchaseItem[index].UnitId = response.data.UnitId
  
            })
            .catch(err => {
              console.log('gagal', err)
            })
        }, 10)
      },
    },
    async created() {
      if (this.id !== undefined) {
        console.log('ada id');
        await this.$store.dispatch("GET_GOODSRECEIPTS_FOR_PI", this.id).then((result) => {
          this.purchase = {
            ListPurchaseItem: [],
            SupplierId: null,
            WarehouseId: null,
            DueDate: null,
            Date: null,
            Notes: '',
            TotalPurchase: 0,
            TipeDiscount: 'percentage',
            DiscountAmount: null,
            DiscountPercentage: 0,
            SubTotal: 0,
            TaxAmount: 0,
            TaxPercentage: 0,
            Status: 'Open',
            PaymentTermId: '',
            InvoiceNo: '-',
            ReferenceNo: '',
            Type: 0,
            ToggleDiscount: 1
          }
          console.log(result.data, 'result data bro')
          for (let i = 0; i < result.data.ListGoodsReceiptItem.length; i++) {
            this.purchase.ListPurchaseItem.push({
              ProductName: '',
              ProductPrice: null,
              ProductSKU: '',
              ProductDescription: '',
              TipeDiscount: 'percentage',
              ToggleDiscount: 1,
              ProductId: '',
              Quantity: null,
              DiscountAmount: null,
              DiscountPercentage: 0,
              Tax: '',
              LineTotal: 0,
              ReferenceId: ''
            })
            this.purchase.ListPurchaseItem[i].ReferenceId = result.data.ListGoodsReceiptItem[i].Id
            this.purchase.ListPurchaseItem[i].ProductUnitId = result.data.ListGoodsReceiptItem[i].ProductUnitId
            // this.purchase.InvoiceNo = result.data.InvoiceNo
            this.purchase.ReferenceNo = result.data.GoodsReceiptNo
            this.purchase.SupplierId = result.data.SupplierId
            this.purchase.WarehouseId = result.data.WarehouseId
            this.purchase.DiscountPercentage = result.data.DiscountPercentage
            this.purchase.ListPurchaseItem[i].Tax = result.data.ListGoodsReceiptItem[i].Tax
            this.purchase.ListPurchaseItem[i].Quantity = result.data.ListGoodsReceiptItem[i].SisaQuantity
            this.purchase.ListPurchaseItem[i].DiscountPercentage = result.data.ListGoodsReceiptItem[i].DiscountPercentage
            this.getProductUnit(i)
            delete this.purchase.ListPurchaseItem[i].Id
          }
          delete this.purchase.ListGoodsReceiptItem
          delete this.purchase.Id
          this.hiddenButtonAdd = true
          this.hiddenComponentPO = true
        })
        this.modereadonlyCreate = true
        this.modereadonly = false
        await this.$store.dispatch('GET_SUPLLIER_OF_PURCHASE')
        await this.$store.dispatch('GET_PAYMENTTERM_OF_PURCHASE')
        await this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASE')
        await this.$store.dispatch('GET_PURCHASEORDER_OF_PURCHASE').then((result) => {
          this.purchaseorder = result.data
        })
        this.DisableBtn = true
        this.loadingPage = false
      } else {
  
        this.selectedGR = {
          selectedGR: []
        }
        await this.$store.dispatch('GET_SUPLLIER_OF_PURCHASE')
        await this.$store.dispatch('GET_PAYMENTTERM_OF_PURCHASE')
        await this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASE')
        await this.$store.dispatch('GET_PURCHASEORDER_OF_PURCHASE').then((result) => {
          this.purchaseorder = result.data
        })
        this.modereadonlyCreate = false
        this.modereadonly = false
        this.loadingPage = false
      }
    }
  }
</script>
