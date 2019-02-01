<template>
  <div class="body">
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
    <v-container v-else-if="loadingPage == false" fluid>
      <alert :alert="alert"></alert>
      <div class="title">
        PURCHASE ORDER
        <span class="garisTegak"> | </span>
        <span class="jmlInvoice"> {{ $store.state.purchaseorder.purchaseorderInvoiceCount }} Invoices </span>
      </div>
      <br>
      <v-card class="retangle1">
        <v-card-text>
          <v-layout row wrap>
            <v-flex lg1>
              <v-select :menu-props="{contentClass:'listPurchase'}" class="select1" label="Select value" v-on:change="() => {setShow()}" :items="[1, 5, 10, 20]" item-value="Id" solo append-icon="expand_more" item-text="Company" v-model="show">
              </v-select>
            </v-flex>
            <v-flex lg3 style="margin-left: 20px">
              <v-select multiple :menu-props="{contentClass:'listPurchase'}" class="select1" label="Select value" v-on:change="() => {setStatus()}" :items="valueStatus" item-value="Id" solo append-icon="expand_more" item-text="Company" v-model="selectedStatus">
                <v-list-tile slot="prepend-item" ripple @click="toggle">
                  <v-list-tile-action>
                    <v-icon :color="selectedStatus.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>Select All</v-list-tile-title>
                </v-list-tile>
                <v-divider slot="prepend-item" class="mt-2"></v-divider>
              </v-select>
            </v-flex>
            <v-flex lg3 style="margin-left: 20px">
              <v-text-field solo class="input3" v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex lg3 text-xs-right>
              <v-btn round to="/purchaseorder/create" class="blueyPurpleBackground whiteColor">
                <v-icon left>mdi-plus-circle-outline</v-icon> Create Purchase Order</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
  
      <br>
      <v-card class="retangle1">
        <v-card-text>
          <v-data-table :loading="loadingTable" :search="search" :headers="headers" :items="items" :pagination.sync="$store.state.purchaseorder.paginations" :rows-per-page-items="[1, 5, 10, 20]" class="elevation-1 tablePurchase">
            <tr slot="headers" slot-scope="props">
              <th v-for="header in props.headers" :key="header.text" :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']" @click="changeSort(header.value)" class="text-md-left">
                {{ header.text.match(/[A-Z][a-z]+|[0-9]+/g)!==null?header.text.match(/[A-Z][a-z]+|[0-9]+/g).join(" "):header.text }}
                <v-icon small>arrow_upward</v-icon>
              </th>
            </tr>
            <tr slot="items" slot-scope="props">
              <td> {{ props.index + 1 }} </td>
              <td> {{ props.item.Date | moment('YYYY-MM-DD') }} </td>
              <td>
                <router-link :to="'/purchaseorder/detail/' + props.item.Id">{{ props.item.InvoiceNo }}</router-link>
              </td>
              <td> {{ props.item.DueDate | moment('YYYY-MM-DD') }} </td>
              <td> {{ props.item.Supplier.Company }} </td>
              <td> {{ props.item.Warehouse.Name }} </td>
              <td> {{ formatPrice(props.item.TotalPurchase) }} </td>
  
              <td v-if="props.item.Status === 'Active'" style="color: #ff9d13"> {{ props.item.Status }} </td>
              <td v-else-if="props.item.Status === 'Open'" style="color: #1fcaaf"> {{ props.item.Status }} </td>
              <td v-else-if="props.item.Status === 'Completed'" style="color: #6747cd"> {{ props.item.Status }} </td>
              <td v-else-if="props.item.Status === 'Cancel'" style="color: #ed2855"> {{ props.item.Status }} </td>
  
              <td>
                <v-menu content-class="listPop" v-if="props.item.Status == 'Open'" bottom origin="center center" transition="scale-transition">
                  <v-btn slot="activator" fab dark small class="popmenulist">
                    <v-icon dark>mdi-dots-horizontal</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile @click="toEdit(props.item.Id)">
                      <v-list-tile-title>Edit</v-list-tile-title>
                    </v-list-tile>
                    <hr>
                    <v-list-tile @click="toPurchaseDelivery(props.item.Id)">
                      <v-list-tile-title>Goods Receipt</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu content-class="listPop" v-else-if="props.item.Status == 'Active'" bottom origin="center center" transition="scale-transition">
                  <v-btn slot="activator" fab dark small class="popmenulist">
                    <v-icon dark>mdi-dots-horizontal</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile @click="toPurchaseOrderCompleted(props.item.Id)">
                      <v-list-tile-title>Complete</v-list-tile-title>
                    </v-list-tile>
                    <hr>
                    <v-list-tile @click="toPurchaseDelivery(props.item.Id)">
                      <v-list-tile-title>Goods Receipt</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu disabled content-class="listPop" v-if="props.item.Status == 'Completed'" bottom origin="center center" transition="scale-transition">
                  <v-btn slot="activator" fab dark small class="popmenulist">
                    <v-icon dark>mdi-dots-horizontal</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile @click="toEdit(props.item.Id)">
                      <v-list-tile-title>Edit</v-list-tile-title>
                    </v-list-tile>
                    <hr>
                    <v-list-tile @click="toPurchaseDelivery(props.item.Id)">
                      <v-list-tile-title>Goods Receipt</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </v-data-table>
        </v-card-text>
        <br>
      </v-card>
      <v-card-text class="grey lighten-1 pa-1">
        <div class="text-xs-center">
          <v-pagination :value="currentPages" :length="pages" :total-visible="7" @input="InputPage" circle></v-pagination>
        </div>
      </v-card-text>
      <div>
        <v-dialog v-model="dialog" :max-width="'290'">
          <v-card justify-center align-center>
            <v-card-text class="red">
              <div class="headline text-xs-center white--text">Are you sure?</div>
            </v-card-text>
            <hr class="devider">
            <v-card-text class="text-xs-center">
              This data will be cancel.
            </v-card-text>
            <v-card-actions>
              <v-btn color="" @click.native="dialog = false">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click.native="cancel(id)">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>

<style src="./test.css">
  
</style>

<script>
  import ButtonCreate from "@/components/UIComponents/Buttons/ButtonCreate";
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
  
  export default {
    components: {
      ButtonCreate,
      Alert
    },
    data() {
      return {
        title: "PurchaseOrder",
        loadingPage: true,
        loadingTable: true,
        alert: {},
        id: null,
        search: "",
        searchBy: [],
        show: 10,
        valueStatus: [
          'Open',
          'Active',
          'Completed',
          'Cancel'
        ],
        selectedStatus: [],
        status: '',
        dialog: false,
        headers: [{
            text: "No",
            value: "No"
          },
          {
            text: "Date",
            value: "No"
          },
          {
            text: "InvoiceNo",
            value: "InvoiceNo",
            align: "center"
          },
          {
            text: "DueDate",
            value: "DueDate"
          },
          {
            text: "Supplier",
            value: "Supplier"
          },
          {
            text: "Warehouse",
            value: "Warehouse"
          },
          {
            text: "Total",
            value: "Total"
          }
        ],
        pagination: {}
      };
    },
    computed: {
      items() {
        return this.$store.state.purchaseorder.purchaseorders;
      },
      pages() {
        return this.$store.state.purchaseorder.paginations.pageLength
        // {{ $store.state.purchaseorder.paginations.totalItems }}
        // console.log(this.$store.state.purchaseorder.paginations.totalItems, 'jumlah items');
        // return this.$store.state.purchaseorder.paginations.totalItems;
        // console.log(this.$store.state.purchaseorder.paginations.totalItems, this.pagination.rowsPerPage);
        // return Math.ceil(this.$store.state.purchaseorder.paginations.totalItems / this.pagination.rowsPerPage)
      },
      currentPages() {
        return this.$store.state.purchaseorder.paginations.currentPage;
      },
      likesAllStatus() {
        return this.selectedStatus.length === this.valueStatus.length
      },
      likesSomeStatus() {
        return this.selectedStatus.length > 0 && !this.likesAllStatus
      },
      icon() {
        if (this.likesAllStatus) return 'mdi-close-box'
        if (this.likesSomeStatus) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      }
    },
    methods: {
      toggle() {
        this.$nextTick(() => {
          if (this.likesAllStatus) {
            this.selectedStatus = []
          } else {
            this.selectedStatus = this.valueStatus.slice()
          }
        })
      },
      toEdit(id) {
        this.$router.push({
          path: "/purchaseorder/edit/" + id
        });
      },
      toDetail(id) {
        this.$router.push({
          path: "/purchaseorder/detail/" + id
        });
      },
      cancel(id) {
        var self = this;
        this.$store.dispatch(GET_PURCHASEORDER, this.id)
          .then((response) => {
            response.data.Status = 'Cancel'
            response.data.Type = 0
            self.$store.dispatch(UPDATE_PURCHASEORDER, response.data)
              .then((response) => {
                this.dialog = false
              })
          }).catch((err) => {
            this.alert = {
              status: true,
              type: 'error',
              message: err.message
            }
          })
      },
      toPurchaseOrderCompleted(id) {
        this.$router.push({
          path: "/purchaseorder/completed/" + id
        });
      },
      toPurchaseDelivery(id) {
        this.$router.push({
          // path: "/goodsreceipt/edit/" + id
          path: "/goodsreceipt/create/" + id
        });
      },
      toPurchaseInvoice(id) {
        this.$router.push({
          path: "/purchase/create/" + id
        });
      },
      toReturn(id) {
        this.$router.push({
          path: "/purchaseorder/return/" + id
        });
      },
      toCancel(id) {
        this.$router.push({
          path: "/purchaseorder/cancel/" + id
        });
      },
      toPayment(id) {
        this.$router.push({
          path: "/purchaseorder/payment/" + id
        });
      },
      SetAlert(type, msg) {
        this.alert = {
          status: true,
          type: type,
          message: msg
        };
      },
      InputPage(page) {
        console.log(page, 'page');
        this.$store.dispatch("GET_PAGINATION_PURCHASEORDER", page);
      },
      searchList: _.debounce(function(keyword) {
        this.$store.dispatch("GET_SEARCH_PURCHASEORDERS", keyword);
      }, 500),
      setShow() {
        this.$store.dispatch("GET_SHOW_PURCHASEORDER", this.show);
      },
      setStatus() {
        console.log('anoteuh');
        this.searchBy = [
          this.selectedStatus,
          'Status'
        ]
        console.log(this.searchBy);
        this.$store.dispatch("GET_STATUS_PURCHASEORDER", this.searchBy);
      },
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
      },
      approve(id) {
        console.log(id, 'ini id')
      },
      formatPrice(value) {
        let val = (value / 1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
    },
    created() {
      this.$store.state.purchaseorder.tablestate.SortColumnName = "DueDate";
      var self = this;
      this.loadingPage = false
      this.$store
        .dispatch(GET_STATE_PURCHASEORDERS)
        .then(result => {
          this.headers.push({
            text: "Status",
            value: "Status"
          });
          this.headers.push({
            text: "Action",
            value: "Action",
            align: "center",
            width: "900"
          });
          this.pagination.sortBy = "DueDate";
          this.pagination.descending = this.$store.state.purchaseorder.tablestate.IsDescending;
          this.loadingTable = false
        })
        .catch(err => {
          this.SetAlert("error", err.message);
        });
      this.$store.dispatch("GET_ALL_PURCHASEORDER_COUNT");
    },
    beforeDestroy() {
      // this.$store.dispatch('RESET_PURCHASEORDER')
    }
  };
</script>
