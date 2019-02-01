<template>
  <v-container fluid grid-list-md>
    <Detail />
    <v-flex xs12>
        <v-card-text>
          <div class="botton-submit text-md-right">
            <v-btn class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="saveRetur"><v-icon left>save</v-icon> Return</v-btn>
          </div>     
        </v-card-text>
      </v-flex>   
  </v-container>
</template>

<script>
  import axios from 'axios'
  import moment from 'vue-moment'
  import FormPurchase from '@/components/purchase/Form'
  import Detail from '@/components/purchase/Detail'
  import { GET_PURCHASE, UPDATE_PURCHASE, DELETE_PURCHASE, CREATE_APPROVE_PURCHASE } from '@/store/actions.type'

  export default {
    components: {
      FormPurchase,
      Detail
    },
    props: ['id'],
    data () {
      return {
        retur: true,
        title: 'Purchase',
        alert: {
          status: false, type: 'success', message: ''
        },
        loadingBtnSave: false,
        dialog: false
    }
  },
  computed: {
    purchase () {
      return this.$store.state.purchase.purchase
    },
    retur (){
      return true
    }
  },
  mounted () {
    this.$store.dispatch(GET_PURCHASE, this.id)
      .then((response) => {
        delete this.purchase.Id
        delete this.purchase.PaymentTerm
        delete this.purchase.Warehouse
        this.purchase.ListPurchaseItem.reduce(function(total, item) {
            delete item.Unit
            delete item.Id
        }, 0);
      })
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
    },
    saveRetur (event) {
      this.purchase.Type = 1
      for (var i = 0; i < this.purchase.ListPurchaseItem.length; i++) {
        console.log(this.purchase.ListPurchaseItem[i].TipeDiscount, 'ini tipe discount')
        if (this.purchase.ListPurchaseItem[i].TipeDiscount == 'amount') {
          this.purchase.ListPurchaseItem[i].DiscountPercentage = 0;
        }else if (this.purchase.ListPurchaseItem[i].TipeDiscount == 'percentage') {
          this.purchase.ListPurchaseItem[i].DiscountAmount = 0;
        }
      }
      if (this.purchase.TipeDiscount == 'amount') {
        this.purchase.DiscountPercentage = 0
      }
      if (this.purchase.TipeDiscount == 'percentage') {
        this.purchase.DiscountAmount = 0
      }
      // this.purchase.Status = 'Retur'
      // if (this.$refs.form.validate()) {
        this.alert.status = false
        this.loadingBtnSave = true
        this.$store.dispatch(CREATE_APPROVE_PURCHASE, this.purchase)
        .then((response) => {
          this.alert = {
            status: true,
            type: 'success',
            message: 'Data is submited.'
          }
          this.$router.push({ path: '/purchase' })
          // this.$refs.form.reset()
          this.loadingBtnSave = false
        }).catch((err) => {
          console.log(err)
          console.log('gagal')
          this.alert = {
            status: true,
            type: 'error',
            message: err.message
          }
          this.loadingBtnSave = false
        })
      // }
    }
  },
  created(){

    this.$store.dispatch('GET_SUPLLIER_OF_PURCHASE')
    
    this.$store.dispatch('GET_PAYMENTMETHOD_OF_PURCHASE')

    this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASE')
    
  }
}
</script>