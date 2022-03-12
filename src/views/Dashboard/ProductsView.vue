<template>
  <div class="container">
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        id="modal"
        type="button"
        @click="openModal('new', item)"
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
                @click="openModal('edit', item)"
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
    <!-- 內層:pages,外層:pagination -->
    <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
    <!-- del modal -->
    <!-- 將外層的tempProduct傳到內層 內層：item 外層：tempProduct  -->
    <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct"></DelModal>
    <ProductModal :item="tempProduct" ref="productModal"></ProductModal>
  </div>
</template>

<script>
import Pagination from '@/components/PaginationView.vue'
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'

export default {
  data () {
    return {
      status: false,
      pagination: {},
      products: [],
      tempProduct: {
        imagesUrl: []
      }
    }
  },
  components: {
    Pagination,
    DelModal,
    ProductModal
  },
  methods: {
    // 取得產品列表
    getProducts (page = 1) {
    // 參數預設值 不代入任何參數的情況下的預設
    // 此處代表預設值為第一頁
      this.$http
        .get(
        // query的特殊代法
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
        )
        // 成功的結果
        .then((res) => {
          // 將產品列表帶入空陣列
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        // 失敗的結果
        .catch((error) => {
          console.dir(error)
        })
    },
    // modal的JS
    // 參數的status  new edit delete
    openModal (status, item) {
      if (status === 'new') {
        this.tempProduct = {
          // 需要做清空的動作
          imagesUrl: []
        }
        // 改變status的狀態
        this.status = true
        // productmodal.show()
      } else if (status === 'edit') {
        // 需要將產品資料帶上去，因此使用淺拷貝方式 目的是為了不要改變原始物件資料
        this.tempProduct = { ...item }
        // 因為非新增物件，因此狀態為false
        this.status = false
        // productmodal.show()
      }
      const productComponent = this.$refs.productModal
      productComponent.openModal()
    },
    openDelProductModal (item) {
      // 將點擊的產品帶入
      this.tempProduct = { ...item }
      // 取得modal
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    // 刪除產品
    delProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http
        .delete(url, { data: this.tempProduct })
        .then((response) => {
          alert(response.data.message)
          this.$emit('close-del')
          // 重新取得產品列表
          this.$emit('get-products')
        })
        .catch((error) => {
          console.dir(error)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
