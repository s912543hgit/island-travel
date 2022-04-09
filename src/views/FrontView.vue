<template>
  <FrontNavbar></FrontNavbar>
  <RouterView @emit-form="getData" @emit-favorite="getFavorite"
  :form-data="formData"/>
  <FooterView></FooterView>
  <PageTop></PageTop>
</template>

<script>
import PageTop from '@/components/PageTop.vue'
import FrontNavbar from '@/components/FrontNavbar.vue'
import FooterView from '@/components/FooterView.vue'

export default {
  data () {
    return {
      formData: {},
      favoriteData: []
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
    }
  }
}
</script>
