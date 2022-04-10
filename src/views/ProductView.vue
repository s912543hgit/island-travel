<template>
  <div class="background-image--product" :style="{backgroundImage: `url(${product.imageUrl})`}">
  </div>
    <VueLoading :active="isLoading"></VueLoading>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-7">
          <swiper
          class="container-md slider--product"
          :slides-per-view="1"
          :space-between="50"
          :pagination="true"
          :modules="modules"
          :navigation="true"
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
        <!-- 產品說明 -->
        <div class="col-md-5">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb px-0 mb-0 py-3 mt-3">
              <li class="breadcrumb-item">
                <RouterLink class="text-muted" to="/">島遊</RouterLink>
              </li>
              <li class="breadcrumb-item">
                <RouterLink class="text-muted" to="/products">{{ product.category }}</RouterLink>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
            </ol>
          </nav>
          <h2 class="fw-bold h1 mb-3 mt-3 mt-md-0">{{ product.title }}</h2>
          <div class="row align-items-center">
            <p class="text-muted  col-6">原價<del>NT${{ product.origin_price }}</del></p>
            <p class="text-end col-6">特價<span class="h4 fw-bold text-danger ms-2">NT${{ product.price }}</span></p>
          </div>
          <a href="#" class="border rounded-circle p-2" @click.prevent="toggleFavorite(product.id)">
            <i class="bi bi-suit-heart"></i>
          </a>
          <ul class="list-unstyled mt-3">
            <li>費用已含機場稅、燃油費</li>
            <li>三人即可成團</li>
            <li>若需當地專業嚮導請洽客服電話</li>
          </ul>
          <span v-if="favorite.includes(product.id)"><i class="bi bi-suit-heart"></i></span>
          <div class="row align-items-center">
            <div class="col-6">
              <div class="input-group">
                <select class="form-select" v-model="product.qty">
                  <option value="0" disabled selected>請選擇人數</option>
                  <option v-for="num in 20" :value="num" :selected="product.qty === num" :key="`${num}-${product.id}`" >{{ num }}</option>
                </select>
              </div>
            </div>
            <div class="col-6">
              <button type="button" class="text-nowrap btn btn-primary w-100 py-2" @click.prevent="updateCartItem(product)" :disabled="isDisabled === 'add'">
                <span class="spinner-border spinner-border-sm" role="status" v-show="isDisabled === 'add'"></span>
                加入購物車
              </button>
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
  <div class="container-md">
    <h3 class="fs-4 text-center p-4 text-primary">相關商品</h3>
    <swiper :slides-per-view="1"
      :loop="true"
      :space-between="50"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :speed="1000"
      :breakpoints="{
        '768': {
          slidesPerView: 3,
        },
      }"
      :modules="modules"
    >
      <swiper-slide v-for="(item) in products" :key="item.id">
          <div class="card border-0 mb-4 position-relative p-card">
            <div class="p-card__image" :style="{backgroundImage: `url(${item.imageUrl})`}" style="height: 300px;">
              <RouterLink :to="`/product/${item.id}`" class="hover-area">
                <div class="btn btn-primary px-5">查看商品</div>
              </RouterLink>
            </div>
            <RouterLink  :to="`/product/${item.id}`" class="card-body text-left">
              <h4>{{ item.title }}</h4>
              <div class="d-flex justify-content-between">
                <p class="card-text text-muted mb-0" style="height: 4.5rem; overflow: hidden;">
                  {{ item.description }}
                </p>
              </div>
            </RouterLink>
          </div>
      </swiper-slide>
    </swiper>
  </div>
</div>
</template>

<script>
import emitter from '@/libs/emitter'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, Autoplay } from 'swiper'

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
      isLoading: false,
      isLoadingItem: '',
      isDisabled: '',
      favorite: JSON.parse(localStorage.getItem('favorite')) || []
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    return {
      modules: [Navigation, Pagination, Autoplay]
    }
  },
  inject: ['emitter'],
  methods: {
    getProduct () {
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
          this.cartData = res.data.data
          this.isLoading = false
        })
    },
    updateCartItem (product) {
      const data = {
        product_id: product.id,
        qty: product.qty
      }
      this.isDisabled = 'add'
      // 如果商品尚未被加入 使用add購物車
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      let method = 'post'
      // 如果商品被加進購物車 使用update購物車
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${product.id}`
        method = 'put'
      }
      this.$http[method](api, { data }).then((response) => {
        this.emitter.emit('push-message', {
          style: 'success',
          title: '購物提示',
          content: response.data.message
        })
        this.isDisabled = ''
        emitter.emit('get-cart')
      })
    },
    toggleFavorite (id) {
      // findIndex 尋找陣列中符合對象並返回index 若沒有合適的會回傳-1
      const favoriteIndex = this.favorite.findIndex((item) => item === id)
      // 第一次點擊時結果會是-1
      if (favoriteIndex === -1) {
        this.favorite.push(id)
      } else {
        this.favorite.splice(favoriteIndex, 1)
      }
    }
  },
  watch: {
    favorite: {
      handler () {
        // 當資料有變動時就進行寫入
        localStorage.setItem('favorite', JSON.stringify(this.favorite))
      },
      deep: true
    },
    // watch 偵測到網址的 id 有變，將新的 id 帶入到 data 的 id
    $route (to) {
      this.id = to.params.id
      this.getProduct()
    }
  },
  mounted () {
    // 找到產品id 並存起來
    this.id = this.$route.params.id
    this.getProduct()
  }
}
</script>
