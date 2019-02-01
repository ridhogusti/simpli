<template>
<v-layout row justify-center v-if="$store.state.paymentterm.dialogState">
    <v-form ref="fPaymentTerm">
    <v-dialog class="dialog_modal" v-model="$store.state.paymentterm.dialogState" scrollable max-width="500px">
      <v-card class="card_dialog">
        <v-card-title class="headerModal">
        <v-layout row wrap>
          <v-flex xs2> </v-flex>
          <v-flex xs8 class="titleModal">
            Add New Payment Term
          </v-flex>
          <v-flex xs2> 
              <v-btn @click.native="closePaymentTerm" style="margin: -15px 0px -19px 0px !important" flat icon color="white">
                <img src="../../assets/img/close-button-icon.png" style="width: 21px; height: 21px"></img>
              </v-btn>
                <div class="spanIcon">close</div>
          </v-flex>
        </v-layout>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0" style="height: 100%;">
          <v-container grid-list-md>
            <v-layout row v-for="(form, index) in forms" :key="form.label">
            <!-- type text / string -->
            <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
              <v-layout row wrap>
                <v-flex xs2> </v-flex>
                <v-flex xs8> 
                <v-text-field
                class="inputDialog"
                solo
                prepend-icon="place"
                :label="form.label"
                v-model="paymentterm[form.id]"
                :type="form.type"
                :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                :required="form.isRequired"
                ></v-text-field>
                </v-flex>
                <v-flex xs2> </v-flex>
              </v-layout>
            </v-flex>
            <!-- type select -->
            <v-flex v-if="form.type === 'select'">
                <v-select
                :label="form.label"
                v-model="paymentterm[form.id]"
                :items="form.data"
                item-text="Name"
                item-value="Id"
                autocomplete
                ></v-select>
            </v-flex>
            <!-- type radio -->
            <v-flex v-if="form.type === 'radio'">
                <v-radio-group
                :label="form.label"
                v-model="paymentterm[form.id]"
                row
                >
                <v-radio
                    v-for="item in form.data"
                    :key="item.Id"
                    :label="item.Name"
                    :value="item.Id"
                ></v-radio>
                </v-radio-group>
            </v-flex>
            <!-- type datetime -->
            <v-flex v-if="form.type === 'datetime'">
                <v-menu
                ref="menu2"
                :close-on-content-click="false"
                :v-model="form.modal"
                :nudge-right="40"
                :return-value.sync="paymentterm[form.id]"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                    slot="activator"
                    v-model="paymentterm[form.id]"
                    :label="form.label"
                    readonly
                    :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                    :required="form.isRequired"
                ></v-text-field>
                <v-date-picker v-model="paymentterm[form.id]" @input="$refs.menu2[index - 1].save(paymentterm[form.id])"></v-date-picker>
                </v-menu>
            </v-flex>
            </v-layout> 
          </v-container>

          <hr class="hrDialog">
          <div class="text-xs-center">
          <v-btn round color="success" class="btnSave" @click.native="savePaymentTerm">Save</v-btn>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
    </v-layout>
</template>

<script>

export default {
  data(){
    return {
        paymentterm:{}
    }
  },
  components:{
    
  },
  methods:{
      closePaymentTerm(){
          this.$refs.fPaymentTerm.reset()
          this.$store.state.paymentterm.dialogState = false
      },
     savePaymentTerm(){
       if (this.$refs.fPaymentTerm.validate()){
        this.$store.dispatch('createPaymentTerm', this.paymentterm)
        .then((result) => {
          this.closePaymentTerm()
        })
      }
    }
  },
  computed: {
   forms () {
      return [
      
      {"type":"text","id":"Name","label":"Name","isRequired":true},
      
      {"type":"text","id":"DaysOf","label":"Days Of","isRequired":true},
      
      {"type":"text","id":"Description","label":"Description","isRequired":true},

      
      ]
    }
  },
  created(){
      
     
  }
}
</script>
