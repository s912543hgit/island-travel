<template>
  <FrontNavbar></FrontNavbar>
  <router-view></router-view>
  <FooterView></FooterView>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import FooterView from '@/components/FooterView.vue'

export default {
  components: {
    FrontNavbar,
    FooterView
  }
}
</script>
