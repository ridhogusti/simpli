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
              <FormPurchase :Purchase="purchase" :Title="title" :modereadonly="modeReadOnly"></FormPurchase>
              <div class="button-submit text-md-center">
                <v-btn round class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="saveRetur">
                  <v-icon left>save</v-icon> Return</v-btn>
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
  import FormPurchase from '@/components/purchase/Form'
  import Detail from '@/components/purchase/Detail'
  import {
    GET_PURCHASE,
    UPDATE_PURCHASE,
    DELETE_PURCHASE,
    CREATE_APPROVE_PURCHASE
  } from '@/store/actions.type'
  
  export default {
    components: {
      FormPurchase,
      // Detail
    },
    props: ['id'],
    data() {
      return {
        loadingPage: true,
        retur: true,
        title: 'Retur Purchase',
        modeReadOnly: false,
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
      },
      retur() {
        return true
      }
    },
    mounted() {},
    methods: {
      deleted() {
        this.$store.dispatch(DELETE_PURCHASE, this.id)
          .then((response) => {
            this.$router.push({
              path: '/purchase'
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
        this.$store.dispatch(UPDATE_PURCHASE, this.purchase)
          .then((response) => {
            this.loadingBtnSave = false
            this.$router.push({
              path: '/purchase'
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
      saveRetur(event) {
        this.purchase.Type = 1
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
            this.$router.push({
              path: '/purchase'
            })
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
    async created() {
  
      await this.$store.dispatch(GET_PURCHASE, this.id)
        .then((response) => {
          delete this.purchase.Id
          delete this.purchase.PaymentTerm
          delete this.purchase.Warehouse
          this.purchase.ListPurchaseItem.reduce(function(total, item) {
            delete item.Unit
            delete item.Id
          }, 0);
        })
  
      await this.$store.dispatch('GET_SUPLLIER_OF_PURCHASE')
      await this.$store.dispatch('GET_PAYMENTMETHOD_OF_PURCHASE')
      await this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASE')
      await this.$store.dispatch('GET_PAYMENTTERM_OF_PURCHASE')
  
      this.loadingPage = false
  
  
    }
  }
</script>