<template>
  <v-container fluid>

    <v-layout row v-for="(form, index) in forms" :key="form.label">
      <!-- type text / string -->
      <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
        <v-text-field
          :label="form.label"
          v-model="employee[form.id]"
          :type="form.type"
          :rules="[v => !!v || form.label + ' is required.']"
          :required="form.isRequired"
        ></v-text-field>
      </v-flex>

      <!-- type select -->
      <v-flex v-if="form.type === 'select'">
        <v-select
          :label="form.label"
          v-model="employee[form.id]"
          :items="form.data"
          item-text="Name"
          item-value="Id"
          :rules="[v => !!v || form.label + ' is required.']"
          :required="form.isRequired"
          autocomplete
        ></v-select>
      </v-flex>

      <!-- type radio -->
      <v-flex v-if="form.type === 'radio'">
        <v-radio-group
          :label="form.label"
          v-model="employee[form.id]"
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
          :return-value.sync="employee[form.id]"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="employee[form.id]"
            :label="form.label"
            readonly
          ></v-text-field>
          <v-date-picker v-model="employee[form.id]" @input="$refs.menu2[index - 1].save(employee[form.id])"></v-date-picker>

        </v-menu>
      </v-flex>
    </v-layout> 

  </v-container>  
</template>

<script>
export default {
  props: ['employee'],
  computed: {
    forms () {
      return [
        {
          type: 'text', 
          id: 'Name', 
          label: 'Name', 
          isRequired: true
        },
        {
          type: 'datetime', 
          id: 'DateOfBirth', 
          label: 'Date Of Birth', 
          isRequired: true,
          modal: false
        },
        {
          type: 'text', 
          id: 'PlaceOfBirth', 
          label: 'Place Of Birth', 
          isRequired: true
        },
        {
          type: 'text', 
          id: 'Address', 
          label: 'Address', 
          isRequired: true
        },
        {
          type: 'select', 
          id: 'Gender', 
          label: 'Gender', 
          isRequired: false, 
          data: this.$store.getters.getGender
        },
        {
          type: 'radio', 
          id: 'Status', 
          label: 'Status', 
          isRequired: false, 
          data: this.$store.getters.getStatus
        }
      ]
    }
  }
}
</script>
