<template>
    <Loading :active="isLoading"></Loading>
    <div class="container">
      <div class="mt-3">
        <h3 class="mt-3 mb-4">購物車</h3>
        <template v-if="cartData.carts">
          <div class="row">
            <div class="col-md-8">
              <table class="table">
                <thead>
                  <tr v-for="item in cartData.carts" :key="item.id">
                    <th scope="col" class="border-0 ps-0">品名</th>
                    <th scope="col" class="border-0">數量</th>
                    <th scope="col" class="border-0">單價</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cartData.carts" :key="item.id" class="border-bottom border-top">
                    <th scope="row" class="border-0 px-0 font-weight-normal py-4">
                      <img :src="item.product.imageUrl" alt="" style="width: 72px; height: 72px; object-fit: cover;">
                      <p class="mb-0 fw-bold ms-3 d-inline-block">{{ item.product.title }}</p>
                    </th>
                    <td class="border-0 align-middle" style="max-width: 160px;">
                      <div class="input-group pe-5">
                        <div class="input-group-prepend">
                          <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1">
                            <i class="fas fa-minus"></i>
                          </button>
                        </div>
                          <div class="input-group input-group-sm">
                            <div class="input-group mb-3">
                                <select  id="" class="form-select" v-model="item.qty" @change="updateCartItem(item)"
                                :disabled="isLoadingItem === item.id">
                                  <option v-for="num in 20" :value="num" :selected="item.qty === num" :key="`${num}-${item.id}`" >{{ num }}</option>
                                </select>
                              <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                            </div>
                          </div>
                        <!-- <input type="text" class="form-control border-0 text-center my-auto shadow-none" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" value="1"> -->
                        <div class="input-group-append">
                          <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2">
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td class="border-0 align-middle"><p class="mb-0 ms-auto">NT{{ item.product.price }}</p></td>
                    <td class="border-0 align-middle">
                      <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                      <i class="fas fa-spinner fa-pulse" v-show="isLoadingItem === item.id"></i>
                      x
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- <div class="input-group w-50 mb-3">
                <input type="text" class="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none" placeholder="Coupon Code" aria-label="Recipient's username" aria-describedby="button-addon2">
                <div class="input-group-append">
                  <button class="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0" type="button" id="button-addon2"><i class="fas fa-paper-plane"></i></button>
                </div>
              </div> -->
              <div class="text-end">
                <button class="btn btn-outline-danger" type="button" @click="clearCartItem">清空購物車</button>
              </div>
            </div>
            <div class="col-md-4">
              <div class="border p-4 mb-4">
                <h4 class="fw-bold mb-4">Order Detail</h4>
                <table class="table text-muted border-bottom">
                  <tbody>
                    <tr>
                      <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">Subtotal</th>
                      <td class="text-end border-0 px-0 pt-4">NT${{ cartData.total }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">Payment</th>
                      <td class="text-end border-0 px-0 pt-0 pb-4">ApplePay</td>
                    </tr>
                  </tbody>
                </table>
                <div class="d-flex justify-content-between mt-4">
                  <p class="mb-0 h4 fw-bold">Total</p>
                  <p class="mb-0 h4 fw-bold">NT${{ cartData.total }}</p>
                </div>
                <a href="./checkout.html" class="btn btn-dark w-100 mt-4">確認訂單</a>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
</template>

<script>
import emitter from '@/libs/emitter'
import Loading from 'vue-loading-overlay'
export default {
  data () {
    return {
      cartData: {},
      products: [],
      productId: '',
      isLoadingItem: '',
      isLoading: false
    }
  },
  components: {
    Loading
  },
  methods: {
    getProducts () {
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products
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
    addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
      this.isLoadingItem = id
      this.$http.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((res) => {
          this.isLoadingItem = ''
          // 觸發navbar上的監聽行為
          emitter.emit('get-cart')
        })
    },
    // 刪除產品
    removeCartItem (id) {
      this.$http.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then((res) => {
          this.getCart()
          this.isLoadingItem = ''
        })
    },
    // 清空購物車
    clearCartItem () {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts/`)
        .then((res) => {
          this.getCart()
          this.isLoading = false
        })
    },
    // 更新購物車
    updateCartItem (item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.isLoading = true
      this.$http.put(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`, { data }).then((res) => {
        this.getCart()
        this.isLoading = false
      })
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
