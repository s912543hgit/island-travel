<template>
    <VueLoading :active="isLoading"></VueLoading>
    <div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 400px;">
      <div class="position-absolute background-image background-image--favorite"></div>
      <h2 class="fw-bold" style="z-index: 2;">收藏清單</h2>
    </div>
    <h1>我的最愛</h1>
    <table class="table">
        <thead>
          <tr>
            <th scope="col" class="border-0 ps-0">品名</th>
            <th scope="col" class="border-0">單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in favoritesList" :key="item.id" class="border-bottom border-top">
            <th scope="row" class="border-0 px-0 font-weight-normal py-4">
              <img :src="item.imageUrl" alt="" style="width: 72px; height: 72px; object-fit: cover;">
              <p class="mb-0 fw-bold ms-3 d-inline-block">{{ item.title }}</p>
            </th>
            <td class="border-0 align-middle" style="max-width: 160px;">
              <div class="input-group pe-0 pe-sm-5">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
              </div>
            </td>
            <td class="border-0 align-middle"><p class="mb-0 ms-auto">NT{{ item.price }}</p></td>
            <td class="border-0 align-middle">
              <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
              <span class="spinner-border spinner-border-sm" role="status" v-show="isLoadingItem === item.id"></span>
              <i class="bi bi-x-circle"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

</template>
<script>
export default {
  data () {
    return {
      products: [],
      favoritesList: [],
      isLoadingItem: '',
      favorite: JSON.parse(localStorage.getItem('favorite')) || []
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/`
      this.$http.get(api).then((res) => {
      // 將產品列表帶入空陣列
        this.products = res.data.products
        this.getFavorites()
      })
      // 失敗的結果
        .catch((error) => {
          console.dir(error)
        })
    },
    getFavorites () {
      // 取得我的最愛
      this.favoritesList = this.products.filter(
        (item) => this.favorite.indexOf(item.id) > -1
      )
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
