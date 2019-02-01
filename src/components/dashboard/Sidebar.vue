<template>
  <v-list>
    <template v-for="item in items">
      <v-layout
        row
        v-if="item.heading"
        align-center
        :key="item.heading"
      >
        <v-flex xs6>
          <v-subheader v-if="item.heading">
            {{ item.heading }}
          </v-subheader>
        </v-flex>
        <v-flex xs6 class="text-xs-center">
          <a href="#!" class="body-2 black--text">EDIT</a>
        </v-flex>
      </v-layout>
      <v-list-group
        v-else-if="item.children"
        v-model="item.model"
        :key="item.text"
        :prepend-icon="item.model ? item.icon : item['icon-alt']"
        append-icon=""
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="(child, i) in item.children"
          :key="i"
          router
          :to="child.link"
          exact
        >
          <v-list-tile-action v-if="child.icon">
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ child.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <v-list-tile v-else :key="item.text" router :to="item.link" exact>
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
  <!-- </div> -->
</template>

<script>
export default {
  data () {
    return {
      itemsXX: [
        {icon: 'home', title: 'Home', link: '/'},
        {icon: 'view_list', title: 'Data Table', link: '/base/datatable'},
        {icon: 'add', title: 'Form', link: '/base/form'}
      ],
      items: [
        { icon: 'home', text: 'Home', link: '/' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'MASTER DATA',
          model: false,
          children: [
            { icon: 'account_box', text: 'Employee', link: '/employee' },
            { icon: 'account_circle', text: 'Account', link: '/account' },
            { icon: 'account_circle', text: 'Product', link: '/product' }
          ]
        },
        { icon: 'exit_to_app', text: 'Logout', link: '/user/logout' },
        { icon: 'settings', text: 'Settings' }
      ]
    }
  }
}
</script>

