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
       STOCK ADJUSTMENT
        <span class="garisTegak"> | </span>
        <!-- <span class="jmlInvoice"> {{ $store.state.stockadjustment.stockadjustmentInvoiceCount }} Invoices </span> -->
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
              <v-text-field solo class="input3" v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex lg4 text-xs-right>
              <v-btn round to="/stockadjustment/create" class="blueyPurpleBackground whiteColor">
                <v-icon left>mdi-plus-circle-outline</v-icon> Create Stock Adjustment</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
  
      <br>
      <v-card class="retangle1">
        <v-card-text>
          <v-data-table :loading="loadingTable" :search="search" :headers="headers" :items="items" :pagination.sync="$store.state.stockadjustment.paginations" :rows-per-page-items="[1, 5, 10, 20]" class="elevation-1 tablePurchase">
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
                <router-link :to="'/stockadjustment/detail/' + props.item.Id">{{ props.item.StockAdjustmentNo }}</router-link>
              </td>
              <td> {{ props.item.Warehouse.Name }} </td>
              <td> {{ props.item.Description }} </td>
              <td v-if="props.item.Status === 1" style="color: #ff9d13"> Active </td>
              <td v-else-if="props.item.Status === 0" style="color: #1fcaaf"> Open </td>
              <td v-else-if="props.item.Status === 2" style="color: #6747cd"> Completed </td>
              <td v-else-if="props.item.Status === 3" style="color: #ed2855"> Canceled </td>
               <td>
                <v-menu content-class="listPop" v-if="props.item.Status == 0" bottom origin="center center" transition="scale-transition">
                  <v-btn slot="activator" fab dark small class="popmenulist">
                    <v-icon dark>mdi-dots-horizontal</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile @click="toEditStockAdjustment(props.item.Id)">
                      <v-list-tile-title>Edit</v-list-tile-title>
                    </v-list-tile>
                    <hr>
                    <v-list-tile @click="toApproveStockAdjustment(props.item.Id)">
                      <v-list-tile-title>Approve</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu content-class="listPop" v-if="props.item.Status == 2" bottom origin="center center" transition="scale-transition">
                  <v-btn slot="activator" fab dark small class="popmenulist">
                    <v-icon dark>mdi-dots-horizontal</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile @click="toCancelStockAdjustment(props.item.Id)">
                      <v-list-tile-title>Cancel</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                 <v-menu disabled content-class="listPop" v-if="props.item.Status == 3" bottom origin="center center" transition="scale-transition">
                  <v-btn slot="activator" fab dark small class="popmenulist">
                    <v-icon dark>mdi-dots-horizontal</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile @click="toCancelStockAdjustment(props.item.Id)">
                      <v-list-tile-title>Cancel</v-list-tile-title>
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
    </v-container>
  </div>
</template>

<style src="../../assets/css/style.css">
  
</style>

<script>
  import ButtonCreate from "@/components/UIComponents/Buttons/ButtonCreate";
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
  
  export default {
    components: {
      ButtonCreate,
      Alert
    },
    data() {
      return {
        items: [],
        title: "StockAdjustment",
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
            value: "Date"
          },
          {
            text: "Stock Adjustment No",
            value: "StockAdjustmentNo",
            align: "center"
          },
          {
            text: "Warehouse",
            value: "Warehouse"
          },
          {
            text: "Description",
            value: "Description"
          },
          {
            text: "Status",
            value: "Status"
          },
          {
            text: "Action",
            value: "Action"
          }
        ],
        pagination: {}
      };
    },
    computed: {
      // items() {
      //   return this.$store.state.stockadjustment.stockadjustments;
      // },
      pages() {
        return this.$store.state.stockadjustment.paginations.pageLength
      },
      currentPages() {
        return this.$store.state.stockadjustment.paginations.currentPage;
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
      toApproveStockAdjustment(id) {
        this.$router.push({
          path: "/stockadjustment/approve/" + id
        });
      },
      toCancelStockAdjustment(id) {
        this.$router.push({
          path: "/stockadjustment/cancel/" + id
        });
      },
      toEditStockAdjustment(id) {
        this.$router.push({
          path: "/stockadjustment/edit/" + id
        });
      },
      toggle() {
        this.$nextTick(() => {
          if (this.likesAllStatus) {
            this.selectedStatus = []
          } else {
            this.selectedStatus = this.valueStatus.slice()
          }
        })
      },
      toDetail(id) {
        this.$router.push({
          path: "/stockadjustment/detail/" + id
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
        this.$store.dispatch("GET_PAGINATION_STOCKADJUSTMENT", page);
      },
      searchList: _.debounce(function(keyword) {
        this.$store.dispatch("GET_SEARCH_STOCKADJUSTMENTS", keyword);
      }, 500),
      setShow() {
        this.$store.dispatch("GET_SHOW_STOCKADJUSTMENT", this.show);
      },
      setStatus() {
        console.log('anoteuh');
        this.searchBy = [
          this.selectedStatus,
          'Status'
        ]
        console.log(this.searchBy);
        this.$store.dispatch("GET_STATUS_STOCKADJUSTMENT", this.searchBy);
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
        this.$store.dispatch("GET_SORTING_STOCKADJUSTMENTS", sort);
      },
      formatPrice(value) {
        let val = (value / 1).toFixed(3).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
    },
    created() {
      this.$store.state.stockadjustment.tablestate.SortColumnName = "Date";
      var self = this;
      this.loadingPage = false
      this.$store
        .dispatch(GET_STATE_STOCKADJUSTMENTS)
        .then(result => {
          this.items = result.data.data
          this.pagination.sortBy = "Date";
          this.pagination.descending = this.$store.state.stockadjustment.tablestate.IsDescending;
          this.loadingTable = false
        })
        .catch(err => {
          this.SetAlert("error", err.message);
        });
      this.$store.dispatch("GET_ALL_STOCKADJUSTMENT_COUNT");
    }
  };
</script>
