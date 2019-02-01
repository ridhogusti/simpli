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

  <v-container v-else fluid grid-list-md>
    <div v-if="alert.status">
      <v-alert v-model="alert.status" :type="alert.type" dismissible>
        {{alert.message}}
      </v-alert>
    </div>
    <v-layout row>
      <v-card-text>
        <v-form ref="form">
          <FormWarehouse :Title="title" :Warehouse="warehouse"></FormWarehouse>
          <div class="botton-submit text-md-right">
            <v-btn round class="blueyPurpleBackground whiteColor" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save"><v-icon left>save</v-icon> Save</v-btn>
            <v-btn round class="lightBlueGreyBackground blueyPurpleColor" @click.native.stop="dialog = true"><v-icon left>delete</v-icon> Delete</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-layout>
    <v-card-text class="pa-0 white lighten-1">
      <v-layout class="backToList" justify-center row wrap>
        <router-link to="/warehouse">
          <v-subheader>
            <v-icon color="#6747cd">mdi-chevron-left-circle-outline</v-icon>
            Back to List
          </v-subheader>
        </router-link>
      </v-layout>

    </v-card-text>

    <!-- dialog delete -->
    <!-- <div>
      <v-dialog v-model="dialog" :max-width="'290'">
        <v-card justify-center align-center>
          <v-card-text class="red">
            <div class="headline text-xs-center white--text">Are you sure?</div>
          </v-card-text>
          <hr class="devider">
          <v-card-text class="text-xs-center">
            This data will be deleted.
          </v-card-text>
          <v-card-actions>
            <v-btn color="" @click.native="dialog = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.native="deleted">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div> -->

     <div>
        <v-dialog content-class="dialog_modal" v-model="dialog" max-width="500">
          <v-card class="card_modal" justify-center align-center>
            <v-card-title class="red headerModal">
              <v-layout row wrap>
                <v-flex xs2> </v-flex>
                <v-flex xs8 class="titleModal">
                  Delete Confirmation
                </v-flex>
              </v-layout>
            </v-card-title>
            <hr class="devider">
            <v-card-text class="text-xs-center">
              <img src="../../assets/img/delete-icon-large.svg" aspect-ratio="1.7" contains tyle="width: 21px; height: 21px" />
              <div class="descriptionDelete">
                Are you sure you want to delete this list?
              </div>
              <br>
              <hr class="hrDialog">
              <v-layout align-content-center justify-center row wrap>
                <v-flex lg3>
                  <v-btn round class="btnYdialog" color="primary" @click.native="deleted">Yes, delete</v-btn>
                </v-flex>
                <v-flex lg3>
                  <v-btn round class="btnNdialog" color="" @click.native="dialog = false">Cancel</v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
  
  
          </v-card>
        </v-dialog>
      </div>

  </v-container>
</div>
</template>


<style src="../../assets/css/style.css">
  
</style>

<script>
import axios from 'axios'
import FormWarehouse from '@/components/warehouse/Form'
import { GET_WAREHOUSE, UPDATE_WAREHOUSE, DELETE_WAREHOUSE } from '@/store/actions.type'

export default {
  components: {
    FormWarehouse
  },
  props: ['id'],
  data () {
    return {
      edit: true,
      title: 'Edit Warehouse',
      loadingPage: true,
      alert: {
        status: false, type: 'success', message: ''
      },
      loadingBtnSave: false,
      dialog: false,
      warehouse: {}
    }
  },
  computed: {
  //  warehouse () {
  //     return this.$store.state.warehouse.warehouse
  //   }
  },
  mounted () {
    // this.$store.dispatch(GET_WAREHOUSE, this.id)
  },
  methods: {
    deleted () {
      this.$store.dispatch(DELETE_WAREHOUSE, this.id)
      .then((response) => {
        this.$router.push({ path: '/warehouse' })
      }).catch((err) => {
        this.alert = {
          status: true,
          type: 'error',
          message: err.message
        }
      });
    },
    save () {
      this.loadingBtnSave = true
      this.$store.dispatch(UPDATE_WAREHOUSE, this.warehouse)
      .then((response) => {
        this.loadingBtnSave = false
        this.$router.push({ path: '/warehouse' })
      }).catch((err) => {
        this.alert = {
          status: true,
          type: 'error',
          message: err.message
        }
        this.loadingBtnSave = false
      })
    }
  },
  created() {
     this.$store.dispatch(GET_WAREHOUSE, this.id)
      .then(result => {
        this.warehouse = result.data
        this.loadingPage = false
      })
  }
}
</script>