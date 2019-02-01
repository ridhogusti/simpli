<template>
  <v-container class="body" fluid grid-list-md>
    <div v-if="alert.status">
      <v-alert v-model="alert.status" :type="alert.type" dismissible>{{alert.message}}</v-alert>
    </div>
    <v-layout row>
      <v-flex xs12 sm12>
          <v-card-text>
            <v-form ref="form">
              <FormPriceList :PriceList="pricelist" :Title="title"></FormPriceList>
              <div class="button-submit text-md-center">

                <v-btn round class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save"><v-icon left>save</v-icon> Save</v-btn>
                <v-btn round class="error" @click="cancel"><v-icon left>cancel</v-icon> Cancel</v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-card-text class="text-xs-center pa-0 grey lighten-1">
            <v-btn :to="'/pricelist'">Back to list</v-btn>
          </v-card-text>
        </v-flex>
      </v-layout>
      
    </v-container>
  </template>

  <style scoped>

  @font-face {
    font-family: LouisGeorgeCafe;
    src: url(../../assets/font/LouisGeorgeCafe.ttf) format("opentype");
  }
  .body {
    background-color: #f2f2f2;
  }
  .button-submit {

    font-family: LouisGeorgeCafe;
  }
  </style>


  <script>
  import FormPriceList from '@/components/pricelist/Form'
  import { CREATE_PRICELIST } from '@/store/actions.type'
import { GET_STATE_PRODUCTS } from '../../store/actions.type';

  export default {
    components: {
      FormPriceList
    },
    data () {
      return {
        title: 'CREATE PRICELIST',
        alert: {
          status: false, type: 'success', message: ''
        },
        loadingBtnSave: false,
        loadingBtnSave2: false,
        pricelist: {
          ListPriceListItem: [],
          StartDate: '',
          Name: '',
          Description: ''
        }
      }
    },
    methods: {
      cancel () {
        this.$refs.form.reset()
      },
      save () {
        console.log(this.pricelist);
        if (this.$refs.form.validate()) {
          this.alert.status = false
          this.loadingBtnSave = true
          this.$store.dispatch(CREATE_PRICELIST, this.pricelist)
          .then((response) => {
            this.alert = {
              status: true,
              type: 'success',
              message: 'Data is submited.'
            }
            this.$router.push({ path: '/pricelist' })
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
      saveApprove (event) {
        for (var i = 0; i < this.pricelist.ListPriceListItem.length; i++) {
          console.log(this.pricelist.ListPriceListItem[i].TipeDiscount, 'ini tipe discount')
          if (this.pricelist.ListPriceListItem[i].TipeDiscount == 'amount') {
            this.pricelist.ListPriceListItem[i].DiscountPercentage = 0;
          }else if (this.pricelist.ListPriceListItem[i].TipeDiscount == 'percentage') {
            this.pricelist.ListPriceListItem[i].DiscountAmount = 0;
          }
        }
        if (this.pricelist.TipeDiscount == 'amount') {
          this.pricelist.DiscountPercentage = 0
        }
        if (this.pricelist.TipeDiscount == 'percentage') {
          this.pricelist.DiscountAmount = 0
        }
        this.pricelist.Status = 'Active'
        if (this.$refs.form.validate()) {
          this.alert.status = false
          this.loadingBtnSave2 = true
          this.$store.dispatch(CREATE_APPROVE_PRICELIST, this.pricelist)
          .then((response) => {
            this.alert = {
              status: true,
              type: 'success',
              message: 'Data is submited.'
            }
            this.$router.push({ path: '/pricelist' })
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
    this.$store.dispatch(GET_STATE_PRODUCTS)
  }
}
</script>
