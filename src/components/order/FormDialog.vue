<template>
  <v-layout row justify-center v-if="$store.state.order.dialogState">
    <v-form ref="fOrder">
      <v-dialog class="dialog_modal" v-model="$store.state.order.dialogState" scrollable max-width="500px">
        <v-card class="card_dialog">
          <v-card-title class="headerModal">
            <v-layout row wrap>
              <v-flex xs2> </v-flex>
              <v-flex xs8 class="titleModal"> 
                Add New Order
              </v-flex>
              <v-flex xs2> 
                <v-btn @click.native="closeOrder" style="margin: -15px 0px -19px 0px !important" flat icon color="white">
                  <img src="../../assets/img/close-button-icon.png" style="width: 21px; height: 21px"></img>
                </v-btn>
                <div class="spanIcon">close</div>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0" style="height: auto;">
            <v-container grid-list-md>
              <v-layout row v-for="(form, index) in forms" :key="form.label">
                <!-- type text / string -->
                <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
                  <v-layout row wrap>
                    <v-flex xs2> </v-flex>
                    <v-flex xs8> 
                      <v-text-field
                      solo
                      class="inputDialog"
                      :label="form.label"
                      v-model="order[form.id]"
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
                      v-model="order[form.id]"
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
                  v-model="order[form.id]"
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
                :return-value.sync="order[form.id]"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                slot="activator"
                v-model="order[form.id]"
                :label="form.label"
                readonly
                :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                :required="form.isRequired"
                ></v-text-field>
                <v-date-picker v-model="order[form.id]" @input="$refs.menu2[index - 1].save(order[form.id])"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout> 
        </v-container>

        <hr class="hrDialog"></hr>
        <div class="text-xs-center">
          <v-btn round color="success" class="btnSave" @click.native="saveOrder">Save</v-btn>
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
import FormDialogEmployee from '@/components/employee/FormDialog'
import FormDialogMember from '@/components/member/FormDialog'

export default {
  data(){
    return {
      order:{}
    }
  },
  components:{

    FormDialogEmployee,
    
    FormDialogMember
    
  },
  methods:{
    closeOrder(){
      this.$refs.fOrder.reset()
      this.$store.state.order.dialogState = false
    },
    saveOrder(){
     if (this.$refs.fOrder.validate()){
      this.$store.dispatch('createOrder', this.order)
      .then((result) => {
        this.closeOrder()
      })
    }
  }
},
computed: {
 forms () {
  return [

  {"type":"text","id":"NumberOrder","label":"Number Order","isRequired":false},

  {"type":"text","id":"Note","label":"Note","isRequired":false},

  {"type": 'select', "id": 'EmployeeId', "label": 'Employee',"isRequired": true,"data": this.$store.state.employee.employees,buttonAdd:true, dialogAction:this.showDialogEmployee},

  {"type": 'select', "id": 'MemberId', "label": 'Member',"isRequired": true,"data": this.$store.state.member.members,buttonAdd:true, dialogAction:this.showDialogMember},

  ]
}
},
created(){

  this.$store.dispatch('GET_EMPLOYEE_OF_ORDER')

  this.$store.dispatch('GET_MEMBER_OF_ORDER')


  this.$store.dispatch('GET_EMPLOYEE_OF_ORDER')

  this.$store.dispatch('GET_MEMBER_OF_ORDER')

}
}
</script>
