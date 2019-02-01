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
      <alert :alert="alert"></alert>
      <div class="title">
        WAREHOUSE
        <span class="garisTegak"> | </span>
        <span class="jmlInvoice"> 2 Warehouse </span>
      </div>
      <br>
       <v-card class="retangle1">
        <v-card-text>
          <v-layout row wrap>
             <v-flex lg3 style="margin-left: 20px">
               <v-text-field
               solo
               class="input3"
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
                @keypress.enter="searchList(search)"
                @keyup="searchList(search)"
              ></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex lg3 text-xs-right>
              <v-btn round to="/warehouse/create" class="blueyPurpleBackground whiteColor">
                <v-icon left>mdi-plus-circle-outline</v-icon> Create Warehouse</v-btn>
            </v-flex>

          </v-layout>
        </v-card-text>
      </v-card>
      <br>
       <v-card class="retangle1">
        <v-card-text>
          <v-data-table :loading="loadingTable" :search="search" :headers="headers" :items="items" :pagination.sync="$store.state.warehouse.paginations" :rows-per-page-items="[1, 5, 10, 20]" class="elevation-1 tablePurchase">
            <tr slot="headers" slot-scope="props">
              <th v-for="header in props.headers" :key="header.text" :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']" @click="changeSort(header.value)" class="text-md-left">
                {{ header.text.match(/[A-Z][a-z]+|[0-9]+/g)!==null?header.text.match(/[A-Z][a-z]+|[0-9]+/g).join(" "):header.text }}
                <v-icon small>arrow_upward</v-icon>
              </th>
            </tr>
            <tr slot="items" slot-scope="props">
              <td>
                <router-link :to="'/warehouse/edit/' + items[props.index].Id ">{{ items[props.index].Id }}</router-link>
              </td>
              <td>{{ items[props.index].Name }}</td>
            </tr>
          </v-data-table>
        </v-card-text>
        <br>
      </v-card>
 
    </v-container>
  </div>  
</template>

<style src="../../assets/css/style.css">
  
</style>

<script>
import ButtonCreate from '@/components/UIComponents/Buttons/ButtonCreate'
import Alert from '@/components/UIComponents/Alerts/Default'
import { GET_STATE_WAREHOUSES } from '@/store/actions.type'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE } from '@/common/config'
import { mapGetters } from 'vuex'
import _ from 'underscore'


export default {
  components: {
    ButtonCreate,
    Alert
  },
  data () {
    return {
      title: 'Warehouse',
      alert: {},
      search: '',
      loadingPage: true,
      loadingTable: true,
      alert: {},
      id: null,
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
      headers: [
        {
          text: "Id",
          value: "Id"
        },
        {
          text: "Name",
          value: "Name"
        }
      ],
      loadingPage: true,
      pagination: {},
      // items : {}
    }
  },
  computed: {
    items () {
      return this.$store.state.warehouse.warehouses
    },
    pages () {
      return this.$store.state.warehouse.paginations.pageLength
    },
    currentPages () {
      return this.$store.state.warehouse.paginations.currentPage
    }
  },
  methods: {
    SetAlert (type, msg) {
      this.alert = {
        status: true, type: type, message: msg
      }
    },
    InputPage (page) {
      this.$store.dispatch('GET_PAGINATION_WAREHOUSE', page)
    },
    searchList :_.debounce(function (keyword) {
      this.$store.dispatch('GET_SEARCH_WAREHOUSES', keyword)
    },500),
    changeSort (column) {
      console.log('masueaoeu', column);
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
      let sorts = { 
        SortColumnName: column,
        IsDescending: this.pagination.descending
      }
      this.$store.dispatch('GET_SORTING_WAREHOUSES', sorts)
      // this.GetTableState(sorts)
      console.log(this.$store.state.warehouse.warehouses, 'ini warehouse');
    },
    GetTableState (sort) {
      this.$store.dispatch('GET_SORTING_WAREHOUSES', sort)
    }
  },
  created () {
    this.$store.state.warehouse.tablestate.SortColumnName = "Name"
    this.$store.dispatch(GET_STATE_WAREHOUSES)
      .then(result => {
          this.pagination.sortBy = "Name"
          this.pagination.descending = this.$store.state.purchaseorder.tablestate.IsDescending
          this.loadingTable = false
      })
      .catch((err) => {
        this.SetAlert('error', err.message)
      })

      this.loadingPage = false
  }
}
</script>
