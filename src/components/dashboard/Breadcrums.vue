<template>
  <div>
    <v-breadcrumbs divider="/">
      <v-breadcrumbs-item
        v-for="item in items"
        :key="item.name"
        v-if="!item.name !== true"
        :href="item.path"
      >
        {{ item.name }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  computed: {
    items () {
      return this.$route.matched
    }
  },
}
</script>

<style>

</style>
