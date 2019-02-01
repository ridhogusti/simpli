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
                <v-btn class="error" @click.native.stop="dialog = true">
                  <v-icon left>delete</v-icon> {{ $t('button.delete') }}
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

    <!-- dialog delete -->
    <div>
      <v-dialog v-model="dialog" :max-width="'290'">
        <v-card justify-center align-center>
          <v-card-text class="red">
            <div class="headline text-xs-center white--text">
              {{ $t('dialog.delete.title') }}
            </div>
          </v-card-text>
          <hr class="devider">
          <v-card-text class="text-xs-center">
            {{ $t('dialog.delete.content') }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="" @click.native="dialog = false">{{ $t('button.cancel') }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.native="deleted(account.Id)">{{ $t('button.yes') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    
  </v-container>
</template>

<script>
import Alert from '@/components/UIComponents/Alerts/Default'
import { GET_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT } from '@/store/actions.type'
import FormAccount from './Form'

export default {
  components: {
    FormAccount,
    Alert
  },
  props: ['id'],
  data () {
    return {
      title: 'Account',
      dialog: false
    }
  },
  computed: {
    alert () {
      return this.$store.state.account.error
    },
    account () {
      return this.$store.state.account.account
    }
  },
  methods: {
    save (params) {
      if (this.$refs.form.validate()) {
        this.$store.dispatch(UPDATE_ACCOUNT, this.account)
        .then((result) => {
          this.$router.push({path: '/account'})
        })
      }
    },
    deleted (param) {
      this.$store.dispatch(DELETE_ACCOUNT, param)
      .then((result) => {
        this.$router.push({path: '/account'})
      })
    }
  },
  mounted () {
    console.log('edit')
    this.$store.commit('CLEAR_ACCOUNT')
    this.$store.dispatch(GET_ACCOUNT, this.id)
  }
}
</script>
