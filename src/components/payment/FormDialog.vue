<template>
<v-layout row justify-center v-if="$store.state.payment.dialogState">
    <v-form ref="fPayment">
    <v-dialog v-model="$store.state.payment.dialogState" scrollable max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title">Add Payment</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0" style="height: 450px;">
          <v-container grid-list-md>
            <v-layout row v-for="(form, index) in forms" :key="form.label">
            <!-- type text / string -->
            <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
                <v-text-field
                :label="form.label"
                v-model="payment[form.id]"
                :type="form.type"
                :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                :required="form.isRequired"
                ></v-text-field>
            </v-flex>
            <!-- type select -->
            <v-flex v-if="form.type === 'select'">
                <v-select
                :label="form.label"
                v-model="payment[form.id]"
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
                v-model="payment[form.id]"
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
                :return-value.sync="payment[form.id]"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                    slot="activator"
                    v-model="payment[form.id]"
                    :label="form.label"
                    readonly
                    :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                    :required="form.isRequired"
                ></v-text-field>
                <v-date-picker v-model="payment[form.id]" @input="$refs.menu2[index - 1].save(payment[form.id])"></v-date-picker>
                </v-menu>
            </v-flex>
            </v-layout> 
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="closePayment">Close</v-btn>
          <v-btn class="primary" @click.native="savePayment">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
    </v-layout>
</template>

<script>
import FormDialogPaymentMethod from '@/components/paymentmethod/FormDialog'
import FormDialogOrder from '@/components/order/FormDialog'

export default {
  data(){
    return {
        payment:{}
    }
  },
  components:{
    FormDialogPaymentMethod,
    FormDialogOrder
    
  },
  methods:{
      closePayment(){
          this.$refs.fPayment.reset()
          this.$store.state.payment.dialogState = false
      },
     savePayment(){
       if (this.$refs.fPayment.validate()){
        this.$store.dispatch('createPayment', this.payment)
        .then((result) => {
          this.closePayment()
        })
      }
    }
  },
  computed: {
   forms () {
      return [
      
      {"type":"text","id":"Total","label":"Total","isRequired":false},
      
      {"type":"text","id":"PaymentMethodName","label":"Payment Method Name","isRequired":false},
      
      {"type":"text","id":"Notes","label":"Notes","isRequired":false},
      
      {"type": 'select', "id": 'PaymentMethodId', "label": 'Payment Method',"isRequired": true,"data": this.$store.state.paymentmethod.paymentmethods,buttonAdd:true, dialogAction:this.showDialogPaymentMethod},
      
      {"type": 'select', "id": 'OrderId', "label": 'Order',"isRequired": true,"data": this.$store.state.order.orders,buttonAdd:true, dialogAction:this.showDialogOrder},
      
      ]
    }
  },
  created(){
      
      this.$store.dispatch('GET_PAYMENTMETHOD_OF_PAYMENT')
    
      this.$store.dispatch('GET_ORDER_OF_PAYMENT')
  }
}
</script>
