<template>
  <VueLoading :active="isLoading"/>
  <div class="section">
    <div class="position-absolute background-image background-image--cart"></div>
    <div class="background-title">
      <h2 class="fw-bold">填寫資料</h2>
    </div>
  </div>
  <div class="container">
    <div class="mt-5">
      <ul class="p-steps list-unstyled mb-5">
        <li class="col-4 mb-md-0 mb-3">
          <small>STEP1</small>
          <p>購物車</p>
        </li>
        <li class="col-4 mb-md-0 mb-3 is-active">
          <small>STEP2</small>
          <p>填寫資料</p>
        </li>
        <li class="col-4">
          <small>STEP3</small>
          <p>完成訂單</p>
        </li>
      </ul>
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex justify-content-center align-items-center mb-5">
            <h3 class="section-heading">填寫資料</h3>
          </div>
        </div>
      </div>
      <div class="row justify-content-between pb-5">
        <template v-if="cartData.carts">
          <div class="cart__order">
            <div class="cart__info">
              <div class="d-flex justify-content-center align-items-center mb-5">
                <h3 class="section-heading">訂單摘要</h3>
              </div>
              <div class="my-4">
                <div class="d-flex mb-3" v-for="item in cartData.carts" :key="item.id">
                  <img :src="item.product.imageUrl" :alt="item.product.title" class="me-3 cart__image">
                  <div class="w-100">
                    <div class="d-flex justify-content-between">
                      <p class="mb-0 fw-bold">{{ item.product.title }}</p>
                      <p class="mb-0">NT${{ item.product.price }}</p>
                    </div>
                    <p class="mb-0 fw-bold mt-4">{{ item.qty }}人</p>
                  </div>
                </div>
                <table class="table mt-4 border-top border-bottom">
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
              <div class="d-flex justify-content-center align-items-center mb-5">
                <h3 class="section-heading">填寫資料</h3>
              </div>
              <VueForm ref="form" v-slot="{ errors }" @submit="putOrder()">
                <div class="mb-3">
                  <label for="email" class="form-label">電子郵件</label>
                  <VueField id="email" name="email" type="email" class="form-control"
                    :class="{ 'is-invalid': errors['email'] }"
                    placeholder="請輸入電子郵件" rules="email|required"
                    v-model="form.user.email" ></VueField>
                  <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label for="name" class="form-label">收件人姓名</label>
                  <VueField id="name" name="姓名" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名" rules="required" v-model="form.user.name"></VueField>
                  <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label for="tel" class="form-label">收件人電話</label>
                  <VueField id="tel" name="電話" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['電話'] }"
                    placeholder="請輸入電話"  :rules="isPhone" v-model="form.user.tel"></VueField>
                  <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label">收件人地址</label>
                  <VueField id="address" name="地址" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['地址'] }"
                    placeholder="請輸入地址" rules="required" v-model="form.user.address"></VueField>
                  <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
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
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      cartData: {},
      isLoading: false,
      form: {
        user: {
          email: '',
          name: '',
          address: '',
          phone: ''
        },
        message: ''
      },
      isDisabled: ''
    }
  },
  methods: {
    getCart () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
          this.isLoading = false
        })
    },
    putOrder () {
      this.$http.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`, { data: this.form })
        .then((res) => {
          this.getCart()
          emitter.emit('get-cart')
          this.isLoading = true
          this.$router.push('/complete')
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    },
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
  }
}
</script>
