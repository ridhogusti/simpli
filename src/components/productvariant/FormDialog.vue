<template>
<v-layout row justify-center v-if="$store.state.productvariant.dialogState">
    <v-form ref="fProductVariant">
    <v-dialog v-model="$store.state.productvariant.dialogState" scrollable max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title">Add ProductVariant</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0" style="height: 450px;">
          <v-container grid-list-md>
            <v-layout row v-for="(form, index) in forms" :key="form.label">
            <!-- type text / string -->
            <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
                <v-text-field
                :label="form.label"
                v-model="productvariant[form.id]"
                :type="form.type"
                :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                :required="form.isRequired"
                ></v-text-field>
            </v-flex>
            <!-- type select -->
            <v-flex v-if="form.type === 'select'">
                <v-select
                :label="form.label"
                v-model="productvariant[form.id]"
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
                v-model="productvariant[form.id]"
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
                :return-value.sync="productvariant[form.id]"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                    slot="activator"
                    v-model="productvariant[form.id]"
                    :label="form.label"
                    readonly
                    :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                    :required="form.isRequired"
                ></v-text-field>
                <v-date-picker v-model="productvariant[form.id]" @input="$refs.menu2[index - 1].save(productvariant[form.id])"></v-date-picker>
                </v-menu>
            </v-flex>
            </v-layout> 
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="closeProductVariant">Close</v-btn>
          <v-btn class="primary" @click.native="saveProductVariant">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
    </v-layout>
</template>

<script>

export default {
  data(){
    return {
        productvariant:{}
    }
  },
  components:{
    
  },
  methods:{
      closeProductVariant(){
          this.$refs.fProductVariant.reset()
          this.$store.state.productvariant.dialogState = false
      },
     saveProductVariant(){
       if (this.$refs.fProductVariant.validate()){
        this.$store.dispatch('createProductVariant', this.productvariant)
        .then((result) => {
          this.closeProductVariant()
        })
      }
    }
  },
  computed: {
   forms () {
      return [
      
      {"type":"text","id":"Name","label":"Name","isRequired":false},
      
      ]
    }
  },
  created(){
      
     
  }
}
</script>
