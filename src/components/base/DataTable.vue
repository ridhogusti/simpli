<template>
  <v-container>
    <!-- <v-layout row>
      <v-flex>
        <h2>Data Employee</h2>
      </v-flex>
    </v-layout> -->
    <v-layout row>
      <v-flex xs12 sm12 md12>
        <v-card>
          <v-card-title>
            <div class="title">
              {{title}}
            </div>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <v-layout row>
            <v-flex>
              <v-data-table
                :headers="headers"
                :items="items"
                :search="search"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.nip }}</td>
                  <td class="">{{ props.item.nama }}</td>
                  <td class="text-xs-center">{{ props.item.umur }}</td>
                  <td class="">{{ props.item.tanggalLahir }}</td>
                  <td class="">{{ props.item.jenisKelamin }}</td>
                  <td class="text-xs-center">{{ props.item.status }}</td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                  Your search for "{{ search }}" found no results.
                </v-alert>
              </v-data-table>
            </v-flex>
          </v-layout>  
        </v-card>
        
      </v-flex>
    </v-layout>
    <v-card>
      
      
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Data Table',
        search: '',
        headers: [
          {
            text: 'NIP',
            align: 'left',
            sortable: false,
            value: 'nip'
          },
          { text: 'Nama', value: 'nama' },
          { text: 'Umur', value: 'umur' },
          { text: 'Tanggal Lahir', value: 'tanggalLahir' },
          { text: 'Jenis Kelamin', value: 'jenisKelamin' },
          { text: 'Status', value: 'status' }
        ],
        items: [
          {
            value: false,
            nip: 12345,
            nama: 'Fitra Wijaya',
            umur: 24,
            tanggalLahir: '24-03-1995',
            jenisKelamin: 'Pria',
            status: 1
          },
          {
            value: false,
            nama: 'Wijaya Aja',
            nip: 12789,
            umur: 27,
            tanggalLahir: '12-08-1990',
            jenisKelamin: 'Pria',
            status: 1
          },
          {
            value: false,
            nama: 'Tasya Pasyapa',
            nip: 34597,
            umur: 30,
            tanggalLahir: '24-03-1988',
            jenisKelamin: 'Wanita',
            status: 1
          },
          {
            value: false,
            nama: 'Polanda',
            nip: 39711,
            umur: 20,
            tanggalLahir: '24-03-1998',
            jenisKelamin: 'Wanita',
            status: 1
          }
        ]
      }
    }
  }
</script>