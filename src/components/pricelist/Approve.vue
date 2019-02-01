<template>
  <v-container class="body" fluid grid-list-md>
    <div v-if="alert.status">
      <v-alert v-model="alert.status" :type="alert.type" dismissible>{{alert.message}}</v-alert>
    </div>
    <v-layout row>
      <v-flex xs12 sm12>
          <v-card-text>
            <v-form ref="form">
              <FormPurchase :Purchase="purchase" :Title="title"></FormPurchase>
              <div class="button-submit text-md-center">
                <v-btn round class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save"><v-icon left>save</v-icon> Approve</v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-card-text class="text-xs-center pa-0 grey lighten-1">
            <v-btn :to="'/purchase'">Back to list</v-btn>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
</template>


<script>
  import axios from 'axios'
  import moment from 'vue-moment'
  import Detail from '@/components/purchase/Detail';
  import FormPurchase from '@/components/purchase/Form'
  import { GET_PURCHASE, UPDATE_PURCHASE, DELETE_PURCHASE } from '@/store/actions.type'

  export default {
    components: {
      FormPurchase,
      Detail
    },
    props: ['id'],
    data () {
      return {
        edit: true,
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
    }
  },
  mounted () {
    this.$store.dispatch(GET_PURCHASE, this.id).then((result) => {
      // this.purchase.Status = 'Active'
      console.log(result, 'tasteouh')
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
      this.purchase.Status = 'Active'
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
  created(){
    
    this.$store.dispatch('GET_SUPLLIER_OF_PURCHASE')
    
    this.$store.dispatch('GET_PAYMENTMETHOD_OF_PURCHASE')

    this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASE')
    
  }
}
</script>