<template>
  <v-container fluid>
    <v-layout row v-for="(form, index) in forms" :key="form.label">
      <!-- type text / string -->
      <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
        <v-text-field
          :label="form.label"
          v-model="OrderItem[form.id]"
          :type="form.type"
          :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
          :required="form.isRequired"
        ></v-text-field>
      </v-flex>
      <!-- type select -->
      <v-flex v-if="form.type === 'select'">
        <v-select
          :label="form.label"
          v-model="OrderItem[form.id]"
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
          v-model="OrderItem[form.id]"
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
          :return-value.sync="OrderItem[form.id]"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="OrderItem[form.id]"
            :label="form.label"
            readonly
          ></v-text-field>
          <v-date-picker v-model="OrderItem[form.id]" @input="$refs.menu2[index - 1].save(OrderItem[form.id])"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout> 
    
      <FormDialogProduct/>
   
      <FormDialogOrder/>
   
  </v-container>  
</template>
<script>
import FormDialogProduct from '@/components/product/FormDialog'
import FormDialogOrder from '@/components/order/FormDialog'

export default {
  props: ['OrderItem'],
  components: {
  FormDialogProduct,
  FormDialogOrder
  
  },
  data () {
    return {
    }
  },
  computed: {
    forms () {
      return [
      
      {"type":"text","id":"ProductName","label":"Product Name","isRequired":false},
      
      {"type":"text","id":"Quantity","label":"Quantity","isRequired":false},
      
      {"type":"text","id":"Note","label":"Note","isRequired":false},
      
      {"type": 'select', "id": 'ProductId', "label": 'Product',"isRequired": true,"data": this.$store.state.product.products,buttonAdd:true,dialogAction:this.showDialogProduct},
      
      {"type": 'select', "id": 'OrderId', "label": 'Order',"isRequired": true,
      "data": this.$store.state.order.orders,buttonAdd:true,
      dialogAction:this.showDialogOrder},
      
      ]
    }
  },
  methods:{
    
      showDialogProduct(){
         this.$store.state.product.dialogState=true
      },
    
      showDialogOrder(){
         this.$store.state.order.dialogState=true
      }
    
  },
   created(){
     console.log('test')
      console.log(this.$store.state.order.orders)
      this.$store.dispatch('GET_PRODUCT_OF_ORDERITEM')
    
      this.$store.dispatch('GET_ORDER_OF_ORDERITEM')
  }
}
</script>
