<template>
    <Loading :active="isLoading"></Loading>
    <div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 400px;">
      <div class="position-absolute background-image background-image--products"></div>
      <h2 class="fw-bold" style="z-index: 2;">產品列表</h2>
    </div>
    <div class="container mt-md-5 mt-3 mb-5">
      <ul class="list-unstyled d-flex justify-content-center mt-3 gap-2 mb-5 p-category">
        <li class="btn btn-outline-primary p-0" :class="{ active: isCheck }">
          <a class="px-3 px-md-4 py-1" href="" @click.prevent="getProducts(1)"> 全部</a>
        </li>
        <li class="btn btn-outline-primary p-0" :class="{ active: isCheck }">
          <a @click="getProducts" class="px-3 px-md-4 py-1" href="#" @click.prevent="getProducts(1,'日本')"> 日本</a>
        </li>
        <li class="btn btn-outline-primary p-0" :class="{ active: isCheck }">
          <a class="px-3 px-md-4 py-1"  href="#"  @click.prevent="getProducts(1,'太平洋')"> 太平洋</a>
        </li>
        <li class="btn btn-outline-primary p-0" :class="{ active: isCheck }">
          <a class="px-3 px-md-4 py-1" href="#"  @click.prevent="getProducts(1,'其他')"> 其他</a>
        </li>
      </ul>
      <div class="row">
        <!-- products list -->
        <div class="col-md-12">
          <!-- 透過外層來決定內層的排列手法 -->
          <div class="row row-cols-1 row-cols-md-2">
            <div class="col" v-for="product in products" :key="product.id">
              <!-- products card -->
                <div class="card border-0 mb-4 position-relative p-card">
                  <div class="p-card__image" :style="{backgroundImage: `url(${product.imageUrl})`}">
                    <div class="hover-area">
                      <router-link class="btn btn-outline-primary px-5 me-2" :to="`/product/${product.id}`">查看商品</router-link>
                      <button type="button" class="btn btn-outline-primary px-5" @click="addToCart(product.id)" :disabled="isLoadingItem === product.id">
                        <span class="spinner-border spinner-border-sm" role="status" v-show="isLoadingItem === product.id"></span>
                        加到購物車
                      </button>
                    </div>
                  </div>
                  <div class="card-body p-4 bg-white">
                    <h4 class="mb-0 mt-3 text-left">{{ product.title }}</h4>
                    <div class="row align-items-center">
                      <p class="text-muted col-6">原價<del>NT${{ product.origin_price }}</del></p>
                      <p class="text-end col-6">特價<span class="h4 fw-bold text-danger ms-2">NT${{ product.price }}</span></p>
                    </div>
                    <p class="text-muted mt-3 text-left" style="height: 4.5rem; overflow: hidden;">{{ product.description }}</p>
                  </div>
                </div>
            </div>
          </div>
          <!-- 內層:pages,外層:pagination -->
          <Pagination :pages="pagination" @emit-pages="getProducts" class="justify-content-center d-flex mt-5" ></Pagination>
        </div>
      </div>
    </div>
</template>

<script>
import emitter from '@/libs/emitter'
import Pagination from '@/components/PaginationView.vue'
import Loading from 'vue-loading-overlay'
export default {
  data () {
    return {
      products: [],
      pagination: {},
      currentPage: 1,
      isLoading: false,
      id: '',
      productId: '',
      isCheck: false,
      isLoadingItem: ''
    }
  },
  components: {
    Pagination,
    Loading
  },
  inject: ['emitter'],
  methods: {
    getProducts (page = 1, category) {
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      if (category) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?category=${category}`
      }
      this.isLoading = true
      this.$http.get(url)
        .then(res => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        })
    },
    addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
      this.isLoadingItem = id
      this.$http.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((response) => {
          this.emitter.emit('push-message', {
            style: 'success',
            title: '購物提示',
            content: response.data.message
          })
          this.isLoadingItem = ''
          // 觸發設置的監聽
          emitter.emit('get-cart')
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
