<template>
  <FrontNavbar></FrontNavbar>
  <router-view></router-view>
  <FooterView></FooterView>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import FooterView from '@/components/FooterView.vue'
import emitter from '@/libs/emitter'

export default {
  components: {
    FrontNavbar,
    FooterView
  },
  mounted () {
    emitter.on('formData', (data) => {
      console.log('received', data)
      this.form = data
    })
  }
}
</script>
