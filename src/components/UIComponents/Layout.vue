<template>
  <v-app>
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app width="270">
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
           
            <v-list-tile-avatar>
              <!-- <img src="http://www.kb.bawaslu.go.id/assets/images/user.jpg"> -->
              <v-icon large>account_circle</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content class="title">
              <v-list-tile-title>Administrator</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider class="hrInSidebar" ></v-divider>
      <!-- menu sidebar -->
      <app-sidebar></app-sidebar>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped" dark color="#6747cd">
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title v-text="title" class="titleToolbar"></v-toolbar-title>
      <v-spacer></v-spacer>
  
      <v-menu left="">
        <v-btn icon slot="activator">
          <v-icon>language</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="language in languages" :key="language.value" @click="setLang(language.value)">
            <div v-if="language.value === $i18n.locale">
              <v-list-tile-title class="blue--text">{{language.text}} ({{language.value}})</v-list-tile-title>
            </div>
            <div v-else>
              <v-list-tile-title>{{language.text}} ({{language.value}})</v-list-tile-title>
            </div>
          </v-list-tile>
        </v-list>
      </v-menu>
  
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content style="background: #f2f2f2">
      <ui-breadcrums></ui-breadcrums>
      <router-view/>
    </v-content>
    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app>
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
  // import sidebar
  import Sidebar from '@/components/UIComponents/Sidebar'
  import Breadcrums from '@/components/UIComponents/Breadcrums'
  
  export default {
    components: {
      'app-sidebar': Sidebar,
      'ui-breadcrums': Breadcrums
    },
    data() {
      return {
        clipped: true,
        drawer: false,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'SimpliRetail',
        languages: [{
            text: 'English',
            value: 'en'
          },
          {
            text: 'Indonesia',
            value: 'id'
          }
        ],
        langs: 'en'
      }
    },
    name: 'App',
    methods: {
      setLang: (lang) => {
        this.$store.dispatch('setLang', lang)
      }
    }
  }
</script>
