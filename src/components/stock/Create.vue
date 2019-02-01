<template>
  <v-container fluid grid-list-md>
    <div v-if="alert.status">
      <v-alert v-model="alert.status" :type="alert.type" dismissible>{{alert.message}}</v-alert>
    </div>
    <v-layout row>
      <v-flex xs12 sm12>
        <v-card>
          <v-card-text class="title grey darken-1 white--text">{{title}}</v-card-text>
          <hr class="devider">
          <v-card-text>
            <v-form ref="form">
              <FormStock :Stock="stock"></FormStock>
              <div class="botton-submit text-md-right">
                <v-btn class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save"><v-icon left>save</v-icon> Save</v-btn>
                <v-btn class="secondary" @click.prevent="saveNew" :loading="loadingBtnSave2" :disabled="loadingBtnSave2" ><v-icon left>save</v-icon> Save & New</v-btn>
                <v-btn class="error" @click="cancel"><v-icon left>cancel</v-icon> Cancel</v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-card-text class="text-xs-center pa-0 grey lighten-1">
            <v-btn :to="'/stock'">Back to list</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  
  </v-container>
</template>

<script>
import FormStock from '@/components/stock/Form'
import { CREATE_STOCK } from '@/store/actions.type'

export default {
  components: {
    FormStock
  },
  data () {
    return {
      title: 'Create a New Stock',
      alert: {
        status: false, type: 'success', message: ''
      },
      loadingBtnSave: false,
      loadingBtnSave2: false,
      stock: {}
    }
  },
  methods: {
    cancel () {
      this.$refs.form.reset()
    },
    save () {
      if (this.$refs.form.validate()) {
        this.alert.status = false
        this.loadingBtnSave = true
        this.$store.dispatch(CREATE_STOCK, this.stock)
        .then((response) => {
          this.alert = {
            status: true,
            type: 'success',
            message: 'Data is submited.'
          }
          this.$router.push({ path: '/stock' })
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
    saveNew (event) {
      if (this.$refs.form.validate()) {
        this.alert.status = false
        this.loadingBtnSave2 = true
        this.$store.dispatch(CREATE_STOCK, this.stock)
        .then((response) => {
          this.alert = {
            status: true,
            type: 'success',
            message: 'Data is submited.'
          }
          this.$refs.form.reset()
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
    
    this.$store.dispatch('GET_WAREHOUSE_OF_STOCK')
    
    this.$store.dispatch('GET_PRODUCT_OF_STOCK')
    
    this.$store.dispatch('GET_UNIT_OF_STOCK')
    
  }
}
</script>
