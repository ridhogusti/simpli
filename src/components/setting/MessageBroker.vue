<template>
    <v-layout class="pa-2">
        <v-flex lg5>
            <v-toolbar flat color="white">
            <v-toolbar-title>Message Queue</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="dialogAdd=true" >ADD</v-btn>
            </v-toolbar>
             <v-data-table :headers="headers" :items="items" hide-actions class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td>{{props.item.UserName}}</td>
                    <td class="text-xs-right">{{props.item.HostName}}</td>
                     <td class="text-xs-right"><v-btn  @click="()=>editUser(props.item)" color="error">Edit</v-btn></td>
                </template>
            </v-data-table>
        </v-flex>
        
        <!-- dialog -->
        <v-dialog v-model="dialogAdd" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Add User Message Queue
                </v-card-title>

                <v-card-text>
                     <v-layout>
                        <v-flex>
                            <v-text-field v-model="messageBrokerUser.HostName" label="Host Name"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="messageBrokerUser.UserName" label="User Name"></v-text-field>
                        </v-flex>
                    </v-layout>
                     <v-layout>
                        <v-flex>
                            <v-text-field v-model="messageBrokerUser.Password" label="Password"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="postUserMessageQueueUser">
                   ADD
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogEdit" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Add User Message Queue
                </v-card-title>

                <v-card-text>
                     <v-layout>
                        <v-flex>
                            <v-text-field v-model="messageBrokerUserEdit.HostName" label="Host Name"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex>
                            <v-text-field v-model="messageBrokerUserEdit.UserName" label="User Name"></v-text-field>
                        </v-flex>
                    </v-layout>
                     <v-layout>
                        <v-flex>
                            <v-text-field type="password" v-model="messageBrokerUserEdit.Password" label="Password"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                <v-spacer></v-spacer>
                 <v-btn color="error" @click="deleteUser">
                   Delete
                </v-btn>
                <v-btn color="primary" @click="updateUser">
                   Edit
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
            { text: 'User', value: 'UserName', width:'10%'},
            { text: 'Host Name', value: 'HostName', align:'center', width:'17.5%'  },
            { text: 'Action', align:'right'  },
            //   { text: 'User Name', value: 'fat' }
        ],
        items:[],
        dialogAdd:false,
        dialogEdit:false,
        messageBrokerUser:{},
        messageBrokerUserEdit:{}
      }
    },
    methods:{
        async postUserMessageQueueUser(){
            try {
                const _response = await this.$store.dispatch('POST_MESSAGEBROKERUSER', this.messageBrokerUser)
                this.dialogAdd = false    
            } catch (error) {
            }
        },
        editUser(item){
            this.dialogEdit = true
            this.messageBrokerUserEdit = item 
        },
        async deleteUser(){
             try {
                const _response = await this.$store.dispatch('DELETE_MESSAGEBROKERUSER', this.messageBrokerUserEdit.Id);
                this.dialogEdit = false
            } catch (error) {
                
            }
        },
        async updateUser(){
            try {
                const _response = await this.$store.dispatch('PUT_MESSAGEBROKERUSER', this.messageBrokerUserEdit);
                this.dialogEdit = false
            } catch (error) {
                
            }
            
        }
    },
    async created(){
        const _user = await this.$store.dispatch('GET_USER_MESSAGEBROKER')
        this.items = _user.data
    }
  }
</script>

<style>

</style>
