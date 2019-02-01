<template>
  <v-container>
    <v-layout>
      <!-- <v-flex xs12 sm8 offset-sm2> -->
      <v-flex xs12 sm12>
        <v-card>
          <v-card-title class="title">Base Form</v-card-title>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>

              <!-- kolom input nip -->
              <v-text-field
                label="NIP "
                v-model="nip"
                :rules="nipRules"
                :counter="20"
                prepend-icon="account_circle"
                required
              ></v-text-field>

              <!-- kolom input nama -->
              <v-text-field
                label="Name "
                v-model="name"
                :rules="nameRules"
                :counter="100"
                prepend-icon="face"
                required
              ></v-text-field>

              <!-- kolom input email -->
              <v-text-field
                label="E-mail "
                v-model="email"
                :rules="emailRules"
                prepend-icon="email"
                required
              ></v-text-field>

              <!-- kolom input datepicker -->
              <v-flex xs12 sm12 md12>
                <v-dialog
                  ref="dialog"
                  persistent
                  v-model="modal"
                  lazy
                  full-width
                  width="290px"
                  :return-value.sync="date"
                >
                  <v-text-field
                    slot="activator"
                    label="Tanggal Lahir "
                    v-model="date"
                    prepend-icon="event"
                    readonly
                    :rules="[v => !!v || 'Tanggal lahir harus diisi']"
                    required
                  ></v-text-field>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              
              <!-- form select gender -->
              <v-select
                label="Gender "
                v-model="gender"
                :items="genderTypes"
                prepend-icon="person"
                :rules="[v => !!v || 'Jenis kelamin harus diisi']"
                required
                autocomplete
              ></v-select>

              <!-- form radio  -->
              <v-flex xs12 sm6 md6>
                <h4 class="body-2">Status Pegawai (Radio)</h4>
                <v-radio-group v-model="status" row>
                  <v-radio label="Akif" value="aktif"></v-radio>
                  <v-radio label="Tidak aktif" value="tidak aktif"></v-radio>
                </v-radio-group>
              </v-flex>

              <!-- component switch -->
              <v-flex xs12 sm8 md6>
                <h4 class="body-2">Status Pegawai (Switch)</h4>
                <v-switch :label="switch1==true?'Aktif':'Tidak Aktif'" v-model="switch1"></v-switch>
              </v-flex>

              <!-- checkbox -->
              <v-checkbox
                label="apakah kamu setuju? "
                v-model="checkbox"
                :rules="[v => !!v || 'kamu harus setuju unutk melanjutkannya!']"
                required
              ></v-checkbox>

              <!-- button submit -->
              <v-btn
                @click="submit"
                :disabled="!valid"
                color="primary"
              >submit</v-btn>
              <!-- button clear -->
              <v-btn @click="clear">clear</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    data: () => ({
      valid: true,
      nip: '',
      nipRules: [
        v => !!v || 'Nip harus diisi',
        v => (v && v.length <= 20) || 'Nip tidak boleh lebih dari 20 karakter'
      ],
      name: '',
      nameRules: [
        v => !!v || 'Nama harus diisi',
        v => (v && v.length <= 100) || 'Nama tidak boleh lebih dari 100 karakter'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Email harus diisi',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email harus benar'
      ],
      gender: null,
      genderTypes: [
        'Pria',
        'Wanita'
      ],
      checkbox: false,
      date: null,
      modal: false,
      switch1: true,
      status: 'aktif'
    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            name: this.name,
            email: this.email,
            select: this.select,
            checkbox: this.checkbox
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>