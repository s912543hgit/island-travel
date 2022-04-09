<template>
  <RouterView/>
  <ToastMessages></ToastMessages>
</template>

<style lang="scss">
  @import "./assets/stylesheets/all"
</style>
<script>
import emitter from '@/libs/emitter'
import ToastMessages from '@/components/ToastMessages.vue'

export default {
  components: {
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>
