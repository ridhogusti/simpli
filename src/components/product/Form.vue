<template>
  <v-container class="body" fluid>
    <div class="title">
      {{ Title }}
    </div>
    <br>
    <v-card class="retangle1">
      <v-card-text>
        <br>
        <v-layout row wrap v-for="(form, index) in forms" :key="index">
          <v-flex xs2> </v-flex>
          <v-flex xs2 v-if="form.type === 'text'">
            <v-subheader class="subheader1">{{ form.label }}</v-subheader>
          </v-flex>
          <v-flex xs4 v-if="form.type === 'text'">
            <v-text-field :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]" :required="form.isRequired" solo class="input3" @keyup="setName(form.label)" name="name" v-model="Product[form.id]" :label="form.label" id="id"></v-text-field>
          </v-flex>
          <v-flex v-if="form.isRequired && form.type === 'text'" class="required" lg1>
            *
          </v-flex>
          <v-flex xs2 v-if="form.type === 'checkbox'">
            <v-subheader class="subheader1">{{ form.label }}</v-subheader>
          </v-flex>
          <v-flex xs4 v-if="form.type === 'checkbox'">
            <v-checkbox :required="form.isRequired" :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]" v-model="Product[form.id]" color="primary" :value="Product.IsAllowMinus" hide-details></v-checkbox>
          </v-flex>
        </v-layout>
        <!-- <v-layout  row wrap>
           <v-flex xs2> </v-flex>
            <v-flex xs2>
            <v-subheader class="subheader1">Is Bought</v-subheader>
          </v-flex>
           <v-flex xs4>
            <v-checkbox :required="true"  color="primary"  hide-details></v-checkbox>
          </v-flex>
        </v-layout> -->
        <!-- <v-layout row wrap>
                              <v-flex xs2> </v-flex>
                              <v-flex xs2>
                              <v-subheader class="subheader1">Allow Minus</v-subheader>
                            </v-flex>
                            <v-flex xs4>
                              <v-checkbox v-model="Product.IsAllowMinus" color="primary" :value="Product.IsAllowMinus" hide-details></v-checkbox>
                            </v-flex>
                          </v-layout> -->
  
        <hr class="hr1">
  
        <v-layout justify-center row wrap>
          <v-flex v-for="(form, index) in forms" :key="index" lg2 v-if="form.type === 'select' && !(forms.length-1 == index)">
            <v-subheader justify-center class="subheader1 subheader1Center">{{ form.label }}</v-subheader>
          </v-flex>
        </v-layout>
  
        <v-layout justify-center row wrap>
          <v-flex v-for="(form, index) in forms" xs2 v-if="form.type === 'select' && !(forms.length-1 == index)" :key="index" >
            <v-layout row wrap>
              <v-flex lg11>
                <v-select @change="setName(form.label)" :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]" :required="form.isRequired" text-xs-center :menu-props="{contentClass:'listPurchase'}" class="select2required" :label="form.label" append-icon="expand_more"
                  :items="form.data" item-value="Id" solo item-text="Name" v-model="Product[form.id]">
  
                  <v-list-tile slot="prepend-item">
                    <v-list-tile-content>
                      <v-btn block @click="form.dialogAction" class="btnadd" color="primary" outline dark>
                        <v-icon dark>add_circle_outline</v-icon> &nbsp New</v-btn>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-select>
              </v-flex>
              <v-flex v-if="form.isRequired && form.type === 'select'" class="required" lg1>
                *
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  
    <br>
  
    <div class="title">
      Unit
    </div>
    <br>
    <div v-for="(item, index) in Product.ListProductUnit" :key="index">

      <v-card class="retangle1">
        <v-card-text>
          <v-layout row wrap>
            <v-flex lg5>
              <v-layout row wrap>
                <v-flex lg7>
                  <v-subheader class="subheader1 subheader1Center">Unit</v-subheader>
                  <v-select label="Unit" solo append-icon="expand_more" :menu-props="{contentClass:'listPurchase'}" v-model="Product.ListProductUnit[index].UnitId" class="select2" v-on:change="setUnit(index)" :items="$store.state.unit.units" item-text="Name" item-value="UnitId">
                    <v-list-tile slot="prepend-item">
                      <v-list-tile-content>
                        <v-btn block @click="showDialogUnit" class="btnadd" color="primary" outline dark>
                        <v-icon dark>add_circle_outline</v-icon> &nbsp New</v-btn>
                        <!-- <v-btn block class="white--text btnnew" @click.stop="showDialogUnit">
                          <v-icon dark>add_circle_outline</v-icon> New -->
                        </v-btn>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-select>
                </v-flex>
                <v-flex lg5>
                  <v-subheader class="subheader1 subheader1Center">Conversion</v-subheader>
                  <v-subheader v-if="index === 0" class="subheader1 subheader1Center">(Base Unit)</v-subheader>
                  <v-text-field v-else solo class="input1" v-model="Product.ListProductUnit[index].Conversion" type="number"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex>
                    <v-card-text >
                      <v-data-table
                        :headers="headersItemPurchaseSuplier"
                        :items="item.ListPurchaseInvoiceSuplier"
                        :pagination="pagination"
                        class="elevation-1"
                        hide-actions
                        >
                        <template slot="items" slot-scope="props">
                            <td> {{ props.item.SupplierName }} </td>
                            <td class="text-xs-right"> {{ props.item.LastPurchase | currency("")}}</td>
                          </template>
                      </v-data-table>
                    </v-card-text>
                </v-flex>
                <!-- <v-flex lg7>
                  <v-subheader class="subheader1 subheader1Center">Supplier</v-subheader>

                </v-flex>
                <v-flex lg5>
                  <v-subheader class="subheader1 subheader1Center">Last Purchase</v-subheader>
                </v-flex> -->
              </v-layout>
              
            </v-flex>
            <v-flex lg7>
              <v-layout row wrap>
                <v-flex lg4>
                  <v-subheader class="subheader1 subheader1Center">Barcode</v-subheader>
                  <v-text-field solo class="input1" v-model="Product.ListProductUnit[index].Barcode" type="text"></v-text-field>
                </v-flex>
                <v-flex lg8>
                  <v-subheader class="subheader1 subheader1Center">Name</v-subheader>
                  <v-text-field solo class="input1" v-model="Product.ListProductUnit[index].Name" type="text"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex lg4>
                  <v-subheader class="subheader1 subheader1Center">Cost Price</v-subheader>
                  <v-text-field solo class="input1" v-model="Product.ListProductUnit[index].CostPrice" type="text"></v-text-field>
                </v-flex>
                <v-flex lg8>
                  <v-subheader class="subheader1 subheader1Center">Receipt Name</v-subheader>
                  <v-text-field solo class="input1" v-model="Product.ListProductUnit[index].ReceiptName" type="text"></v-text-field>
                </v-flex>
              </v-layout>
              <br>
              <hr class="hr1">
              <v-layout row wrap>
                <v-flex lg6>
                  <v-subheader class="subheader1 subheader1Center">Dimensions</v-subheader>
                  <v-layout row wrap>
                    <v-flex lg4>
                      <v-text-field suffix="cm" solo class="input2" v-model="Product.ListProductUnit[index].Length" label="Length" type="text"></v-text-field>
                    </v-flex>
                    <v-flex lg4>
                      <v-text-field suffix="cm" solo class="input2" v-model="Product.ListProductUnit[index].Width" label="Width" type="text"></v-text-field>
                    </v-flex>
                    <v-flex lg4>
                      <v-text-field suffix="cm" solo class="input2" v-model="Product.ListProductUnit[index].Height" label="Height" type="text"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex lg3>
                  <v-subheader class="subheader1 subheader1Center">Weight</v-subheader>
                  <v-layout row wrap>
                    <v-flex lg12>
                      <v-text-field suffix="kg" solo class="input2" v-model="Product.ListProductUnit[index].Weight" label="Weight" type="text"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex lg3>
                  <v-subheader class="subheader1 subheader1Center">Volume</v-subheader>
                  <v-layout row wrap>
                    <v-flex lg12>
                      <v-text-field suffix="ml" solo class="input2" v-model="Product.ListProductUnit[index].Volume" label="Volume" type="text"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <br>
    </div>
    <br>
   
    <v-card class="retangle1">
      <v-card-text>
        <br>
        <v-data-table :headers="headers" :items="Product.ListProductUnit" hide-actions class="elevation-1 tablePurchase">
          <tr slot="items" slot-scope="props">
            <td class="text-xs-center">
              {{ props.index + 1 }}
            </td>
            <td>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select label="Unit" solo append-icon="expand_more" :menu-props="{contentClass:'listPurchase'}" v-model="Product.ListProductUnit[props.index].UnitId" class="select2" v-on:change="setUnit(props.index)" :items="$store.state.unit.units" item-text="Name"
                    item-value="UnitId">
                    <v-list-tile slot="prepend-item">
                      <v-list-tile-content>
                        <v-btn block class="white--text btnnew" @click.stop="showDialogUnit">
                          <v-icon dark>add_circle_outline</v-icon> New
                        </v-btn>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-select>
                </v-flex>
              </v-layout>
            </td>
            <td v-if="props.index === 0">
              <v-subheader class="subheader1">(Base Unit)</v-subheader>
            </td>
            <td v-else>
              <v-text-field solo class="input1" v-model="Product.ListProductUnit[props.index].Conversion" type="number"></v-text-field>
            </td>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field solo class="input1" v-model="Product.ListProductUnit[props.index].Barcode" type="text"></v-text-field>
              </v-flex>
            </v-layout>
            <td>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field solo class="input1" v-model="Product.ListProductUnit[props.index].Name" type="text"></v-text-field>
                </v-flex>
              </v-layout>
            </td>
            <td>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field solo class="input1" v-model="Product.ListProductUnit[props.index].ReceiptName" type="text"></v-text-field>
                </v-flex>
              </v-layout>
            </td>
          </tr>
        </v-data-table>
      </v-card-text>
    </v-card>
       <br>
     <div class="title">
      Supplier
    </div>
    <br>
      <v-card class="retangle1">
      <v-card-text>
        <v-layout justify-center row wrap>
          <v-flex>
            <form ref="selectionSupplier">
            <v-select @change="selectionSupplier"
              v-model="supplier"
              :rules="forms[11].isRequired?[v => !!v || forms[11].label + ' is required.']:[]" 
              :required="forms[11].isRequired" 
              text-xs-center :menu-props="{contentClass:'listPurchase'}" class="select2required" :label="forms[11].label" 
              append-icon="expand_more"
              :items="forms[11].data" item-value="Id" solo item-text="Company">
                  <v-list-tile slot="prepend-item">
                    <v-list-tile-content>
                      <v-btn block @click="forms[11].dialogAction" class="btnadd" color="primary" outline dark>
                        <v-icon dark>add_circle_outline</v-icon> &nbsp New</v-btn>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-select>
            </form>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex v-for="(item, i) in Product.ListProductSupplierItem" :key="item+i">
            <v-chip close color="primary white--text" 
            @input="()=>removeItemSupplier(item.SupplierId, i)">{{getSupplierName(item.SupplierId).Company}}</v-chip>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
    
    <v-dialog v-model="dialogAddSupplier" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
         Tambah Supplier
        </v-card-title>
        <v-card-text>
          Apakah Anda Ingin Menambahkan Supplier ?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="addSupplier">
            ADD
          </v-btn>
          <v-btn color="error" @click="dialogAddSupplier = false">
           Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <FormDialogProductCategory/>
    <FormDialogBrand/>
    <FormDialogDepartment/>
    <FormDialogTax/>
    <FormDialogUnit/>
  </v-container>
</template>

<style src="../purchase/test.css">
  
</style>

<script>
  import FormDialogProductCategory from "@/components/productcategory/FormDialog";
  import FormDialogBrand from "@/components/brand/FormDialog";
  import FormDialogDepartment from "@/components/department/FormDialog";
  import FormDialogTax from "@/components/tax/FormDialog";
  import FormDialogUnit from "@/components/unit/FormDialog";
  import _ from 'underscore' 
  import {
    GET_UNIT,
    GET_BRAND,
    GET_SUPPLIERS
  } from "@/store/actions.type";
  
  export default {
    props: ["Product", "Title"],
    components: {
      FormDialogProductCategory,
      FormDialogBrand,
      FormDialogDepartment,
      FormDialogTax,
      FormDialogUnit
    },
    data() {
      return {
        loading: false,
        unit1: "",
        unit2: "",
        unit3: "",
        disabledUnit1: false,
        disabledUnit2: true,
        disabledUnit3: true,
        brand: "",
        rules: {
          required: value => !!value || 'Required.',
        },
        headers: [{
            text: "No.",
            align: "center",
            sortable: false,
            value: "no",
            width: "10%"
          },
          {
            text: "Unit",
            value: "unit",
            align: "center",
            width: "30%"
          },
          {
            text: "Conversion",
            align: "center",
            width: "5%",
            value: "conversion"
          },
          {
            text: "Barcode",
            align: "center",
            value: "barcode",
            width: "20%"
          },
          {
            text: "Name",
            align: "center",
            value: "name",
            width: "20%"
          },
          {
            text: "Receipt Name",
            align: "center",
            value: "receiptname",
            width: "20%"
          }
        ],
         headersAddSupplierTable: [
           {
            text: "Supplier",
            align: "center",
            sortable: false,
            value: "Id",
            width: "10%"
          }
        ],
        headersItemPurchaseSuplier: [
           {
            text: "Supplier",
            align: "center",
            sortable: false,
            value: "Id",
            width: "10%"
          },
          {
            text: "Last Purchase",
            align: "center",
            sortable: false,
            value: "Id",
            width: "10%"
          }
        ],
        supplier:null,
        listSupplier:[],
        dialogAddSupplier:false
      };
    },
    computed: {
      forms() {
        return [{
            type: "text",
            id: "Name",
            label: "Name",
            isRequired: true
          },
  
          {
            type: "text",
            id: "SKU",
            label: "SKU",
            isRequired: true
          },
  
          {
            type: "text",
            id: "Description",
            label: "Description",
            isRequired: true
          },
          {
            type: "text",
            id: "Size",
            label: "Size",
            isRequired: true
          },
          
          {
            type: "checkbox",
            id: "IsAllowMinus",
            label: "Is Allow Minus"
          },
          {
            type: "checkbox",
            id: "IsBought",
            label: "Is Bought"
          },
          {
            type: "checkbox",
            id: "IsSold",
            label: "Is Sold"
          },
          {
            type: "select",
            id: "ProductCategoryId",
            label: "Product Category",
            isRequired: true,
            data: this.$store.state.productcategory.productcategorys,
            buttonAdd: true,
            dialogAction: this.showDialogProductCategory
          },
  
          {
            type: "select",
            id: "BrandId",
            label: "Brand",
            isRequired: true,
            data: this.$store.state.brand.brands,
            buttonAdd: true,
            dialogAction: this.showDialogBrand
          },
  
          {
            type: "select",
            id: "DepartmentId",
            label: "Department",
            isRequired: true,
            data: this.$store.state.department.departments,
            buttonAdd: true,
            dialogAction: this.showDialogDepartment
          },
  
          {
            type: "select",
            id: "TaxId",
            label: "Tax",
            isRequired: true,
            data: this.$store.state.tax.taxs,
            buttonAdd: true,
            dialogAction: this.showDialogTax
          },
          {
            type: "select",
            id: "SupplierId",
            label: "Supplier",
            isRequired: true,
            data: this.$store.state.supplier.suppliers,
            buttonAdd: true,
            // dialogAction: this.showDialogTax
          }
          
          // {"type": 'select', "id": 'UnitId', "label": 'Unit',"isRequired": true,"data": this.$store.state.unit.units,buttonAdd:true,dialogAction:this.showDialogUnit},
        ];
      }
    },
    methods: {
      setName(value) {
        var receiptName = "";
        if (value === "Brand") {
          this.setName2(value);
        }
        if (value === "Size") {
          for (var i = 0; i < this.Product.ListProductUnit.length; i++) {
            this.Product.ListProductUnit[i].Name =
              this.brand +
              " " +
              this.Product.ListProductUnit[i].UnitName +
              " " +
              this.Product.Size;
            receiptName =
              this.brand +
              " " +
              this.Product.ListProductUnit[i].UnitName +
              " " +
              this.Product.Size;
            if (receiptName.length > 40) {
              receiptName = receiptName.substring(0, 42) + "...";
            }
  
            this.Product.ListProductUnit[i].ReceiptName = receiptName;
          }
        }
        console.log(this.Product.BrandId, "aeu");
        if (value === 0 || value === 1 || value === 2) {
          console.log(this.Product.ListProductUnit[value].UnitName);
          this.Product.ListProductUnit[value].Name =
            this.brand +
            " " +
            this.Product.ListProductUnit[value].UnitName +
            " " +
            this.Product.Size;
          receiptName =
            this.brand +
            " " +
            this.Product.ListProductUnit[value].UnitName +
            " " +
            this.Product.Size;
          if (receiptName.length > 40) {
            receiptName = receiptName.substring(0, 42) + "...";
          }
          this.Product.ListProductUnit[value].ReceiptName = receiptName;
        }
      },
      setName2(value) {
        var receiptName = "";
        var self = this;
        if (value === "Brand") {
          setTimeout(function() {
            self.$store.dispatch(GET_BRAND, self.Product.BrandId).then(result => {
              self.brand = result.data.Name;
              for (var i = 0; i < self.Product.ListProductUnit.length; i++) {
                console.log(self.Product.ListProductUnit[i].UnitName);
                self.Product.ListProductUnit[i].Name =
                  result.data.Name +
                  " " +
                  self.Product.ListProductUnit[i].UnitName +
                  self.Product.Size;
                receiptName =
                  self.brand +
                  " " +
                  self.Product.ListProductUnit[i].UnitName +
                  " " +
                  self.Product.Size;
                if (receiptName.length > 40) {
                  receiptName = receiptName.substring(0, 42) + "...";
                }
                self.Product.ListProductUnit[i].ReceiptName = receiptName;
              }
            });
          }, 100);
        }
      },
      setUnit(index) {
        console.log(index, "asonteuh");
        var self = this;
        var value = "";
        setTimeout(function() {
          self.$store
            .dispatch(GET_UNIT, self.Product.ListProductUnit[index].UnitId)
            .then(result => {
              (self.Product.ListProductUnit[index].Name = self.Product.Name),
              (self.Product.ListProductUnit[index].Description =
                self.Product.Description),
              (self.Product.ListProductUnit[index].Image = ""),
              (self.Product.ListProductUnit[index].UnitName = result.data.Name);
  
              self.setName(index);
  
              console.log(result, "asnoaeuteuh");
              if (index == 0) {
                self.Product.UnitId = result.data.UnitId;
              }
            });
        }, 100);
      },
      removeItemSupplier(item, index){
        let _listSupplier = _.reject(this.Product.ListProductSupplierItem, (o)=>{
          return o.SupplierId ==item
        });
         this.Product.ListProductSupplierItem = _listSupplier
      },
      selectionSupplier(obj){
          this.dialogAddSupplier = true
          this.$refs.selectionSupplier.reset()
      },
      addSupplier(){
          this.dialogAddSupplier = false
          this.Product.ListProductSupplierItem.push({SupplierId:this.supplier})
      },
      getSupplierName(id){
        const _name =  _.find(this.$store.state.supplier.suppliers, (o)=>{
              return o.Id == id
          })
          return _name
      },
      showDialogProductCategory() {
        this.$store.state.productcategory.dialogState = true;
      },
  
      showDialogBrand() {
        this.$store.state.brand.dialogState = true;
      },
  
      showDialogDepartment() {
        this.$store.state.department.dialogState = true;
      },
  
      showDialogTax() {
        this.$store.state.tax.dialogState = true;
      },
  
      showDialogUnit() {
        this.$store.state.unit.dialogState = true;
      }
    },
    async created() {
      await this.$store.dispatch("GET_PRODUCTCATEGORY_OF_PRODUCT");
      await this.$store.dispatch("GET_BRAND_OF_PRODUCT");
      await this.$store.dispatch("GET_DEPARTMENT_OF_PRODUCT");
      await this.$store.dispatch("GET_TAX_OF_PRODUCT");
      await this.$store.dispatch("GET_UNIT_OF_PRODUCT");
      await this.$store.dispatch('GET_PAYMENTTERM_OF_SUPPLIER')
      await this.$store.dispatch(GET_SUPPLIERS)
    console.log(this.Product)

    }
  };
</script>
