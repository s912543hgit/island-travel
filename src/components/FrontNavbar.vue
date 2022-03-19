  <template>
      <div class="bg-white sticky-top">
        <div class="container">
          <nav class="navbar px-0 navbar-expand-lg navbar-light bg-white">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link class="nav-link" to="/">島遊</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/products">產品列表</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/about">關於我們</router-link>
                </li>
                <!-- <li class="nav-item">
                  <router-link class="nav-link" to="/admin">後台</router-link>
                </li> -->
                <li class="nav-item">
                  <router-link class="nav-link" to="/login">登入</router-link>
                </li>
              </ul>
            </div>
            <!-- <div class="d-flex position-relative"> -->
              <router-link to="/cart" class="d-flex position-relative">
                <i class="bi bi-cart fs-5"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {{ cartData?.carts?.length }}
                </span>
              </router-link>
          </nav>
        </div>
      </div>
  </template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      cartData: {
        carts: {}
      }
    }
  },
  methods: {
    // 取得購物車內容
    getCart () {
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          console.log('cart:', res)
          this.cartData = res.data.data
        })
    }
  },
  mounted () {
    this.getCart()
    // 接收的部分 發起監聽
    emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}
</script>
