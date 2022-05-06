<template>
  <RouterView/>
  <ToastMessages/>
</template>

<script>
import emitter from '@/libs/emitter'
import ToastMessages from '@/components/ToastMessages.vue'

export default {
  directives: {
    visible: false
  },
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

<style lang="scss">
  @import "./assets/stylesheets/all"
</style>
