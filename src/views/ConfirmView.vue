<template>
    <VueLoading :active="isLoading"></VueLoading>
    <div class="section">
      <div class="position-absolute background-image background-image--cart"></div>
      <div class="background-title">
        <h2 class="fw-bold">確認訂單</h2>
      </div>
    </div>
    <div class="container">
      <div class="mt-5">
        <ul class="p-steps list-unstyled mb-5">
          <li class="col-4 mb-md-0 mb-3">
            <small>STEP1</small>
            <p>填寫資料</p>
          </li>
          <li class="col-4 mb-md-0 mb-3 is-active">
            <small>STEP2</small>
            <p>確認訂單</p>
          </li>
          <li class="col-4">
            <small>STEP3</small>
            <p>完成訂單</p>
          </li>
        </ul>
        <div class="row">
          <div class="col-md-12">
            <div class="d-flex justify-content-center align-items-center mb-5">
              <h3 class="section-heading">確認訂單</h3>
            </div>
          </div>
        </div>
        <div class="row justify-content-between pb-5">
          <template v-if="cartData.carts">
              <div class="col-md-5">
                  <div class="p-4 mb-4">
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
          </template>
          <div class="col-md-6">
            <div class="border p-5 background-white">
              <p class="text-center h4 mb-3">訂購資訊</p>
              <ul class="list-unstyled p-confirmForm">
                <li class="d-flex mb-3">
                  <p class="col-4">收件人姓名</p>
                  <p>{{ formData.user.name }}</p>
                </li>
                <li class="d-flex mb-3">
                  <p class="col-4">收件人電話</p>
                  <p>{{ formData.user.tel }}</p>
                </li>
                <li class="d-flex mb-3">
                  <p class="col-4">收件人Email</p>
                  <p>{{ formData.user.email }}</p>
                </li>
                <li class="d-flex mb-3">
                  <p class="col-4">留言</p>
                  <p>{{ formData.message }}</p>
                </li>
              </ul>
              <button
                class="btn btn-primary w-100 py-3 mt-4"
                type="button"
                @click="putOrder">立即付款</button>
            </div>
          </div>
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
      }
    }
  },
  props: ['form-data'],
  methods: {
    getCart () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
          this.isLoading = false
        })
    },
    putOrder (formData) {
      this.form = this.formData
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
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
