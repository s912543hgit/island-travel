<template>
  <FrontNavbar/>
  <RouterView/>
  <FooterView/>
  <PageTop/>
</template>

<script>
import PageTop from '@/components/PageTop.vue'
import FrontNavbar from '@/components/FrontNavbar.vue'
import FooterView from '@/components/FooterView.vue'

export default {
  components: {
    FrontNavbar,
    FooterView,
    PageTop
  }
}
</script>
