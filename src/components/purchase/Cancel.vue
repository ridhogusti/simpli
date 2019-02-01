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
              <FormPurchase :hiddenComponentPO="hiddenComponentPO" :Purchase="purchase" :Title="title" :modereadonly="modeReadOnly"></FormPurchase>
              <div class="button-submit text-md-center">
                <v-btn round class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="cancel">
                  <v-icon left>save</v-icon> Cancel</v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-card-text class="text-xs-center pa-0 grey lighten-1">
            <v-btn :to="'/purchase'">Back to list</v-btn>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
  import axios from 'axios'
  import moment from 'vue-moment'
  import Detail from '@/components/purchase/Detail';
  import FormPurchase from '@/components/purchase/Form'
  import {
    GET_PURCHASE,
    UPDATE_PURCHASE,
    DELETE_PURCHASE
  } from '@/store/actions.type'
  
  export default {
    components: {
      FormPurchase,
      Detail
    },
    props: ['id'],
    data() {
      return {
        modeReadOnly: true,
        hiddenComponentPO: false,
        loadingPage: true,
        edit: true,
        title: 'Purchase',
        alert: {
          status: false,
          type: 'success',
          message: ''
        },
        loadingBtnSave: false,
        dialog: false
      }
    },
    computed: {
      purchase() {
        return this.$store.state.purchase.purchase
      }
    },
    mounted() {},
    methods: {
      cancel() {
        var self = this;
        this.loadingBtnSave = true;
        // this.$store.dispatch(GET_PURCHASE, this.id)
        //   .then((response) => {
            // response.data.Status = 'Cancel'
            // response.data.Type = 0
            this.purchase.Status = 'Cancel'
            this.purchase.Type = 0
            this.$store.dispatch(UPDATE_PURCHASE, this.purchase)
              .then((response) => {
                self.loadingBtnSave = false;
                this.$router.push({
                  path: '/purchase'
                })
              })
          // }).catch((err) => {
          //   this.alert = {
          //     status: true,
          //     type: 'error',
          //     message: err.message
          //   }
          // })
      }
    },
    async created() {
      this.hiddenComponentPO = true
  
  
      await this.$store.dispatch(GET_PURCHASE, this.id).then((result) => {
        // this.purchase.Status = 'Active'
        console.log(result, 'tasteouh')
      })
      await this.$store.dispatch('GET_SUPLLIER_OF_PURCHASE')
  
      await this.$store.dispatch('GET_PAYMENTMETHOD_OF_PURCHASE')
  
      await this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASE')
  
      this.loadingPage = false
  
    }
  }
</script>