<template>
  <div class="body">
    <v-container fluid>
      <!-- <div  v-if="alert.status">
        <v-alert v-model="alert.status" :type="alert.type" dismissible>{{alert.message}}</v-alert>
      </div> -->
      <alert :alert="alert"></alert>
      <div class="title">
        Product
      </div>
      <br>
        <v-card class="retangle1">
          <!-- header card -->
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
              :pagination="pagination"
              class="elevation-1 tablePurchase"
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
                    {{  header.text.match(/[A-Z][a-z]+|[0-9]+/g)!==null?header.text.match(/[A-Z][a-z]+|[0-9]+/g).join(" "):header.text }}
                    <v-icon small>arrow_upward</v-icon>
                  </th>
                </tr>
              </template>

              <!-- body data table -->
              <template slot="items" slot-scope="props">
                <td v-for = "(item,index) in headers" 
                  v-bind:item="item" v-bind:index="index"  v-bind:key="index">
                  <template v-if="index==0">
                    {{ props.index + 1 }}
                  </template>
                  <template v-else-if="index==1">
                      <router-link :to="'/product/edit/' + props.item.Id">{{ props.item[headers[index].text] }}</router-link>
                  </template>
                   <template v-else-if="index==2">
                    {{ props.item[headers[index].text] }}
                  </template>
                  <template v-else-if="index==3">
                    {{ props.item[headers[index].text].Name }}
                  </template>
                  <template v-else-if="index==4">
                    {{ props.item[headers[index].text].Name }}
                  </template>
                  <template v-else-if="index==5">
                    <div v-if="props.item[headers[index].text].Name == 'PPN'">
                      <v-icon>done</v-icon>
                    </div>
                    <div v-if="props.item[headers[index].text].Name == 'NoPPN'">
                      <v-icon>close</v-icon>
                    </div>
                  </template>
                  <template v-else-if="index==6">
                    <div v-if="props.item[headers[index].text] == true">
                      <v-icon>checked</v-icon>
                    </div>
                    <div v-if="props.item[headers[index].text] == false">
                      <v-icon>close</v-icon>
                    </div>
                  </template>
                  <!-- <template v-else>{{ props.item[headers[index].text]}}</template> -->
                </td>
              </template>
            </v-data-table>
          </v-card-text>
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
    </v-container>
    <!-- button create -->
    <button-create :to="'/product/create'"></button-create>

  </div>  
</template>

<script>
import ButtonCreate from '@/components/UIComponents/Buttons/ButtonCreate'
import Alert from '@/components/UIComponents/Alerts/Default'
import { GET_STATE_PRODUCTS } from '@/store/actions.type'
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
      title: 'Product',
      alert: {},
      search: '',
      headers: [
      ],
      pagination: {}
    }
  },
  computed: {
    items () {
      return this.$store.state.product.products
    },
    pages () {
      return this.$store.state.product.paginations.pageLength
    },
    currentPages () {
      return this.$store.state.product.paginations.currentPage
    }
  },
  methods: {
    SetAlert (type, msg) {
      this.alert = {
        status: true, type: type, message: msg
      }
    },
    InputPage (page) {
      this.$store.dispatch('GET_PAGINATION_PRODUCT', page)
    },
    searchList :_.debounce(function (keyword) {
      this.$store.dispatch('GET_SEARCH_PRODUCTS', keyword)
    },500),
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
      this.$store.dispatch('GET_SORTING_PRODUCTS', sort)
    }
  },
  created () {
    this.$store.dispatch(GET_STATE_PRODUCTS)
      .then((result) => {
        this.headers.push({
          text: 'No',
          value: 'No'
        })
          const a =_.allKeys(result.data.data[0])
          const b = _.filter(a,(o)=>{
            if(o!=='CreatedTime' &&  o!=='ModifiedTime' 
            &&  o!=='ModifiedBy' && o!=='Id'
            &&  o!=='Deleted' &&  o!=='RowVersion'){
              this.headers.push({text:o,value:o})
            }
          })
      })
      .catch((err) => {
        this.SetAlert('error', err.message)
      })
  }
}
</script>
