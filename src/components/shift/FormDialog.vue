<template>
<v-layout row justify-center v-if="$store.state.shift.dialogState">
    <v-form ref="fShift">
    <v-dialog v-model="$store.state.shift.dialogState" scrollable max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title">Add Shift</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0" style="height: 450px;">
          <v-container grid-list-md>
            <v-layout row v-for="(form, index) in forms" :key="form.label">
            <!-- type text / string -->
            <v-flex v-if="form.type === 'text' || form.type === 'email' || form.type === 'password' ">
                <v-text-field
                :label="form.label"
                v-model="shift[form.id]"
                :type="form.type"
                :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                :required="form.isRequired"
                ></v-text-field>
            </v-flex>
            <!-- type select -->
            <v-flex v-if="form.type === 'select'">
                <v-select
                :label="form.label"
                v-model="shift[form.id]"
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
                v-model="shift[form.id]"
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
                :return-value.sync="shift[form.id]"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                    slot="activator"
                    v-model="shift[form.id]"
                    :label="form.label"
                    readonly
                    :rules="form.isRequired?[v => !!v || form.label + ' is required.']:[]"
                    :required="form.isRequired"
                ></v-text-field>
                <v-date-picker v-model="shift[form.id]" @input="$refs.menu2[index - 1].save(shift[form.id])"></v-date-picker>
                </v-menu>
            </v-flex>
            </v-layout> 
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="closeShift">Close</v-btn>
          <v-btn class="primary" @click.native="saveShift">Save</v-btn>
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
        shift:{}
    }
  },
  components:{
    
  },
  methods:{
      closeShift(){
          this.$refs.fShift.reset()
          this.$store.state.shift.dialogState = false
      },
     saveShift(){
       if (this.$refs.fShift.validate()){
        this.$store.dispatch('createShift', this.shift)
        .then((result) => {
          this.closeShift()
        })
      }
    }
  },
  computed: {
   forms () {
      return [
      
      {"type":"text","id":"Name","label":"Name","isRequired":false},
      
      {"type":"datetime","id":"StartDate","label":"Start Date","isRequired":false,"modal":false},
      
      {"type":"datetime","id":"EndDate","label":"End Date","isRequired":false,"modal":false},
      
      ]
    }
  },
  created(){
      
     
  }
}
</script>
