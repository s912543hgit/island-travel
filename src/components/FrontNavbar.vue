  <template>
      <header class="header">
        <div class="header__inner container">
          <h1 class="header__title header-title">
            <a href="#">島遊</a>
          </h1>
          <nav class="header__nav nav" :class="{active: isClicked}">
            <ul class="nav-list list-unstyled">
              <li class="nav-list__item">
                <RouterLink class="nav-link" to="/" @click="isClicked = !isClicked">首頁</RouterLink>
              </li>
              <li class="nav-list__item">
                <RouterLink class="nav-link" to="/about" @click="isClicked = !isClicked">關於我們</RouterLink>
              </li>
              <li class="nav-list__item">
                <RouterLink class="nav-link" to="/products" @click="isClicked = !isClicked">產品列表</RouterLink>
              </li>
              <li class="nav-list__item" @click="isOpen = !isOpen" >
                <div class="d-md-flex position-relative text-dark d-none d-md-block">
                  <i class="bi bi-cart fs-5"></i>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {{ cartData?.carts?.length }}
                  </span>
                </div>
                <RouterLink class="d-md-flex position-relative text-dark d-md-none"
                to="/cart" @click="isClicked = !isClicked">購物車</RouterLink>
              </li>
              <li class="nav-list__item">
                <RouterLink class="nav-link" to="/favorite" @click="isClicked = !isClicked">
                  <i class="bi bi-suit-heart"></i>
                </RouterLink>
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
      <CartNav></CartNav>
  </template>
<script>
import emitter from '@/libs/emitter'
import CartNav from '@/components/CartNav.vue'

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
      isClicked: false,
      isOpen: false
    }
  },
  components: {
    CartNav
  },
  methods: {
    // 取得購物車內容
    getCart () {
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
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
