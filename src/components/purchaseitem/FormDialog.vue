<template>
<v-layout row justify-center v-if="$store.state.purchaseitem.dialogState">
    <v-form ref="fPurchaseItem">
    <v-dialog v-model="$store.state.purchaseitem.dialogState" scrollable max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title">Add PurchaseItem</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0" style="height: 450px;">
          <v-container grid-list-md>
            <v-layout row v-for="(form, index) in forms" :key="form.label">
            <!-- type text / string -->
            <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
                <v-text-field
                :label="form.label"
                v-model="purchaseitem[form.id]"
                :type="form.type"
                :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                :required="form.isRequired"
                ></v-text-field>
            </v-flex>
            <!-- type select -->
            <v-flex v-if="form.type === 'select'">
                <v-select
                :label="form.label"
                v-model="purchaseitem[form.id]"
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
                v-model="purchaseitem[form.id]"
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
                :return-value.sync="purchaseitem[form.id]"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                    slot="activator"
                    v-model="purchaseitem[form.id]"
                    :label="form.label"
                    readonly
                    :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                    :required="form.isRequired"
                ></v-text-field>
                <v-date-picker v-model="purchaseitem[form.id]" @input="$refs.menu2[index - 1].save(purchaseitem[form.id])"></v-date-picker>
                </v-menu>
            </v-flex>
            </v-layout> 
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="closePurchaseItem">Close</v-btn>
          <v-btn class="primary" @click.native="savePurchaseItem">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
    </v-layout>
</template>

<script>
import FormDialogPurchase from '@/components/purchase/FormDialog'
import FormDialogProduct from '@/components/product/FormDialog'

export default {
  data(){
    return {
        purchaseitem:{}
    }
  },
  components:{
    
    FormDialogPurchase
    
    FormDialogProduct
    
  },
  methods:{
      closePurchaseItem(){
          this.$refs.fPurchaseItem.reset()
          this.$store.state.purchaseitem.dialogState = false
      },
     savePurchaseItem(){
       if (this.$refs.fPurchaseItem.validate()){
        this.$store.dispatch('createPurchaseItem', this.purchaseitem)
        .then((result) => {
          this.closePurchaseItem()
        })
      }
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
      
      {"type": 'select', "id": 'PurchaseId', "label": 'Purchase',"isRequired": true,"data": this.$store.state.purchase.purchases,buttonAdd:true, dialogAction:this.showDialogPurchase},
      
      {"type": 'select', "id": 'ProductId', "label": 'Product',"isRequired": true,"data": this.$store.state.product.products,buttonAdd:true, dialogAction:this.showDialogProduct},
      
      ]
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
