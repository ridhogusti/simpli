<template>
  
  <v-container>
    
    <!-- alert -->
    <alert :alert="alert"></alert>

    <v-layout row>
      <v-flex>
        <v-card>          
          <v-card-title class="grey darken-1">
            <div class="title white--text">{{title}}</div>
          </v-card-title>
          <hr class="devider">

          <v-card-text>

            <v-form ref="form">

              <!-- form account -->
              <form-account :account="account"></form-account>
              <!-- form button -->
              <v-layout row>
                <v-flex xs12 class="text-sm-right">
                  <v-btn class="primary" @click.prevent="save">
                    <v-icon left>save</v-icon> {{ $t('button.save') }}
                  </v-btn>
                  <v-btn class="secondary" @click.prevent="saveNew">
                    <v-icon left>save</v-icon> {{ $t('button.save-new') }}
                  </v-btn>
                  <v-btn class="error" @click="cancel">
                    <v-icon left>cancel</v-icon> {{ $t('button.cancel') }}
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-form>

          </v-card-text>

          <!-- button back to list -->
          <v-card-text class="text-xs-center pa-0 grey lighten-1">
            <v-btn :to="'/account'">{{ $t('button.back') }}</v-btn>
          </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  
</template>

<script>
import _ from 'underscore'
import { CREATE_ACCOUNT } from '@/store/actions.type'
import Alert from '@/components/UIComponents/Alerts/Default'
import FormAccount from './Form'

export default {
  components: {
    Alert,
    FormAccount
  },
  data () {
    return {
      title: 'Account',
      account: {}
    } 
  },
  computed: {
    alert () {
      return this.$store.state.account.error
    }
  },
  methods: {
    cancel () {
      this.$refs.form.reset()
    },
    save () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch(CREATE_ACCOUNT, this.account)
        .then((result) => {
          this.$router.push({path: '/account'})  
        })
      }
    },
    saveNew () {
      const self = this
      const _employeeId = this.account.EmployeeId
      if (this.$refs.form.validate()) {
        this.$store.dispatch(CREATE_ACCOUNT, this.account)
        .then((result) => {
          const _filter = _.filter(this.$store.state.employee.employees,(e)=>{
            return e.Id != _employeeId
          })
          this.$store.state.employee.employees = _filter
          this.$refs.form.reset()
        })
      }
    }
  }
}
</script>

