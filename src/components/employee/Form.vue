<template>
  <v-container fluid>
    <v-layout row v-for="(form, index) in forms" :key="form.label">
      <!-- type text / string -->
      <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
        <v-text-field
          :label="form.label"
          v-model="Employee[form.id]"
          :type="form.type"
          :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
          :required="form.isRequired"
        ></v-text-field>
      </v-flex>
      <!-- type select -->
      <v-flex v-if="form.type === 'select'">
        <v-select
          :label="form.label"
          v-model="Employee[form.id]"
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
          v-model="Employee[form.id]"
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
          :return-value.sync="Employee[form.id]"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="Employee[form.id]"
            :label="form.label"
            readonly
          ></v-text-field>
          <v-date-picker v-model="Employee[form.id]" @input="$refs.menu2[index - 1].save(Employee[form.id])"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout> 
   
  </v-container>  
</template>
<script>

export default {
  props: ['Employee'],
  components: {
  
  },
  data () {
    return {
    }
  },
  computed: {
    forms () {
      return [
      
      {"type":"text","id":"Name","label":"Name","isRequired":false},
      
      {"type":"datetime","id":"DateOfBirth","label":"Date Of Birth","isRequired":false,"modal":false},
      
      {"type":"text","id":"PlaceOfBirth","label":"Place Of Birth","isRequired":false},
      
      {"type":"text","id":"Address","label":"Address","isRequired":false},
      
      {"type": 'select', "id": 'GenderId', "label": 'Gender',"data":this.$store.getters.getGenderOfEmployee,dialogAction:this.showDialogGender}
      
      ]
    }
  },
  methods:{
    
  },
   created(){
    this.$store.dispatch('GET_GENDER_OF_EMPLOYEE')
  }
}
</script>
