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
    <v-container v-else fluid>
      <!-- <div  v-if="alert.status">
                  <v-alert v-model="alert.status" :type="alert.type" dismissible>{{alert.message}}</v-alert>
                </div> -->
      <alert :alert="alert"></alert>
      <div class="title">
        PURCHASE RETUR
        <span class="garisTegak"> | </span>
        <span class="jmlInvoice"> {{ $store.state.purchase.purchaseInvoiceCount }} Invoices </span>
      </div>
      <br>
  
      <!-- <v-card class="retangle1">
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
                  <v-btn round to="/purchase/create" class="blueyPurpleBackground whiteColor">
                    <v-icon left>mdi-plus-circle-outline</v-icon> Create Purchase</v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card> -->
  
      <br>
  
      <v-card class="retangle1">
        <v-card-text>
          <v-data-table :loading="loadingTable" :headers="headers" :items="items" :pagination="pagination" class="elevation-1 tablePurchase" hide-actions>
            <!-- header data table -->
            <tr slot="headers" slot-scope="props">
              <th v-for="header in props.headers" :key="header.text" :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']" @click="changeSort(header.value)" class="text-md-left">
  
                {{ header.text.match(/[A-Z][a-z]+|[0-9]+/g)!==null?header.text.match(/[A-Z][a-z]+|[0-9]+/g).join(" "):header.text }}
                <v-icon small>arrow_upward</v-icon>
              </th>
            </tr>
  
            <!-- body data table -->
            <tr slot="items" slot-scope="props">
              <td> {{ props.index + 1 }} </td>
              <td> {{ props.item.Date | moment('YYYY-MM-DD') }} </td>
              <td>
                <router-link :to="'/purchaseretur/detail/' + props.item.Id">{{ props.item.InvoiceNo }}</router-link>
              </td>
              <!--<td> {{ props.item.InvoiceNo }}</td>-->
              <td> {{ props.item.DueDate | moment('YYYY-MM-DD') }} </td>
              <td> {{ props.item.Supplier.Company }} </td>
              <td> {{ props.item.Warehouse.Name }} </td>
              <td> {{ props.item.TotalPurchase }} </td>
              <td> {{ props.item.Status }} </td>
              <td>
  
                <v-menu v-if="props.item.Status == 'Active'" bottom origin="center center" transition="scale-transition">
                  <v-btn slot="activator" color="primary" dark>
                    <v-icon>menu</v-icon>
                  </v-btn>
  
                  <v-list>
                    <v-list-tile @click="() => {dialog = true, id = props.item.Id}">
                      <v-list-tile-title>Cancel</v-list-tile-title>
                    </v-list-tile>
  
                    <v-list-tile @click="toPayment(props.item.Id)">
                      <v-list-tile-title>Payment</v-list-tile-title>
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
  
    <!-- button create -->
    <button-create :to="'/purchaseretur/create'"></button-create>
  
  </div>
</template>

<style>
  @import '../../assets/css/style.css';
</style>


<script>
  import ButtonCreate from "@/components/UIComponents/Buttons/ButtonCreate";
  import Alert from "@/components/UIComponents/Alerts/Default";
  import {
    GET_STATE_PURCHASES_RETUR
  } from "@/store/actions.type";
  import LsService from "@/common/ls.service";
  import {
    ROW_PER_PAGE
  } from "@/common/config";
  import {
    mapGetters
  } from "vuex";
  import _ from "underscore";
  import {
    UPDATE_PURCHASE_RETUR,
    GET_PURCHASE_RETUR
  } from '../../store/actions.type';
  
  export default {
    components: {
      ButtonCreate,
      Alert
    },
    data() {
      return {
        id: null,
        loadingPage: true,
        loadingTable: true,
        title: "Purchase",
        alert: {},
        search: "",
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
        return this.$store.state.purchaseretur.purchasereturs;
      },
      pages() {
        return this.$store.state.purchase.paginations.pageLength;
      },
      currentPages() {
        return this.$store.state.purchase.paginations.currentPage;
      }
    },
    methods: {
      toCancel(id) {
        this.$router.push({
          path: "/purchase/edit/" + id
        });
      },
      cancel(id) {
        var self = this;
        this.$store.dispatch(GET_PURCHASE_RETUR, this.id)
          .then((response) => {
            response.data.Status = 'Cancel'
            response.data.Type = 1
            console.log(response.data)
            self.$store.dispatch(UPDATE_PURCHASE_RETUR, response.data)
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
      toApprove(id) {
        this.$router.push({
          path: "/purchase/approve/" + id
        });
      },
      toReturn(id) {
        this.$router.push({
          path: "/purchase/return/" + id
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
      approve(id) {
        console.log(id, "ini id");
      }
    },
    created() {
      this.$store.state.purchaseretur.tablestate.SortColumnName = "DueDate";
      var self = this;
      this.loadingPage = false
      this.$store
        .dispatch(GET_STATE_PURCHASES_RETUR)
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
          self.pagination.sortBy = "DueDate";
          self.pagination.descending = this.$store.state.purchaseretur.tablestate.IsDescending;
          this.loadingTable = false
        })
        .catch(err => {
          this.SetAlert("error", err.message);
        });
    },
    beforeDestroy() {
      this.$store.dispatch('RESET_PURCHASE');
    }
  };
</script>
