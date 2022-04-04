<template>
    <VueLoading :active="isLoading"></VueLoading>
    <div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 400px;">
      <div class="position-absolute background-image background-image--cart"></div>
      <h2 class="fw-bold" style="z-index: 2;">填寫資料</h2>
    </div>
    <div class="container  mb-5">
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
          <div class="row mb-5 justify-content-between">
            <div class="col-md-5">
              <h3 class="mb-3">購物車內容</h3>
              <table class="table">
                <thead>
                  <tr>
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
                      <div class="input-group pe-0 pe-sm-5">
                        <div class="input-group-prepend">
                          <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1">
                            <i class="fas fa-minus"></i>
                          </button>
                        </div>
                          <div class="input-group input-group-sm">
                            <div class="input-group mb-3">
                                <select id="" class="form-select" v-model="item.qty" @change="updateCartItem(item)"
                                :disabled="isLoadingItem === item.id">
                                <option selected>請選擇人數</option>
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
                      <span class="spinner-border spinner-border-sm" role="status" v-show="isLoadingItem === item.id"></span>
                      <i class="bi bi-x-circle"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <p class="text-end border-0 px-0 pt-4">總計金額 NT${{ cartData.total }}</p>
              </div>
              <div class="text-end">
                <button class="btn btn-outline-danger" type="button" @click="clearCartItem">
                  清空購物車
                </button>
              </div>
            </div>
            <div class="col-md-5 mt-5 mt-md-0">
              <h3 class="mb-3">填寫訂購資訊</h3>
              <Form ref="form" class="col-md-10" v-slot="{ errors }" @submit="SendData()">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <Field id="email" name="email" type="email" class="form-control"
                           :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email"  rules="email|required"
                          v-model="form.user.email" ></Field>
                  <error-message name="email" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                  <label for="name" class="form-label">收件人姓名</label>
                  <Field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                           placeholder="請輸入姓名" rules="required" v-model="form.user.name"></Field>
                  <error-message name="姓名" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                  <label for="tel" class="form-label">收件人電話</label>
                  <Field id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                           placeholder="請輸入電話"  :rules="isPhone" v-model="form.user.tel"  ></Field>
                  <error-message name="電話" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label">收件人地址</label>
                  <Field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                           placeholder="請輸入地址" rules="required" v-model="form.user.address"  ></Field>
                  <error-message name="地址" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                  <label for="message" class="form-label">留言</label>
                  <textarea id="message" class="form-control" cols="30" rows="10"  v-model="form.message"></textarea>
                </div>
                <div class="text-end">
                  <button type="submit" class="btn btn-primary">送出訂單</button>
                </div>
              </Form>
            </div>
          </div>
        </template>
        <div v-else class="p-product--none d-flex flex-column justify-content-center align-items-center">
          <p>購物車內沒有商品唷</p>
          <router-link  to="/products" class="btn btn-primary">開始旅程</router-link>
        </div>
      </div>
</template>

<script>
import emitter from '@/libs/emitter'
// import Loading from 'vue-loading-overlay'
import { Field, Form } from 'vee-validate'

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
      form: {
        user: {
          email: '',
          name: '',
          address: '',
          phone: ''
        },
        message: ''
      }
    }
  },
  components: {
    Field,
    Form
  },
  emits: ['emit-form'],
  inject: ['emitter'],
  methods: {
    getCart () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          // 購物車的資料有兩層data
          this.cartData = res.data.data
          this.isLoading = false
        })
    },
    // 刪除產品
    removeCartItem (id) {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then((response) => {
          this.getCart()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '購物提示',
            content: response.data.message
          })
          emitter.emit('get-cart')
          this.isLoading = false
        })
    },
    // 清空購物車
    clearCartItem () {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts/`)
        .then((res) => {
          this.getCart()
          this.isLoading = false
          emitter.emit('get-cart')
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
    },
    SendData () {
      this.$router.push('/confirm')
      // 送出表單內的資料給FrontView
      this.$emit('emit-form', this.form)
    },
    toConfirm () {
      this.$router.push('/confirm')
    },
    // 驗證手機號碼
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    isRequired (value) {
      return value ? true : 'This field is required'
    }
  },
  mounted () {
    this.getCart()
    this.isClicked = false
  }
}
</script>
