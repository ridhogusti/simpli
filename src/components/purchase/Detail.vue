<template>
  <div>
    <div id="printMe" style="border: 1px solid black; width: 864px; height: 582px; margin: 10px">
      <h3>PURCHASE INVOICE
        <div style="float: right">IRIAN SUPERMARKET</div>
      </h3>
      <br>
      <h7>
        NO. NOTA : {{ itemsHeader.InvoiceNo }}
        <div style="float: right">TGL. NOTA : {{ itemsHeader.CreatedTime | moment('YYYY-MM-DD') }}</div>
      </h7>
      <br>
      <h7>KEPADA : V-00621 - INTER WAHANA NUSANTARA PT
        <div style="float: right">Hal. 1 / 1</div>
      </h7>
  
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
        <tbody v-for="(item, index) in itemsHeader.ListPurchaseItem" :key="item.id">
          <tr>
            <td style="text-align: center">{{ index + 1 }}</td>
            <td>{{ item.Barcode }}</td>
            <!-- <td style="text-align: center; width: 100px">- DUS</td> -->
            <td>{{ item.ProductName }}</td>
            <td style="text-align: center;">{{ item.Quantity }} {{ item.Unit.Name }} </td>
            <td style="text-align: center;">{{ item.DiscountAmount }}</td>
            <td style="text-align: center;">{{ item.DiscountPercentage }}</td>
            <td style="text-align: right;">{{ formatPrice(item.ProductPrice) }}</td>
            <td style="text-align: center;">{{ item.Tax }}</td>
            <td style="text-align: right;">{{ formatPrice(item.LineTotal) }}</td>
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
          <span>Sub Total : <span style="float: right">{{ formatPrice(itemsHeader.SubTotal) }}</span></span>
          <br>
          <span>Discount Amount : <span style="float: right">{{ formatPrice(itemsHeader.DiscountAmount) }}</span></span>
          <br>
          <span>Tax Amount : <span style="float: right">{{ formatPrice(itemsHeader.TaxAmount) }}</span></span>
          <br>
          <span>Grand Total : <span style="float: right">{{ formatPrice(itemsHeader.TotalPurchase) }}</span></span>
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
              <!-- <FormPurchase :hiddenComponentPO="hiddenComponentPO" :itemsHeader="purchase" :Title="title" :modereadonly="modeReadOnly"></FormPurchase> -->
              <!--Form Header -->
              <div>
                  <div class="title">
                    Detail Purchase Invoice
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
                    <br>
                    <hr class="hr1">
                    <br>
                
                    <v-card-text>
                      <v-layout justify-center row wrap>
                        <v-flex xs2>
                          <div class="text-xs-center label1">Invoice Number</div>
                          <div class="text-xs-center label2">{{itemsHeader['InvoiceNo']}}</div>
                        </v-flex>
                        <v-flex xs2>
                          <div class="text-xs-center label1">Reference Number</div>
                          <div class="text-xs-center label2">{{itemsHeader['ReferenceNo']}}</div>
                        </v-flex>
                
                        <v-flex xs2>
                          <div class="label1 text-xs-center">Invoice Date</div>
                          <div class="label2 text-xs-center">{{itemsHeader.Date}}</div>
                        </v-flex>
                
                        <v-flex xs2>
                          <div class="label1 text-xs-center">Payment Terms</div>
                          <div class="label2 text-xs-center">{{
                              filterDataBy(itemsHeader['PaymentTermId'],$store.state.paymentterm.paymentterms).Name
                            }}</div>
                        </v-flex>
                        <v-flex xs2>
                          <div class="label1 text-xs-center">Invoice Due Date</div>
                          <div class="label2 text-xs-center">{{itemsHeader.DueDate}}</div>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                    <br>
                  </v-card>
                </div>
                <br>

              <!--Form Content -->
              <div>
                  <div class="title">
                    LIST ITEM
                  </div>
                <br>

                  <v-card class="retangle1">
                    <v-card-text>
                      <v-data-table :headers="headers" :items="itemsHeader.ListPurchaseItem" hide-actions class="elevation-1 tablePurchase">
                        <tr slot="items" slot-scope="props" style="background-color: !important">
                          <td class="text-xs-right">
                            {{ props.index + 1 }}
                          </td>
                          <td style="width: 300px !important; padding: 0px 10px !important;">
                            {{
                                filterDataBy(itemsHeader['ListPurchaseItem'][props.index].ProductUnitId,productUnit).Name
                            }}
                            
                          </td>
                
                          <td style="width: 170px !important; padding: 0px 10px !important">
                            {{itemsHeader['ListPurchaseItem'][props.index].ProductDescription}}
                          </td>
                          <td style="width: 146px !important; padding: 0px 10px !important">
                            {{itemsHeader['ListPurchaseItem'][props.index].ProductPrice}}
                          </td>
                          <td style="width: 146px !important; padding: 0px 10px !important" class="text-xs-right">
                            {{itemsHeader['ListPurchaseItem'][props.index].Quantity}}
                          </td>
                          <td style="width: 146px !important; padding: 0px 10px !important;">
                            {{itemsHeader['ListPurchaseItem'][props.index].DiscountPercentage}}
                            
                          </td>
                          <td style="padding: 10px 10px !important">
                            {{itemsHeader['ListPurchaseItem'][props.index].Tax}}
                          </td>
                          <td class="text-xs-center" style="padding: 10px 10px !important">
                            <div class="subheading">
                              {{ formatPrice(itemsHeader['ListPurchaseItem'][props.index].LineTotal) }}
                            </div>
                          </td>
                        </tr>
                      </v-data-table>
                      <br>
                    
                    </v-card-text>
                  </v-card>
                </div>
                <br>
              
              <!--Form Footer -->
              <div>
		<v-layout row wrap>
			<v-flex xs6>
				<div class="title">
					DISCOUNT ORDER
				</div>
				<br>
	
				<v-card class="retangle1 text-xs-center">
					<v-card-text>
						<br>
						<v-layout row wrap>
							<v-flex xs2> </v-flex>
							<v-flex xs6>
								<!-- <v-text-field placeholder="enter amount..." :readonly="modereadonly" class="input1" solo v-if="itemsHeader.TipeDiscount == 'amount'" :value="itemsHeader.DiscountAmount" v-model="itemsHeader.DiscountAmount" name="discountAmount"></v-text-field>
								<v-text-field placeholder="enter percentage..." :readonly="modereadonly" class="input1" solo v-else-if="itemsHeader.TipeDiscount == 'percentage'" :value="itemsHeader.DiscountPercentage" v-model="itemsHeader.DiscountPercentage" name="discountPercentage"></v-text-field> -->
                {{ itemsHeader.DiscountPercentage }} (%)
							</v-flex>
						</v-layout>
					</v-card-text>
					<br>
				</v-card>
	
				<br>
        <span v-if=' itemsHeader.Notes != "" '>
          <div class="title">
            NOTES
          </div>
          <br>
          <v-card class="retangle1">
            <v-card-text>
              {{ itemsHeader['Notes']}}
            </v-card-text>
          </v-card>
        </span>
	
			</v-flex>
	
			<v-flex lg6>
				<v-card class="retangle1">
					<br>
					<v-card-text>
						<v-layout class="label2" row wrap>
							<v-flex lg1> </v-flex>
							<v-flex lg10>
								<v-layout row wrap>
									<v-flex lg5>
										<div>Sub Total</div>
										<div>Discount Order</div>
										<div>Total Tax</div>
									</v-flex>
									<v-flex text-xs-right lg7>
										<div>
                      {{ formatPrice(itemsHeader.SubTotal) }}
										</div>
										<div>
                      {{ formatPrice(itemsHeader.DiscountAmount) }}
										</div>
										<div>
                      {{ formatPrice(itemsHeader.TaxAmount) }}
										</div>
									</v-flex>
								</v-layout>
							</v-flex>
							<v-flex lg1> </v-flex>
						</v-layout>
					</v-card-text>
	
					<v-layout row wrap>
						<v-flex xs1> </v-flex>
						<v-flex xs10>
							<hr class="hr2"> </v-flex>
						<v-flex xs1> </v-flex>
					</v-layout>
	
					<v-card-text>
						<v-layout row wrap>
							<v-flex lg1> </v-flex>
							<v-flex lg10>
								<v-layout row wrap>
									<v-flex lg2>
										<div class="labeltotal">TOTAL</div>
									</v-flex>
									<v-flex lg10 text-xs-right>
										<div class="grandTotal">
											<!-- {{ formatPrice(grandTotall()) }} -->
                      {{ formatPrice(itemsHeader.TotalPurchase) }}
										</div>
									</v-flex>
								</v-layout>
							</v-flex>
	
							<v-flex lg1> </v-flex>
						</v-layout>
					</v-card-text>
				</v-card>
	
				<br>
	
				<v-card class="retangle1">
					<br>
					<v-card-text>
						<v-layout class="label2" row wrap>
							<v-flex lg1> </v-flex>
							<v-flex lg10>
								<v-layout row wrap>
									<v-flex lg4>
										<div>Amount Paid</div>
										<div class="labeltotal">Amount Due</div>
									</v-flex>
									<v-flex lg8 text-xs-right>
										<div>
											{{ formatPrice(subTotall()) }}
										</div>
										<div class="grandTotal">
											{{ formatPrice(subTotall()) }}
										</div>
									</v-flex>
								</v-layout>
							</v-flex>
							<v-flex lg1> </v-flex>
						</v-layout>
					</v-card-text>
					<br>
				</v-card>
			</v-flex>
		</v-layout>
		<br>
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
                  <span class="nameDocument">The name</span> has approved form itemsHeader Invoice
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
                  <span class="nameDocument">The name</span> has rejected approval form Purchase Invoice
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
                  <span class="nameDocument">The name</span> has requested approval form Purchase Invoice
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

   /* th, table {
   border-bottom: 1px solid black;
} */
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
  import Header from '@/components/purchase/subcomponents/Header'
  import FormPurchase from '@/components/purchase/Form'
  import Alert from "@/components/UIComponents/Alerts/Default";
  import {
    Printd
  } from 'printd'
  import {
    GET_STATE_PURCHASES,
    GET_PURCHASE,
    UPDATE_PURCHASE
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
      FormPurchase,
      ButtonCreate,
      Header,
      Alert
    },
    props: ["id"],
    data() {
      return {
        modeReadOnly: true,
        title: "Detail Purchase Invoice",
        hiddenComponentPO : true,
        alert: {},
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
        return this.$store.state.purchase.purchase;
      },
      purchase() {
        return this.$store.state.purchase.purchase;
      },
      items() {
        return this.$store.state.purchase.purchase.ListPurchaseItem;
      },
      pages() {
        return this.$store.state.purchase.paginations.pageLength;
      },
      currentPages() {
        return this.$store.state.purchase.paginations.currentPage;
      }
    },
    mounted() {
      // this.$store.dispatch(GET_PURCHASE, this.id);
      // this.$store.dispatch(GET_STATE_PURCHASES);
    },
    methods: {
      subTotall: function() {
        var t = 0
        // this.itemsHeader.ListPurchaseItem.reduce(function(total, item) {
        //   total = total + item.LineTotal
        //   return (t = total)
        // }, 0)
        t = _.reduce(this.itemsHeader.ListPurchaseItem, function(total, item) {
          return total + item.LineTotal;
        }, 0);
        this.itemsHeader.SubTotal = t
        return t
      },
       grandDiscountt: function() {
        var da = this.itemsHeader.DiscountAmount
        var dp = this.itemsHeader.DiscountPercentage
  
        if (this.itemsHeader.TipeDiscount === 'amount') {
          this.grandDiscount = da
          return this.itemsHeader.DiscountAmount
        } else if (this.itemsHeader.TipeDiscount === 'percentage') {
          dp = this.itemsHeader.DiscountPercentage / 100 * this.itemsHeader.SubTotal
          this.grandDiscount = dp
          return dp
        }
      },
      grandTaxx: function() {
        var t = 0
        t = _.reduce(this.itemsHeader.ListPurchaseItem, function(total, item) {
          if (item.Tax === 'PPN') {
            total = total + item.LineTotal * (10 / 100)
          } else if (item.Tax === 'NoPPN') {
            total = total + 0
          }
          return (t = total);
        }, 0);
        // this.itemsHeader.ListPurchaseItem.reduce(function(total, item) {
        //   console.log(item, ' di form purchase')
        //   if (item.Tax === 'PPN') {
        //     total = total + item.LineTotal * (10 / 100)
        //   } else if (item.Tax === 'NoPPN') {
        //     total = total + 0
        //   }
        //   return (t = total)
        // }, 0)
        this.itemsHeader.TaxAmount = t
        return t
      },
      grandTotall: function() {
        var tax = 0
        if (this.itemsHeader.TipeDiscount === 'percentage') {
          this.itemsHeader.TotalPurchase = this.itemsHeader.SubTotal - this.grandDiscount + this.itemsHeader.TaxAmount
        } else if (this.itemsHeader.TipeDiscount === 'amount') {
          this.itemsHeader.TotalPurchase =
            this.itemsHeader.SubTotal - this.grandDiscount + this.itemsHeader.TaxAmount
        }
        return this.itemsHeader.TotalPurchase
      },
      subTotall: function() {
        var t = 0
        // this.itemsHeader.ListPurchaseItem.reduce(function(total, item) {
        //   total = total + item.LineTotal
        //   return (t = total)
        // }, 0)
        t = _.reduce(this.itemsHeader.ListPurchaseItem, function(total, item) {
          return total + item.LineTotal;
        }, 0);
        this.itemsHeader.SubTotal = t
        return t
      },
      filterDataBy(value,array){
        const filter  = array.find( data => data.Id === value )
        return filter
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
        this.loadingBtnSave = true
        this.itemsHeader.Status = 'Active'
        this.$store.dispatch(UPDATE_PURCHASE, this.itemsHeader)
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
        this.$store.dispatch("GET_PAGINATION_PURCHASE", page);
      },
      searchList: _.debounce(function(keyword) {
        this.$store.dispatch("GET_SEARCH_PURCHASES", keyword);
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
        this.$store.dispatch("GET_SORTING_PURCHASES", sort);
      },
      lineTotal(index) {
        var t = 0,
          total = 0
        var quantity = 0,
          price = 0
        var discountPercentage = this.itemsHeader.ListPurchaseItem[index].DiscountPercentage,
          quantity = this.itemsHeader.ListPurchaseItem[index].Quantity

          console.log(discountPercentage, 'ini discount percentage');
          var splitDiscountPercentage = String(discountPercentage).split('+') 
  
        price = this.itemsHeader.ListPurchaseItem[index].ProductPrice
        total = price * quantity
        var tempTotal = total
        var temp = []
        for (let i = 0; i < splitDiscountPercentage.length; i++) {
          discountPercentage = parseFloat(splitDiscountPercentage[i]) / 100 * tempTotal
          t = tempTotal - discountPercentage
          temp[i] = t
          tempTotal = discountPercentage
        }
        return temp
        // discountPercentage = discountPercentage / 100 * total
  
        // if (this.itemsHeader.ListPurchaseItem[index].TipeDiscount === 'percentage') {
        //   t = total - discountPercentage
        // }
        // this.itemsHeader.ListPurchaseItem[index].LineTotal = t
        return this.itemsHeader.ListPurchaseItem[index].LineTotal
      },
    },
    async created() {

      
      this.$store.dispatch(GET_PURCHASE, this.id);
      await this.$store.dispatch('GET_SUPLLIER_OF_PURCHASEORDER')
      await this.$store.dispatch('GET_PRODUCTUNIT_OF_PURCHASE').then(result => {
        this.productUnit = result.data
      })
      await this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASEORDER')
      await this.$store.dispatch('GET_PAYMENTTERM_OF_PURCHASEORDER')
      console.log(this.itemsHeader);


    }
  };
</script>
