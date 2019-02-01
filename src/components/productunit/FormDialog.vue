<template>
<v-layout row justify-center v-if="$store.state.productunit.dialogState">
    <v-form ref="fProductUnit">
    <v-dialog v-model="$store.state.productunit.dialogState" scrollable max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title">Add ProductUnit</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0" style="height: 450px;">
          <v-container grid-list-md>
            <v-layout row v-for="(form, index) in forms" :key="form.label">
            <!-- type text / string -->
            <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
                <v-text-field
                :label="form.label"
                v-model="productunit[form.id]"
                :type="form.type"
                :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                :required="form.isRequired"
                ></v-text-field>
            </v-flex>
            <!-- type select -->
            <v-flex v-if="form.type === 'select'">
                <v-select
                :label="form.label"
                v-model="productunit[form.id]"
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
                v-model="productunit[form.id]"
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
                :return-value.sync="productunit[form.id]"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                    slot="activator"
                    v-model="productunit[form.id]"
                    :label="form.label"
                    readonly
                    :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                    :required="form.isRequired"
                ></v-text-field>
                <v-date-picker v-model="productunit[form.id]" @input="$refs.menu2[index - 1].save(productunit[form.id])"></v-date-picker>
                </v-menu>
            </v-flex>
            </v-layout> 
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="closeProductUnit">Close</v-btn>
          <v-btn class="primary" @click.native="saveProductUnit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
    </v-layout>
</template>

<script>
import FormDialogProduct from '@/components/product/FormDialog'

export default {
  data(){
    return {
        productunit:{}
    }
  },
  components:{
    
    FormDialogProduct
    
  },
  methods:{
      closeProductUnit(){
          this.$refs.fProductUnit.reset()
          this.$store.state.productunit.dialogState = false
      },
     saveProductUnit(){
       if (this.$refs.fProductUnit.validate()){
        this.$store.dispatch('createProductUnit', this.productunit)
        .then((result) => {
          this.closeProductUnit()
        })
      }
    }
  },
  computed: {
   forms () {
      return [
      
      {"type":"text","id":"Name","label":"Name","isRequired":false},
      
      {"type":"text","id":"Description","label":"Description","isRequired":false},
      
      {"type":"text","id":"Image","label":"Image","isRequired":false},
      
      {"type":"text","id":"Barcode","label":"Barcode","isRequired":false},
      
      {"type": 'select', "id": 'ProductId', "label": 'Product',"isRequired": true,"data": this.$store.state.product.products,buttonAdd:true, dialogAction:this.showDialogProduct},
      
      ]
    }
  },
  created(){
      
      this.$store.dispatch('GET_PRODUCT_OF_PRODUCTUNIT')
    
     
    this.$store.dispatch('GET_PRODUCT_OF_PRODUCTUNIT')
    
  }
}
</script>
