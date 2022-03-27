  <template>
      <header class="header">
        <div class="header__inner container">
          <h1 class="header__title header-title">
            <a href="#">島遊</a>
          </h1>
          <nav class="header__nav nav" :class="{active: isClicked}">
            <ul class="nav-list list-unstyled">
              <li class="nav-list__item">
                <router-link class="nav-link" to="/products" @click="isClicked = !isClicked">產品列表</router-link>
              </li>
              <li class="nav-list__item">
                <router-link to="/cart" class="d-md-flex position-relative text-dark d-none d-md-block">
                  <i class="bi bi-cart fs-5"></i>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {{ cartData?.carts?.length }}
                  </span>
                </router-link>
                <router-link to="/cart" class="d-md-flex position-relative text-dark d-md-none" @click="isClicked = !isClicked">
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
  </template>

<script>
import emitter from '@/libs/emitter'

window.addEventListener('scroll', function () {
  const header = document.querySelector('.header')
  header.classList.toggle('menu-scroll', window.scrollY > 100)
})

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
