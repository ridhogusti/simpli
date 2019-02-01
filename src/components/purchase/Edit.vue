<template>
  <v-container class="body" fluid grid-list-md>
    
    <div v-if="alert.status">
      <v-alert v-model="alert.status" :type="alert.type" dismissible>
        {{alert.message}}
      </v-alert>
    </div>
    {{ purchase }}
    <v-layout row>
      <v-flex xs12 sm12>
          <v-card-text>
            <v-form ref="form">
              <FormPurchase :hiddenButtonAdd="hiddenButtonAdd" :Purchase="purchase" :Title="title"></FormPurchase>
              <div class="botton-submit text-md-center">
                <v-btn round class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save"><v-icon left>save</v-icon> Save</v-btn>
                <!-- <v-btn class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="saveAndApprove"><v-icon left>save</v-icon> Save & Approve</v-btn> -->
              </div>
            </v-form>
          </v-card-text>
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
</template>

<script>
  import axios from 'axios'
  import moment from 'vue-moment'
  import FormPurchase from '@/components/purchase/Form'
  import { GET_PURCHASE, UPDATE_PURCHASE, DELETE_PURCHASE } from '@/store/actions.type'

  export default {
    components: {
      FormPurchase
    },
    props: ['id'],
    data () {
      return {
        edit: true,
        title: 'EDIT PURCHASE',
        hiddenButtonAdd: false,
        alert: {
          status: false, type: 'success', message: ''
        },
        loadingBtnSave: false,
        dialog: false,
        purchase: []
      // purchase: {
      //   ListPurchaseItem: [{
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
      //   TotalPurchase: 0,
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
    // purchase () {
    //   return this.$store.state.purchase.purchase
    // }
  },
  mounted () {
    // this.$store.dispatch(GET_PURCHASE, this.id)
  },
  methods: {
    deleted () {
      this.$store.dispatch(DELETE_PURCHASE, this.id)
      .then((response) => {
        this.$router.push({ path: '/purchase' })
      }).catch((err) => {
        this.alert = {
          status: true,
          type: 'error',
          message: err.message
        }
      });
    },
    save () {
      this.loadingBtnSave = true
      this.$store.dispatch(UPDATE_PURCHASE, this.purchase)
      .then((response) => {
        this.loadingBtnSave = false
        this.$router.push({ path: '/purchase' })
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
  async created(){


    await this.$store.dispatch('GET_SUPLLIER_OF_PURCHASE')
    
    await this.$store.dispatch('GET_PAYMENTTERM_OF_PURCHASE')

    await this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASE')

    await this.$store.dispatch(GET_PURCHASE, this.id).then((result) => {
      console.log(result.data, 'test adat');
      this.purchase = result.data
      if (result.data.ReferenceNo != "-") {
        this.hiddenButtonAdd = true
      }
    })
    
  }
}
</script>