<template>
    <div :class="toggleCart ? 'open' : ''">
        <nav class="cartNav">
          <div class="cartNav__inner">
            <div class="cartNav__header">
              <p>購物車</p>
              <span class="icon--close cartNav__close" @click="closeCart"></span>
            </div>
            <template v-if="cartData.carts.length">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" class="border-0 ps-0">品名</th>
                    <th scope="col" class="border-0">數量</th>
                    <th scope="col" class="border-0">單價</th>
                  </tr>
                </thead>
                <tr v-for="item in cartData.carts" :key="item.id" class="border-bottom border-top">
                  <th scope="row" class="border-0 px-0 font-weight-normal py-4">
                    <img :src="item.product.imageUrl" alt="" style="width: 72px; height: 72px; object-fit: cover;">
                    <p class="mb-0 fw-bold ms-3 d-inline-block">{{ item.product.title }}</p>
                  </th>
                  <td class="border-0 align-middle" style="max-width: 160px;">
                    <div class="input-group pe-0 pe-sm-5">
                      {{ item.qty }}
                      <span>{{ item.product.unit }}</span>
                    </div>
                  </td>
                  <td class="border-0 align-middle"><p class="mb-0 ms-auto">NT{{ item.product.price }}</p></td>
                  <td class="border-0 align-middle">
                    <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                    <i class="fas fa-spinner fa-pulse"></i>
                    x
                    </button>
                  </td>
                </tr>
              </table>
              <div class="text-center">
                <RouterLink to="/cart" class="text-white" @click="closeCart">
                  <button class="btn btn-primary mt-4 w-100 py-3" type="button">
                    前往購物車
                  </button>
                </RouterLink>
                <button @click="clearCartItem" class="btn btn-outline-danger mt-3 py-2" type="button" :disabled="isDisabled === 'clear'">
                  <span class="spinner-border spinner-border-sm" role="status" v-show="isDisabled === 'clear'"></span>
                  清空購物車
                </button>
              </div>
            </template>
            <div v-else class="p-product--none d-flex flex-column justify-content-center align-items-center">
              <p>購物車內沒有商品唷</p>
              <RouterLink  to="/products" class="btn btn-primary" @click="closeCart">開始旅程</RouterLink>
            </div>
          </div>
        </nav>
        <div class="cartNav__mask" :class="toggleCart ? 'open' : ''" @click="closeCart"></div>
    </div>
</template>
<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      cartData: {
        carts: {}
      },
      isLoading: false,
      isDisabled: '',
      toggleCart: false
    }
  },
  methods: {
    openCart () {
      this.toggleCart = true
    },
    closeCart () {
      this.toggleCart = false
      // this.$emitter.emit('toggle-overlay', false)
    },
    getCart () {
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          // 購物車的資料有兩層data
          this.cartData = res.data.data
        })
    },
    // 刪除產品
    removeCartItem (id) {
      this.$http.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then((res) => {
          this.getCart()
          emitter.emit('get-cart')
        })
    },
    // 清空購物車
    clearCartItem () {
      this.isDisabled = 'clear'
      this.$http.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts/`)
        .then((res) => {
          this.getCart()
          this.isDisabled = ''
          emitter.emit('get-cart')
        })
    }
  },
  mounted () {
    this.getCart()
    emitter.on('get-cart', () => {
      this.getCart()
    })
    emitter.on('toggle-cart', (val) => {
      if (val) {
        this.toggleCart = true
      } else {
        this.toggleCart = false
      }
    })
  }
}
</script>
