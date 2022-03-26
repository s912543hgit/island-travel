<template>
  <FrontNavbar></FrontNavbar>
  <router-view @emit-form="getData" :form-data="formData"></router-view>
  <FooterView></FooterView>
</template>

<script>
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
    FooterView
  },
  methods: {
    getData (form) {
      this.formData = form
      console.log(form)
    }
  }
}
</script>
