<template>
<v-layout row justify-center v-if="$store.state.cashup.dialogState">
    <v-form ref="fCashUp">
    <v-dialog v-model="$store.state.cashup.dialogState" scrollable max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title">Add CashUp</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0" style="height: 450px;">
          <v-container grid-list-md>
            <v-layout row v-for="(form, index) in forms" :key="form.label">
            <!-- type text / string -->
            <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
                <v-text-field
                :label="form.label"
                v-model="cashup[form.id]"
                :type="form.type"
                :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                :required="form.isRequired"
                ></v-text-field>
            </v-flex>
            <!-- type select -->
            <v-flex v-if="form.type === 'select'">
                <v-select
                :label="form.label"
                v-model="cashup[form.id]"
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
                v-model="cashup[form.id]"
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
                :return-value.sync="cashup[form.id]"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                    slot="activator"
                    v-model="cashup[form.id]"
                    :label="form.label"
                    readonly
                    :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                    :required="form.isRequired"
                ></v-text-field>
                <v-date-picker v-model="cashup[form.id]" @input="$refs.menu2[index - 1].save(cashup[form.id])"></v-date-picker>
                </v-menu>
            </v-flex>
            </v-layout> 
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="closeCashUp">Close</v-btn>
          <v-btn class="primary" @click.native="saveCashUp">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
    </v-layout>
</template>

<script>
import FormDialogPaymentMethod from '@/components/paymentmethod/FormDialog'
import FormDialogEmployeeItemShift from '@/components/employeeitemshift/FormDialog'

export default {
  data(){
    return {
        cashup:{}
    }
  },
  components:{
    
    FormDialogPaymentMethod,
    
    FormDialogEmployeeItemShift
    
  },
  methods:{
      closeCashUp(){
          this.$refs.fCashUp.reset()
          this.$store.state.cashup.dialogState = false
      },
     saveCashUp(){
       if (this.$refs.fCashUp.validate()){
        this.$store.dispatch('createCashUp', this.cashup)
        .then((result) => {
          this.closeCashUp()
        })
      }
    }
  },
  computed: {
   forms () {
      return [
      
      {"type":"datetime","id":"Date","label":"Date","isRequired":false,"modal":false},
      
      {"type":"text","id":"PaymentMethodName","label":"Payment Method Name","isRequired":false},
      
      {"type":"text","id":"EmployeeName","label":"Employee Name","isRequired":false},
      
      {"type": 'select', "id": 'PaymentMethodId', "label": 'Payment Method',"isRequired": true,"data": this.$store.state.paymentmethod.paymentmethods,buttonAdd:true, dialogAction:this.showDialogPaymentMethod},
      
      {"type": 'select', "id": 'EmployeeItemShiftId', "label": 'Employee Item Shift',"isRequired": true,"data": this.$store.state.employeeitemshift.employeeitemshifts,buttonAdd:true, dialogAction:this.showDialogEmployeeItemShift},
      
      ]
    }
  },
  created(){
      
      this.$store.dispatch('GET_PAYMENTMETHOD_OF_CASHUP')
    
      this.$store.dispatch('GET_EMPLOYEEITEMSHIFT_OF_CASHUP')
    
     
  }
}
</script>
