<template>
  <v-container fluid>
    <v-layout row v-for="(form, index) in forms" :key="form.label">
      <!-- type text / string -->
      <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
        <v-text-field
          :label="form.label"
          v-model="StockMovement[form.id]"
          :type="form.type"
          :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
          :required="form.isRequired"
        ></v-text-field>
      </v-flex>
      <!-- type select -->
      <v-flex v-if="form.type === 'select'">
        <v-select
          :label="form.label"
          v-model="StockMovement[form.id]"
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
          v-model="StockMovement[form.id]"
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
          :return-value.sync="StockMovement[form.id]"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="StockMovement[form.id]"
            :label="form.label"
            readonly
          ></v-text-field>
          <v-date-picker v-model="StockMovement[form.id]" @input="$refs.menu2[index - 1].save(StockMovement[form.id])"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout> 
    
      <FormDialogWarehouse/>
   
      <FormDialogProduct/>
   
      <FormDialogUnit/>
   
  </v-container>  
</template>
<script>
import FormDialogWarehouse from '@/components/warehouse/FormDialog'
import FormDialogProduct from '@/components/product/FormDialog'
import FormDialogUnit from '@/components/unit/FormDialog'

export default {
  props: ['StockMovement'],
  components: {
  FormDialogWarehouse,
  FormDialogProduct,
  FormDialogUnit
  
  },
  data () {
    return {
    }
  },
  computed: {
    forms () {
      return [
      
      {"type":"text","id":"StockMovementCode","label":"Stock Movement Code","isRequired":true},
      
      {"type":"datetime","id":"Date","label":"Date","isRequired":true,"modal":false},
      
      {"type":"text","id":"WarehouseName","label":"Warehouse Name","isRequired":true},
      
      {"type":"text","id":"ProductName","label":"Product Name","isRequired":true},
      
      {"type":"text","id":"UnitName","label":"Unit Name","isRequired":false},
      
      {"type":"text","id":"RefDocId","label":"Ref Doc Id","isRequired":false},
      
      {"type":"text","id":"RefDocNo","label":"Ref Doc No","isRequired":false},
      
      {"type":"text","id":"Description","label":"Description","isRequired":false},
      
      {"type": 'select', "id": 'WarehouseId', "label": 'Warehouse',"isRequired": true,"data": this.$store.state.warehouse.warehouses,buttonAdd:true,dialogAction:this.showDialogWarehouse},
      
      {"type": 'select', "id": 'ProductId', "label": 'Product',"isRequired": true,"data": this.$store.state.product.products,buttonAdd:true,dialogAction:this.showDialogProduct},
      
      {"type": 'select', "id": 'UnitId', "label": 'Unit',"isRequired": true,"data": this.$store.state.unit.units,buttonAdd:true,dialogAction:this.showDialogUnit},
      
      ]
    }
  },
  methods:{
    
      showDialogWarehouse(){
         this.$store.state.warehouse.dialogState=true
      },
    
      showDialogProduct(){
         this.$store.state.product.dialogState=true
      },
    
      showDialogUnit(){
         this.$store.state.unit.dialogState=true
      }
    
  },
   created(){
    
      this.$store.dispatch('GET_WAREHOUSE_OF_STOCKMOVEMENT')
    
      this.$store.dispatch('GET_PRODUCT_OF_STOCKMOVEMENT')
    
      this.$store.dispatch('GET_UNIT_OF_STOCKMOVEMENT')
    
    
    this.$store.dispatch('GET_WAREHOUSE_OF_STOCKMOVEMENT')
    
    this.$store.dispatch('GET_PRODUCT_OF_STOCKMOVEMENT')
    
    this.$store.dispatch('GET_UNIT_OF_STOCKMOVEMENT')
    
  }
}
</script>
