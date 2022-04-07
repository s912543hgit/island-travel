<template>
    <VueLoading :active="isLoading"></VueLoading>
    <div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 400px;">
      <div class="position-absolute background-image background-image--favorite"></div>
      <div class="background-title">
        <h2 class="fw-bold">收藏清單</h2>
      </div>
    </div>
    <div class="container mt-md-5 mt-3 mb-5">
      <div v-if="favoritesList.length">
        <h3 class="fs-4 text-center p-4 text-primary">已收藏的行程</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="border-0 ps-0">商品名稱</th>
              <th scope="col" class="border-0">價格</th>
              <th scope="col" class="border-0">狀態</th>
              <th scope="col" class="border-0">移除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in favoritesList" :key="item.id" class="border-bottom border-top">
              <th scope="row" class="border-0 px-0 font-weight-normal py-4">
                <router-link  :to="`/product/${item.id}`">
                  <img :src="item.imageUrl" alt="" style="width: 80px; height: 80px; object-fit: cover;">
                  <p class="mb-0 fw-bold ms-3 d-inline-block">{{ item.title }}</p>
                </router-link>
              </th>
              <td class="border-0 align-middle" style="max-width: 160px;">
                  <p class="">NT{{ item.price }}</p>
              </td>
              <td class="border-0 align-middle">
                <button class="btn-primary btn" type="button" @click="addToCart(item.id)" :disabled="isLoadingItem === item.id">
                  <span class="spinner-border spinner-border-sm" role="status" v-show="isLoadingItem === item.id"></span>
                  加入購物車
                </button>
              </td>
              <!-- 刪除按鈕 -->
              <td class="border-0 align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeFavorite(item.id)">
                x
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="d-flex flex-column justify-content-center align-items-center" style="min-height: 60vh;">
        <h3 class="text-center">目前還沒有收藏行程唷！快去逛逛吧！</h3>
        <router-link  to="/products" class="btn btn-primary mt-5" @click="isOpen = !isOpen">開始旅程</router-link>
      </div>
    </div>
</template>
<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      products: [],
      favoritesList: [],
      isLoadingItem: '',
      isLoading: false,
      favorite: JSON.parse(localStorage.getItem('favorite')) || []
    }
  },
  inject: ['emitter'],
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/`
      this.isLoading = true
      this.$http.get(api).then((res) => {
      // 將產品列表帶入空陣列
        this.products = res.data.products
        this.getFavorites()
        this.isLoading = false
      })
      // 失敗的結果
        .catch((error) => {
          console.dir(error)
        })
    },
    getFavorites () {
      // 取得我的最愛
      this.favoritesList = this.products.filter(
        (item) => this.favorite.indexOf(item.id) > -1
      )
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
    },
    removeFavorite (id) {
      const favoriteId = this.favorite.indexOf(id)
      //  如果有找到
      if (favoriteId !== -1) {
        this.isLoading = true
        this.favorite.splice(favoriteId, 1)
        localStorage.setItem('favorite', JSON.stringify(this.favorite))
        this.getFavorites()
        this.isLoading = false
        this.emitter.emit('push-message', {
          style: 'success',
          title: '已刪除'
        })
      }
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
