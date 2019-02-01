<template>
  <v-container fluid>
    <v-layout row v-for="(form, index) in forms" :key="form.label">
      <!-- type text / string -->
      <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
        <v-text-field
          :label="form.label"
          v-model="PurchaseItem[form.id]"
          :type="form.type"
          :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
          :required="form.isRequired"
        ></v-text-field>
      </v-flex>
      <!-- type select -->
      <v-flex v-if="form.type === 'select'">
        <v-select
          :label="form.label"
          v-model="PurchaseItem[form.id]"
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
          v-model="PurchaseItem[form.id]"
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
          :return-value.sync="PurchaseItem[form.id]"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="PurchaseItem[form.id]"
            :label="form.label"
            readonly
          ></v-text-field>
          <v-date-picker v-model="PurchaseItem[form.id]" @input="$refs.menu2[index - 1].save(PurchaseItem[form.id])"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout> 
    
      <FormDialogPurchase/>
   
      // <FormDialogProduct/>
   
  </v-container>  
</template>
<script>
import FormDialogPurchase from '@/components/purchase/FormDialog'
import FormDialogProduct from '@/components/product/FormDialog'

export default {
  props: ['PurchaseItem'],
  components: {
  FormDialogPurchase
  // FormDialogProduct
  
  },
  data () {
    return {
    }
  },
  computed: {
    forms () {
      return [
      
      {"type":"text","id":"ProductName","label":"Product Name","isRequired":false},
      
      {"type":"text","id":"ProductPrice","label":"Product Price","isRequired":false},
      
      {"type":"text","id":"ProductSKU","label":"Product","isRequired":false},
      
      {"type":"text","id":"ProductDescription","label":"Product Description","isRequired":false},
      
      {"type":"text","id":"Quantity","label":"Quantity","isRequired":false},
      
      {"type":"text","id":"Tax","label":"Tax","isRequired":false},
      
      {"type": 'select', "id": 'PurchaseId', "label": 'Purchase',"isRequired": true,"data": this.$store.state.purchase.purchases,buttonAdd:true,dialogAction:this.showDialogPurchase},
      
      {"type": 'select', "id": 'ProductId', "label": 'Product',"isRequired": true,"data": this.$store.state.product.products,buttonAdd:true,dialogAction:this.showDialogProduct},
      
      ]
    }
  },
  methods:{
    
      showDialogPurchase(){
         this.$store.state.purchase.dialogState=true
      },
    
      showDialogProduct(){
         this.$store.state.product.dialogState=true
      }
    
  },
   created(){
    
      this.$store.dispatch('GET_PURCHASE_OF_PURCHASEITEM')
    
      this.$store.dispatch('GET_PRODUCT_OF_PURCHASEITEM')
    
    
    this.$store.dispatch('GET_PURCHASE_OF_PURCHASEITEM')
    
    this.$store.dispatch('GET_PRODUCT_OF_PURCHASEITEM')
    
  }
}
</script>
