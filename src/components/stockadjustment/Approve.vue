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
      <!-- <alert :alert="alert"></alert> -->
      <v-layout row>
        <v-flex xs12 sm12>
          <v-card-text>
            <v-form ref="form">
              <div>
                <div>
                  <div class="title">
                    Detail Stock Adjustment
                     <v-chip v-if="stockadjustment.Status == 0">Open</v-chip>
                     <v-chip v-if="stockadjustment.Status == 1">Active</v-chip>
                     <v-chip v-if="stockadjustment.Status == 2">Completed</v-chip>
                     <v-chip v-if="stockadjustment.Status == 3">Canceled</v-chip>
                  </div>
                  <br>
                  <v-card class="retangle1">
                    <v-card-text>
                      <v-layout justify-center row wrap>
                        <v-flex lg3>
                          <v-layout>
                            <v-flex lg4>
                              <v-subheader class="subheader1">Warehouse</v-subheader>
                            </v-flex>
                            <v-flex lg6>
                              <v-subheader class="label2">
                                : {{ stockadjustment.Warehouse.Name }}
                              </v-subheader>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex lg3> 
                          <v-layout>
                            <v-flex lg4>
                              <v-subheader class="subheader1">Date</v-subheader>
                            </v-flex>
                            <v-flex lg6>
                              <v-subheader class="label2">
                                : {{ stockadjustment.Date | moment('YYYY-MM-DD') }}
                              </v-subheader>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex lg4>
                          <v-layout>
                            <v-flex lg6>
                              <v-subheader class="subheader1">Stock Adjustment No</v-subheader>
                            </v-flex>
                            <v-flex lg5>
                              <v-subheader class="label2">
                                : {{ stockadjustment.StockAdjustmentNo }}
                              </v-subheader>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </div>

                <br>


                 <div>
                  <div class="title">
                    List Item
                  </div>
                  <br>
                  <v-card class="retangle1">
                    <v-card-text>
                      <v-data-table :headers="headers" :items="stockadjustment.ListStockAdjustmentItem" hide-actions class="elevation-1 tablePurchase">
                        <tr slot="items" slot-scope="props" style="background-color: !important">
                          <td class="text-xs-center">
                            {{ props.index + 1 }}
                          </td>
                          <td style="width: 300px !important; padding: 0px 10px !important;">
                            {{ props.item.ProductUnitName }}
                          </td>
                          <td style="width: 300px !important; padding: 0px 10px !important;">
                            {{ props.item.Price }}
                          </td>
                          <td style="width: 300px !important; padding: 0px 10px !important;">
                           {{ props.item.RealQuantity }} {{ props.item.UnitNameItem }}
                          </td>
                        </tr>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </div>
              </div>
              
              <br>

              <v-layout row wrap>
                <v-flex lg12>
				
                <div class="title">
                  DESCRIPTION	
                </div>
          
                <br>
          
                <v-card class="retangle1">
                  <v-card-text>
                    {{ stockadjustment.Description }}
                  </v-card-text>
                </v-card>
          
              </v-flex>
            </v-layout>

              <br>

              <hr class="hrfooter">
              <v-layout row wrap>
                <v-flex xs12>
                  <div class="button-submit text-md-center">
                    <v-btn @click="save" :loading="loadingBtnSave" :disabled="loadingBtnSave" round class="lightBlueGreyBackground blueyPurpleColor">
                      <v-icon left>save</v-icon> Approve</v-btn>
                  </div>
                </v-flex>
                <v-flex xs6>
                  <div class="button-submit text-md-right">
                  </div>
                </v-flex>
              </v-layout>
              <hr class="hrfooter">

            </v-form>

            
          </v-card-text>

          <br>
          <v-card-text class="pa-0 white lighten-1">
            <v-layout class="backToList" justify-center row wrap>
              <router-link to="/stockadjustment">
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
  </div>
</template>

<style src="../../assets/css/style.css">
</style>

<script>
  import axios from 'axios'
  import moment from 'vue-moment'
  import Detail from '@/components/stockadjustment/Detail';
  import FormPurchase from '@/components/stockadjustment/Form'
  import {
    GET_STOCKADJUSTMENT,
    UPDATE_STOCKADJUSTMENT,
    DELETE_STOCKADJUSTMENT,
    UPDATE_APPROVE_STOCKADJUSTMENT
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
        loadingPage: true,
        edit: true,
        title: 'Stock Adjustment',
        alert: {},
        loadingBtnSave: false,
        dialog: false,
        stockadjustment: {},
        
        headers: [{
            text: "No",
            value: "No"
          },
          {
            text: "Product",
            value: "Product"
          },
          {
            text: "Price",
            value: "Price"
          },
          {
            text: "Unit",
            value: "Unit"
          }
        ],
      }
    },
    computed: {
      // stockadjustment() {
      //   return this.$store.state.stockadjustment.stockadjustment
      // }
    },
    mounted() {
    },
    methods: {
      deleted() {
        this.$store.dispatch(DELETE_STOCKADJUSTMENT, this.id)
          .then((response) => {
            this.$router.push({
              path: '/stockadjustment'
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
        this.$store.dispatch(UPDATE_APPROVE_STOCKADJUSTMENT, this.stockadjustment)
          .then((response) => {
            this.loadingBtnSave = false
            this.$router.push({
              path: '/stockadjustment'
            })
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
    async created() {
      await this.$store.dispatch(GET_STOCKADJUSTMENT, this.id).then((result) => {
        console.log(result, 'tasteouh')
        this.stockadjustment = result.data
      })
      // await this.$store.dispatch('GET_SUPLLIER_OF_STOCKADJUSTMENT')
  
      // this.$store.dispatch('GET_PAYMENTMETHOD_OF_STOCKADJUSTMENT')
  
      // await this.$store.dispatch('GET_WAREHOUSE_OF_STOCKADJUSTMENT')
  
      this.loadingPage = false
    }
  }
</script>