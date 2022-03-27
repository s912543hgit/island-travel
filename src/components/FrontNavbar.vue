  <template>
      <!-- <div class="bg-white sticky-top">
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
              </ul>
            </div>
            <router-link to="/cart" class="d-flex position-relative text-dark">
              <i class="bi bi-cart fs-5"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ cartData?.carts?.length }}
              </span>
            </router-link>
          </nav>
        </div>
      </div> -->
      <header class="header">
        <div class="header__inner container">
          <h1 class="header__title header-title">
            <a href="#">島遊</a>
          </h1>
          <nav class="header__nav nav" :class="{active: isClicked}">
            <ul class="nav-list list-unstyled">
              <li class="nav-list__item">
                <router-link class="nav-link" to="/products">產品列表</router-link>
              </li>
              <li class="nav-list__item">
                <router-link to="/cart" class="d-md-flex position-relative text-dark d-none d-md-block">
                  <i class="bi bi-cart fs-5"></i>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {{ cartData?.carts?.length }}
                  </span>
                </router-link>
                <router-link to="/cart" class="d-md-flex position-relative text-dark d-md-none">
                    購物車
                </router-link>
              </li>
            </ul>
          </nav>
          <button class="header__hamburger hamburger" :class="{active: isClicked}" @click="isClicked = !isClicked">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <!-- <h1>he</h1> -->
  </template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      cartData: {
        carts: {}
      },
      isClicked: false
    }
  },
  methods: {
    // 取得購物車內容
    getCart () {
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          // console.log('cart:', res)
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
