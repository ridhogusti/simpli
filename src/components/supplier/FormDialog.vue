<template>
  <v-layout row justify-center v-if="$store.state.supplier.dialogState">
    <v-form ref="fSupplier">
      <v-dialog class="dialog_modal" v-model="$store.state.supplier.dialogState" scrollable max-width="500px">
        <v-card class="card_dialog">
          <v-card-title class="headerModal">
            <v-layout row wrap>
              <v-flex xs2> </v-flex>
              <v-flex xs8 class="titleModal">
                Add New Supplier
              </v-flex>
              <v-flex xs2>
                <v-btn @click.native="closeSupplier" style="margin: -15px 0px -19px 0px !important" flat icon color="white">
                  <img src="../../assets/img/close-button-icon.png" style="width: 21px; height: 21px"></img>
                </v-btn>
                <div class="spanIcon">close</div>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0" style="height: 100%;">
            <v-container grid-list-md>
              <v-layout text-xs-center row v-for="(form, index) in forms" :key="form.label">
                <!-- type text / string -->
                <v-flex xs12 v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
                  <v-layout row wrap>
  
                    <v-flex xs2> </v-flex>
                    <v-flex xs8>
                      <v-text-field class="inputDialog" solo prepend-icon="place" :label="form.label" v-model="supplier[form.id]" :type="form.type" :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]" :required="form.isRequired"></v-text-field>
                    </v-flex>
                    <v-flex xs2> </v-flex>
                  </v-layout>
  
                </v-flex>
                <!-- type select -->
                <v-flex v-if="form.type === 'select'">
                  <v-select :label="form.label" v-model="supplier[form.id]" :items="form.data" item-text="Name" item-value="Id" autocomplete></v-select>
                </v-flex>
                <!-- type radio -->
                <v-flex v-if="form.type === 'radio'">
                  <v-radio-group :label="form.label" v-model="supplier[form.id]" row>
                    <v-radio v-for="item in form.data" :key="item.Id" :label="item.Name" :value="item.Id"></v-radio>
                  </v-radio-group>
                </v-flex>
                <!-- type datetime -->
                <v-flex v-if="form.type === 'datetime'">
                  <v-menu ref="menu2" :close-on-content-click="false" :v-model="form.modal" :nudge-right="40" :return-value.sync="supplier[form.id]" lazy transition="scale-transition" offset-y full-width min-width="290px">
                    <v-text-field slot="activator" v-model="supplier[form.id]" :label="form.label" readonly :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]" :required="form.isRequired"></v-text-field>
                    <v-date-picker v-model="supplier[form.id]" @input="$refs.menu2[index - 1].save(supplier[form.id])"></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-container>
  
            <hr class="hrDialog">
            <div class="text-xs-center">
              <v-btn round color="success" class="btnSave" @click.native="saveSupplier" dark>OK</v-btn>
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

<script>
  // import FormDialogSupplier from '@/components/supplier/FormDialog'
  
  export default {
    data() {
      return {
        supplier: {}
      }
    },
    components: {
  
      // FormDialogSupplier
  
    },
    methods: {
      closeSupplier() {
        this.$refs.fSupplier.reset()
        this.$store.state.supplier.dialogState = false
      },
      saveSupplier() {
        if (this.$refs.fSupplier.validate()) {
          this.$store.dispatch('createSupplier', this.supplier)
            .then((result) => {
              this.closeSupplier()
            })
        }
      }
    },
    computed: {
      forms() {
        return [
  
          // {"type":"text","id":"Name","label":"Name","isRequired":false},
  
          // {"type":"text","id":"Description","label":"Description","isRequired":false},
  
          // {"type": 'select', "id": 'WarehouseTypeId', "label": 'Warehouse Type',"isRequired": true,"data": this.$store.state.supplier.suppliers,buttonAdd:true, dialogAction:this.showDialogSupplier},
  
  
          {
            "type": "text",
            "id": "Company",
            "label": "Company",
            "isRequired": true
          },
  
          {
            "type": "text",
            "id": "ContactPerson",
            "label": "Contact Person",
            "isRequired": true
          },
  
          {
            "type": "text",
            "id": "Phone",
            "label": "Phone",
            "isRequired": true
          },
  
          {
            "type": "text",
            "id": "Address",
            "label": "Address",
            "isRequired": true
          },
  
          {
            "type": "text",
            "id": "Email",
            "label": "Email",
            "isRequired": true
          },
          {
            "type": 'select',
            "id": 'PaymentTermId',
            "label": 'Payment Term',
            "isRequired": true,
            "data": this.$store.state.paymentterm.paymentterms,
            buttonAdd: true,
            dialogAction: this.showDialogPaymentTerm
          },
  
        ]
      }
    },
    created() {
  
      // this.$store.dispatch('GET_WAREHOUSETYPE_OF_WAREHOUSE')
  
  
      // this.$store.dispatch('GET_WAREHOUSETYPE_OF_WAREHOUSE')
  
    }
  }
</script>
