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
    <div hidden id="printMe" style="border: 1px solid black; width: 655.701px; height: 580.0060473203px; margin: 10px">
      <h3>RETUR PEMBELIAN
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
  
      <table>
        <tr>
          <th style="border-bottom: 1px dashed black; border-top: 1px solid black; width: 115px">SKU</th>
          <th rowspan="2" style="border-top: 1px solid black; border-bottom: 1px solid black; padding: 0 15px 0 15px; width: 100px">QTY.RETUR</th>
          <th colspan="5" style="border-bottom: 1px dashed black; border-top: 1px solid black; width: 250px">NAMA PRODUK</th>
          <th rowspan="2" style="border-top: 1px solid black; border-bottom: 1px solid black; padding: 0 15px 0 15px;">HARGA</th>
          <th rowspan="2" style="border-top: 1px solid black; border-bottom: 1px solid black; padding: 0 15px 0 15px;">JUMLAH</th>
        </tr>
        <tr>
          <th style="border-bottom: 1px solid black">BARCODE</th>
          <th style="border-bottom: 1px solid black">DISC-1</th>
          <th style="border-bottom: 1px solid black">DISC-2</th>
          <th style="border-bottom: 1px solid black">PPN</th>
          <th style="border-bottom: 1px solid black">ISI</th>
          <th style="border-bottom: 1px solid black">T.QTY</th>
        </tr>
        <tbody v-for="item in itemsHeader.ListPurchaseOrderItem" :key="item.id">
          <tr>
            <td style="padding-right: 15px" v-if="itemsHeader.ProductSKU">{{ itemsHeader.ProductSKU }}</td>
            <td style="padding-right: 15px" v-if="itemsHeader.ProductSKU == null">9024010010194</td>
            <td style="text-align: center; width: 100px">- DUS</td>
            <td colspan="5">{{ item.ProductName }}</td>
            <td rowspan="2" style="text-align: right; border-bottom: 1px dashed black">{{ formatPrice(item.ProductPrice) }}</td>
            <td rowspan="2" style="text-align: right; border-bottom: 1px dashed black">{{ formatPrice(item.LineTotal) }}</td>
          </tr>
          <tr>
            <td style="border-bottom: 1px dashed black">{{ item.Barcode }}</td>
            <td style="text-align: center;border-bottom: 1px dashed black">{{ item.Quantity }} {{ item.Unit.Name }} PCS</td>
            <td style="text-align: center; border-bottom: 1px dashed black">{{ item.DiscountAmount }}</td>
            <td style="text-align: center; border-bottom: 1px dashed black">{{ item.DiscountPercentage }}</td>
            <td style="text-align: center; border-bottom: 1px dashed black">{{ item.Tax }}</td>
            <td style="text-align: center; border-bottom: 1px dashed black">36</td>
            <td style="text-align: center; border-bottom: 1px dashed black">{{ item.Quantity }}</td>
          </tr>
        </tbody>
      </table>
      <br>
      <div style="width: 835px; display: inline-flex">
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
        <div style="width: 300px; height: 100px; margin-left: 15px; right: 0">
          <span v-if="itemsHeader.TipeDiscount == 'amount'">DISCOUNT : <span style="float: right">{{ itemsHeader.DiscountAmount }}</span></span>
          <span v-if="itemsHeader.TipeDiscount == 'percentage'">DISCOUNT : <span style="float: right">{{ itemsHeader.DiscountPercentage }}</span></span>
          <br>
          <span>GRAND TOTAL : <span style="float: right">{{ formatPrice(itemsHeader.TotalPurchase) }}</span></span>
          <br>
          <span>TGL. CETAK : <span style="float: right">RIRIN - {{ getDataNow() | moment('DD-MM-YYYY') }} ( {{ getDataNow() | moment('HH:mm:ss') }} )</span></span>
        </div>
  
      </div>
  
    </div>
  
  
    <v-container v-if="loadingPage == false" class="body" fluid grid-list-md>
      <alert :alert="alert"></alert>
  
      <v-layout row>
        <v-flex xs12 sm12>
          <v-card-text>
            <v-form ref="form">
              <FormPurchaseOrder :PurchaseOrder="purchaseorder" :Title="title" :modereadonly="modeReadOnly"></FormPurchaseOrder>
              <hr class="hrfooter">
              <v-layout row wrap>
                <v-flex xs6>
                  <div class="button-submit text-md-left">
                    <!-- <v-btn round class="tealishBackground" :loading="loadingBtnPayment" :disabled="loadingBtnPayment" @click.prevent="save">
                        <v-icon left>save</v-icon> Make Payment</v-btn> -->
                    <!-- <v-btn round class="lightBlueGreyBackground blueyPurpleColor" @click.prevent="saveEmail">
                        <v-icon left>email</v-icon> Email</v-btn> -->
                    <v-btn @click="print" round class="lightBlueGreyBackground blueyPurpleColor">
                      <v-icon left>local_printshop</v-icon> Print</v-btn>
                    <!-- <v-btn round class="lightBlueGreyBackground blueyPurpleColor">
                        <v-icon left>cancel</v-icon> Void</v-btn> -->
                  </div>
                </v-flex>
                <v-flex xs6>
                  <div class="button-submit text-md-right">
                    <!-- <v-btn round class="blueyPurpleBackground whiteColor" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save">
                        <v-icon left>save</v-icon> Save</v-btn> -->
                    <v-btn round class="lightBlueGreyBackground blueyPurpleColor" @click.prevent="save" :loading="loadingBtnCompleted" :disabled="loadingBtnCompleted">
                      <v-icon left>save</v-icon> Complete</v-btn>
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
                  <span class="nameDocument">The name</span> has approved form Purchase
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
                  <span class="nameDocument">The name</span> has rejected approval form Purchase
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
              <router-link to="/purchase">
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

<style>
  @import '../../assets/css/style.css';
</style>


<script>
  import ButtonCreate from "@/components/UIComponents/Buttons/ButtonCreate";
  import Header from '@/components/purchaseorder/subcomponents/Header'
  import FormPurchaseOrder from '@/components/purchaseorder/Form'
  import Alert from "@/components/UIComponents/Alerts/Default";
  import {
    GET_STATE_PURCHASEORDERS,
    GET_PURCHASEORDER,
    UPDATE_PURCHASEORDER
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
        loadingPage: true,
        loadingBtnPayment: false,
        loadingBtnSave: false,
        loadingBtnSave2: false,
        loadingBtnCompleted: false,
        title: "PurchaseOrder",
        alert: {},
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
            text: "Discount Amount",
            value: "Discount Amount"
          },
          {
            text: "Discount Percentage",
            value: "Discount Percentage"
          },
          {
            text: "Tax",
            value: "Tax"
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
        return this.$store.state.purchaseorder.purchaseorder;
      },
      purchaseorder() {
        return this.$store.state.purchaseorder.purchaseorder;
      },
      items() {
        return this.$store.state.purchaseorder.purchaseorder.ListPurchaseOrderItem;
      },
      pages() {
        return this.$store.state.purchaseorder.paginations.pageLength;
      },
      currentPages() {
        return this.$store.state.purchaseorder.paginations.currentPage;
      }
    },
    mounted() {
      // this.$store.dispatch(GET_PURCHASEORDER, this.id);
      // this.$store.dispatch(GET_STATE_PURCHASEORDERS);
    },
    methods: {
      savePrint() {
        return true
      },
      cancel() {
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
      save() {
        this.loadingBtnCompleted = true
        this.itemsHeader.Status = 'Completed'
        console.log(this.itemsHeader, 'Completed');
        this.$store.dispatch(UPDATE_PURCHASEORDER, this.itemsHeader)
          .then((response) => {
            this.loadingBtnCompleted = false
            this.$router.push({
              path: '/purchaseorder'
            })
          }).catch((err) => {
            this.alert = {
              status: true,
              type: 'error',
              message: err.message
            }
            this.loadingBtnCompleted = false
          })
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
        this.$store.dispatch("GET_PAGINATION_PURCHASEORDER", page);
      },
      searchList: _.debounce(function(keyword) {
        this.$store.dispatch("GET_SEARCH_PURCHASEORDERS", keyword);
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
        this.$store.dispatch("GET_SORTING_PURCHASEORDERS", sort);
      }
    },
    async created() {
      await this.$store.dispatch('GET_SUPLLIER_OF_PURCHASEORDER')
      await this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASEORDER')
      await this.$store.dispatch('GET_PAYMENTTERM_OF_PURCHASEORDER')
      await this.$store.dispatch(GET_PURCHASEORDER, this.id);
      this.loadingPage = false
    }
  };
</script>
