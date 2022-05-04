<template>
  <header class="header">
    <div class="header__inner container">
      <h1 class="header__title" :class="{active: isClicked}">
        <RouterLink to="/">島遊</RouterLink>
      </h1>
      <nav class="header__nav nav" :class="{active: isClicked}">
        <ul class="nav-list">
          <li class="nav-list__item">
            <RouterLink class="nav-link" to="/about" @click="isClicked = !isClicked">關於我們</RouterLink>
          </li>
          <li class="nav-list__item">
            <RouterLink class="nav-link" to="/products" @click="isClicked = !isClicked">產品列表</RouterLink>
          </li>
          <li class="nav-list__item">
            <RouterLink class="px-3" to="/favorite" @click="isClicked = !isClicked">
              <i class="fs-5 bi bi-suit-heart d-none d-md-block"></i>
              <p class="d-md-none mb-0 py-2">收藏清單</p>
            </RouterLink>
          </li>
          <li class="nav-list__item">
            <div class="d-md-flex position-relative text-dark d-none d-md-block">
              <a href="#" @click.prevent="openNav">
                <i class="bi bi-cart fs-5"></i>
                <span class="cart-badge top-0 start-100 badge"
                  v-show="cartData.carts.length">
                  {{ cartData?.carts?.length }}
                </span>
              </a>
            </div>
          </li>
        </ul>
      </nav>
      <div class="nav__footer" :class="{active: isClicked}">
        <div class="position-relative d-md-none">
          <RouterLink to="/cart">
            <i class="bi bi-cart cart-icon"></i>
            <span class="badge cart-badge"
              v-show="cartData.carts.length">
              {{ cartData?.carts?.length }}
            </span>
          </RouterLink>
        </div>
        <button class="header__hamburger hamburger"
          :class="{active: isClicked}"
          @click="isClicked = !isClicked">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
  <CartNav/>
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
  inject: ['emitter'],
  methods: {
    getCart () {
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((response) => {
          this.cartData = response.data.data
        })
        .catch((error) => {
          this.emitter.emit('push-message', {
            title: '找不到商品',
            content: error.response.data.message
          })
        })
    },
    openNav () {
      emitter.emit('toggle-cart', true)
    }
  },
  mounted () {
    this.getCart()
    emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}
</script>
