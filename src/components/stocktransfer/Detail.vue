<template>
  <div>
    <div hidden id="printMe" style="border: 1px solid black; width: 864px; height: 582px; margin: 10px">
      <h3>STOCK TRANSFER
        <div style="float: right">IRIAN SUPERMARKET</div>
      </h3>
      <br>
      <span>
        NO. NOTA : {{ itemsHeader.InvoiceNo }}
        <div style="float: right">TGL. NOTA : {{ itemsHeader.CreatedTime | moment('YYYY-MM-DD') }}</div>
      </span>
      <br>
      <span>KEPADA : V-00621 - INTER WAHANA NUSANTARA PT
        <div style="float: right">Hal. 1 / 1</div>
      </span>

      <br>
      <br>
  
      <table>
        <tr>
          <!-- <th style="width: 115px">SKU</th> -->
          <th style="width: 115px">NO</th>
          <th style="width: 115px">BARCODE</th>
          <th style="width: 1050px">NAMA PRODUK</th>
          <th style="width: 700px">QTY</th>
          <th style="width: 415px">DISC Rp</th>
          <th style="width: 415px">DISC %</th>
          <th style="width: 200px">HARGA</th>
          <th style="width: 200px">PPN</th>
          <th style="width: 200px">JUMLAH</th>
        </tr>
        {{itemsHeader}}
        <tbody v-for="(item, index) in itemsHeader.ListStockTransferItem" :key="item.id">
          <tr>
            <td style="text-align: center">{{ index + 1 }}</td>
            <!-- <td style="padding-right: 15px" v-if="itemsHeader.ProductSKU">{{ itemsHeader.ProductSKU }}</td>
            <td style="padding-right: 15px" v-if="itemsHeader.ProductSKU == null">9024010010194</td> -->
            <td>{{ item.Barcode }}</td>
            <td>{{ item.ProductName }}</td>
            <td style="text-align: left">{{ item.TotalQuantity }} {{ item.Unit.Name }}</td>
            <td style="text-align: center">{{ formatPrice(item.DiscountAmount) }}</td>
            <td style="text-align: center">{{ item.DiscountPercentage }}</td>
            <td style="text-align: right">{{ formatPrice(item.ProductPrice) }}</td>
            <td style="text-align: center">{{ item.Tax }}</td>
            <td style="text-align: right">{{ formatPrice(item.LineTotal) }}</td>
          </tr>
        </tbody>
      </table>
      <br>
      <div style="width: 864px; display: inline-flex">
        <div style="width: 100px; height: 100px;">
          <p>DIBUAT OLEH</p>
          <br>
          <hr>
        </div>
        <div style="width: 100px; height: 100px; margin-left: 15px">
          <p>DI TERIMA</p>
          <br>
          <hr>
        </div>
        <div style="width: 100px; height: 100px; margin-left: 15px">
          <p>DIKETAHUI</p>
          <br>
          <hr>
        </div>
        <div style="width: 215px"></div>
        <div style="width: 300px; height: 100px; margin-left: 15px; right: 0">
          <!-- <span v-if="itemsHeader.TipeDiscount == 'amount'">DISCOUNT : <span style="float: right">{{ itemsHeader.DiscountAmount }}</span></span> -->
          <span>Sub Total : <span style="float: right">{{ formatPrice(itemsHeader.SubTotal) }}</span></span>
          <br>
          <span>DISCOUNT AMOUNT : <span style="float: right">{{ formatPrice(itemsHeader.DiscountAmount) }}</span></span>
          <br>
          <span>Tax AMOUNT : <span style="float: right">{{ formatPrice(itemsHeader.TaxAmount) }}</span></span>
          <br>
          <span>GRAND TOTAL : <span style="float: right">{{ formatPrice(itemsHeader.TotalPurchase) }}</span></span>
          <br>
          <span>TGL. CETAK : <span style="float: right">RIRIN - {{ getDataNow() | moment('DD-MM-YYYY') }} ( {{ getDataNow() | moment('HH:mm:ss') }} )</span></span>
        </div>
        
      </div>
  
    </div>

    
    <v-container class="body" fluid grid-list-md>
      <alert :alert="alert"></alert>

      <v-layout row>
        <v-flex xs12 sm12>
          <v-card-text>
            <v-form ref="form">
              <div>
                <div>
                  <div class="title">
                    Detail Purchase Order
                  </div>
                  <br>
                  <v-card class="retangle1">
                    <v-card-text>
                      <br>
                      <v-layout row wrap>
                        <v-flex xs3> </v-flex>
                        <v-flex xs2>
                          <v-subheader class="subheader1">Warehouse Origin</v-subheader>
                        </v-flex>
                        <v-flex xs4>
                          <v-subheader class="label2">: {{  
                            filterDataBy(itemsHeader['WarehouseOriginId'],$store.state.warehouse.warehouses).Name
                            }}</v-subheader>
                        </v-flex>
                        <v-flex xs3> </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs3> </v-flex>
                        <v-flex xs2>
                          <v-subheader class="subheader1">Warehouse Destination </v-subheader>
                        </v-flex>
                        <v-flex xs4>
                          <v-subheader class="label2">: {{  
                            filterDataBy(itemsHeader['WarehouseDestinationId'],$store.state.warehouse.warehouses).Name
                            }}</v-subheader>
                        </v-flex>
                        <v-flex xs3> </v-flex>
                      </v-layout>
                    </v-card-text>
                    <br>
                    <hr class="hr1">
                    <br>
                
                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex xs2> </v-flex>
                        <v-flex xs8>
                          <v-layout row wrap>
                            <v-flex xs6>
                              <div class="text-xs-center label1">Stock Transfer Number</div>
                              <div class="text-xs-center label2">{{itemsHeader['StockTransferNo']}}</div>
                            </v-flex>
                
                            <v-flex xs6>
                              <div class="label1 text-xs-center">Invoice Date</div>
                              <div class="text-xs-center label2">{{itemsHeader.Date}}</div>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs2> </v-flex>
                      </v-layout>
                    </v-card-text>
                    <br>
                  </v-card>
                </div>                
                <br>
                <div>
                  <div class="title">
                    LIST ITEM
                  </div>
                  <br>
                  <v-card class="retangle1">
                    <v-card-text>
                      <v-data-table :headers="headers" :items="itemsHeader.ListStockTransferItem" hide-actions class="elevation-1 tablePurchase">
                        <tr slot="items" slot-scope="props" style="background-color: !important">
                          <td class="text-xs-right">
                            {{ props.index + 1 }}
                          </td>
                          <td style="width: 300px !important; padding: 0px 10px !important;">
                            {{
                              filterDataBy(itemsHeader['ListStockTransferItem'][props.index].ProductUnitId,productUnit).Name
                              
                            }}
                        
                          </td>
                
                          <td style="width: 170px !important; padding: 0px 10px !important">
                            {{itemsHeader['ListStockTransferItem'][props.index].ProductDescription}}
                          </td>
                          <td style="width: 146px !important; padding: 0px 10px !important" class="text-xs-right">
                            {{itemsHeader['ListStockTransferItem'][props.index].ProductPrice}}
                          </td>
                          <td style="width: 146px !important; padding: 0px 10px !important" class="text-xs-right">
                            {{itemsHeader['ListStockTransferItem'][props.index].TotalQuantity}} {{itemsHeader['ListStockTransferItem'][props.index].Unit.Name}}
                          </td>
                         
                          <td class="text-xs-right" style="padding: 10px 10px !important">
                            <div class="subheading">
                              <!-- {{ formatPrice(lineTotal(props.index)) }} -->
                              {{ formatPrice(lineTotal(props.index)) }}
                              <!-- {{ formatPrice(itemsHeader['ListStockTransferItem'][props.index].LineTotal) }} -->
                            </div>
                          </td>
                  
                        </tr>
                      </v-data-table>
                      <br>
                    </v-card-text>
                  </v-card>
                </div>
              
                <br>
                <div>
                  <v-layout row wrap>
                    <v-flex xs6>
                      <span v-if="itemsHeader.Notes == ''">
                      <div class="title">
                        NOTES
                      </div>
                      <br>
                      <v-card class="retangle1">
                        <v-card-text>
                          {{itemsHeader['Notes']}}
                        </v-card-text>
                      </v-card>
                      </span>
                    </v-flex>
                    <v-flex lg6>
				
	
				<br>
	
			</v-flex>
                  </v-layout>
                  <br>
                </div>
               
              </div>
              
              <hr class="hrfooter">
              <v-layout row wrap>
                <v-flex xs6>
                  <div class="button-submit text-md-left">
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
  
          <v-card-text>
            <div class="title">
              DOCUMENT AUDIT TRAIL
            </div>
            <br>
  
            <v-card class="retangle1">
              <br>
              <v-layout class="documentAuditTrail" row wrap>
                <v-flex lg1 class="text-xs-center">
                  <img src="../../assets/img/approved-icon.svg" alt="">
                </v-flex>
                <v-flex lg2>
                  <div class="dateDocument">
                    01-10-2018
                  </div>
                  <div class="timeDocument">
                    10:00:00 AM
                  </div>
                </v-flex>
                <v-flex lg6>
                  <span class="nameDocument">The name</span> has approved form Purchase Order
                </v-flex>
              </v-layout>
              <v-layout class="documentAuditTrail" row wrap>
                <v-flex lg1 class="text-xs-center">
                  <img src="../../assets/img/rejected-icon.svg" alt="">
                </v-flex>
                <v-flex lg2>
                  <div class="dateDocument">
                    01-10-2018
                  </div>
                  <div class="timeDocument">
                    10:00:00 AM
                  </div>
                </v-flex>
                <v-flex lg6>
                  <span class="nameDocument">The name</span> has rejected approval form Purchase Order
                </v-flex>
              </v-layout>
              <v-layout class="documentAuditTrail" row wrap>
                <v-flex lg1 class="text-xs-center">
                  <img src="../../assets/img/requested-icon.svg" alt="">
                </v-flex>
                <v-flex lg2>
                  <div class="dateDocument">
                    01-10-2018
                  </div>
                  <div class="timeDocument">
                    10:00:00 AM
                  </div>
                </v-flex>
                <v-flex lg6>
                  <span class="nameDocument">The name</span> has requested approval form Purchase Order
                </v-flex>
              </v-layout>
            </v-card>
          </v-card-text>
  
          <br>
          <v-card-text class="pa-0 white lighten-1">
            <v-layout class="backToList" justify-center row wrap>
              <router-link to="/stocktransfer">
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

 <style scoped>
 @import '../../assets/css/style.css';
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
  import Header from '@/components/stocktransfer/subcomponents/Header'
  import FormPurchaseOrder from '@/components/stocktransfer/Form'
  import Alert from "@/components/UIComponents/Alerts/Default";
  import {
    GET_STATE_STOCKTRANSFERS,
    GET_STOCKTRANSFER,
    UPDATE_STOCKTRANSFER
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
      FormPurchaseOrder,
      ButtonCreate,
      Header,
      Alert
    },
    props: ["id"],
    data() {
      return {
        loadingBtnPayment: false,
        loadingBtnSave: false,
        loadingBtnSave2: false,
        modereadonly:false,
        menusatu: false,
        menu: false,

        title: "PurchaseOrder",
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
            text: "Description",
            value: "Description"
          },
          {
            text: "Price",
            value: "Price"
          },
          {
            text: "Quantity",
            value: "Quantity"
          },
          {
            text: "LineTotal",
            value: "LineTotal"
          }
        ],
        pagination: {}
      };
    },
    computed: {
      itemsHeader() {
        return this.$store.state.stocktransfer.stocktransfer;
      },
      stocktransfer() {
        return this.$store.state.stocktransfer.stocktransfers;
      },
      items() {
        return this.$store.state.stocktransfer.stocktransfers.ListStockTransferItem;
      },
      pages() {
        return this.$store.state.stocktransfer.paginations.pageLength;
      },
      currentPages() {
        return this.$store.state.stocktransfer.paginations.currentPage;
      }
    },
    mounted() {
      // this.$store.dispatch(GET_PURCHASEORDER, this.id);
      // this.$store.dispatch(GET_STATE_STOCKTRANSFERS);
    },
    methods: {
      lineTotal(index) {
        var t = 0,
          total = 0
        var quantity = 0,
          price = 0
       
        quantity = this.itemsHeader.ListStockTransferItem[index].TotalQuantity
        price = this.itemsHeader.ListStockTransferItem[index].ProductPrice
        total = price * quantity
        var tempTotal = total

        this.itemsHeader.ListStockTransferItem[index].LineTotal = tempTotal
  
        return this.itemsHeader.ListStockTransferItem[index].LineTotal
      },
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
        this.$store.dispatch("GET_PAGINATION_STOCKTRANSFER", page);
      },
      searchList: _.debounce(function(keyword) {
        this.$store.dispatch("GET_SEARCH_STOCKTRANSFERS", keyword);
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
        this.$store.dispatch("GET_SORTING_STOCKTRANSFERS", sort);
      }
    },
    async created() {

      await this.$store.dispatch('GET_SUPLLIER_OF_PURCHASEORDER')
      await this.$store.dispatch('GET_PRODUCTUNIT_OF_PURCHASE').then(result => {
        this.productUnit = result.data
      })
      await this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASEORDER')
      await this.$store.dispatch('GET_PAYMENTTERM_OF_PURCHASEORDER')
      this.$store.dispatch(GET_STOCKTRANSFER, this.id);
      console.log(this.itemsHeader);
      console.log(this.$store.state.stocktransfer.stocktransfer);
      

    }
  };
</script>
