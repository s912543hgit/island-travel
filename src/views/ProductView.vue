<template>
  <div class="background-image--product" :style="{backgroundImage: `url(${product.imageUrl})`}">
  </div>
  <VueLoading :active="isLoading"/>
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-7">
        <Swiper
          class="container-md slider--product"
          :slides-per-view="1"
          :space-between="50"
          :pagination="true"
          :modules="modules"
          :navigation="true"
        >
          <Swiper-slide>
            <div class="product__image" :style="{backgroundImage: `url(${product.imageUrl})`}"></div>
          </Swiper-slide>
          <Swiper-slide v-for="image in product.imagesUrl" :key="image">
            <div class="product__image" :style="{backgroundImage: `url(${image})`}"></div>
          </Swiper-slide>
        </Swiper>
      </div>
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
          <p class="text-muted col-6">原價<del>NT${{ product.origin_price }}</del></p>
          <p class="text-end col-6">特價<span class="h4 fw-bold text-primary ms-2">NT${{ product.price }}</span></p>
        </div>
        <a
          href="#"
          class="border rounded-circle p-2 me-4"
          @click.prevent="toggleFavorite(product.id)">
          <span v-if="favorite.includes(product.id)">
            <i  v-if="favorite.includes(product.id)" class="bi bi-suit-heart-fill"></i>
          </span>
          <i v-else class="bi bi-suit-heart"></i>
        </a>
        <ul class="list-unstyled mt-3">
          <li>費用已含機場稅、燃油費</li>
          <li>三人即可成團</li>
          <li>若需當地專業嚮導請洽客服電話</li>
        </ul>
        <div class="row align-items-center">
          <div class="col-6">
            <div class="input-group">
              <select class="form-select" v-model="product.qty">
                <option value="0" disabled>請選擇人數</option>
                <option v-for="num in 20" :value="num"
                  :selected="product.qty === num"
                  :key="`${num}-${product.id}`" >{{ num }}</option>
              </select>
            </div>
          </div>
          <div class="col-6">
            <button
              type="button"
              class="text-nowrap btn btn-primary w-100 py-2"
              @click.prevent="updateCartItem(product)"
              :disabled="product.qty === 0 || isDisabled === 'add'">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                v-show="isDisabled === 'add'"></span>
                加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5">
      <div class="col-md-12">
        <div class="d-flex justify-content-center align-items-center mb-5">
          <h3 class="section-heading">島嶼介紹</h3>
        </div>
        <p>{{ product.description }}</p>
      </div>
    </div>
    <div class="my-5" v-if="product.placeOne">
      <div class="col-md-12">
        <div class="d-flex justify-content-center align-items-center mb-5">
          <h3 class="section-heading">精選景點</h3>
        </div>
        <ul class="list-unstyled">
          <li class="mb-5">
            <h4 class="fs-5 product__subtitle">{{ product.placeOne }}</h4>
            <p>{{ product.introOne }}</p>
          </li>
          <li v-if="product.placeTwo">
            <h4 class="fs-5 product__subtitle">{{ product.placeTwo }}</h4>
            <p>{{ product.introTwo }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="my-5">
      <div class="col-md-12">
        <div class="d-flex justify-content-center align-items-center mb-5">
          <h3 class="section-heading">注意事項</h3>
        </div>
        <ul class="rule-list">
          <li>此旅程的取消期限為1個月前，若有取消或人數變更請您主動聯繫客服，如逾期將會收取取消費用。詳情請參考下列取消政策。</li>
          <li>產品結帳後我們將會於24小時內寄送相關電子郵件至您的信箱，請妥善保管。</li>
          <li>若因天候不佳而致旅客無法盡興遊玩時，<br class="d-md-none">請您聯絡客服，我們將會有專人為您提供替代方案。</li>
          <li>出發前請先查詢好當地氣候，並準備合適衣物。</li>
        </ul>
      </div>
    </div>
    <div class="my-5">
      <div class="col-md-12">
        <div class="d-flex justify-content-center align-items-center mb-5">
          <h3 class="section-heading">取消政策</h3>
        </div>
        <ul class="rule-list">
          <li>於30天前取消，將不會收取取消費用。</li>
          <li>於30天~14天前取消，將酌收整體費用的20%</li>
          <li>於14天~7天前取消，將酌收整體費用的50%</li>
          <li>於7天前取消，將酌收整體費用的100%</li>
        </ul>
      </div>
    </div>
    <!-- 相關商品 -->
    <div class="container-md">
      <div class="d-flex justify-content-center align-items-center mb-5">
        <h3 class="section-heading">相關商品</h3>
      </div>
      <Swiper :slides-per-view="1"
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
        class="p-2"
      >
        <Swiper-slide v-for="(item) in products" :key="item.id">
            <div class="p-card">
              <div class="p-card__tag">{{ item.category }}</div>
              <div class="p-card__image" :style="{backgroundImage: `url(${item.imageUrl})`}">
                <RouterLink :to="`/product/${item.id}`" class="hover-area">
                  <div class="btn btn-primary px-5">查看商品</div>
                </RouterLink>
              </div>
              <RouterLink  :to="`/product/${item.id}`" class="p-card__body text-left">
                <h4>{{ item.title }}</h4>
                <div class="d-flex justify-content-between">
                  <p class="p-card__text">
                    {{ item.description }}
                  </p>
                </div>
              </RouterLink>
            </div>
        </Swiper-slide>
      </Swiper>
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
    getCart () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((response) => {
          this.cartData = response.data.data
          this.isLoading = false
        })
        .catch((error) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '找不到商品',
            content: error.response.data.message
          })
        })
    },
    updateCartItem (product) {
      const data = {
        product_id: product.id,
        qty: product.qty
      }
      this.isDisabled = 'add'
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      let method = 'post'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${product.id}`
        method = 'put'
      }
      this.$http[method](api, { data })
        .then((response) => {
          this.emitter.emit('push-message', {
            style: 'success',
            title: '購物提示',
            content: response.data.message
          })
          this.isDisabled = ''
          emitter.emit('get-cart')
        })
        .catch((error) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '無法更新',
            content: error.response.data.message
          })
        })
    },
    toggleFavorite (id) {
      const favoriteIndex = this.favorite.findIndex((item) => item === id)
      if (favoriteIndex === -1) {
        this.favorite.push(id)
        this.emitter.emit('push-message', {
          style: 'success',
          title: '已加入收藏'
        })
      } else {
        this.favorite.splice(favoriteIndex, 1)
        this.emitter.emit('push-message', {
          style: 'success',
          title: '已移除收藏'
        })
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
