<template>
    <Loading :active="isLoading"></Loading>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-7">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-white px-0 mb-0 py-3">
              <li class="breadcrumb-item">
                <router-link class="text-muted" to="/">島遊</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link class="text-muted" to="/products">{{ product.category }}</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
            </ol>
          </nav>
          <swiper
          class="container"
          :slides-per-view="1"
          :space-between="50"
          :navigation="true"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
          }"
          :modules="modules"
        >
          <swiper-slide>
          <div :style="{backgroundImage: `url(${product.imageUrl})`}"
          style="height: 500px; background-size: cover; background-position:center "></div>
          </swiper-slide>
          <swiper-slide v-for="image in product.imagesUrl" :key="image">
            <div :style="{backgroundImage: `url(${image})`}"
            style="height: 500px; background-size: cover; background-position:center "></div>
          </swiper-slide>
        </swiper>
        </div>
        <div class="col-md-5">
          <h2 class="fw-bold h1 mb-1">{{ product.title }}</h2>
          <p class="mb-0 text-muted text-end"><del>NT{{ product.origin_price }}</del></p>
          <p class="h4 fw-bold text-end">NT${{ product.price }}</p>
          <div class="row align-items-center">
            <div class="col-6">
              <div class="input-group">
                <select  id="" class="form-select" v-model="product.qty">
                  <option value="0" disabled selected>請選擇人數</option>
                  <option v-for="num in 20" :value="num" :selected="product.qty === num" :key="`${num}-${product.id}`" >{{ num }}</option>
                </select>
              </div>
            </div>
            <div class="col-6">
              <button type="button" class="text-nowrap btn btn-primary w-100 py-2" @click.prevent="updateCartItem(product)">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 島嶼介紹 -->
      <div class="my-5">
        <div class="col-md-12">
          <h3 class="fs-4 text-center p-4 text-primary">島嶼介紹</h3>
          <p>{{ product.description }}</p>
        </div>
      </div>
      <!-- 精選景點 -->
      <div class="my-5" v-if="product.placeOne">
        <div class="col-md-12">
          <h3 class="fs-4 text-center p-4 text-primary">精選景點</h3>
            <ul class="list-unstyled">
              <li>
                <h4 class="fs-5">{{ product.placeOne }}</h4>
                <p>{{ product.introOne }}</p>
              </li>
              <li v-if="product.placeTwo">
                <h4 class="fs-5">{{ product.placeTwo }}</h4>
                <p>{{ product.introTwo }}</p>
              </li>
            </ul>
        </div>
      </div>
  <!-- 相關商品 -->
  <div class="container">
    <h3 class="fs-4 text-center p-4 text-primary">相關商品</h3>
    <swiper :slides-per-view="1"
      :space-between="50"
      :breakpoints="{
        '768': {
          slidesPerView: 3,
        },
      }"
      :modules="modules"
    >
      <swiper-slide v-for="(item) in products" :key="item.id">
        <router-link :to="`/product/${item.id}`">
          <div class="card border-0 mb-4">
            <div :style="{backgroundImage: `url(${item.imageUrl})`}"
            style="height: 300px; background-size: cover; background-position:center "></div>
            <div class="card-body text-left">
              <h4>{{ item.title }}</h4>
              <div class="d-flex justify-content-between">
                <p class="card-text text-muted mb-0">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</div>
</template>

<script>
import emitter from '@/libs/emitter'
import Loading from 'vue-loading-overlay'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import { Navigation } from 'swiper'

export default {
  data () {
    return {
      products: [],
      product: {
        qty: 0,
        category: ''
      },
      id: '',
      isNew: true,
      isLoading: false
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    Loading
  },
  setup () {
    return {
      modules: [Navigation]
    }
  },
  methods: {
    getProduct () {
      // 找到產品id 並存起來
      const { id } = this.$route.params
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then(res => {
          this.product = {
            ...res.data.product,
            qty: this.product.qty
          }
          this.isLoading = false
          const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?category=${this.product.category}`
          // 取得同一分類的產品
          this.$http.get(url)
            .then(res => {
              this.products = res.data.products
            })
        })
    },
    getCart () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          // 購物車的資料有兩層data
          this.cartData = res.data.data
          this.isLoading = false
        })
    },
    // addToCart () {
    //   const data = {
    //     product_id: this.id,
    //     qty: 1
    //   }
    //   this.$http.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`, { data })
    //     .then((res) => {
    //       console.log(res)
    //       // 觸發設置的監聽
    //       emitter.emit('get-cart')
    //     })
    // },
    updateCartItem (product) {
      const data = {
        product_id: product.id,
        qty: product.qty
      }
      // 如果商品尚未被加入 使用add購物車
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      let method = 'post'
      // 如果商品被加進購物車 使用update購物車
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${product.id}`
        method = 'put'
      }
      this.$http[method](api, { data }).then((res) => {
        emitter.emit('get-cart')
      })
    }
  },
  mounted () {
    // 找到產品id 並存起來
    this.id = this.$route.params.id
    this.getProduct()
  }
}
</script>
