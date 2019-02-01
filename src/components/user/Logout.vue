<template>
  
</template>

<script>
import { LOGOUT } from '@/store/actions.type'

export default {
  mounted () {
    this.$store.dispatch(LOGOUT)
    .then((response) => {
      this.$router.push({ path: '/user/login' })
    }).catch((err) => {
      alert(err.message)
      this.$router.go(-1)
    });
  }
}
</script>
