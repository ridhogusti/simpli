<template>
  <v-container fluid>
    <v-layout row v-for="(form, index) in forms" :key="form.label">
      <!-- type text / string -->
      <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
        <v-text-field
          class="input3"
          solo
          :label="form.label"
          v-model="Unit[form.id]"
          :type="form.type"
          :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
          :required="form.isRequired"
        ></v-text-field>
      </v-flex>
      <!-- type select -->
      <v-flex v-if="form.type === 'select'">
        <v-select
          :label="form.label"
          v-model="Unit[form.id]"
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
          v-model="Unit[form.id]"
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
          :return-value.sync="Unit[form.id]"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="Unit[form.id]"
            :label="form.label"
            readonly
          ></v-text-field>
          <v-date-picker v-model="Unit[form.id]" @input="$refs.menu2[index - 1].save(Unit[form.id])"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout> 
    
  </v-container>  
</template>

<style src="../purchase/test.css"></style>
<script>

export default {
  props: ['Unit'],
  components: {
  
  },
  data () {
    return {
    }
  },
  computed: {
    forms () {
      return [
      
      {"type":"text","id":"Name","label":"Name","isRequired":true},
      
      {"type":"text","id":"Description","label":"Description","isRequired":false},
      
      ]
    }
  },
  methods:{
    
  },
   created(){
    
    
  }
}
</script>
