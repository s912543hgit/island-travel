<template>
    <VueLoading :active="isLoading"></VueLoading>
    <div class="section">
      <div class="background-image background-image--cart"></div>
      <div class="background-title">
        <h2 class="fw-bold">填寫資料</h2>
      </div>
    </div>
    <div class="container mb-5">
        <template v-if="cartData.carts.length">
          <ul class="p-steps list-unstyled mt-5 mb-5">
            <li class="col-4 is-active mb-md-0 mb-3">
              <small>STEP1</small>
              <p>填寫資料</p>
            </li>
            <li class="col-4 mb-md-0 mb-3">
              <small>STEP2</small>
              <p>確認訂單</p>
            </li>
            <li class="col-4">
              <small>STEP3</small>
              <p>完成訂單</p>
            </li>
          </ul>
          <div>
            <div>
              <h4 class="mb-3">購物車</h4>
              <!-- pc -->
              <table class="table cart__table">
                <thead>
                  <tr>
                    <th scope="col" class="border-0">商品圖片</th>
                    <th scope="col" class="border-0">商品名稱</th>
                    <th scope="col" class="border-0">數量</th>
                    <th scope="col" class="border-0">單價</th>
                    <th scope="col" class="border-0">刪除</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in cartData.carts"
                    :key="item.id"
                    class="border-bottom border-top">
                    <th scope="row" class="border-0  font-weight-normal py-4">
                      <img :src="item.product.imageUrl" class="cart__image" :alt="item.product.title">
                    </th>
                    <td class="border-0 align-middle">
                      <p class="mb-0 fw-bold ms-3 d-inline-block">{{ item?.product?.title }}</p>
                    </td>
                    <td class="border-0 align-middle">
                      <div class="input-group cart__count">
                          <div class="input-group input-group-sm">
                            <div class="input-group mb-3">
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
                    </td>
                    <td class="border-0 align-middle">
                      <p class="mb-0 ms-auto">NT {{ item?.product?.price }}</p>
                    </td>
                    <td class="border-0 align-middle">
                      <i class="bi bi-trash-fill fs-5" role="button" @click="openDelModal(item)"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- sp -->
              <ul class="cart__list d-md-none">
                <li
                  class="card cart__card"
                  v-for="item in cartData.carts"
                  :key="item.id">
                  <div class="d-flex justify-content-between">
                    <span class="icon--close icon-close--sp cartNav__close" @click="openDelModal(item)"></span>
                    <img :src="item.product.imageUrl" class="cart__image" :alt="item.product.title">
                    <div class="cart__card__content">
                      {{ item.product.title }}
                        <div class="input-group cart__count">
                          <div class="input-group input-group-sm">
                            <div class="input-group">
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
                      <p class="mb-0 ms-auto">小計: NT {{ item?.product?.price }}</p>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="text-end">
                <button
                  class="btn btn-outline-danger"
                  type="button"
                  @click="openModal()"
                  :disabled="isDisabled === 'clear'">
                  <span class="spinner-border spinner-border-sm"
                  role="status" v-show="isDisabled === 'clear'"></span>
                  清空購物車
                </button>
              </div>
            </div>
            <div class="cart__order">
              <div class="cart__info">
                <h4 class="mb-3">訂單摘要</h4>
                <!-- <div class="cart__info__inner">
                  <table class="cart__info__form">
                    <tr>
                      <th>預計旅程: </th>
                      <td><span class="me-2">{{ cartData?.carts?.length }}</span>套</td>
                    </tr>
                    <tr>
                      <th>金額總計: </th>
                      <td><span class="cart__price">NT${{ cartData.total }}</span></td>
                    </tr>
                  </table>
                </div> -->
                <div class="my-4">
                  <div class="d-flex mb-3" v-for="item in cartData.carts" :key="item.id">
                    <img :src="item.product.imageUrl" alt="" class="me-3 cart__image">
                    <div class="w-100">
                      <div class="d-flex justify-content-between">
                        <p class="mb-0 fw-bold">{{ item.product.title }}</p>
                        <p class="mb-0">NT${{ item.product.price }}</p>
                      </div>
                      <p class="mb-0 fw-bold mt-4">{{ item.qty }}人</p>
                    </div>
                  </div>
                  <table class="table mt-4 border-top border-bottom text-muted">
                    <tbody>
                      <tr>
                        <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">總金額</th>
                        <td class="text-end border-0 px-0 pt-4">NT${{ cartData.total }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-flex justify-content-between mt-4">
                    <p class="mb-0 h4 fw-bold">訂單金額</p>
                    <p class="mb-0 h4 fw-bold text-primary">NT${{ cartData.total }}</p>
                  </div>
                </div>
              </div>
              <div class="cart__form">
                <h4 class="mb-3">填寫訂購資訊</h4>
                <VueForm ref="form" v-slot="{ errors }" @submit="sendData()">
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <VueField id="email" name="email" type="email" class="form-control"
                      :class="{ 'is-invalid': errors['email'] }"
                      placeholder="請輸入 Email" rules="email|required"
                      v-model="form.user.email" ></VueField>
                    <error-message name="email" class="invalid-feedback"></error-message>
                  </div>
                  <div class="mb-3">
                    <label for="name" class="form-label">收件人姓名</label>
                    <VueField id="name" name="姓名" type="text" class="form-control"
                      :class="{ 'is-invalid': errors['姓名'] }"
                      placeholder="請輸入姓名" rules="required" v-model="form.user.name"></VueField>
                    <error-message name="姓名" class="invalid-feedback"></error-message>
                  </div>
                  <div class="mb-3">
                    <label for="tel" class="form-label">收件人電話</label>
                    <VueField id="tel" name="電話" type="text" class="form-control"
                      :class="{ 'is-invalid': errors['電話'] }"
                      placeholder="請輸入電話"  :rules="isPhone" v-model="form.user.tel"></VueField>
                    <error-message name="電話" class="invalid-feedback"></error-message>
                  </div>
                  <div class="mb-3">
                    <label for="address" class="form-label">收件人地址</label>
                    <VueField id="address" name="地址" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['地址'] }"
                    placeholder="請輸入地址" rules="required" v-model="form.user.address"></VueField>
                    <error-message name="地址" class="invalid-feedback"></error-message>
                  </div>
                  <div class="mb-3">
                    <label for="message" class="form-label">留言</label>
                    <textarea id="message" class="form-control" cols="30" rows="10"
                     v-model="form.message"></textarea>
                  </div>
                  <div class="text-end">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      :disabled="isDisabled === 'send'">
                      <span class="spinner-border spinner-border-sm"
                      role="status" v-show="isDisabled === 'send'">
                    </span>
                      送出訂單
                    </button>
                  </div>
                </VueForm>
              </div>
            </div>
          </div>
        </template>
        <div v-else class="container--center">
          <p>購物車內沒有商品唷</p>
          <RouterLink
            class="btn btn-primary"
            to="/products"
            @click="isClicked = !isClicked">
            開始旅程
        </RouterLink>
        </div>
      </div>
      <CautionModal ref="cautionModal" @clear-item="clearCartItem"></CautionModal>
      <CautionDelModal :item="tempProduct" ref="cautionDelModal" @del-product="removeCartItem"></CautionDelModal>
</template>

<script>
import emitter from '@/libs/emitter'
import CautionModal from '@/components/CautionModal.vue'
import CautionDelModal from '@/components/CautionDelModal.vue'

export default {
  data () {
    return {
      cartData: {
        carts: []
      },
      products: [],
      productId: '',
      isLoadingItem: '',
      isLoading: false,
      isDisabled: '',
      tempProduct: {},
      form: {
        user: {
          email: '',
          name: '',
          address: '',
          tel: ''
        },
        message: ''
      }
    }
  },
  components: {
    CautionModal,
    CautionDelModal
  },
  emits: ['emit-form'],
  inject: ['emitter'],
  methods: {
    getCart () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
          this.isLoading = false
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
    },
    clearCartItem () {
      this.isLoading = true
      const cautionModal = this.$refs.cautionModal
      this.$http.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts/`)
        .then((res) => {
          this.getCart()
          this.isLoading = false
          this.emitter.emit('push-message', {
            title: '已清空購物車'
          })
          cautionModal.hideModal()
          emitter.emit('get-cart')
        })
    },
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
    },
    sendData () {
      this.isDisabled = 'send'
      this.$router.push('/confirm')
      // 送出表單內的資料給FrontView
      this.$emit('emit-form', this.form)
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    isRequired (value) {
      return value ? true : 'This field is required'
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
    this.isClicked = false
  }
}
</script>
