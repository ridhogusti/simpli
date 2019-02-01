<template>
  <v-container fluid>
    <v-layout row v-for="(form, index) in forms" :key="form.label">
      <!-- type text / string -->
      <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
        <v-text-field
          :label="form.label"
          v-model="Supplier[form.id]"
          :type="form.type"
          :rules="[v => !!v || form.label + ' is required.']"
          :required="form.isRequired"
        ></v-text-field>
      </v-flex>
      <!-- type select -->
      <v-flex v-if="form.type === 'select'">
        <v-select
          :label="form.label"
          v-model="Supplier[form.id]"
          :items="form.data"
          item-text="Name"
          item-value="Id"
          :rules="[v => !!v || form.label + ' is required.']"
          :required="form.isRequired"
          autocomplete
        ></v-select>
      </v-flex>
       <v-flex v-if="form.buttonAdd">
        <v-btn class="success" fab small="" @click.stop="form.dialogAction">
          <v-icon>add</v-icon>
        </v-btn>
      </v-flex>
      <!-- type radio -->
      <v-flex v-if="form.type === 'radio'">
        <v-radio-group
          :label="form.label"
          v-model="Supplier[form.id]"
          row>
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
          :return-value.sync="Supplier[form.id]"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="Supplier[form.id]"
            :label="form.label"
            readonly
          ></v-text-field>
          <v-date-picker v-model="Supplier[form.id]" @input="$refs.menu2[index - 1].save(Supplier[form.id])"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout> 
     <v-layout row justify-center v-if="dialog">
    <v-form ref="fEmployee">
    <v-dialog v-model="dialog" scrollable max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title">Add Employee</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0" style="height: 450px;">
          <v-container grid-list-md>
            <v-layout wrap>
              <form-employee :employee="employee"></form-employee>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="closeEmployee">Close</v-btn>
          <v-btn class="primary" @click.native="saveEmployee">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
  </v-layout>

  <FormDialogPaymentTerm />

  </v-container>  
</template>
<script>
import FormSupplier from '@/components/supplier/Form'
import FormDialogPaymentTerm from '@/components/paymentterm/FormDialog'
import { GET_SUPPLIERS_NO_ACCOUNT, CREATE_SUPPLIER} from '@/store/actions.type'
export default {
  props: ['Supplier'],
  components: {
    FormDialogPaymentTerm
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    forms () {
      return [
      
      {"type":"text","id":"Company","label":"Company","isRequired":true},
      
      {"type":"text","id":"ContactPerson","label":"Contact Person","isRequired":true},
      
      {"type":"text","id":"Phone","label":"Phone","isRequired":true},
      
      {"type":"text","id":"Address","label":"Address","isRequired":true},
      
      {"type":"text","id":"Email","label":"Email","isRequired":true},

      {"type": 'select', "id": 'PaymentTermId', "label": 'Payment Term',"isRequired": true,"data": this.$store.state.paymentterm.paymentterms,buttonAdd:true,dialogAction:this.showDialogPaymentTerm},
      
      // {"type":"text","id":"TenantName","label":"Tenant Name","isRequired":true},
      
      ]
    }
  },
  methods:{
      showDialogPaymentTerm(){
         this.$store.state.paymentterm.dialogState=true
      },
  },
  created() {
      this.$store.dispatch('GET_PAYMENTTERM_OF_SUPPLIER')
  }
}
</script>
