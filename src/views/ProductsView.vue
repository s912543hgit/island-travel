<template>
    <Loading :active="isLoading"></Loading>
    <div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 400px;">
      <div class="position-absolute" style="top:0; bottom: 0; left: 0; right: 0; background-image: url(https://images.unsplash.com/photo-1542028378254-8e17303266ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80); background-position: center center; opacity: 0.5;"></div>
      <h2 class="fw-bold">產品列表</h2>
    </div>
    <div class="container mt-md-5 mt-3 mb-5">
      <ul class="list-unstyled d-flex justify-content-center mt-3 gap-2 mb-5 p-category">
        <li class="btn btn-outline-primary p-0">
          <a class="px-3 px-md-4 py-1" href="" @click.prevent="getProducts(1)"> 全部</a>
        </li>
        <li class="btn btn-outline-primary p-0">
          <a @click="getProducts" class="px-3 px-md-4 py-1" href="" @click.prevent="getProducts(1,'日本')"> 日本</a>
        </li>
        <li class="btn btn-outline-primary p-0">
          <a class="px-3 px-md-4 py-1" href=""  @click.prevent="getProducts(1,'大洋洲')"> 大洋洲</a>
        </li>
        <li class="btn btn-outline-primary p-0">
          <a class="px-3 px-md-4 py-1" href=""  @click.prevent="getProducts(1,'太平洋')"> 太平洋</a>
        </li>
        <li class="btn btn-outline-primary p-0">
          <a class="px-3 px-md-4 py-1" href=""  @click.prevent="getProducts(1,'南亞')"> 其他</a>
        </li>
      </ul>
      <div class="row">
        <!-- products list -->
        <div class="col-md-12">
          <!-- 透過外層來決定內層的排列手法 -->
          <div class="row row-cols-1 row-cols-md-2">
            <div class="col" v-for="product in products" :key="product.id">
              <!-- products card -->
              <!-- <router-link :to="`/product/${product.id}`"> -->
                <div class="card border-0 mb-4 position-relative position-relative p-card">
                  <div :style="{backgroundImage: `url(${product.imageUrl})`}"
                     style="height: 400px; background-size: cover; background-position:center "></div>
                  <a href="#" class="text-dark">
                    <i class="far fa-heart position-absolute" style="right: 16px; top: 16px"></i>
                  </a>
                  <div class="card-body p-0 bg-light">
                    <h4 class="mb-0 mt-3 text-left">{{ product.title }}</h4>
                    <p class="card-text mb-0 text-left">NT{{ product.origin_price }} <span class="text-muted text-center"><del>NT{{ product.price }}</del></span></p>
                    <p class="text-muted mt-3 text-left" style="height: 4.5rem; overflow: hidden;">{{ product.description }}</p>
                  </div>
                </div>
                <a class="btn btn-primary mt-4 px-5" @click="addToCart(product.id)">加入購物車</a>
                <router-link class="btn btn-primary mt-4 px-5" :to="`/product/${product.id}`">查看商品</router-link>
              <!-- </router-link> -->
            </div>
          </div>
          <!-- 內層:pages,外層:pagination -->
          <Pagination :pages="pagination" @emit-pages="getProducts" class="justify-content-center d-flex" ></Pagination>
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
      productId: ''
    }
  },
  components: {
    Pagination,
    Loading
  },
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
      this.$http.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((res) => {
          console.log(res)
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
