<template>
  <v-layout row justify-center v-if="$store.state.employee.dialogState">
    <v-form ref="fEmployee">
      <v-dialog class="dialog_modal" v-model="$store.state.employee.dialogState" scrollable max-width="500px">
        <v-card class="card_dialog">
          <v-card-title class="headerModal">
            <v-layout row wrap>
              <v-flex xs2> </v-flex>
              <v-flex xs8 class="titleModal">
                Add New Employee
              </v-flex>
              <v-flex xs2> 
                <v-btn @click.native="closeEmployee" style="margin: -15px 0px -19px 0px !important" flat icon color="white">
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
                      solo
                      class="inputDialog"
                      prepend-icon="place"
                      v-model="employee[form.id]"
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
                      v-model="employee[form.id]"
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

                <v-layout row wrap>
                  <v-flex xs2> </v-flex>
                  <v-flex xs8>
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
                    min-width="290px">
                    <v-text-field
                    solo
                    class="inputDialog"
                    slot="activator"
                    v-model="employee[form.id]"
                    :label="form.label"
                    readonly
                    :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                    :required="form.isRequired"
                    ></v-text-field>
                    <v-date-picker v-model="employee[form.id]" @input="$refs.menu2[index - 1].save(employee[form.id])"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs2> </v-flex>
              </v-layout>

            </v-flex>
          </v-layout> 
        </v-container>

        <hr class="hrDialog">
        <div class="text-xs-center">
          <v-btn round color="success" class="btnSave" @click.native="saveEmployee">Save</v-btn>
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

export default {
  data(){
    return {
      employee:{}
    }
  },
  components:{


  },
  methods:{
    closeEmployee(){
      this.$refs.fEmployee.reset()
      this.$store.state.employee.dialogState = false
    },
    saveEmployee(){
     if (this.$refs.fEmployee.validate()){
      this.$store.dispatch('createEmployee', this.employee)
      .then((result) => {
        this.closeEmployee()
      })
    }
  }
},
computed: {
 forms () {
  return [

  {"type":"text","id":"Name","label":"Name","isRequired":false},

  {"type":"datetime","id":"DateOfBirth","label":"Date Of Birth","isRequired":false,"modal":false},

  {"type":"text","id":"PlaceOfBirth","label":"Place Of Birth","isRequired":false},

  {"type":"text","id":"Address","label":"Address","isRequired":false},

  {"type": 'select', "id": 'GenderId', "label": 'Gender',"isRequired": true,"data": this.$store.getters.getGenderOfEmployee, dialogAction:this.showDialogGender} 

  ]
}
},
created(){

  this.$store.dispatch('GET_GENDER_OF_EMPLOYEE')
}
}
</script>
