<template>
  <v-container fluid grid-list-md>
    <div v-if="alert.status">
      <v-alert v-model="alert.status" :type="alert.type" dismissible>
        {{alert.message}}
      </v-alert>
    </div>
    <v-layout row>
      <v-flex xs12 sm12>
        <v-card>
          <v-card-text class="title grey darken-1 white--text">{{title}}</v-card-text>
          <hr class="devider">
          <v-card-text>
            <v-form ref="form">
              <FormEmployee :Employee="employee"></FormEmployee>
              <div class="botton-submit text-md-right">
                <v-btn class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save"><v-icon left>save</v-icon> Save</v-btn>
                <v-btn class="error" @click.native.stop="dialog = true"><v-icon left>delete</v-icon> Delete</v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-card-text class="text-xs-center pa-0 grey lighten-1">
            <v-btn :to="'/employee'">Back to list</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- dialog delete -->
    <div>
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
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'
import FormEmployee from '@/components/employee/Form'
import { GET_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from '@/store/actions.type'

export default {
  components: {
    FormEmployee
  },
  props: ['id'],
  data () {
    return {
      edit: true,
      title: 'Employee',
      alert: {
        status: false, type: 'success', message: ''
      },
      loadingBtnSave: false,
      dialog: false
    }
  },
  computed: {
   employee () {
      return this.$store.state.employee.employee
    }
  },
  mounted () {
    this.$store.dispatch(GET_EMPLOYEE, this.id)
  },
  methods: {
    deleted () {
      this.$store.dispatch(DELETE_EMPLOYEE, this.id)
      .then((response) => {
        this.$router.push({ path: '/employee' })
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
      this.$store.dispatch(UPDATE_EMPLOYEE, this.employee)
      .then((response) => {
        this.loadingBtnSave = false
        this.$router.push({ path: '/employee' })
      }).catch((err) => {
        this.alert = {
          status: true,
          type: 'error',
          message: err.message
        }
        this.loadingBtnSave = false
      })
    }
  }
}
</script>