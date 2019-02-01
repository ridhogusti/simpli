<template>
<v-layout row justify-center v-if="$store.state.employeeitemshift.dialogState">
    <v-form ref="fEmployeeItemShift">
    <v-dialog v-model="$store.state.employeeitemshift.dialogState" scrollable max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title">Add EmployeeItemShift</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0" style="height: 450px;">
          <v-container grid-list-md>
            <v-layout row v-for="(form, index) in forms" :key="form.label">
            <!-- type text / string -->
            <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
                <v-text-field
                :label="form.label"
                v-model="employeeitemshift[form.id]"
                :type="form.type"
                :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                :required="form.isRequired"
                ></v-text-field>
            </v-flex>
            <!-- type select -->
            <v-flex v-if="form.type === 'select'">
                <v-select
                :label="form.label"
                v-model="employeeitemshift[form.id]"
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
                v-model="employeeitemshift[form.id]"
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
                :return-value.sync="employeeitemshift[form.id]"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                    slot="activator"
                    v-model="employeeitemshift[form.id]"
                    :label="form.label"
                    readonly
                    :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                    :required="form.isRequired"
                ></v-text-field>
                <v-date-picker v-model="employeeitemshift[form.id]" @input="$refs.menu2[index - 1].save(employeeitemshift[form.id])"></v-date-picker>
                </v-menu>
            </v-flex>
            </v-layout> 
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="closeEmployeeItemShift">Close</v-btn>
          <v-btn class="primary" @click.native="saveEmployeeItemShift">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
    </v-layout>
</template>

<script>
import FormDialogEmployee from '@/components/employee/FormDialog'
import FormDialogShift from '@/components/shift/FormDialog'

export default {
  data(){
    return {
        employeeitemshift:{}
    }
  },
  components:{
    
    FormDialogEmployee,
    
    FormDialogShift
    
  },
  methods:{
      closeEmployeeItemShift(){
          this.$refs.fEmployeeItemShift.reset()
          this.$store.state.employeeitemshift.dialogState = false
      },
     saveEmployeeItemShift(){
       if (this.$refs.fEmployeeItemShift.validate()){
        this.$store.dispatch('createEmployeeItemShift', this.employeeitemshift)
        .then((result) => {
          this.closeEmployeeItemShift()
        })
      }
    }
  },
  computed: {
   forms () {
      return [
      
      {"type":"text","id":"EmployeeName","label":"Employee Name","isRequired":false},
      
      {"type":"datetime","id":"StartDate","label":"Start Date","isRequired":false,"modal":false},
      
      {"type":"datetime","id":"EndDate","label":"End Date","isRequired":false,"modal":false},
      
      {"type": 'select', "id": 'EmployeeId', "label": 'Employee',"isRequired": true,"data": this.$store.state.employee.employees,buttonAdd:true, dialogAction:this.showDialogEmployee},
      
      {"type": 'select', "id": 'ShiftId', "label": 'Shift',"isRequired": true,"data": this.$store.state.shift.shifts,buttonAdd:true, dialogAction:this.showDialogShift},
      
      ]
    }
  },
  created(){
      
      this.$store.dispatch('GET_EMPLOYEE_OF_EMPLOYEEITEMSHIFT')
    
      this.$store.dispatch('GET_SHIFT_OF_EMPLOYEEITEMSHIFT')
    
     
  }
}
</script>
