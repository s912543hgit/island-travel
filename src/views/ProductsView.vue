<template>
    <VueLoading :active="isLoading"></VueLoading>
    <div class="section">
      <div class="background-image background-image--products"></div>
      <div class="background-title">
        <h2 class="fw-bold">產品列表</h2>
      </div>
    </div>
    <div class="container mt-md-5 mt-3 mb-5">
      <div class="row">
        <div class="col-md-3 position-relative">
          <ul class="p-category">
            <li class="list-group-item list-group-item-action"
                :class="{ active: isActive === 'all' }">
              <a class="px-3 px-md-4 py-1" href="#"
              @click.prevent="getProducts(1)"> 全部</a>
            </li>
            <li class="list-group-item list-group-item-action"
                :class="{ active: isActive === '日本' }">
              <a class="px-3 px-md-4 py-1" href="#"
              @click.prevent="getProducts(1,'日本')"> 日本</a>
            </li>
            <li class="list-group-item list-group-item-action"
                :class="{ active: isActive === '太平洋' }">
              <a class="px-3 px-md-4 py-1"  href="#"
              @click.prevent="getProducts(1,'太平洋')"> 太平洋</a>
            </li>
            <li class="list-group-item list-group-item-action"
                :class="{ active: isActive === '其他' }">
              <a class="px-3 px-md-4 py-1" href="#"
              @click.prevent="getProducts(1,'其他')"> 其他</a>
            </li>
          </ul>
        </div>
        <!-- products list -->
        <div class="col-md-9">
          <div class="row row-cols-1 row-cols-md-2">
            <div class="col" v-for="product in products" :key="product.id">
              <!-- products card -->
                <div class="card mb-4 p-card">
                  <div class="p-card__image" :style="{backgroundImage: `url(${product.imageUrl})`}">
                    <RouterLink :to="`/product/${product.id}`" class="hover-area">
                      <button class="btn btn-primary px-5 me-2">查看商品</button>
                    </RouterLink>
                  </div>
                  <RouterLink :to="`/product/${product.id}`" class="card-body p-4 bg-white">
                    <div>
                      <a href="#" class="border rounded-circle p-2 me-4"
                        @click.prevent="toggleFavorite(product.id)">
                        <span v-if="favorite.includes(product.id)">
                          <i v-if="favorite.includes(product.id)" class="bi bi-suit-heart-fill"></i>
                        </span>
                        <i v-else class="bi bi-suit-heart"></i>
                      </a>
                    </div>
                    <h4 class="mb-0 mt-3 text-left">{{ product.title }}</h4>
                    <div class="row align-items-center">
                      <p class="text-muted col-6">
                        <del>NT${{ product.origin_price }}</del>
                      </p>
                      <p class="text-end col-6">
                        <span class="h4 fw-bold text-primary ms-2">NT${{ product.price }}</span>
                      </p>
                    </div>
                    <button class="btn btn-primary w-100"
                    @click.prevent="addToCart(product.id)"
                    :disabled="isLoadingItem === product.id">
                    <span class="spinner-border spinner-border-sm"
                    role="status" v-show="isLoadingItem === product.id"></span>
                    加入購物車
                  </button>
                  </RouterLink>
                </div>
            </div>
          </div>
          <PaginationView :pages="pagination"
          @emit-pages="getProducts"
          class="justify-content-center d-flex mt-5" ></PaginationView>
        </div>
      </div>
    </div>
</template>

<script>
import emitter from '@/libs/emitter'
import PaginationView from '@/components/PaginationView.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      currentPage: 1,
      isLoading: false,
      id: '',
      productId: '',
      isLoadingItem: '',
      isActive: '',
      category: '',
      // 從localStorage中取出的資料 必須給予預設值
      favorite: JSON.parse(localStorage.getItem('favorite')) || []
    }
  },
  components: {
    PaginationView
  },
  inject: ['emitter'],
  methods: {
    getProducts (page = 1, category) {
      this.isActive = category
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      if (category) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?category=${category}`
      } else {
        this.isActive = 'all'
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
          emitter.emit('get-cart')
        })
    },
    toggleFavorite (id) {
      // findIndex 尋找陣列中符合對象並返回index 若沒有合適的會回傳-1
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
    }
  },
  mounted () {
    this.emitter.on('sendCategory', (data) => {
      console.log('hello', data)
      this.category = data
    })
    this.getProducts(1, '')
  }
}
</script>
