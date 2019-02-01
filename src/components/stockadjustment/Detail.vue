<template>
  <div>
    <div hidden id="printMe" style="border: 1px solid black; width: 864px; height: 582px; margin: 10px">
      <h3>STOCK ADJUSTMENT
        <div style="float: right">IRIAN SUPERMARKET</div>
      </h3>
      <br>
      <span>
        NO. NOTA : {{ itemsHeader.StockAdjustmentNo }}
        <div style="float: right">TGL. NOTA : {{ itemsHeader.CreatedTime | moment('YYYY-MM-DD') }}</div>
      </span>
      <br>
      <span>KEPADA : V-00621 - INTER WAHANA NUSANTARA PT
        <div style="float: right">Hal. 1 / 1</div>
      </span>

      <br>
      <br>
  
      <table style="border: 1px solid #d8d8d8; border-collapse:collapse;">
        <tr>
          <!-- <th style="width: 115px">SKU</th> -->
          <th style="border: 1px solid #d8d8d8; width: 115px;">NO</th>
          <th style="border: 1px solid #d8d8d8; width: 1050px;">NAMA PRODUK</th>
          <th style="border: 1px solid #d8d8d8; width: 700px;">PRICE</th>
          <th style="border: 1px solid #d8d8d8; width: 415px;">REAL QUANTITY</th>
          <th style="border: 1px solid #d8d8d8; width: 415px;">QUANTITY</th>
          <th style="border: 1px solid #d8d8d8; width: 200px;">DIFF</th>
          <th style="border: 1px solid #d8d8d8; width: 200px;">TOTAL</th>
        </tr>
        <tbody style="border: 1px solid #d8d8d8" v-for="(item, index) in itemsHeader.ListStockAdjustmentItem" :key="item.id">
          <tr>
            <td style="text-align: center; border: 1px solid #d8d8d8">{{ index + 1 }}</td>
            <td style="text-align: center; border: 1px solid #d8d8d8">{{ item.ProductUnitName }}</td>
            <td style="text-align: right; border: 1px solid #d8d8d8">{{ item.Price }}</td>
            <td style="text-align: right; border: 1px solid #d8d8d8">{{ item.RealQuantity }} {{ item.UnitNameItem }}</td>
            <td style="text-align: right; border: 1px solid #d8d8d8">{{ item.Quantity }} {{ item.UnitNameItem }}</td>
            <td style="text-align: right; border: 1px solid #d8d8d8">{{ item.AdjustmentQuantityDiff }} {{ item.UnitNameItem }}</td>
            <td style="text-align: right; border: 1px solid #d8d8d8">{{ item.AdjustmentTotalDiff }}</td>
          </tr>
        </tbody>
      </table>
      <br>

      <div>
        <div>
          <i>Description</i>
        </div>
        <div style="height: 100px; width: 500px; border: 1px solid #d8d8d8">
          {{ itemsHeader.Description }}
        </div>
      </div>
  
    </div>

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
                    <v-btn @click="print" round class="lightBlueGreyBackground blueyPurpleColor">
                      <v-icon left>local_printshop</v-icon> Print</v-btn>
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
	 /* th, table {
   border-bottom: 1px solid black;
		font-family: LouisGeorgeCafe;
} */
	.title {
		font-size: 21px;
		font-weight: bold;
		font-style: normal;
		font-stretch: normal;
		line-height: normal;
		letter-spacing: normal;
		text-align: left;
		color: #6747cd;
	}
	
	.retangle1 {
		font-family: LouisGeorgeCafe;
		border-radius: 10px !important;
		background-color: #fefefe;
		box-shadow: 0px 5px 10px 0 rgba(212, 219, 238, 0.75) !important;
	}
	
	.label2 {
		font-family: LouisGeorgeCafe;
		font-size: 16px;
		font-weight: normal;
		font-style: normal;
		font-stretch: normal;
		line-height: 1.43;
		letter-spacing: normal;
		text-align: left;
		color: #333333;
	}
	
	.input1 {
		font-family: LouisGeorgeCafe;
		border-radius: 20.5px !important;
		box-shadow: inset 0px 2px 6px 0 rgba(212, 219, 238, 0.75) !important;
		background-color: #fefefe !important;
		border: solid 1px #ebebeb !important;
		height: 41px !important;
		padding: 0px !important;
		text-align: center !important;
	}
	
	.hrfooter {
		height: 1px !important;
		border: 0px;
		background-color: #e6e6e6 !important;
		box-shadow: 0px 1px 3px 0 rgba(212, 219, 238, 0.75) !important;
	}
	
	.notes {
		font-family: LouisGeorgeCafe;
		font-size: 18px;
		font-weight: normal;
		font-style: normal;
		font-stretch: normal;
		line-height: normal;
		letter-spacing: normal;
		color: #808080;
		height: 145px;
		width: 95%;
		padding: 30px;
		border-radius: 10px;
		box-shadow: inset 0px 2px 6px 0 rgba(212, 219, 238, 0.75);
		border: solid 1px #6747cd;
	}
	
	.titlediscount {
		font-family: LouisGeorgeCafe;
		font-size: 18px;
		font-weight: bold;
		font-style: normal;
		font-stretch: normal;
		line-height: normal;
		letter-spacing: normal;
		text-align: center;
		color: #6747cd !important;
	}
	
	.grandTotal {
		font-size: 40px;
		font-weight: normal;
		font-style: normal;
		font-stretch: normal;
		line-height: normal;
		letter-spacing: normal;
		color: #6747cd;
	}
	
	.labeltotal {
		font-family: LouisGeorgeCafe;
		font-size: 21px;
		font-weight: normal;
		font-style: normal;
		font-stretch: normal;
		line-height: normal;
		letter-spacing: normal;
		text-align: left;
		color: #3f2984;
	}
</style>


<script>
  import ButtonCreate from "@/components/UIComponents/Buttons/ButtonCreate";
  import Header from '@/components/stockadjustment/subcomponents/Header'
  import FormStockAdjustment from '@/components/stockadjustment/Form'
  import Alert from "@/components/UIComponents/Alerts/Default";
  import {
    GET_STATE_STOCKADJUSTMENTS,
    GET_STOCKADJUSTMENT,
    UPDATE_STOCKADJUSTMENT
  } from "@/store/actions.type";
  import LsService from "@/common/ls.service";
  import {
    ROW_PER_PAGE
  } from "@/common/config";
  import {
    mapGetters
  } from "vuex";
  import _ from "underscore";
  // import "./test.css";
  
  export default {
    components: {
      FormStockAdjustment,
      ButtonCreate,
      Header,
      Alert
    },
    props: ["id"],
    data() {
      return {
        loadingPage: true,
        loadingBtnPayment: false,
        loadingBtnSave: false,
        loadingBtnSave2: false,
        modereadonly:false,
        menusatu: false,
        menu: false,

        title: "StockAdjustment",
        alert: {},
        productUnit:[],
        modeReadOnly: true,
        search: "",
        options: {
          name: '_blank',
          specs: [
            'scrollbars=yes'
          ],
          styles: [
            'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css'
          ]
        },
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
        pagination: {}
      };
    },
    computed: {
      itemsHeader() {
        return this.$store.state.stockadjustment.stockadjustment;
      },
      stockadjustment() {
        return this.$store.state.stockadjustment.stockadjustment;
      },
      items() {
        return this.$store.state.stockadjustment.stockadjustment.ListStockAdjustmentItem;
      },
      pages() {
        return this.$store.state.stockadjustment.paginations.pageLength;
      },
      currentPages() {
        return this.$store.state.stockadjustment.paginations.currentPage;
      }
    },
    mounted() {
      // this.$store.dispatch(GET_STOCKADJUSTMENT, this.id);
      // this.$store.dispatch(GET_STATE_STOCKADJUSTMENTS);
    },
    methods: {
      filterDataBy(value,array){
        const filter  = array.find( data => data.Id === value )
        return filter
      },
      getSupplier(value, array){
        const filter  = array.find( data => data.Id === value )
        return filter
      },
      formatPrice(value) {
        let val = (value / 1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      },
      savePrint () {
        return true
      },
      cancel () {
        return true
      },
      getDataNow() {
        var date = new Date();
        return date
      },
      print() {
        console.log(this.options);
        this.$htmlToPaper('printMe', this.options)
      },
      formatPrice(value) {
        let val = (value / 1).toFixed(2).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      },
      SetAlert(type, msg) {
        this.alert = {
          status: true,
          type: type,
          message: msg
        };
      },
      InputPage(page) {
        this.$store.dispatch("GET_PAGINATION_STOCKADJUSTMENT", page);
      },
      searchList: _.debounce(function(keyword) {
        this.$store.dispatch("GET_SEARCH_STOCKADJUSTMENTS", keyword);
      }, 500),
      changeSort(column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending;
        } else {
          this.pagination.sortBy = column;
          this.pagination.descending = false;
        }
        let sorts = {
          SortColumnName: column,
          IsDescending: this.pagination.descending
        };
        this.GetTableState(sorts);
      },
      GetTableState(sort) {
        this.$store.dispatch("GET_SORTING_STOCKADJUSTMENTS", sort);
      }
    },
    async created() {

      // await this.$store.dispatch('GET_SUPLLIER_OF_STOCKADJUSTMENT')
      // await this.$store.dispatch('GET_PRODUCTUNIT_OF_PURCHASE').then(result => {
      //   this.productUnit = result.data
      // })
      await this.$store.dispatch('GET_WAREHOUSE_OF_STOCKADJUSTMENT')
      // await this.$store.dispatch('GET_PAYMENTTERM_OF_STOCKADJUSTMENT')
      await this.$store.dispatch(GET_STOCKADJUSTMENT, this.id)
      this.loadingPage = false
      console.log(this.itemsHeader)

    }
  };
</script>
