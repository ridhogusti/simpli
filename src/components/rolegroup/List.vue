<template>
  <div>
    <v-container>

      <!-- <div  v-if="alert.status">
        <v-alert v-model="alert.status" :type="alert.type" dismissible>{{alert.message}}</v-alert>
      </div> -->
      <alert :alert="alert"></alert>

      <v-layout row>
        <v-flex xs12 sm12 md12>

          <v-card>
            <!-- header card -->
            <v-card-title class="grey lighten-1 pt-2 pb-2">
              <div class="title">{{title}}</div>
              <v-spacer></v-spacer>
              <!-- search data table -->
              <v-text-field
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
                @keypress.enter="searchList(search)"
                @keyup="searchList(search)"
              ></v-text-field>
            </v-card-title>
            
            <v-flex>
              <v-data-table
                :headers="headers"
                :items="items"
                :pagination="pagination"
                class="elevation-1"
                hide-actions
              >
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
                      {{ header.text }}
                      <v-icon small>arrow_upward</v-icon>
                    </th>
                  </tr>
                </template>

                <!-- body data table -->
                <template slot="items" slot-scope="props">
                  <td>
                    <router-link :to="'/employee/edit/' + props.item.Id">{{ props.item.Name }}</router-link>
                  </td>
                  <td>{{ props.item.DateOfBirth | moment("DD MMMM YYYY") }}</td>
                  <td>{{ props.item.PlaceOfBirth }}</td>
                  <td>{{ props.item.Address }}</td>
                  <td>{{ props.item.Gender==true? 'Man':'Woman' }}</td>
                  <td>{{ props.item.Status==0?'Non-Active':props.item.Status==1?'Active':'Suspend' }}</td>
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

          </v-card>
        </v-flex>
      </v-layout>  
    </v-container>

    <!-- button create -->
    <button-create :to="'/employee/create'"></button-create>

  </div>  
</template>

<script>
import ButtonCreate from '@/components/UIComponents/Buttons/ButtonCreate'
import Alert from '@/components/UIComponents/Alerts/Default'
import { GET_STATE_EMPLOYEES } from '@/store/actions.type'
import LsService from '@/common/ls.service'
import { ROW_PER_PAGE } from '@/common/config'
import { mapGetters } from 'vuex'

export default {
  components: {
    ButtonCreate,
    Alert
  },
  data () {
    return {
      title: 'Employee',
      alert: {},
      search: '',
      headers: [
        { text: 'Name', value: 'Name' },
        { text: 'Date of Birth', value: 'DateOfBirth' },
        { text: 'Place of Birth', value: 'PlaceOfBirth' },
        { text: 'Address', value: 'Address' },
        { text: 'Gender', value: 'Gender' },
        { text: 'Status', value: 'Status' }
      ],
      pagination: {}
    }
  },
  computed: {
    items () {
      return this.$store.state.employee.employees
    },
    pages () {
      return this.$store.state.employee.paginations.pageLength
    },
    currentPages () {
      return this.$store.state.employee.paginations.currentPage
    }
  },
  methods: {
    SetAlert (type, msg) {
      this.alert = {
        status: true, type: type, message: msg
      }
    },
    InputPage (page) {
      this.$store.dispatch('GET_PAGINATION_EMPLOYEE', page)
    },
    searchList (keyword) {
      this.$store.dispatch('GET_SEARCH_EMPLOYEES', keyword)
    },
    changeSort (column) {
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
      this.GetTableState(sorts)
    },
    GetTableState (sort) {
      this.$store.dispatch('GET_SORTING_EMPLOYEES', sort)
    }
  },
  created () {
    this.$store.dispatch(GET_STATE_EMPLOYEES)
      .then((result) => {})
      .catch((err) => {
        this.SetAlert('error', err.message)
      })
  }
}
</script>
