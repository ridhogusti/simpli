<template>
<v-layout row justify-center v-if="$store.state.orderitem.dialogState">
    <v-form ref="fOrderItem">
    <v-dialog v-model="$store.state.orderitem.dialogState" scrollable max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title">Add OrderItem</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0" style="height: 450px;">
          <v-container grid-list-md>
            <v-layout row v-for="(form, index) in forms" :key="form.label">
            <!-- type text / string -->
            <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
                <v-text-field
                :label="form.label"
                v-model="orderitem[form.id]"
                :type="form.type"
                :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                :required="form.isRequired"
                ></v-text-field>
            </v-flex>
            <!-- type select -->
            <v-flex v-if="form.type === 'select'">
                <v-select
                :label="form.label"
                v-model="orderitem[form.id]"
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
                v-model="orderitem[form.id]"
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
                :return-value.sync="orderitem[form.id]"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                    slot="activator"
                    v-model="orderitem[form.id]"
                    :label="form.label"
                    readonly
                    :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                    :required="form.isRequired"
                ></v-text-field>
                <v-date-picker v-model="orderitem[form.id]" @input="$refs.menu2[index - 1].save(orderitem[form.id])"></v-date-picker>
                </v-menu>
            </v-flex>
            </v-layout> 
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="closeOrderItem">Close</v-btn>
          <v-btn class="primary" @click.native="saveOrderItem">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
    </v-layout>
</template>

<script>
import FormDialogProduct from '@/components/product/FormDialog'
import FormDialogOrder from '@/components/order/FormDialog'

export default {
  data(){
    return {
        orderitem:{}
    }
  },
  components:{
    
    FormDialogProduct,
    
    FormDialogOrder
    
  },
  methods:{
      closeOrderItem(){
          this.$refs.fOrderItem.reset()
          this.$store.state.orderitem.dialogState = false
      },
     saveOrderItem(){
       if (this.$refs.fOrderItem.validate()){
        this.$store.dispatch('createOrderItem', this.orderitem)
        .then((result) => {
          this.closeOrderItem()
        })
      }
    }
  },
  computed: {
   forms () {
      return [
      
      {"type":"text","id":"ProductName","label":"Product Name","isRequired":false},
      
      {"type":"text","id":"Quantity","label":"Quantity","isRequired":false},
      
      {"type":"text","id":"Note","label":"Note","isRequired":false},
      
      {"type": 'select', "id": 'ProductId', "label": 'Product',"isRequired": true,"data": this.$store.state.product.products,buttonAdd:true, dialogAction:this.showDialogProduct},
      
      {"type": 'select', "id": 'OrderId', "label": 'Order',"isRequired": true,"data": this.$store.state.order.orders,buttonAdd:true, dialogAction:this.showDialogOrder},
      
      ]
    }
  },
  created(){
      
      this.$store.dispatch('GET_PRODUCT_OF_ORDERITEM')
    
      this.$store.dispatch('GET_ORDER_OF_ORDERITEM')
    
     
    this.$store.dispatch('GET_PRODUCT_OF_ORDERITEM')
    
    this.$store.dispatch('GET_ORDER_OF_ORDERITEM')
    
  }
}
</script>
