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
    data() {
      return {
        items: [{
            icon: 'home',
            text: 'Home',
            link: '/'
          },
          {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'Master Data',
            name: 'sidebaritem',
            model: false,
            children: [
              {
                "icon": "list",
                "text": "Employee",
                "link": "/employee"
              },
              {
                "icon": "list",
                "text": "Account",
                "link": "/account"
              },
              {
                "icon": "list",
                "text": "Product",
                "link": "/product"
              },
              {
                "icon": "list",
                "text": "Product Unit",
                "link": "/productunit"
              },
              {
                "icon": "list",
                "text": "Product Category",
                "link": "/productcategory"
              },
              {
                "icon": "list",
                "text": "Brand",
                "link": "/brand"
              },
              {
                "icon": "list",
                "text": "Payment Method",
                "link": "/paymentmethod"
              },
              {
                "icon": "list",
                "text": "Warehouse",
                "link": "/warehouse"
              },
              {
                "icon": "list",
                "text": "Warehouse Type",
                "link": "/warehousetype"
              },
              {
                "icon": "list",
                "text": "Product Variant",
                "link": "/productvariant"
              },
              {
                "icon": "list",
                "text": "Department",
                "link": "/department"
              },
              {
                "icon": "list",
                "text": "Member",
                "link": "/member"
              },
              {
                "icon": "list",
                "text": "Order",
                "link": "/order"
              },
              {
                "icon": "list",
                "text": "Order Item",
                "link": "/orderitem"
              },
              {
                "icon": "list",
                "text": "Payment",
                "link": "/payment"
              },
              {
                "icon": "list",
                "text": "Shift",
                "link": "/shift"
              },
              {
                "icon": "list",
                "text": "Cash Up",
                "link": "/cashup"
              },
              {
                "icon": "list",
                "text": "Cash Up Item",
                "link": "/cashupitem"
              },
              {
                "icon": "list",
                "text": "Employee Item Shift",
                "link": "/employeeitemshift"
              },
              {
                "icon": "list",
                "text": "Goods Receipt",
                "link": "/goodsreceipt"
              },
              {
                "icon": "list",
                "text": "Purchase Order",
                "link": "/purchaseorder"
              },
              {
                "icon": "list",
                "text": "Purchase Invoice",
                "link": "/purchase"
              },
              {
                "icon": "list",
                "text": "Stock Transfer",
                "link": "/stocktransfer"
              },
              {
                "icon": "list",
                "text": "Stock Adjustment",
                "link": "/stockadjustment"
              },
              {
                "icon": "list",
                "text": "Price List",
                "link": "/pricelist"
              },
              {
                "icon": "list",
                "text": "PurchaseRetur",
                "link": "/purchaseretur"
              },
              {
                "icon": "list",
                "text": "Purchase Item",
                "link": "/purchaseitem"
              },
              {
                "icon": "list",
                "text": "Supplier",
                "link": "/supplier"
              },
              {
                "icon": "list",
                "text": "Tax",
                "link": "/tax"
              },
              {
                "icon": "list",
                "text": "Payment Term",
                "link": "/paymentterm"
              },
              {
                "icon": "list",
                "text": "Unit",
                "link": "/unit"
              },
              {
                "icon": "list",
                "text": "Stock Movement",
                "link": "/stockmovement"
              },
              {
                "icon": "list",
                "text": "Stock",
                "link": "/stock"
              }
  
            ]
          },
          {
            icon: 'exit_to_app',
            text: 'Logout',
            link: '/logout'
          },
          {
            icon: 'settings',
            text: 'Settings',
            link:'/setting'
          }
        ]
      }
    }
  }
</script>

