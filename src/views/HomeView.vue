<template>
  <div class="p-mainvisual__wrapper">
    <div class="p-mainvisual__container d-none d-md-block">
      <div class="col-md-4 p-mainvisual__content p-3">
        <h2 class="text-white logo">島遊</h2>
        <p class="mb-3 text-white">尋找您的心之島向</p>
        <RouterLink to="/products" class="button--jump">查看行程</RouterLink>
      </div>
    </div>
    <Swiper
    :effect="'fade'"
    :modules="modules"
    :speed="2000"
    :loop="true"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
    class="p-mainvisual d-none d-md-block"
    >
      <Swiper-slide>
      <img
          src="https://storage.googleapis.com/vue-course-api.appspot.com/shio-vue/1650177067236.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=S%2Bh8qL40guzPunpWvL%2FMkN9%2BPq5mQRQ9VyZneqBSH7ftoAYkZDMab4Gq3tyYeErE%2FfwsjZ4GgTjJvA2%2BTOnStY8OJ2pZUYzNKX7FI0SmVsxr0Y62vU4WkyJk47Ck7a7lMhrCQfRmrmmRCqC24FZNLWGtsTL4zhKJYMQQoXksalOzxE8SgrgOtULg1XWkwWHWnWVtUMJBK1Kw%2BTlJDJp9TeuQhqlYQqAgTQmKGpZfwRNJMStr12yxfzIJlExMCz76HtYG9%2BeVsr6%2B0T3Rt9p2QrrV4jJRUFnRG16w5GBnUzLpOT0tNhNqdq51GGU6GboXTb4rdSqnUgXXN9YKOruUhw%3D%3D" alt="island picture"/>
      </Swiper-slide>
      <Swiper-slide>
        <img src="https://storage.googleapis.com/vue-course-api.appspot.com/shio-vue/1650177114084.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=XUMqOVyOn4z8YKJhzRVwJW0LbN38Of3meavl1sgFYiBhnxYxFyS7guJoyqI6tDeg57U8h1XxDqQwr5lURmIOA7TzwdqNBakxtBqD%2BMoPUmnZOE%2Fdp2lsoqx64W7YXhjpnX%2B2mKG0V3WdcyULH3ZPSYyZGWaitlmq7m8Gs%2FNvQaTltl1XtQBEDzXj3H5MWw0ICf3%2Fp0BGNYGQ3chGiUQaE7Q6K%2BNrYRd0MNYHUvy3DGR%2BH9fSTrSuzHAAXEJtAlxaNY7XUclP5nTzRV0rQ4gEPDSzDOM5B5WKi5afvBm5zcIHCWnP8DjieGHpKUGm0U1KsUo8KYKmtZfJ2hJGRsw%2F6Q%3D%3D" alt="island picture" />
      </Swiper-slide>
      <Swiper-slide>
      <img src="https://storage.googleapis.com/vue-course-api.appspot.com/shio-vue/1650177233464.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=UqkjRJd6ENTFsSuGMLYE8kYKCbEYHjjtPS4qiFxExWz11M%2Blfjs%2B8Pp7eAzQ%2Bsz8xkzwe4fJpwJQaE2T4ri%2BWgL4B0cmvKp87S19TCZ%2BAjupovMJE2xJYcMMtq1SS7yoGuivfRuYlsHIo7O1DmJ1y%2B3I2JiMMz3QdjHK%2FgTK4CuT6KSoFXIB00YmEEofvmUWvqzDSP%2Bt%2B%2BfaxGwT6AWb6bDZq5xLgv6zlvj8AizJRpoU0anniTImbMUyTxg8bPPrp1vxd5vY45jKewlyP1SqrJGWI3Yj6lv1lpko7Q8L%2BEp15GDH5kIWeN5m79MtzNEiuAE06%2Fi4A6TbBfn1T%2BLIGg%3D%3D" alt="island picture"/>
      </Swiper-slide>
    </Swiper>
  <div class="p-mainvisual--sp d-md-none"></div>
    <div class="container d-md-none p-mainvisual__outer--sp">
      <div class="row justify-content-start my-auto p-mainvisual__container">
        <div class="col-md-4 p-mainvisual__content">
          <h2 class="logo">島遊</h2>
          <p class="mb-3 text-white">尋找您的心之島向</p>
          <RouterLink to="/products" class="button--jump">查看行程</RouterLink>
        </div>
      </div>
    </div>
    <div class="p-scroll">
      <span>SCROLL</span>
    </div>
  </div>
  <div class="slogan text-center">
    <h3>逃離煩悶的日常生活，<br class="d-md-none">在島嶼中享受靜心一刻</h3>
    <p class="slogan__content">愛島的人士有福了！<br class="d-md-none">我們精選全球各地的島嶼景點，<br>
      無論是單車環島、島上散步、潛水冒險或是<br class="d-md-none">各種刺激的水上活動，應有盡有。<br>
      快來這裡尋找屬於您的心之島向吧！</p>
    <RouterLink to="/products" class="button--slide btn">前往探索</RouterLink>
  </div>
  <div class="container my-5">
    <div class="d-flex justify-content-center align-items-center mb-5">
      <h3 class="section-heading">地區精選</h3>
    </div>
    <div class="row">
      <div class="col-md-6 zoomIn">
        <div class="zoomIn__inner">
          <img src="https://storage.googleapis.com/vue-course-api.appspot.com/shio-vue/1650178229741.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=BmnIqCcZy%2FDKRBxohfGxK93V2mAvSECOSapgCUx70QsJdfouXOW64wyRGKqPQQZJCxvzDeVUF3QZPBEQvaMWvRZlMFht7w4bsRKOzQgkVCF26VKHMHC3efcmdgsIR2fEBxiohQcQx%2F7ghHP0Vuz7fnq4muNDc5U4W0RiWJ5jQoBxbXSsVldd9f6sTbOJtgV%2FNdOtdRFrOQWNkKN2oZbF4JS3QgHUwoMxN9J5Sy%2BiypybDGzfqrAjazqL43CSPofnVqgN1k7C9PahSVZYtGb3dfFjDuoWhdB1t8q551%2Ff0bvc8rjwYIT2jZnhMzPUCjm5cvB5S2%2B8rdn12naeqTYgfA%3D%3D" alt="naoshima Japan" class="img-fluid">
        </div>
      </div>
      <div class="col-md-4 m-auto">
        <span class="divider-separator">
          <span class="divider-separator__text">Noshima</span>
        </span>
        <h4 class="feature__title">直島</h4>
        <p class="text-muted text-left">直島位於瀨戶內海，擁有許多瀨戶群島之中最知名的藝術設施。原本面臨的人口高齡化危機的小島，因為藝術重獲新生，如今已經成為了國內外知名的旅遊勝地。<br>
        您可以花一整天來探訪這座島嶼上的各個美術館，以及散落各處的藝術作品。</p>
        <div class="row justify-content-center mt-5">
          <RouterLink to="/products" class="button--slide btn">前往探索</RouterLink>
        </div>
      </div>
    </div>
    <div class="row flex-row-reverse justify-content-between my-4">
      <div class="col-md-6 zoomIn">
        <div class="zoomIn__inner">
          <img src="https://storage.googleapis.com/vue-course-api.appspot.com/shio-vue/1650178085637.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hDuIZfQTUXPeHts63wcGtPGMaf4iMgO6DRo6lRqA8nZRN9UKyanOAL7mLvWzYtm5bwU84K3gv8McvYfOo5H0p07iOi9WjgtLl64SbiTou8myrPGY5XEEAKHeY9qK6a9Tyi502usBX9PTJhe42ta2Lr9P%2Bp2cZKUCoIcNXiVQ%2BQEO1DXN9Hv6K0yp4q4KxSVmck%2FnRpgttl5CeJnn9NIYHKkP4mM3sU1UAmH5BAlUSFkFh21Xiy4CvUx8RU48OdlsTJA689BB8nGJVsvkS73tOc6LHLvGtVMI5CmAoEbEY6jF2%2BsJfaWlFRWB9AXUZkjxtzHogzVFwz%2FkDFhyUvAUTQ%3D%3D" alt="Hawaii" class="img-fluid">
        </div>
      </div>
      <div class="col-md-4 m-auto">
        <span class="divider-separator">
          <span class="divider-separator__text">Hawaii</span>
        </span>
        <h4 class="feature__title">夏威夷</h4>
        <p class="text-muted text-right">夏威夷位於太平洋沿岸，由夏威夷群島所組成。擁有一望無際的沙灘，熱情的人們，歡樂的慶典，以及全世界最活躍的火山。你可以在夏威夷與眾不同的壯麗景觀中來一場獨一無二的探險。</p>
        <div class="row justify-content-center mt-5">
          <RouterLink to="/products" class="button--slide btn">前往探索</RouterLink>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 zoomIn">
        <div class="zoomIn__inner">
          <img src="https://storage.googleapis.com/vue-course-api.appspot.com/shio-vue/1650178193081.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=JhRwZ7gzAFizAxnW6xvxnLWDf2ZsZUrKwRHeMFcimEQh%2FIyp%2BIuYIrk8XSqCEK00QvdPcfmlCB1TDmuuwDO1zYTVqZTQ6dko%2B%2BLe79HNHl6W5aUXk6UP1SvugF99NiRdlSQqJ9qnzdvy%2BOAfPve69OcxkrngR6HiUQKXztVN5giUVVyQXNMeUXuZoDUYc%2F5EmiUKgoWiPpi8M1AmOJ0ex8jJV1qUYVcM3TbnxikMxyBfTWzbJ9R9o1vNQc%2F4oqSuTbShM5DQ7NybcuX8qBCNwcj4Q1onB3rjLFI0JrpyXtAMIsLWqWhvny5r%2BHA1M5lfHC1kTaiQZzlPaXKeZlP6Jw%3D%3D" alt="teshima Japan" class="img-fluid">
        </div>
      </div>
      <div class="col-md-5 m-auto">
        <span class="divider-separator">
          <span class="divider-separator__text">Tenshima</span>
        </span>
        <h4 class="feature__title">豊島</h4>
        <p class="text-muted text-left">原本是產業廢棄物投放場的荒涼島嶼，透過藝術重獲新生。<br>日本豐島位於瀨戶內海地區，從島上望去的蔚藍景色以及島上的梯田景觀都是一大絕景。<br>您也千萬不能錯過潛藏在島上四處的藝術景點。</p>
        <div class="row justify-content-center mt-5">
          <RouterLink to="/products" class="button--slide btn">前往探索</RouterLink>
        </div>
      </div>
    </div>
  </div>
  <div class="section-nobackground">
    <div class="background-image--introduction background-image"></div>
    <p class="text-center">一群愛島人，<br class="d-md-none">期望給您最深刻的島嶼記憶。</p>
    <RouterLink to="/about" class="btn btn-primary button--search">關於我們</RouterLink>
  </div>
  <div class="d-flex justify-content-center align-items-center mb-5">
    <h3 class="section-heading">島嶼風情</h3>
  </div>
  <Swiper
    :loop="true"
    :speed="1000"
    class="container"
    :slides-per-view="1"
    :space-between="50"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
    :breakpoints="{
      '768': {
        slidesPerView: 3,
      },
    }"
    :modules="modules"
  >
  <Swiper-slide v-for="(item) in products" :key="item.id" class="mb-5">
    <RouterLink :to="`/product/${item.id}`">
      <div class="p-card">
        <div class="p-card__tag">{{ item.category }}</div>
        <div class="p-card__image" :style="{backgroundImage: `url(${item.imageUrl})`}">
          <div class="hover-area">
            <a class="btn btn-primary px-5" @click="getProduct(item.id)">查看商品</a>
          </div>
        </div>
        <div class="p-card__body">
          <h4>{{ item.title }}</h4>
          <div class="d-flex justify-content-between">
            <p class="p-card__text">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </RouterLink>
  </Swiper-slide>
</Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'
import { EffectFade, Autoplay } from 'swiper'

export default {
  data () {
    return {
      products: []
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    return {
      modules: [EffectFade, Autoplay]
    }
  },
  inject: ['emitter'],
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((response) => {
          this.product = {
            ...response.data.product,
            qty: this.product.qty
          }
          this.isLoading = false
          const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?category=${this.product.category}`
          this.$http.get(url)
            .then((response) => {
              this.products = response.data.products
            })
            .catch((error) => {
              this.emitter.emit('push-message', {
                title: '找不到分類',
                content: error.response.data.message
              })
            })
        })
        .catch((error) => {
          this.emitter.emit('push-message', {
            title: '找不到商品qqqqq',
            content: error.response.data.message
          })
        })
    },
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/`
      this.$http.get(api)
        .then((response) => {
          this.products = response.data.products
        })
        .catch((error) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '找不到產品',
            content: error.response.data.message
          })
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
// @ is an alias to /src

</script>
