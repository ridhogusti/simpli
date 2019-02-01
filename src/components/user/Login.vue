<template>
  <v-app class="blue-grey darken-4">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>  
        <v-flex xs12 sm6 md4>

          <alert :alert="alert"></alert>

          <v-card class="elevation-12">
            <v-card-text class="primary">
              <div class="headline text-xs-center white--text">SimpliRetail</div>
            </v-card-text>
            <hr class="devider">
            <v-card-text>
              <v-form ref="form" @keyup.native.enter="submit(user.Username, user.Password)">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      label="Username "
                      type="text"
                      v-model="user.UserName"
                      prepend-icon="face"
                      :rules="[v => !!v || 'Username is required.']"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      label="Password "
                      type="password"
                      v-model="user.Password"
                      prepend-icon="lock"
                      :rules="[v => !!v || 'Password is required.']"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn
                      class="primary"
                      block
                      large
                      @click="submit()"
                      :disabled="loading"
                      :loading="loading"
                    >
                      {{$t('button.login')}}
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Alert from '@/components/UIComponents/Alerts/Default'
import { LOGIN } from '@/store/actions.type'

export default {
  components: {
    Alert
  },
  data () {
    return {
      loading: false,
      alert: {},
      user: {}
    }
  },
  methods: {
    SetAlert (type, msg) {
      this.alert = {
        status: true, type: type, message: msg
      }
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.$store.dispatch(LOGIN, this.user)
        .then((result) => {
          this.$router.push({path: '/home'})
        }).catch((err) => {
          if (err.response.status === 400) {
            this.SetAlert('error', err.response.data.ERROR_MARKER)
          } else {
            this.SetAlert('error', err.message)
          }
          
          // alert(err.message)
          this.loading = false
        })
      }
    }
  }
}
</script>

