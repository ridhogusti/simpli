<template>
<v-layout row justify-center v-if="$store.state.purchase.dialogState">
    <v-form ref="fPurchase">
    <v-dialog v-model="$store.state.purchase.dialogState" scrollable max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title">Add Purchase</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0" style="height: 450px;">
          <v-container grid-list-md>
            <v-layout row v-for="(form, index) in forms" :key="form.label">
            <!-- type text / string -->
            <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
                <v-text-field
                :label="form.label"
                v-model="purchase[form.id]"
                :type="form.type"
                :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                :required="form.isRequired"
                ></v-text-field>
            </v-flex>
            <!-- type select -->
            <v-flex v-if="form.type === 'select'">
                <v-select
                :label="form.label"
                v-model="purchase[form.id]"
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
                v-model="purchase[form.id]"
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
                :return-value.sync="purchase[form.id]"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                    slot="activator"
                    v-model="purchase[form.id]"
                    :label="form.label"
                    readonly
                    :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                    :required="form.isRequired"
                ></v-text-field>
                <v-date-picker v-model="purchase[form.id]" @input="$refs.menu2[index - 1].save(purchase[form.id])"></v-date-picker>
                </v-menu>
            </v-flex>
            </v-layout> 
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="closePurchase">Close</v-btn>
          <v-btn class="primary" @click.native="savePurchase">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
    </v-layout>
</template>

<script>
// import FormDialogSupllier from '@/components/supllier/FormDialog'
import FormDialogPaymentMethod from '@/components/paymentmethod/FormDialog'
// import FormDialogWarehouse from '@/components/warehouse/FormDialog'

export default {
  data(){
    return {
        purchase:{}
    }
  },
  components:{
    
    // FormDialogSupllier,
    
    FormDialogPaymentMethod,
    
    // FormDialogWarehouse
    
  },
  methods:{
      closePurchase(){
          this.$refs.fPurchase.reset()
          this.$store.state.purchase.dialogState = false
      },
     savePurchase(){
       if (this.$refs.fPurchase.validate()){
        this.$store.dispatch('createPurchase', this.purchase)
        .then((result) => {
          this.closePurchase()
        })
      }
    }
  },
  computed: {
   forms () {
      return [
      
      {"type":"datetime","id":"DueDate","label":"Due Date","isRequired":false,"modal":false},
      
      {"type":"text","id":"InvoiceNo","label":"Invoice No","isRequired":false},
      
      {"type":"text","id":"Notes","label":"Notes","isRequired":false},
      
      {"type":"datetime","id":"Date","label":"Date","isRequired":false,"modal":false},
      
      {"type":"text","id":"Status","label":"Status","isRequired":false},
      
      // {"type": 'select', "id": 'SupllierId', "label": 'Supllier',"isRequired": true,"data": this.$store.state.supllier.suplliers,buttonAdd:true, dialogAction:this.showDialogSupllier},
      
      {"type": 'select', "id": 'PaymentMethodId', "label": 'Payment Method',"isRequired": true,"data": this.$store.state.paymentmethod.paymentmethods,buttonAdd:true, dialogAction:this.showDialogPaymentMethod},
      
      // {"type": 'select', "id": 'WarehouseId', "label": 'Warehouse',"isRequired": true,"data": this.$store.state.warehouse.warehouses,buttonAdd:true, dialogAction:this.showDialogWarehouse},
      
      ]
    }
  },
  created(){
      
      this.$store.dispatch('GET_SUPLLIER_OF_PURCHASE')
    
      this.$store.dispatch('GET_PAYMENTMETHOD_OF_PURCHASE')
    
      this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASE')
    
     
    this.$store.dispatch('GET_SUPLLIER_OF_PURCHASE')
    
    this.$store.dispatch('GET_PAYMENTMETHOD_OF_PURCHASE')
    
    this.$store.dispatch('GET_WAREHOUSE_OF_PURCHASE')
    
  }
}
</script>
