<template>
  <VueLoading :active="isLoading"/>
  <div :class="toggleCart ? 'open' : ''">
    <nav class="cartNav">
      <div class="cartNav__inner">
        <div class="cartNav__header">
          <p>購物車</p>
          <span class="icon--close cartNav__close" @click="closeCart"></span>
        </div>
        <template v-if="cartData.carts.length">
          <ul class="cart__list">
            <li
              class="card cart__card"
              v-for="item in cartData.carts"
              :key="item.id">
                <div class="d-flex justify-content-between">
                  <span class="icon--close icon-close--sp cartNav__close" @click="openDelModal(item)"></span>
                  <img :src="item.product.imageUrl" class="cart__image w-auto" :alt="item.product.title">
                  <div class="cart__card__content">
                    {{ item.product.title }}
                    <div class="input-group cart__count">
                      <div class="input-group input-group-sm">
                        <div class="input-group my-2">
                          <select
                            class="form-select"
                            v-model="item.qty"
                            @change="updateCartItem(item)"
                            :disabled="isLoadingItem === item.id">
                            <option selected>請選擇人數</option>
                            <option v-for="num in 20"
                              :value="num"
                              :selected="item.qty === num"
                              :key="`${num}-${item.id}`" >
                              {{ num }}
                            </option>
                          </select>
                          <span class="input-group-text">{{ item?.product?.unit }}</span>
                        </div>
                      </div>
                    </div>
                    <p class="mb-0 ms-auto">小計: NT$ {{ item?.product?.price }}</p>
                  </div>
                </div>
            </li>
          </ul>
          <div class="cart__footer">
            <div class="cart__info">
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">總金額</th>
                    <td class="text-end border-0 px-0 pt-4">NT${{ cartData.total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="text-center">
            <RouterLink to="/cart" class="text-white" @click="closeCart">
              <button class="btn btn-primary mt-4 w-100 py-3" type="button">
                前往購物車
              </button>
            </RouterLink>
            <button
              class="btn btn-outline-danger mt-3 py-2"
              type="button"
              :disabled="isDisabled === 'clear'"
              @click="openModal()"
            >
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                v-show="isDisabled === 'clear'">
              </span>
              清空購物車
            </button>
          </div>
        </template>
        <div v-else class="p-product--none d-flex flex-column justify-content-center align-items-center">
          <p>購物車內沒有商品唷</p>
          <RouterLink  to="/products" class="button--jump" @click="closeCart">開始旅程</RouterLink>
        </div>
      </div>
    </nav>
    <div class="cartNav__mask" :class="toggleCart ? 'open' : ''" @click="closeCart"></div>
  </div>
  <CautionModal ref="cautionModal" @clear-item="clearCartItem"/>
  <CautionDelModal :item="tempProduct" ref="cautionDelModal" @del-product="removeCartItem"/>
</template>

<script>
import emitter from '@/libs/emitter'
import CautionModal from '@/components/CautionModal.vue'
import CautionDelModal from '@/components/CautionDelModal.vue'

export default {
  data () {
    return {
      cartData: {
        carts: {}
      },
      tempProduct: {},
      isLoading: false,
      isLoadingItem: '',
      isDisabled: '',
      toggleCart: false
    }
  },
  components: {
    CautionModal,
    CautionDelModal
  },
  inject: ['emitter'],
  methods: {
    openCart () {
      this.toggleCart = true
    },
    closeCart () {
      this.toggleCart = false
    },
    getCart () {
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((response) => {
          this.cartData = response.data.data
        })
        .catch((error) => {
          this.emitter.emit('push-message', {
            title: '找不到產品',
            content: error.response.data.message
          })
        })
    },
    removeCartItem (id) {
      this.isLoading = true
      const cautionDelModal = this.$refs.cautionDelModal
      this.$http.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${this.tempProduct.id}`)
        .then((response) => {
          this.getCart()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '購物提示',
            content: response.data.message
          })
          emitter.emit('get-cart')
          cautionDelModal.hideModal()
          this.isLoading = false
        })
        .catch((error) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '無法刪除',
            content: error.response.data.message
          })
        })
    },
    clearCartItem () {
      this.isLoading = true
      const cautionModal = this.$refs.cautionModal
      this.$http.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts/`)
        .then((response) => {
          this.getCart()
          this.emitter.emit('push-message', {
            title: '已清空購物車'
          })
          emitter.emit('get-cart')
          cautionModal.hideModal()
          this.isLoading = false
        })
        .catch((error) => {
          this.emitter.emit('push-message', {
            title: '清空失敗',
            content: error.response.data.message
          })
        })
    },
    updateCartItem (item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.isLoading = true
      this.$http.put(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`, { data })
        .then((response) => {
          this.getCart()
          this.isLoading = false
        })
        .catch((error) => {
          this.emitter.emit('push-message', {
            title: '更新失敗',
            content: error.response.data.message
          })
        })
    },
    openModal () {
      const cautionModal = this.$refs.cautionModal
      cautionModal.openModal()
    },
    openDelModal (item) {
      this.tempProduct = { ...item }
      const cautionDelModal = this.$refs.cautionDelModal
      cautionDelModal.openModal()
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
