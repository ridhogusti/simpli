<template>
  <v-container fluid>
    <v-layout row v-for="(form, index) in forms" :key="form.label">
      <!-- type text / string -->
      <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
        <v-text-field
          :label="form.label"
          v-model="Payment[form.id]"
          :type="form.type"
          :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
          :required="form.isRequired"
        ></v-text-field>
      </v-flex>
      <!-- type select -->
      <v-flex v-if="form.type === 'select'">
        <v-select
          :label="form.label"
          v-model="Payment[form.id]"
          :items="form.data"
          item-text="Name"
          item-value="Id"
          :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
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
          v-model="Payment[form.id]"
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
          :return-value.sync="Payment[form.id]"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="Payment[form.id]"
            :label="form.label"
            readonly
          ></v-text-field>
          <v-date-picker v-model="Payment[form.id]" @input="$refs.menu2[index - 1].save(Payment[form.id])"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout> 
    
      <FormDialogPaymentMethod/>
   
      <FormDialogOrder/>
   
  </v-container>  
</template>
<script>
import FormDialogPaymentMethod from '@/components/paymentmethod/FormDialog'
import FormDialogOrder from '@/components/order/FormDialog'

export default {
  props: ['Payment'],
  components: {
  FormDialogPaymentMethod,
  FormDialogOrder
  },
  data () {
    return {
    }
  },
  computed: {
    forms () {
      return [
      
      {"type":"text","id":"Total","label":"Total","isRequired":false},
      
      {"type":"text","id":"PaymentMethodName","label":"Payment Method Name","isRequired":false},
      
      {"type":"text","id":"Notes","label":"Notes","isRequired":false},
      
      {"type": 'select', "id": 'PaymentMethodId', "label": 'Payment Method',"isRequired": true,"data": this.$store.state.paymentmethod.paymentmethods,buttonAdd:true,dialogAction:this.showDialogPaymentMethod},
      
      {"type": 'select', "id": 'OrderId', "label": 'Order',"isRequired": true,"data": this.$store.state.order.orders,buttonAdd:true,dialogAction:this.showDialogOrder},
      
      ]
    }
  },
  methods:{
      showDialogPaymentMethod(){
         this.$store.state.paymentmethod.dialogState=true
      }
      ,
      showDialogOrder(){
         this.$store.state.order.dialogState=true
      }
    
  },
   created(){
    
      this.$store.dispatch('GET_PAYMENTMETHOD_OF_PAYMENT')
    
      this.$store.dispatch('GET_ORDER_OF_PAYMENT')
    
    
  }
}
</script>
