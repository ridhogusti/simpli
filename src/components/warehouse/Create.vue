<template>
  <v-container fluid grid-list-md>
    <div v-if="alert.status">
      <v-alert v-model="alert.status" :type="alert.type" dismissible>{{alert.message}}</v-alert>
    </div>
    <v-layout row>
      <v-flex xs12 sm12>
          <v-card-text>
            <v-form ref="form">
              <FormWarehouse :Title="title" :Warehouse="warehouse"></FormWarehouse>
              <div class="botton-submit text-md-right">
                <v-btn round class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save"><v-icon left>save</v-icon> Save</v-btn>
                <v-btn round class="secondary" @click.prevent="saveNew" :loading="loadingBtnSave2" :disabled="loadingBtnSave2" ><v-icon left>save</v-icon> Save & New</v-btn>
                <v-btn round class="error" @click="cancel"><v-icon left>cancel</v-icon> Cancel</v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-card-text class="pa-0 white lighten-1">
            <v-layout class="backToList" justify-center row wrap>
              <router-link to="/warehouse">
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


<style src="../../assets/css/style.css">
  
</style>

<script>
import FormWarehouse from '@/components/warehouse/Form'
import { CREATE_WAREHOUSE } from '@/store/actions.type'

export default {
  components: {
    FormWarehouse
  },
  data () {
    return {
      title: 'Create a New Warehouse',
      alert: {
        status: false, type: 'success', message: ''
      },
      loadingBtnSave: false,
      loadingBtnSave2: false,
      warehouse: {
        "WarehouseTypeId": ""
      }
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
        this.$store.dispatch(CREATE_WAREHOUSE, this.warehouse)
        .then((response) => {
          this.alert = {
            status: true,
            type: 'success',
            message: 'Data is submited.'
          }
          this.$router.push({ path: '/warehouse' })
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
        this.$store.dispatch(CREATE_WAREHOUSE, this.warehouse)
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
    
    this.$store.dispatch('GET_WAREHOUSETYPE_OF_WAREHOUSE')
    
  }
}
</script>
