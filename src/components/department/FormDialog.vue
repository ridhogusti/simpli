<template>
  <v-layout row justify-center v-if="$store.state.department.dialogState">
    <v-form ref="fDepartment">
      <v-dialog content-class="dialog_modal" v-model="$store.state.department.dialogState" scrollable max-width="500px">
        <v-card class="card_dialog">
          <v-card-title class="headerModal">
            <v-layout row wrap>
              <v-flex xs2> </v-flex>
              <v-flex xs8 class="titleModal">
                Add New Department
              </v-flex>
              <v-flex xs2> 
                <v-btn @click.native="closeDepartment" style="margin: -15px 0px -19px 0px !important" flat icon color="white">
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
                      v-model="department[form.id]"
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
                  <v-select
                  :label="form.label"
                  v-model="department[form.id]"
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
                  v-model="department[form.id]"
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
                :return-value.sync="department[form.id]"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                slot="activator"
                v-model="department[form.id]"
                :label="form.label"
                readonly
                :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                :required="form.isRequired"
                ></v-text-field>
                <v-date-picker v-model="department[form.id]" @input="$refs.menu2[index - 1].save(department[form.id])"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout> 
        </v-container>

        <hr class="hrDialog"></hr>
        <div class="text-xs-center">
          <v-btn round class="btnSave" color="success" @click.native="saveDepartment">Save</v-btn>
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
      department:{}
    }
  },
  components:{

  },
  methods:{
    closeDepartment(){
      this.$refs.fDepartment.reset()
      this.$store.state.department.dialogState = false
    },
    saveDepartment(){
     if (this.$refs.fDepartment.validate()){
      this.$store.dispatch('createDepartment', this.department)
      .then((result) => {
        this.closeDepartment()
      })
    }
  }
},
computed: {
 forms () {
  return [

  {"type":"text","id":"Name","label":"Name","isRequired":true},

  ]
}
},
created(){


}
}
</script>
