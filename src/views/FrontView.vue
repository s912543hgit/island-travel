<template>
  <FrontNavbar></FrontNavbar>
  <RouterView @emit-form="getData" :form-data="formData"/>
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
    }
  }
}
</script>
