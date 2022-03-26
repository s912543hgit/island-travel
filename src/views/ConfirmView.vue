<template>
    <Loading :active="isLoading"></Loading>
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
          <div class="col-md-10">
            <h3 class="fw-bold mb-4 text-left">確認訂單</h3>
          </div>
        </div>
        <div class="row  justify-content-between pb-5">
          <template v-if="cartData.carts">
              <div class="col-md-6">
                  <div class="border p-4 mb-4">
                    <div class="d-flex"  v-for="item in cartData.carts" :key="item.id">
                      <img :src="item.product.imageUrl" alt="" class="me-2" style="width: 48px; height: 48px; object-fit: cover">
                      <div class="w-100">
                        <div class="d-flex justify-content-between">
                          <p class="mb-0 fw-bold">{{ item.product.title }}</p>
                          <p class="mb-0">NT${{ item.product.price }}</p>
                        </div>
                        <p class="mb-0 fw-bold">{{ item.qty }}人</p>
                      </div>
                    </div>
                    <table class="table mt-4 border-top border-bottom text-muted">
                      <tbody>
                        <tr>
                          <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">總價</th>
                          <td class="text-end border-0 px-0 pt-4">NT${{ cartData.total }}</td>
                        </tr>
                        <!-- <tr>
                          <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">Payment</th>
                          <td class="text-end border-0 px-0 pt-0 pb-4">ApplePay</td>
                        </tr> -->
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
            <h2>訂購人資訊</h2>
            <ul class="list-unstyled">
              <li class="d-flex">
                <h3>聯絡人姓名</h3>
                <p>{{ form.user.name }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import emitter from '@/libs/emitter'
import Loading from 'vue-loading-overlay'
// import { Field, Form } from 'vee-validate'

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
          phone: '',
          message: ''
        }
      }
    }
  },
  components: {
    Loading
  },
  props: ['form-data'],
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
    }
    // 驗證手機號碼
    // isPhone (value) {
    //   const phoneNumber = /^(09)[0-9]{8}$/
    //   return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    // },
    // isRequired (value) {
    //   return value ? true : 'This field is required'
    // }
  },
  mounted () {
    this.getCart()
    // 接收表單資料
    emitter.on('formData', (data) => {
      console.log('received', data)
      this.form = data
    })
  }
}
</script>
