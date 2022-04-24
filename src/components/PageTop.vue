<template>
  <button id="page-top" class="page-top" type="button" @click="toTop"></button>
</template>

<script>
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

export default {
  methods: {
    toTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>
