<template>
    <v-container fluid>
      <alert :alert="alert"></alert>

    <Header
    :Purchase="itemsHeader"
    :showDialogSupplier="showDialogSupplier"
    :showDialogWarehouse="showDialogWarehouse"
    :showDialogPaymentTerm="showDialogPaymentTerm"
    :setDueDate="setDueDate"
    :myFunctionSupplier="myFunctionSupplier"
    :menu="menu"
    :menusatu="menusatu"
    :saveDueDate="saveDueDate"
    :saveDate="saveDate"
    :Title="Title"
    />
      <v-layout row>
        <v-flex xs12 sm12 md12>
  
          <v-toolbar color="pink" dark>
            <v-toolbar-title>PURCHASE INVOICE</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title>{{ itemsHeader.Status }}</v-toolbar-title>
          </v-toolbar>

          <br> 

          <v-layout row wrap>
            <v-flex xs4>
              <v-layout row wrap>
                <v-flex xs4 class="text-xs-right">
                    <v-card-text class="px-0">Supplier : </v-card-text>
                    <v-card-text class="px-0">Warehouse : </v-card-text>
                </v-flex>
                <v-flex xs1> </v-flex>
                <v-flex xs7>
                  <v-card-text class="px-0">{{ itemsHeader.Supllier.Company }}</v-card-text>
                  <v-card-text class="px-0">{{ itemsHeader.Warehouse.Name }}</v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs4>
              <v-layout row wrap>
                <v-flex xs4 class="text-xs-right">
                    <v-card-text class="px-0">Payment Term : </v-card-text>
                    <v-card-text class="px-0">Due Date : </v-card-text>
                </v-flex>
                <v-flex xs1> </v-flex>
                <v-flex xs7>
                  <v-card-text class="px-0">{{ itemsHeader.PaymentTerm.Name }}</v-card-text>
                  <v-card-text class="px-0">{{ itemsHeader.DueDate | moment('YYYY-MM-DD') }}</v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs4>
              <v-layout row wrap>
                <v-flex xs4 class="text-xs-right">
                    <v-card-text class="px-0">Date : </v-card-text>
                    <v-card-text class="px-0">Invoice No : </v-card-text>
                </v-flex>
                <v-flex xs1> </v-flex>
                <v-flex xs7>
                  <v-card-text class="px-0">{{ itemsHeader.Date | moment('YYYY-MM-DD') }}</v-card-text>
                  <v-card-text class="px-0">{{ itemsHeader.InvoiceNo }}</v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>
            
            
          </v-layout>

          <br>
  
          <!-- <v-card> -->
  
            <v-flex>
              <v-data-table :headers="headers" :items="items" :pagination="pagination" class="elevation-1" hide-actions>
                <!-- header data table -->
                <template slot="headers" slot-scope="props">
                  <tr class="">
                    <th
                      v-for="header in props.headers"
                      :key="header.text"
                      :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                      @click="changeSort(header.value)"
                      class="text-md-left"
                    >
                      {{  header.text.match(/[A-Z][a-z]+|[0-9]+/g)!==null?header.text.match(/[A-Z][a-z]+|[0-9]+/g).join(" "):header.text }}
                      <v-icon small>arrow_upward</v-icon>
                    </th>
                  </tr>
            </template>

                <!-- body data table -->
            <template slot="items" slot-scope="props">
                <td> {{ props.index + 1 }} </td>
                <td> {{ props.item.ProductName }}</td>
                <td> {{ props.item.ProductDescription }}</td>
                <td> {{ formatPrice(props.item.ProductPrice) }} </td>
                <td> {{ props.item.Quantity }}  {{ props.item.Unit.Name }}</td>
                <td> {{ props.item.DiscountAmount }}</td>
                <td> {{ props.item.DiscountPercentage }}</td>
                <td> {{ props.item.Tax }}</td>
                <td> {{ formatPrice(props.item.LineTotal) }}</td>
            </template>
          </v-data-table>
        </v-flex>
            <!-- pagination table -->
            <v-card-text class="grey lighten-1 pa-1">
              <div class="text-xs-center">
                <v-pagination 
                  :value="currentPages"
                  :length="pages" 
                  :total-visible="7" 
                  @input="InputPage" circle></v-pagination>
              </div>
            </v-card-text>
          <!-- </v-card> -->
        </v-flex>
      </v-layout>  

      <v-layout class="bawah" row wrap>
      <v-flex xs6>
        <v-text-field
          disabled
          label="Notes"
          name="notes"
          :value="itemsHeader.Notes"
          textarea
          box
        ></v-text-field>
      </v-flex>
      <v-flex xs1>
      </v-flex>
      <v-flex xs5>
        <v-layout row wrap>
          <v-flex xs6 class="text-xs-right">
            <v-card-text>
              Sub Total : 
            </v-card-text>
            <v-card-text v-if="itemsHeader.TipeDiscount == 'amount'">
              Discount Amount : 
            </v-card-text>
            <v-card-text v-else-if="itemsHeader.TipeDiscount == 'percentage'">
              Discount Percentage : 
            </v-card-text>
            <v-card-text>
              Total Tax : 
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="text-lg-right">
              {{ formatPrice(itemsHeader.SubTotal) }}
            </v-card-text>
            <v-card-text v-if="itemsHeader.TipeDiscount == 'amount'" class="text-lg-right">
              {{ formatPrice(itemsHeader.DiscountAmount) }} 
            </v-card-text>
            <v-card-text v-else-if="itemsHeader.TipeDiscount == 'percentage'" class="text-lg-right">
              {{ formatPrice(itemsHeader.DiscountPercentage / 100 * itemsHeader.SubTotal) }} %
            </v-card-text>
            <v-card-text class="text-lg-right">
              {{ formatPrice(itemsHeader.TaxAmount) }}
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-card dark color="green">
          <v-card-text>
          <v-layout row wrap>
            <v-flex class="title" xs6>
              Total
            </v-flex>
            <v-flex xs6 class="title text-lg-right">
              Rp. {{ formatPrice(itemsHeader.TotalPurchase) }}
            </v-flex>
          </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- <v-flex xs12>
          <v-card-text v-if="itemsHeader.Status == 'Open'">
            <div class="botton-submit text-md-right">
              <v-btn class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save"><v-icon left>save</v-icon> Approve</v-btn>
            </div>     
          </v-card-text>
          <v-card-text v-else-if="itemsHeader.Status == 'Active'">
            <div class="botton-submit text-md-right">
              <v-btn class="primary" :loading="loadingBtnSave2" :disabled="loadingBtnSave2" @click.prevent="save2"><v-icon left>save</v-icon> Return</v-btn>
            </div>     
          </v-card-text>
      </v-flex> -->

    </v-layout>
    </v-container>

</template>

<script>
import ButtonCreate from "@/components/UIComponents/Buttons/ButtonCreate";
import Header from '@/components/purchase/subcomponents/Header'
import Alert from "@/components/UIComponents/Alerts/Default";
import { GET_STATE_PURCHASES, GET_PURCHASE, UPDATE_PURCHASE } from "@/store/actions.type";
import LsService from "@/common/ls.service";
import { ROW_PER_PAGE } from "@/common/config";
import { mapGetters } from "vuex";
import _ from "underscore";
// import "./test.css";

export default {
  components: {
    ButtonCreate,
    Header,
    Alert
  },
  props: ["id"],
  data() {
    return {
      title: "Purchase",
      alert: {},
      search: "",
      headers: [
        { text: "No", value: "No" },
        { text: "Product", value: "Product" },
        { text: "Description", value: "Description" },
        { text: "Price", value: "Price" },
        { text: "Quantity", value: "Quantity" },
        { text: "Discount Amount", value: "Discount Amount" },
        { text: "Discount Percentage", value: "Discount Percentage" },
        { text: "Tax", value: "Tax" },
        { text: "LineTotal", value: "LineTotal" }
      ],
      pagination: {}
    };
  },
  computed: {
    itemsHeader() {
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
    save () {
      this.loadingBtnSave = true
      this.itemsHeader.Status = 'Active'
      this.$store.dispatch(UPDATE_PURCHASE, this.itemsHeader)
      .then((response) => {
        this.loadingBtnSave = false
        this.$router.push({ path: '/purchase' })
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
    }
  },
  created() {
    this.$store.dispatch(GET_STATE_PURCHASES);
  }
};
</script>
