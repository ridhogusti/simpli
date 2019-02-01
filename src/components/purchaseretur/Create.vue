<template>
  <!-- <v-container class="body" fluid grid-list-md>
    <div v-if="alert.status">
      <v-alert v-model="alert.status" :type="alert.type" dismissible>{{alert.message}}</v-alert>
    </div>
    <v-layout row>
      <v-flex xs12 sm12>
          <v-card-text>
            <v-form ref="form">
              <FormPurchase :Purchase="purchase" :Title="title"></FormPurchase>
              <div class="button-submit text-md-center">

                <v-btn round class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save"><v-icon left>save</v-icon> Save</v-btn>
                <v-btn round class="secondary" @click.prevent="saveApprove" :loading="loadingBtnSave2" :disabled="loadingBtnSave2" ><v-icon left>save</v-icon> Save & Approve</v-btn>
                <v-btn round class="error" @click="cancel"><v-icon left>cancel</v-icon> Cancel</v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-card-text class="text-xs-center pa-0 grey lighten-1">
            <v-btn :to="'/purchase'">Back to list</v-btn>
          </v-card-text>
        </v-flex>
      </v-layout>
      
    </v-container> -->
  <v-container class="body" fluid grid-list-md>
    <div v-if="alert.status">
      <v-alert v-model="alert.status" :type="alert.type" dismissible>{{alert.message}}</v-alert>
    </div>
    <v-layout row>
      <v-flex xs12 sm12>
          <v-card-text>
            <v-form ref="form">
              <FormPurchase :Purchase="purchaseretur"></FormPurchase>
              <div class="botton-submit text-md-right">
                <v-btn class="secondary" @click.prevent="saveApprove" :loading="loadingBtnSave2" :disabled="loadingBtnSave2" ><v-icon left>save</v-icon> Retur</v-btn>
                <v-btn class="error" @click="cancel"><v-icon left>cancel</v-icon> Cancel</v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-card-text class="text-xs-center pa-0 grey lighten-1">
            <v-btn :to="'/purchaseretur'">Back to list</v-btn>
          </v-card-text>
      </v-flex>
    </v-layout>
  
  </v-container>
</template>

<script>
import FormPurchase from '@/components/purchase/Form'
import { CREATE_PURCHASE_RETUR } from '@/store/actions.type'
import { CREATE_APPROVE_PURCHASE_RETUR } from '../../store/actions.type';

export default {
  components: {
    FormPurchase
  },
  data () {
    return {
      title: 'Create a New Purchase Retur',
      alert: {
        status: false, type: 'success', message: ''
      },
      loadingBtnSave: false,
      loadingBtnSave2: false,
      purchaseretur: {
        ListPurchaseItem: [{
          ProductName: '',
          ProductPrice: 0,
          ProductSKU: '',
          ProductDescription: '',
          TipeDiscount: 'amount',
          ToggleDiscount: 0,
          ProductId: '',
          Quantity: 0,
          DiscountAmount: 0,
          DiscountPercentage: 0,
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
        DiscountAmount: 0,
        DiscountPercentage: 0,
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
    cancel () {
      this.$refs.form.reset()
    },
    saveApprove (event) {
      this.purchaseretur.Type = 1
      for (var i = 0; i < this.purchaseretur.ListPurchaseItem.length; i++) {
        console.log(this.purchaseretur.ListPurchaseItem[i].TipeDiscount, 'ini tipe discount')
        if (this.purchaseretur.ListPurchaseItem[i].TipeDiscount == 'amount') {
          this.purchaseretur.ListPurchaseItem[i].DiscountPercentage = 0;
        }else if (this.purchaseretur.ListPurchaseItem[i].TipeDiscount == 'percentage') {
          this.purchaseretur.ListPurchaseItem[i].DiscountAmount = 0;
        }
      }
      if (this.purchaseretur.TipeDiscount == 'amount') {
        this.purchaseretur.DiscountPercentage = 0
      }
      if (this.purchaseretur.TipeDiscount == 'percentage') {
        this.purchaseretur.DiscountAmount = 0
      }
      this.purchaseretur.Status = 'Active'
      if (this.$refs.form.validate()) {
        this.alert.status = false
        this.loadingBtnSave2 = true
        this.$store.dispatch(CREATE_PURCHASE_RETUR, this.purchaseretur)
        .then((response) => {
          this.alert = {
            status: true,
            type: 'success',
            message: 'Data is submited.'
          }
          this.$router.push({ path: '/purchaseretur' })
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
  created(){
    
    this.$store.dispatch('GET_SUPLLIER_OF_PURCHASE')
    
    this.$store.dispatch('GET_PAYMENTTERM_OF_PURCHASE')

    this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASE')
    
  }
}
</script>
