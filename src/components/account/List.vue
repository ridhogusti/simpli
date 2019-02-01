<template>
  <div>
    <v-container fluid>
      <alert :alert="alert"></alert>
      <v-layout row>
        <v-flex>
          <v-card>
            <v-card-title class="pt-2 pb-2 grey lighten-1">
              <div class="title">{{title}}</div>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                :label="$t('Search')"
                single-line
                hide-details
                @keypress.enter="searchList(search)"
                
              ></v-text-field>
            </v-card-title>
            <hr class="devider">
            <v-card-text class="pa-0">
              <v-data-table
                :headers="headers"
                :items="items"
                :pagination.sync="pagination"
                class="elevation-1"
                hide-actions
              >
              
                <!-- header table -->
                <template slot="headers" slot-scope="props">
                  <tr>
                    <th
                      v-for="header in props.headers"
                      :key="header.text"
                      :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '', 'body-2']"
                      @click="changeSort(header.value)"
                      class="text-md-left"
                    >
                      {{ header.text }}
                      <v-icon small>arrow_upward</v-icon>
                    </th>
                  </tr>
                </template>
                <!-- body table -->
                <template slot="items" slot-scope="props">
                  <td>
                    <router-link :to="'/account/edit/' + props.item.Id">
                      {{props.item.UserName}}
                    </router-link>
                  </td>
                  <td>{{props.item.Email}}</td>
                  <td>{{props.item.EmployeeName}}</td>
                  <td>{{props.item.RoleGroupName}}</td>
                </template>
              </v-data-table>
            </v-card-text>
            <v-card-text class="pt-1 pb-1 grey lighten-1">
              <div class="text-xs-center">
                <v-pagination v-model="pagination.page" :length="1" :total-visible="7" circle></v-pagination>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- button create -->
    <button-create :to="'/account/create'"></button-create>

  </div>
</template>

<script>
import ButtonCreate from '@/components/UIComponents/Buttons/ButtonCreate'
import Alert from '@/components/UIComponents/Alerts/Default'
import { GET_ACCOUNTS, SEARCH_ACCOUNTS } from '@/store/actions.type'
import LsService from '@/common/ls.service'
import { mapState } from 'vuex'

let pagings = JSON.parse(LsService.getAccountPaging())

export default {
  components: {
    ButtonCreate,
    Alert
  },
  asyncData: {
   async items(){
      try{
        const data = await this.$store.getters.accounts
        this.SetAlert(false);
        return data
      }catch(err){
        this.SetAlert(true);
      }
    }
  },
  data () {
    return {
      title: 'Account',
      search: '',
      headers: [
        { text: 'Username', value: 'UserName' },
        { text: 'Email', value: 'Email' },
        { text: 'Employee', value: 'EmployeeId' },
        { text: 'Role Group', value: 'RoleGroupId' }
      ],
      pagination: {
        rowsPerPage: 10
      }
    }
  },
  computed: {
    alert () {
      return this.$store.state.account.error
    },
    items () {
      return this.$store.state.account.accounts
    }
  },
  methods: {
    test () {
      console.log('test')
      return 'test'
    },
    InputPage () {
      console.log('input page')
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
      // this.GetTableState(sorts)
    },
    searchList (keyword) {
      this.$store.dispatch(SEARCH_ACCOUNTS, keyword)
    }
  },
  created () {
    this.$store.dispatch(GET_ACCOUNTS)
  }
}
</script>
