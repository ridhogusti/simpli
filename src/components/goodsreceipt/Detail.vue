<template>
  <div>
    <div id="printMe" style="border: 1px solid black; width: 864px; height: 528px; margin: 10px">
      <h3>GOODS RECEIPT
        <div style="float: right">IRIAN SUPERMARKET</div>
      </h3>
      <br>
      <h7>
        NO. NOTA : {{ itemsHeader.GoodsReceiptNo }}
        <div style="float: right">TGL. NOTA : {{ itemsHeader.CreatedTime | moment('YYYY-MM-DD') }}</div>
      </h7>
      <br>
      <h7>KEPADA : V-00621 - INTER WAHANA NUSANTARA PT
        <div style="float: right">Hal. 1 / 1</div>
      </h7>
  
      <br><br>
      <table style="border-bottom: 1px solid black">
        <tr>
          <th style="width: 215px; border-bottom: 1px solid black">SKU</th>
          <th style="width: 215px; border-bottom: 1px solid black">Barcode</th>
          <th style="width: 250px; border-bottom: 1px solid black">NAMA PRODUK</th>
          <th style="width: 250px; border-bottom: 1px solid black">QTY</th>
        </tr>
        <tr>
        </tr>
        <tbody v-for="item in itemsHeader.ListGoodsReceiptItem" :key="item.id">
          <tr>
            <td style="text-align: center; padding-right: 15px">9024010010497</td>
            <td style="padding-right: 15px">{{ item.ProductUnit.Barcode }}</td>
            <td style="padding-right: 15px">{{ item.ProductName }}</td>
            <td style="text-align: center;">{{ item.Quantity }} {{ item.Unit.Name }}</td>
          </tr>
          <!-- <tr>
            <td style="border-bottom: 1px dashed black">{{ item.Barcode }}</td>
            <td style="text-align: center;border-bottom: 1px dashed black">{{ item.Quantity }} {{ item.Unit.Name }} PCS</td>
            <td style="text-align: center; border-bottom: 1px dashed black">36</td>
            <td style="text-align: center; border-bottom: 1px dashed black">{{ item.Quantity }}</td>
          </tr> -->
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
          <br>
          <br>
          <span>TGL. CETAK : <span style="float: right">RIRIN - {{ getDataNow() | moment('DD-MM-YYYY') }} ( {{ getDataNow() | moment('HH:mm:ss') }} )</span></span>
        </div>
  
      </div>
  
    </div>
  
  <div id="printMe" style="border: 1px solid black; width: 864px; height: 528px; margin: 10px">
      <h3>GOODS RECEIPT
        <div style="float: right">IRIAN SUPERMARKET</div>
      </h3>
      <br>
      <h7>
        NO. NOTA : {{ itemsHeader.GoodsReceiptNo }}
        <div style="float: right">TGL. NOTA : {{ itemsHeader.CreatedTime | moment('YYYY-MM-DD') }}</div>
      </h7>
      <br>
      <h7>KEPADA : V-00621 - INTER WAHANA NUSANTARA PT
        <div style="float: right">Hal. 1 / 1</div>
      </h7>
  
      <br><br>
      <table style="border-bottom: 1px solid black">
        <tr>
          <th style="width: 215px; border-bottom: 1px solid black">SKU</th>
          <th style="width: 215px; border-bottom: 1px solid black">Barcode</th>
          <th style="width: 250px; border-bottom: 1px solid black">NAMA PRODUK</th>
          <th style="width: 250px; border-bottom: 1px solid black">QTY</th>
        </tr>
        <tr>
        </tr>
        <tbody v-for="item in itemsHeader.ListGoodsReceiptItem" :key="item.id">
          <tr>
            <td style="text-align: center; padding-right: 15px">9024010010497</td>
            <td style="padding-right: 15px">{{ item.ProductUnit.Barcode }}</td>
            <td style="padding-right: 15px">{{ item.ProductName }}</td>
            <td style="text-align: center;">{{ item.Quantity }} {{ item.Unit.Name }}</td>
          </tr>
          <!-- <tr>
            <td style="border-bottom: 1px dashed black">{{ item.Barcode }}</td>
            <td style="text-align: center;border-bottom: 1px dashed black">{{ item.Quantity }} {{ item.Unit.Name }} PCS</td>
            <td style="text-align: center; border-bottom: 1px dashed black">36</td>
            <td style="text-align: center; border-bottom: 1px dashed black">{{ item.Quantity }}</td>
          </tr> -->
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
          <br>
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
              <!--- Header -->
              <div>
                <div class="title">
                  Detail Goods Receipt
                </div>
                <br>
                <v-card class="retangle1">
                  <v-card-text>
                      <br>
                      <v-layout row wrap>
                        <v-flex xs3> </v-flex>
                        <v-flex xs1>
                          <v-subheader class="subheader1">Supplier</v-subheader>
                        </v-flex>
                        <v-flex xs4>
                          <v-subheader class="label2">
                            : {{filterDataBy(itemsHeader['SupplierId'],$store.state.supplier.suppliers).Company}}
                          </v-subheader>
                        </v-flex>
                        <v-flex xs3> </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs3> </v-flex>
                        <v-flex xs1>
                          <v-subheader class="subheader1">Warehouse</v-subheader>
                        </v-flex>
                        <v-flex xs4>
                          <v-subheader class="label2">: {{  
                            filterDataBy(itemsHeader['WarehouseId'],$store.state.warehouse.warehouses).Name
                            }}</v-subheader>
                        </v-flex>
                        <v-flex xs3> </v-flex>
                      </v-layout>
                    </v-card-text>
                  <!-- <v-card-text>
                    <br>
                    <v-layout row wrap>
                      <v-flex xs3> </v-flex>
                      <v-flex xs1>
                        <v-subheader class="subheader1">Supplier</v-subheader>
                      </v-flex>
                      <v-flex xs4>
                        {{
                          filterDataBy(itemsHeader['SupplierId'],$store.state.supplier.suppliers).Company
                        }}

                      </v-flex>
                      <v-flex xs3> </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs3> </v-flex>
                      <v-flex xs1>
                        <v-subheader class="subheader1">Warehouse</v-subheader>
                      </v-flex>
                      <v-flex xs4>
                        {{
                            filterDataBy(itemsHeader['WarehouseId'],$store.state.warehouse.warehouses).Name
                        }}
                        
                      </v-flex>
                      <v-flex xs3> </v-flex>
                    </v-layout>
                  </v-card-text> -->
                  <br>
                  <hr class="hr1">
                  <br>
              
                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex xs2> </v-flex>
                      <v-flex xs8>
                        <v-layout row wrap>
                          <v-flex xs4>
                            <div class="text-xs-center label1">Reffrence Number</div>
                            <div class="text-xs-center label2">{{itemsHeader['ReffrenceNo']}}</div>
                          </v-flex>
                          <v-flex xs4>
                            <div class="label1 text-xs-center">Invoice Date</div>
                            <div class="label2 text-xs-center">{{itemsHeader.Date}}</div>
                          </v-flex>
                          <v-flex xs4>
                            <div class="label1 text-xs-center">Invoice Due Date</div>
                            <div class="label2 text-xs-center">{{itemsHeader.DueDate}}</div>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs2> </v-flex>
                    </v-layout>
                  </v-card-text>
                  <br>
                </v-card>
              </div>
              <!--- Content -->
              <div>
                <div class="title">
                  LIST ITEM
                </div>
                <br>
                <v-card class="retangle1">
                  <v-card-text>
                    <v-data-table :headers="headers" :items="itemsHeader.ListGoodsReceiptItem" hide-actions class="elevation-1 tablePurchase">
                      <tr slot="items" slot-scope="props" style="background-color: !important">
                        <td class="text-xs-left" style="width: 100px">
                          {{ props.index + 1 }}
                        </td>
                        <td style="width: 300px !important; padding: 0px 10px !important;">
                          {{
                              filterDataBy(itemsHeader['ListGoodsReceiptItem'][props.index].ProductUnitId,productUnit).Name
                          }}
                        </td>
              
                        <td style="width: 170px !important; padding: 0px 10px !important">
                          {{itemsHeader['ListGoodsReceiptItem'][props.index].ProductDescription}}
                        </td>
                
                        <td style="width: 146px !important; padding: 30px 10px !important" class="text-xs-right">
                          {{itemsHeader['ListGoodsReceiptItem'][props.index].Quantity}}
                          
                        </td>
                      </tr>
                    </v-data-table>
                    <br>
                    <div v-if="modereadonly"> </div>
                  </v-card-text>
                </v-card>
              </div>
              <!--- Footer -->
              <div v-if=" itemsHeader.Notes== ''">
                <v-layout row wrap>
                  <v-flex xs6>
                    <br>
                    <div class="title">
                      NOTES
                    </div>
              
                    <br>
              
                    <v-card class="retangle1">
                      <v-card-text>
                        {{itemsHeader['Notes']}}
                      </v-card-text>
                    </v-card>
              
                  </v-flex>
                </v-layout>
                <br>
              </div>

              <!--Batas Form -->
              <hr class="hrfooter">
              <v-layout row wrap>
                <v-flex xs6>
                  <div class="button-submit text-md-left">
                  
                    <v-btn @click="print" round class="lightBlueGreyBackground blueyPurpleColor">
                      <v-icon left>local_printshop</v-icon> Print</v-btn>
                    <v-btn round class="error" dark :loading="loadingBtnDelete" :disabled="loadingBtnDelete" @click.native.stop="dialog = true">
                      <v-icon left>delete</v-icon> Cancel</v-btn>
                  </div>
                </v-flex>
                <v-flex xs6>
                  <div class="button-submit text-md-right">
                    <!-- <v-btn round class="blueyPurpleBackground whiteColor" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save">
                        <v-icon left>save</v-icon> Save</v-btn> -->
                    <!-- <v-btn round class="lightBlueGreyBackground blueyPurpleColor" @click.prevent="saveApprove" :loading="loadingBtnSave2" :disabled="loadingBtnSave2">
                        <v-icon left>save</v-icon> Save & Approve</v-btn> -->
                    <!-- <v-btn round class="lightBlueGreyBackground blueyPurpleColor" @click="cancel"> Cancel</v-btn> -->
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
                  <span class="nameDocument">The name</span> has approved form Goods Receipt
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
                  <span class="nameDocument">The name</span> has rejected approval form Goods Receipt
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
                  <span class="nameDocument">The name</span> has requested approval form Purchase
                </v-flex>
              </v-layout>
            </v-card>
          </v-card-text>
  
          <br>
          <v-card-text class="pa-0 white lighten-1">
            <v-layout class="backToList" justify-center row wrap>
              <router-link to="/goodsreceipt">
                <v-subheader>
                  <v-icon color="#6747cd">mdi-chevron-left-circle-outline</v-icon>
                  Back to List
                </v-subheader>
              </router-link>
            </v-layout>
  
          </v-card-text>
        </v-flex>
      </v-layout>
      <div>
        <v-dialog content-class="dialog_modal" v-model="dialog" max-width="500">
          <v-card class="card_modal" justify-center align-center>
            <v-card-title class="red headerModal">
              <v-layout row wrap>
                <v-flex xs2> </v-flex>
                <v-flex xs8 class="titleModal">
                  Cancel Confirmation
                </v-flex>
              </v-layout>
            </v-card-title>
            <hr class="devider">
            <v-card-text class="text-xs-center">
              <img src="../../assets/img/delete-icon-large.svg" aspect-ratio="1.7" contains tyle="width: 21px; height: 21px" />
              <div class="descriptionDelete">
                Are you sure you want to Cancel this list?
              </div>
              <br>
              <hr class="hrDialog">
              <v-layout align-content-center justify-center row wrap>
                <v-flex lg3>
                  <v-btn round class="btnYdialog" color="primary" @click.native="save(true); itemsHeader.Status = 3">Yes, delete</v-btn>
                </v-flex>
                <v-flex lg3>
                  <v-btn v-if="itemsHeader.Status == 1" round class="btnNdialog" color="" @click.native="dialog = false">Cancel</v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
  
    </v-container>
  </div>
</template>
<style>
 @import '../../assets/css/style.css';
	
	.title {
		font-family: LouisGeorgeCafe;
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
  import Header from '@/components/goodsreceipt/subcomponents/Header'
  import Alert from "@/components/UIComponents/Alerts/Default";
  import FormGoodsReceipt from '@/components/goodsreceipt/Form'
  import {
    GET_STATE_GOODSRECEIPTS,
    GET_GOODSRECEIPT,
    UPDATE_GOODSRECEIPT
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
      FormGoodsReceipt,
      ButtonCreate,
      Header,
      Alert
    },
    props: ["id"],
    data() {
      return {
        title: "Goods Receipt",
        alert: {},
        search: "",
        productUnit:[],
        loadingBtnDelete:false,
        modeReadOnly: true,
        dialog: false,
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
            text: "Quantity",
            value: "Quantity"
          }
        ],
        pagination: {}
      };
    },
    computed: {
      itemsHeader() {
        return this.$store.state.GoodsReceiptStore.GoodsReceipt;
      },
      items() {
        return this.$store.state.GoodsReceiptStore.GoodsReceipt.ListGoodsReceiptItem;
      },
      pages() {
        return this.$store.state.GoodsReceiptStore.paginations.pageLength;
      },
      currentPages() {
        return this.$store.state.GoodsReceiptStore.paginations.currentPage;
      }
    },
    mounted() {
      // this.$store.dispatch(GET_GOODSRECEIPT, this.id);
      // this.$store.dispatch(GET_STATE_GOODSRECEIPTS);
    },
    methods: {
      filterDataBy(value,array){
        const filter  = array.find( data => data.Id === value )
        return filter
      },
      print() {
        console.log(this.options);
        this.$htmlToPaper('printMe', this.options)
      },
      getDataNow() {
        var date = new Date();
        return date
      },
      save(saveAndApproves) {
        this.errorMessage = [];
        if(this.$refs.form.validate()){
          this.loadingBtnDelete = true
          // saveAndApproves ? this.loadingBtnSave2 = true : this.loadingBtnSave = true
          this.itemsHeader.saveAndApproves = saveAndApproves
          console.log(this.itemsHeader);
          
          this.$store.dispatch(UPDATE_GOODSRECEIPT, this.itemsHeader)
            .then((response) => {
              // saveAndApproves ? this.loadingBtnSave2 = false : this.loadingBtnSave = false
              this.loadingBtnDelete = false

              this.saveAndApproveType= null
              this.$router.push({
              path: '/goodsreceipt'
            })
          }).catch((err) => {
          this.loadingBtnDelete = false

            if(err.response.data.errorMessage.length > 0){
                
                err.response.data.errorMessage.forEach(element => {
                  console.log(element);
                  this.errorMessage.push(element);
                });
                this.alert = {
                  status: true,
                  type: 'error',
                  message: this.errorMessage
                }
            }
            
            // saveAndApproves ? this.loadingBtnSave2 = false : this.loadingBtnSave = false
          })
        }else{
          this.loadingBtnDelete = false

          if(!this.itemsHeader.SupplierId) this.errorMessage.push("Supplier required.");
          if(!this.itemsHeader.WarehouseId) this.errorMessage.push("Warehouse required.");
          if(!this.itemsHeader.DueDate) this.errorMessage.push("Due Date Required")
          if(!this.itemsHeader.Date) this.errorMessage.push("Date Required")
          // if(!this.GoodsReceipt.ReffrenceNo) this.errorMessage.push("Reffrence No required.");
          this.alertMessage = {
            status: true,
            messages: this.errorMessage
          }
        }       
    },
      // save() {
      //   this.loadingBtnSave = true
      //   this.itemsHeader.Status = 'Active'
      //   this.$store.dispatch(UPDATE_GOODSRECEIPT, this.itemsHeader)
      //     .then((response) => {
      //       this.loadingBtnSave = false
      //       this.$router.push({
      //         path: '/goodsreceipt'
      //       })
      //     }).catch((err) => {
      //       this.alert = {
      //         status: true,
      //         type: 'error',
      //         message: err.message
      //       }
      //       this.loadingBtnSave = false
      //     })
      // },
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
        this.$store.dispatch("GET_PAGINATION_GOODSRECEIPT", page);
      },
      searchList: _.debounce(function(keyword) {
        this.$store.dispatch("GET_SEARCH_GOODSRECEIPTS", keyword);
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
        this.$store.dispatch("GET_SORTING_GOODSRECEIPTS", sort);
      }
    },
    async created() {
      await this.$store.dispatch('GET_PRODUCTUNIT_OF_PURCHASE').then(result => {
        this.productUnit = result.data
      })
      await this.$store.dispatch('GET_SUPLLIER_OF_GOODSRECEIPT')
      await this.$store.dispatch('GET_WAREHOUSE_OF_GOODSRECEIPT')
      await this.$store.dispatch('GET_PAYMENTTERM_OF_GOODSRECEIPT')
      this.$store.dispatch(GET_GOODSRECEIPT, this.id)
      console.log(itemsHeader);
      
    }
  };
</script>
