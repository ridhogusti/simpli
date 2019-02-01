<template>
<v-layout row justify-center v-if="$store.state.stock.dialogState">
    <v-form ref="fStock">
    <v-dialog v-model="$store.state.stock.dialogState" scrollable max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title">Add Stock</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0" style="height: 450px;">
          <v-container grid-list-md>
            <v-layout row v-for="(form, index) in forms" :key="form.label">
            <!-- type text / string -->
            <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
                <v-text-field
                :label="form.label"
                v-model="stock[form.id]"
                :type="form.type"
                :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                :required="form.isRequired"
                ></v-text-field>
            </v-flex>
            <!-- type select -->
            <v-flex v-if="form.type === 'select'">
                <v-select
                :label="form.label"
                v-model="stock[form.id]"
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
                v-model="stock[form.id]"
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
                :return-value.sync="stock[form.id]"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                    slot="activator"
                    v-model="stock[form.id]"
                    :label="form.label"
                    readonly
                    :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                    :required="form.isRequired"
                ></v-text-field>
                <v-date-picker v-model="stock[form.id]" @input="$refs.menu2[index - 1].save(stock[form.id])"></v-date-picker>
                </v-menu>
            </v-flex>
            </v-layout> 
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="closeStock">Close</v-btn>
          <v-btn class="primary" @click.native="saveStock">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
    </v-layout>
</template>

<script>
import FormDialogWarehouse from '@/components/warehouse/FormDialog'
import FormDialogProduct from '@/components/product/FormDialog'
import FormDialogUnit from '@/components/unit/FormDialog'

export default {
  data(){
    return {
        stock:{}
    }
  },
  components:{
    
    FormDialogWarehouse
    
    FormDialogProduct
    
    FormDialogUnit
    
  },
  methods:{
      closeStock(){
          this.$refs.fStock.reset()
          this.$store.state.stock.dialogState = false
      },
     saveStock(){
       if (this.$refs.fStock.validate()){
        this.$store.dispatch('createStock', this.stock)
        .then((result) => {
          this.closeStock()
        })
      }
    }
  },
  computed: {
   forms () {
      return [
      
      {"type":"text","id":"Id","label":"Id","isRequired":false},
      
      {"type": 'select', "id": 'WarehouseId', "label": 'Warehouse',"isRequired": true,"data": this.$store.state.warehouse.warehouses,buttonAdd:true, dialogAction:this.showDialogWarehouse},
      
      {"type": 'select', "id": 'ProductId', "label": 'Product',"isRequired": true,"data": this.$store.state.product.products,buttonAdd:true, dialogAction:this.showDialogProduct},
      
      {"type": 'select', "id": 'UnitId', "label": 'Unit',"isRequired": true,"data": this.$store.state.unit.units,buttonAdd:true, dialogAction:this.showDialogUnit},
      
      ]
    }
  },
  created(){
      
      this.$store.dispatch('GET_WAREHOUSE_OF_STOCK')
    
      this.$store.dispatch('GET_PRODUCT_OF_STOCK')
    
      this.$store.dispatch('GET_UNIT_OF_STOCK')
    
     
    this.$store.dispatch('GET_WAREHOUSE_OF_STOCK')
    
    this.$store.dispatch('GET_PRODUCT_OF_STOCK')
    
    this.$store.dispatch('GET_UNIT_OF_STOCK')
    
  }
}
</script>
