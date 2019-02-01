<template>
  <v-container fluid>
    <v-layout row v-for="(form, index) in forms" :key="form.label">
      <!-- type text / string -->
      <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
        <v-text-field
          :label="form.label"
          v-model="Order[form.id]"
          :type="form.type"
          :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
          :required="form.isRequired"
        ></v-text-field>
      </v-flex>
      <!-- type select -->
      <v-flex v-if="form.type === 'select'">
        <v-select
          :label="form.label"
          v-model="Order[form.id]"
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
          v-model="Order[form.id]"
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
          :return-value.sync="Order[form.id]"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="Order[form.id]"
            :label="form.label"
            readonly
          ></v-text-field>
          <v-date-picker v-model="Order[form.id]" @input="$refs.menu2[index - 1].save(Order[form.id])"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout> 
    
      <FormDialogEmployee/>
   
      <FormDialogMember/>
   
  </v-container>  
</template>
<script>
import FormDialogEmployee from '@/components/employee/FormDialog'
import FormDialogMember from '@/components/member/FormDialog'

export default {
  props: ['Order'],
  components: {
  FormDialogEmployee,
  FormDialogMember
  
  },
  data () {
    return {
    }
  },
  computed: {
    forms () {
      return [
      
      {"type":"text","id":"NumberOrder","label":"Number Order","isRequired":false},
      
      {"type":"text","id":"Note","label":"Note","isRequired":false},
      
      {"type": 'select', "id": 'EmployeeId', "label": 'Employee',"isRequired": true,"data": this.$store.state.employee.employees,buttonAdd:true,dialogAction:this.showDialogEmployee},
      
      {"type": 'select', "id": 'MemberId', "label": 'Member',"isRequired": true,"data": this.$store.state.member.members,buttonAdd:true,dialogAction:this.showDialogMember},
      
      ]
    }
  },
  methods:{
    
      showDialogEmployee(){
         this.$store.state.employee.dialogState=true
      },
    
      showDialogMember(){
         this.$store.state.member.dialogState=true
      }
    
  },
   created(){
    
      this.$store.dispatch('GET_EMPLOYEE_OF_ORDER')
    
      this.$store.dispatch('GET_MEMBER_OF_ORDER')
  
    
  }
}
</script>
