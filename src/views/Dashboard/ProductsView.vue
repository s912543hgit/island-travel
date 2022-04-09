<template>
  <VueLoading :active="isLoading"></VueLoading>
  <div class="container">
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        id="modal"
        type="button"
        @click="openModal(true)"
      >
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <!-- 代入參數item 取得單一商品 -->
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal(false,item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelProductModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationView :pages="pagination" @emit-pages="getProducts"></PaginationView>
    <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct"></DelModal>
    <ProductModal :product="tempProduct" ref="productModal" :isNew="isNew" @update-product="updateProduct"></ProductModal>
  </div>
</template>

<script>
import PaginationView from '@/components/PaginationView.vue'
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'

export default {
  data () {
    return {
      pagination: {},
      products: [],
      isNew: false,
      tempProduct: {},
      isLoading: false,
      modal: {
        editModal: '',
        delModal: ''
      },
      status: {
        fileUploading: false
      },
      currentPage: 1
    }
  },
  components: {
    PaginationView,
    DelModal,
    ProductModal
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.products = res.data.products
        this.pagination = res.data.pagination
        this.isLoading = false
      })
        .catch((error) => {
          this.isLoading = false
          console.dir(error)
        })
    },
    openModal (isNew, item) {
      if (isNew) {
        // 需要清空
        this.tempProduct = {}
        this.isNew = true
      } else {
        // 需要將產品資料帶上去，因此使用淺拷貝方式 目的是為了不要改變原始物件資料
        this.tempProduct = { ...item }
        this.isNew = false
      }
      const productComponent = this.$refs.productModal
      productComponent.openModal()
    },
    openDelProductModal (item) {
      // 將點擊的產品帶入
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    updateProduct (item) {
      this.tempProduct = item
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let method = 'post'
      this.isLoading = true
      // 根據status來決定要串接post或是put api
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        method = 'put'
      }
      const productComponent = this.$refs.productModal
      // post和put需要代的參數相同，因此可以寫在一起
      this.$http[method](api, { data: this.tempProduct })
        .then((response) => {
          this.isLoading = false
          alert(response.data.message)
          productComponent.hideModal()
          this.getProducts()
        })
        .catch((error) => {
          this.isLoading = false
          alert(error.data.message)
        })
    },
    delProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http
        .delete(url, { data: this.tempProduct })
        .then((response) => {
          this.isLoading = true
          alert(response.data.message)
          this.getProducts()
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
        })
        .catch((error) => {
          this.isLoading = false
          console.dir(error)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
