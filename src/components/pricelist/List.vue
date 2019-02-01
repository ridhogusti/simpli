<template>
  <div class="body">
    <v-container fluid>
      <!-- <div  v-if="alert.status">
        <v-alert v-model="alert.status" :type="alert.type" dismissible>{{alert.message}}</v-alert>
      </div> -->
      <alert :alert="alert"></alert>
      <div class="title">
        PriceList
      </div>
      <br>
      <v-card class="retangle1">
        <v-card-text>
          <v-data-table
          :headers="headers"
          :items="items"
          :pagination="pagination"
          class="elevation-1 tablePurchase"
          hide-actions
          >

          <template slot="headers" slot-scope="props">
            <tr class="text-xs-center">
              <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
              class="text-md-center"
              >

              {{  header.text.match(/[A-Z][a-z]+|[0-9]+/g)!==null?header.text.match(/[A-Z][a-z]+|[0-9]+/g).join(" "):header.text }}
              <v-icon small>arrow_upward</v-icon>
            </th>
          </tr>
        </template>

        <!-- body data table -->
        <template slot="items" slot-scope="props">
        <td class="text-xs-center">
                  <router-link :to="'/pricelist/edit/' + props.item.Id">{{ props.index + 1}}</router-link>
                </td>
          <td class="text-xs-center"> {{ props.item.StartDate | moment('YYYY-MM-DD') }} </td>
                
                <td class="text-xs-center"> {{ props.item.Name }}</td>
                <td class="text-xs-center"> {{ props.item.Description }} </td>
              </template>
            </v-data-table>
          </v-card-text>

          <br>

        </v-card>

        <br>

        <v-layout row>
          <v-flex xs12 sm12 md12>
          <!-- <v-card>
          <v-card-text class="grey lighten-1 pa-1">
            <div class="text-xs-center">
              <v-pagination 
              :value="currentPages"
              :length="pages" 
              :total-visible="7" 
              @input="InputPage" circle></v-pagination>
            </div>
          </v-card-text>
        </v-card> -->

        <v-card class="retangle1">
          <v-card-text>

            <v-btn block to="/pricelist/create" class="btnadd" color="primary" outline dark> <v-icon dark>add_circle_outline</v-icon> &nbsp Create Price List</v-btn>
          </v-card-text>
        </v-card>

      </v-flex>
    </v-layout>  

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
  <!-- <button-create :to="'/pricelist/create'"></button-create> -->

</div>  
</template>

<style src="../purchase/test.css"></style>

<script>
import ButtonCreate from "@/components/UIComponents/Buttons/ButtonCreate";
import Alert from "@/components/UIComponents/Alerts/Default";
import {
  GET_STATE_PRICELISTS,
  GET_PRICELIST,
  UPDATE_PRICELIST
} from "@/store/actions.type";
import LsService from "@/common/ls.service";
import { ROW_PER_PAGE } from "@/common/config";
import { mapGetters } from "vuex";
import _ from "underscore";

export default {
  components: {
    ButtonCreate,
    Alert
  },
  data() {
    return {
      title: "PriceList",
      alert: {},
      id: null,
      search: "",
      dialog: false,
      headers: [
        { text: "No", value: "No" },
        { text: "Start Date", value: "StartDate" },
        { text: "Name", value: "Name", align: "center" },
        { text: "Description", value: "Description" }
      ],
      pagination: {}
    };
  },
  computed: {
    items() {
      return this.$store.state.pricelist.pricelists;
    },
    pages() {
      return this.$store.state.pricelist.paginations.pageLength;
    },
    currentPages() {
      return this.$store.state.pricelist.paginations.currentPage;
    }
  },
  methods: {
    toEdit(id) {
      this.$router.push({ path: "/pricelist/edit/" + id });
    },
    cancel(id) {
      var self = this;
      this.$store
        .dispatch(GET_PRICELIST, this.id)
        .then(response => {
          response.data.Status = "Cancel";
          response.data.Type = 0;
          self.$store
            .dispatch(UPDATE_PRICELIST, response.data)
            .then(response => {
              this.dialog = false;
            });
        })
        .catch(err => {
          this.alert = {
            status: true,
            type: "error",
            message: err.message
          };
        });
    },
    toApprove(id) {
      this.$router.push({ path: "/pricelist/approve/" + id });
    },
    toReturn(id) {
      this.$router.push({ path: "/pricelist/return/" + id });
    },
    SetAlert(type, msg) {
      this.alert = {
        status: true,
        type: type,
        message: msg
      };
    },
    InputPage(page) {
      this.$store.dispatch("GET_PAGINATION_PRICELIST", page);
    },
    searchList: _.debounce(function(keyword) {
      this.$store.dispatch("GET_SEARCH_PRICELISTS", keyword);
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
      this.$store.dispatch("GET_SORTING_PRICELISTS", sort);
    }
  },
  created() {
    this.$store.state.pricelist.tablestate.SortColumnName = "StartDate";
    this.$store .dispatch(GET_STATE_PRICELISTS)
  }
};
</script>
