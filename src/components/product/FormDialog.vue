<template>
  <v-layout row justify-center v-if="$store.state.product.dialogState">
    <v-form ref="fProduct">
      <v-dialog class="dialog_modal" v-model="$store.state.product.dialogState" scrollable max-width="500px">
        <v-card class="card_dialog">
          <v-card-title class="headerModal">
            <v-layout row wrap>
              <v-flex xs2> </v-flex>
              <v-flex xs8 class="titleModal">
                Add Product
              </v-flex>
              <v-flex xs2> 

                <v-btn @click.native="closeProduct" style="margin: -15px 0px -19px 0px !important" flat icon color="white">
                  <img src="../../assets/img/close-button-icon.png" style="width: 21px; height: 21px"></img>
                </v-btn>
                <div class="spanIcon">close</div>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0" style="height: 450px;">
            <v-container grid-list-md>
              <v-layout row v-for="(form, index) in forms" :key="form.label">
                <!-- type text / string -->
                <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
                  <v-layout row wrap>
                    <v-flex xs2> </v-flex>
                    <v-flex xs8>
                      <v-text-field
                      :label="form.label"
                      class="inputDialog"
                      solo
                      prepend-icon="place"
                      v-model="product[form.id]"
                      :type="form.type"
                      :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                      :required="form.isRequired"
                      ></v-text-field>

                    </v-flex>
                    <v-flex xs2> </v-flex>
                  </v-layout>
                </v-flex>
                <!-- type select -->
                <v-flex v-if="form.type === 'select'">
                  <v-layout row wrap>
                    <v-flex xs2> </v-flex>
                    <v-flex xs8>
                      <v-select
                      solo
                      class="selectDialog"
                      :label="form.label"
                      v-model="product[form.id]"
                      :items="form.data"
                      item-text="Name"
                      item-value="Id"
                      autocomplete
                      ></v-select>
                    </v-flex>
                    <v-flex xs2> </v-flex>
                  </v-layout>
                </v-flex>
                <!-- type radio -->
                <v-flex v-if="form.type === 'radio'">
                  <v-radio-group
                  :label="form.label"
                  v-model="product[form.id]"
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
                :return-value.sync="product[form.id]"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                slot="activator"
                v-model="product[form.id]"
                :label="form.label"
                readonly
                :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                :required="form.isRequired"
                ></v-text-field>
                <v-date-picker v-model="product[form.id]" @input="$refs.menu2[index - 1].save(product[form.id])"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout> 
        </v-container>

        <hr class="hrDialog">
        <div class="text-xs-center">
          <v-btn round class="btnSave" color="success" @click.native="saveProduct">Save</v-btn>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-form>
</v-layout>
</template>

<style src="../purchase/test.css"></style>

<script>
import FormDialogProductCategory from '@/components/productcategory/FormDialog'
import FormDialogBrand from '@/components/brand/FormDialog'
import FormDialogDepartment from '@/components/department/FormDialog'
import FormDialogTax from '@/components/tax/FormDialog'
import FormDialogUnit from '@/components/unit/FormDialog'

export default {
  data(){
    return {
      product:{}
    }
  },
  components:{

    FormDialogProductCategory,
    
    FormDialogBrand,
    
    FormDialogDepartment,
    
    FormDialogTax,
    
    FormDialogUnit
    
  },
  methods:{
    closeProduct(){
      this.$refs.fProduct.reset()
      this.$store.state.product.dialogState = false
    },
    saveProduct(){
     if (this.$refs.fProduct.validate()){
      this.$store.dispatch('createProduct', this.product)
      .then((result) => {
        this.closeProduct()
      })
    }
  }
},
computed: {
 forms () {
  return [

  {"type":"text","id":"Name","label":"Name","isRequired":false},

  {"type":"text","id":"SKU","label":"SKU","isRequired":false},

  {"type":"text","id":"Description","label":"Description","isRequired":false},

  {"type":"text","id":"ReceiptName","label":"Receipt Name","isRequired":false},

  {"type":"text","id":"Size","label":"Size","isRequired":false},

  {"type": 'select', "id": 'ProductCategoryId', "label": 'Product Category',"isRequired": true,"data": this.$store.state.productcategory.productcategorys,buttonAdd:true, dialogAction:this.showDialogProductCategory},

  {"type": 'select', "id": 'BrandId', "label": 'Brand',"isRequired": true,"data": this.$store.state.brand.brands,buttonAdd:true, dialogAction:this.showDialogBrand},

  {"type": 'select', "id": 'DepartmentId', "label": 'Department',"isRequired": true,"data": this.$store.state.department.departments,buttonAdd:true, dialogAction:this.showDialogDepartment},

  {"type": 'select', "id": 'TaxId', "label": 'Tax',"isRequired": true,"data": this.$store.state.tax.taxs,buttonAdd:true, dialogAction:this.showDialogTax},

  {"type": 'select', "id": 'UnitId', "label": 'Unit',"isRequired": true,"data": this.$store.state.unit.units,buttonAdd:true, dialogAction:this.showDialogUnit},

  ]
}
},
created(){

  this.$store.dispatch('GET_PRODUCTCATEGORY_OF_PRODUCT')

  this.$store.dispatch('GET_BRAND_OF_PRODUCT')

  this.$store.dispatch('GET_DEPARTMENT_OF_PRODUCT')

  this.$store.dispatch('GET_TAX_OF_PRODUCT')

  this.$store.dispatch('GET_UNIT_OF_PRODUCT')


  this.$store.dispatch('GET_PRODUCTCATEGORY_OF_PRODUCT')

  this.$store.dispatch('GET_BRAND_OF_PRODUCT')

  this.$store.dispatch('GET_DEPARTMENT_OF_PRODUCT')

  this.$store.dispatch('GET_TAX_OF_PRODUCT')

  this.$store.dispatch('GET_UNIT_OF_PRODUCT')

}
}
</script>
