<template>
  <FrontNavbar></FrontNavbar>
  <router-view @emit-form="getData" :form-data="formData"></router-view>
  <FooterView></FooterView>
  <PageTop></PageTop>
  <!-- <CartNav></CartNav> -->
</template>

<script>
import PageTop from '@/components/PageTop.vue'
import FrontNavbar from '@/components/FrontNavbar.vue'
import FooterView from '@/components/FooterView.vue'
// import CartNav from '@/components/CartNav.vue'

export default {
  data () {
    return {
      formData: {}
    }
  },
  components: {
    FrontNavbar,
    FooterView,
    PageTop
  },
  methods: {
    getData (form) {
      this.formData = form
      // console.log(form)
    }
  }
}
</script>
