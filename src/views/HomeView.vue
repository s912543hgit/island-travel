<template>
  <div class="position-relative">
    <swiper
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
      <swiper-slide
        ><img
          src="https://find47.jp/uploads/image_file/content/000/003/877/web_detail_thumb.jpg" alt="island picture"/></swiper-slide
      >
      <swiper-slide>
        <img src="https://images.unsplash.com/photo-1529686342540-1b43aec0df75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="island picture" />
      </swiper-slide>
      <swiper-slide
        ><img
          src="https://images.unsplash.com/photo-1468082547792-d37c6c74003e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80" alt="island picture"/></swiper-slide
      >
      <div class="p-mainvisual__container">
        <div class="col-md-4 p-mainvisual__content p-3">
          <h2 class="text-white">島遊</h2>
          <p class="mb-3 text-white">尋找您的心之島向</p>
          <RouterLink to="/products" class="text-white btn btn-primary rounded-0 mt-4">查看行程</RouterLink>
        </div>
      </div>
    </swiper>
  <div class="p-mainvisual--sp d-md-none"></div>
   <div class="container d-md-none p-mainvisual__outer--sp">
      <div class="row justify-content-start my-auto p-mainvisual__container">
        <div class="col-md-4 p-mainvisual__content">
          <h2 class="logo">島遊</h2>
          <p class="mb-3 text-white">尋找您的心之島向</p>
          <button class="btn btn-primary rounded-0 mt-4" type="button">
            <RouterLink to="/products" class="text-white">查看行程</RouterLink>
          </button>
        </div>
      </div>
    </div>
    <div class="p-scroll">
      <span>SCROLL</span>
    </div>
  </div>
  <div class="container my-5">
    <h3 class="fs-4 text-center p-4">地區精選</h3>
    <div class="row">
      <div class="col-md-6 zoomIn">
        <div class="zoomIn__inner">
          <img src="https://images.unsplash.com/photo-1542028378254-8e17303266ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="naoshima Japan" class="img-fluid">
        </div>
      </div>
      <div class="col-md-4 m-auto">
        <h4 class="mt-4">直島</h4>
        <p class="text-muted text-left">直島位於瀨戶內海，擁有許多瀨戶群島之中最知名的藝術設施。原本面臨的人口高齡化危機的小島，因為藝術重獲新生，如今已經成為了國內外知名的旅遊勝地。<br>
        您可以花一整天來探訪這座島嶼上的各個美術館，以及散落各處的藝術作品。</p>
        <div class="row justify-content-center mt-5">
          <RouterLink to="/products" class="button--search btn btn-outline-primary">前往探索</RouterLink>
        </div>
      </div>
    </div>
    <div class="row flex-row-reverse justify-content-between my-4">
      <div class="col-md-6 zoomIn">
        <div class="zoomIn__inner">
          <img src="https://images.unsplash.com/photo-1553901753-215db344677a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" alt="Hawaii" class="img-fluid">
        </div>
      </div>
      <div class="col-md-4 m-auto">
        <h4 class="mt-4">夏威夷</h4>
        <p class="text-muted text-right">夏威夷位於太平洋沿岸，由夏威夷群島所組成。擁有一望無際的沙灘，熱情的人們，歡樂的慶典，以及全世界最活躍的火山。你可以在夏威夷與眾不同的壯麗景觀中來一場獨一無二的探險。</p>
        <div class="row justify-content-center mt-5">
          <RouterLink to="/products" class="btn btn-outline-primary button--search">前往探索</RouterLink>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 zoomIn">
        <div class="zoomIn__inner">
          <img src="https://images.unsplash.com/photo-1593958866187-37e5c3b98278?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" alt="teshima Japan" class="img-fluid">
        </div>
      </div>
      <div class="col-md-5 m-auto">
        <h4 class="mt-4">豊島</h4>
        <p class="text-muted text-left">原本是產業廢棄物投放場的荒涼島嶼，透過藝術重獲新生。<br>日本豐島位於瀨戶內海地區，從島上望去的蔚藍景色以及島上的梯田景觀都是一大絕景。<br>您也千萬不能錯過潛藏在島上四處的藝術景點。</p>
        <div class="row justify-content-center mt-5">
          <RouterLink to="/products" class="btn btn-outline-primary button--search">前往探索</RouterLink>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="background-image--introduction background-image"></div>
    <p>一群愛島人，期望給您最深刻的島嶼記憶。</p>
    <RouterLink to="/about" class="btn btn-outline-primary button--search">關於我們</RouterLink>
  </div>
  <!-- 島嶼風情 -->
  <h3 class="fs-4 text-center p-4">島嶼風情</h3>
  <swiper
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
  <swiper-slide v-for="(item) in products" :key="item.id" class="mb-5">
    <RouterLink :to="`/product/${item.id}`">
      <div class="p-card">
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
  </swiper-slide>
</swiper>
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
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/`
      this.$http.get(api).then((res) => {
        this.products = res.data.products
      })
        .catch((error) => {
          console.dir(error)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
// @ is an alias to /src

</script>
