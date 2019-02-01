<template>
  <v-container class="body" fluid grid-list-md>
    
    <div v-if="loading" class="title">
      <v-container text-xs-center fluid grid-list-md>
        <v-dialog v-model="loading" persistent hide-overlay width="300px">
          <v-card color="primary" dark>
            <v-card-text>
              Please stand by
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-container>
    </div>
    <div v-if="alert.status">
      <v-alert v-model="alert.status" :type="alert.type" dismissible>
        {{alert.message}}
      </v-alert>
    </div>
    <v-layout v-if="loading===false" row>
      <v-flex xs12 sm12>
          <v-card-text>
            <v-form ref="form">
              <FormProduct :Product="product" :Title="title"></FormProduct>
               <br>
              <div class="title pl-3 pr-3">
                Stock
              </div>
              <br>
              <v-card  class="ml-3 mr-3">
                <v-card-text>
                  <v-layout row wrap justify-center>
                    <v-flex>
                    <v-list two-line>
                      <span v-for="(item, index) in  product.ListStock" :key="index">
                        <v-list-tile avatar @click="()=>{}">
                          <v-list-tile-avatar class="pr-4 primary--text">
                             {{item.Warehouse.Name.toUpperCase()}} Warehouse
                          </v-list-tile-avatar>
                          <v-divider vertical></v-divider>
                          <v-list-tile-content class="pl-4"  v-for="it in  getConversion(item)" :key="it">
                            <v-list-tile-title class="primary--text" >{{it.UnitName}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{it.Conversion}}</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                      </span>
                    </v-list>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
              <div class="botton-submit text-md-center">
                <v-btn class="blueyPurpleBackground whiteColor" round :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save"><v-icon left>save</v-icon> Save</v-btn>
                <v-btn class="lightBlueGreyBackground blueyPurpleColor" round @click.native.stop="dialog = true"><v-icon left>delete</v-icon> Delete</v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-card-text class="text-xs-center pa-0 grey lighten-1">
            <v-btn :to="'/product'">Back to list</v-btn>
          </v-card-text>
      </v-flex>
    </v-layout>
    <!-- dialog delete -->
    <div>
      <v-dialog v-model="dialog" :max-width="'290'">
        <v-card justify-center align-center>
          <v-card-text class="red">
            <div class="headline text-xs-center white--text">Are you sure?</div>
          </v-card-text>
          <hr class="devider">
          <v-card-text class="text-xs-center">
            This data will be deleted.
          </v-card-text>
          <v-card-actions>
            <v-btn color="" @click.native="dialog = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.native="deleted">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<style src="../purchase/test.css"> </style>
<script>
import axios from 'axios'
import FormProduct from '@/components/product/Form'
import { GET_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, GET_SUPPLIERS } from '@/store/actions.type'
import _ from 'underscore'

export default {
  async created () {
   await this.$store.dispatch(GET_PRODUCT, this.id)
   const _length = await this.$store.state.product.product.ListProductUnit.length
    for(var i=0; i<3-_length; i++){
       this.$store.state.product.product.ListProductUnit.push({
          Name: '',
          Description: '',
          Image: '',
          Barcode: '',
          Conversion: 0,
          UnitId: '',
          UnitName: ''
        })
    }
   this.loading = false
   
  },
  components: {
    FormProduct
  },
  props: ['id'],
  data () {
    return {
      loading: true,
      edit: true,
      title: 'Edit Product',
      alert: {
        status: false, type: 'success', message: ''
      },
      loadingBtnSave: false,
      dialog: false,
      selfUnit:{}
    }
  },
  computed: {
   product () {
    return this.$store.state.product.product
  }
},
async mounted () {
  
  // console.log(_selfUnit)
  // await this.$store.dispatch(GET_PRODUCT, this.id)
  //  const _length = this.$store.state.product.product.ListProductUnit.length
  //   for(var i=0; i<3-_length; i++){
  //      this.$store.state.product.product.ListProductUnit.push({
  //         Name: '',
  //         Description: '',
  //         Image: '',
  //         Barcode: '',
  //         Conversion: 0,
  //         UnitId: '',
  //         UnitName: ''
  //       })
  //   }
},
// created(){

//   // const _unitId = this.product.UnitId
//   // const _selfUnit = _.find(this.product.ListProductUnit, (o)=>{
//   //     return o.UnitId == _unitId
//   // })
//   // this.selfUnit = _selfUnit
// },
methods: {
  getConversion(item){
    const _bs = _.chain(this.product.ListProductUnit).sortBy('Conversion').reverse().value();
    let conversion = []
    let sisa = item.Quantity
    _bs.forEach(e => {
       const _sisa = (item.Quantity%e.Conversion)
       const _conv = (sisa - _sisa)/e.Conversion
       sisa = _sisa
       conversion.push({UnitName : e.UnitName, Conversion : _conv, Warehouse : item.Warehouse})
    });
    return conversion
  },
  deleted () {
    this.$store.dispatch(DELETE_PRODUCT, this.id)
    .then((response) => {
      this.$router.push({ path: '/product' })
    }).catch((err) => {
      this.alert = {
        status: true,
        type: 'error',
        message: err.message
      }
    });
  },
  save () {
    if(this.product.IsBought==null){
      this.product.IsBought = false
    }
     if(this.product.IsSold==null){
      this.product.IsSold= false
    }
    this.loadingBtnSave = true
    this.$store.dispatch(UPDATE_PRODUCT, this.product)
    .then((response) => {
      this.loadingBtnSave = false
      this.$router.push({ path: '/product' })
    }).catch((err) => {
      this.alert = {
        status: true,
        type: 'error',
        message: err.message
      }
      this.loadingBtnSave = false
    })
  }
}
}
</script>