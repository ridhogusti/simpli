<template>
  <div>
  <v-layout row v-for="form in forms" :key="form.label">
    <!-- form text/string -->
    <v-flex xs12 sm6 offset-sm3 v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
      <v-text-field
        :label="form.label"
        v-model="account[form.id]"
        :type="form.type"
        :rules="[v => !!v || $t('Required', {'label': form.label})]"
        :required="form.isRequired"
      ></v-text-field>
    </v-flex>

    <!-- form select -->
    <v-flex xs12 sm6 offset-sm3 v-if="form.type === 'select'">
      <v-select
        :label="form.label"
        v-model="account[form.id]"
        :items="form.data"
        item-text="Name"
        item-value="Id"
        :rules="[v => !!v || $t('Required', {'label': form.label})]"
        :required="form.isRequired"
        autocomplete
      ></v-select>
    </v-flex>
    <v-flex v-if="form.buttonAdd">
      <v-btn class="success" fab small="" 
      @click.stop="form.dialogAction">
        <v-icon>add</v-icon>
      </v-btn>
    </v-flex>

  </v-layout> 
    <FormDialogEmployee/>
</div>
</template>

<script>
import FormEmployee from '@/components/employee/Form'
import { GET_EMPLOYEES_NO_ACCOUNT, CREATE_EMPLOYEE,CREATE_ACCOUNT, GET_ROLEGROUP_OF_ACCOUNT } from '@/store/actions.type'
import FormDialogEmployee from '@/components/employee/FormDialog'

export default {
  props: ['account'],
  components: {
    FormEmployee,
    FormDialogEmployee
  },
  data () {
    return {
      dialog: false,
      employee: {}
    }
  },
  computed: {
    forms () {
      return [
        {
          type: 'text', 
          id: 'UserName', 
          label: 'Username', 
          isRequired: true
        },
        {
          type: 'email', 
          id: 'Email', 
          label: 'Email', 
          isRequired: true
        },
        {
          type: 'select', 
          id: 'EmployeeId', 
          label: 'Employee', 
          isRequired: false,
          data: this.$store.state.employee.employees,
          dialogAction:this.showDialogEmployee,
          buttonAdd: true
        },
        {
          type: 'select', 
          id: 'RoleGroupId', 
          label: 'Role Group', 
          isRequired: false, 
          data: this.$store.getters.getRoleGroupOfAccount
        },
        {
          type: 'password', 
          id: 'Password', 
          label: 'Password', 
          isRequired: true
        },
        {
          type: 'text', 
          id: 'Pin', 
          label: 'Pin', 
          isRequired: true
        },
      ]
    }
  },
  methods: {
       showDialogEmployee(){
         this.$store.state.employee.dialogState=true
      },
      cancel () {
      this.$refs.form.reset()
    },
    save () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch(CREATE_ACCOUNT, this.account)
        .then((result) => {
          this.$router.push({path: '/account'})  
        })
      }
    },
    getEmployees () {
      let param = ''
      if (this.$route.params.id) {
        param = { hasUser: this.$route.params.id }
      }
      this.$store.dispatch(GET_EMPLOYEES_NO_ACCOUNT, param)    
    },
    getRoleGroups () {
      this.$store.dispatch(GET_ROLEGROUP_OF_ACCOUNT)
    },
    saveEmployee () {
      if (this.$refs.fEmployee.validate()){
        this.$store.dispatch(CREATE_EMPLOYEE, this.employee)
        .then((result) => {
          this.$store.state.employee.employees.push(result.data)

          this.closeEmployee()
        })
      }
    },
    closeEmployee () {
      this.$refs.fEmployee.reset()
      this.dialog = false
    }
  },
  mounted () {
    this.getEmployees()
    this.getRoleGroups()
  },
  created(){
    this.$store.dispatch('getEmployeesNoAccount')
    console.log(this.$store.state.employee)

  }
}
</script>
