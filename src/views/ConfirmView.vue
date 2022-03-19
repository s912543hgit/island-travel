<template>
    <Loading :active="isLoading"></Loading>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <h3 class="fw-bold mb-4 pt-3">確認訂單</h3>
        </div>
      </div>
      <div class="row flex-row-reverse justify-content-center pb-5">
        <template v-if="cartData.carts">
            <div class="col-md-4">
                <div class="border p-4 mb-4">
                  <div class="d-flex"  v-for="item in cartData.carts" :key="item.id">
                    <img :src="item.product.imageUrl" alt="" class="me-2" style="width: 48px; height: 48px; object-fit: cover">
                    <div class="w-100">
                      <div class="d-flex justify-content-between">
                        <p class="mb-0 fw-bold">{{ item.product.title }}</p>
                        <p class="mb-0">NT${{ item.product.price }}</p>
                      </div>
                      <p class="mb-0 fw-bold">x{{ item.product.num }}</p>
                    </div>
                  </div>
                  <table class="table mt-4 border-top border-bottom text-muted">
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
                </div>
              </div>
        </template>
        <div class="col-md-6">
          <Form ref="form" class="col-md-6" v-slot="{ errors }" @submit="putOrder" >
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
              <textarea id="message" class="form-control" cols="30" rows="10" ></textarea>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-danger"
                      >送出訂單</button>
            </div>
          </Form>
          <div class="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
            <a href="./product.html" class="text-dark mt-md-0 mt-3"><i class="fas fa-chevron-left me-2"></i> Lorem ipsum</a>
            <a href="./checkout-1.html" class="btn btn-dark py-3 px-7">Lorem ipsum</a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import emitter from '@/libs/emitter'
import Loading from 'vue-loading-overlay'
import { Field, Form } from 'vee-validate'

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
      }
    }
  },
  components: {
    Loading,
    Field,
    Form
  },
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
    putOrder (data) {
      this.$http.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`, { data: this.form })
        .then((res) => {
          console.log(res)
          this.getCart()
          emitter.emit('get-cart')
          this.isLoading = true
          this.$router.push('/complete')
        //   this.$refs.form.resetForm()
        })
        .catch((err) => {
          alert(err.data.message)
        })
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
  }
}
</script>
