<template>
<v-layout row justify-center v-if="$store.state.cashupitem.dialogState">
    <v-form ref="fCashUpItem">
    <v-dialog v-model="$store.state.cashupitem.dialogState" scrollable max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title">Add CashUpItem</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0" style="height: 450px;">
          <v-container grid-list-md>
            <v-layout row v-for="(form, index) in forms" :key="form.label">
            <!-- type text / string -->
            <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
                <v-text-field
                :label="form.label"
                v-model="cashupitem[form.id]"
                :type="form.type"
                :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                :required="form.isRequired"
                ></v-text-field>
            </v-flex>
            <!-- type select -->
            <v-flex v-if="form.type === 'select'">
                <v-select
                :label="form.label"
                v-model="cashupitem[form.id]"
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
                v-model="cashupitem[form.id]"
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
                :return-value.sync="cashupitem[form.id]"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                    slot="activator"
                    v-model="cashupitem[form.id]"
                    :label="form.label"
                    readonly
                    :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                    :required="form.isRequired"
                ></v-text-field>
                <v-date-picker v-model="cashupitem[form.id]" @input="$refs.menu2[index - 1].save(cashupitem[form.id])"></v-date-picker>
                </v-menu>
            </v-flex>
            </v-layout> 
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="closeCashUpItem">Close</v-btn>
          <v-btn class="primary" @click.native="saveCashUpItem">Save</v-btn>
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
        cashupitem:{}
    }
  },
  components:{
    
  },
  methods:{
      closeCashUpItem(){
          this.$refs.fCashUpItem.reset()
          this.$store.state.cashupitem.dialogState = false
      },
     saveCashUpItem(){
       if (this.$refs.fCashUpItem.validate()){
        this.$store.dispatch('createCashUpItem', this.cashupitem)
        .then((result) => {
          this.closeCashUpItem()
        })
      }
    }
  },
  computed: {
   forms () {
      return [
      
      ]
    }
  },
  created(){
      
     
  }
}
</script>
