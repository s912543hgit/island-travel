<template>
  <div
      id="productModal"
      ref="productModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label"
                    >輸入圖片網址</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="mb-3">
                  <label for="customFile" class="form-label"
                    >或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin" v-if="status.fileUploading">
                    </i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="fileInput"
                    @change="uploadFile"
                  />
                </div>
                <!-- 主圖 -->
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
                <h3>多圖設置</h3>
                <!-- 判斷是否為陣列 -->
                <div v-if="Array.isArray(tempProduct.imagesUrl)">
                  <template
                    v-for="(img, key) in tempProduct.imagesUrl"
                    :key="key"
                  >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                      v-model="tempProduct.imagesUrl[key]"
                    />
                    <!-- <img
                      class="img-fluid"
                      :src="tempProduct.imagesUrl[key]"
                      alt="商品圖片"
                    /> -->
                  </template>
                  <button
                    v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length -1] "
                    type="button"
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                  <button
                    v-else
                    type="button"
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.pop()"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="tempProduct.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="tempProduct.unit"
                  />
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model.number="tempProduct.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model.number="tempProduct.price"
                  />
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="tempProduct.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="tempProduct.content"
                >
                </textarea>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="placeOne" class="form-label">名勝標題1</label>
                  <input
                    id="placeOne"
                    type="text"
                    class="form-control"
                    placeholder="請輸入名勝標題1"
                    v-model="tempProduct.placeOne"
                  >
                </div>
                <div class="mb-3 col-md-6">
                  <label for="placeTwo" class="form-label">名勝標題2</label>
                  <input
                    id="placeTwo"
                    type="text"
                    class="form-control"
                    placeholder="請輸入名勝標題1"
                    v-model="tempProduct.placeTwo"
                  >
                </div>
              </div>
              <div class="row">
                <div class="mb-3">
                  <label for="introOne" class="form-label">名勝介紹</label>
                  <textarea
                    id="introOne"
                    type="text"
                    class="form-control"
                    placeholder="請輸入名勝內容"
                    v-model="tempProduct.introOne"
                  >
                  </textarea>
                </div>
                <div class="mb-3">
                  <label for="introTwo" class="form-label">名勝介紹2</label>
                  <textarea
                    id="introTwo"
                    type="text"
                    class="form-control"
                    placeholder="請輸入名勝內容"
                    v-model="tempProduct.introTwo"
                  >
                  </textarea>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="tempProduct.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
          取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-product',tempProduct)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: {
    product: {
      type: Object,
      default () { return {} }
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      modal: '',
      status: {},
      tempProduct: {}
    }
  },
  emits: ['update-product'],
  inject: ['emitter'],
  watch: {
    product () {
      // watch 監聽 product的更新 的變化 去改變tempProduct的值
      this.tempProduct = this.product
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = []
      }
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = ''
      }
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    },
    // 上傳圖片
    uploadFile () {
    // 取出上傳的檔案 為類陣列
      const uploadFile = this.$refs.fileInput.files[0]
      // 使用formdata格式 formData()物件可以產生表單格式
      const formData = new FormData()
      // 使用append方法將欄位夾帶進來 對應到file-to-upload 此欄位 後面對應到要上傳的檔案
      formData.append('file-to-upload', uploadFile)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload/`
      this.status.fileUploading = true
      this.$http.post(url, formData)
        .then((response) => {
          this.status.fileUploading = false
          if (response.data.success) {
            this.tempProduct.imageUrl = response.data.imageUrl
            this.$refs.fileInput.value = ''
            this.emitter.emit('push-message', {
              style: 'success',
              title: '圖片上傳成功',
              content: response.data.message
            })
          } else {
            this.$refs.fileInput.value = ''
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '圖片上傳結果',
              content: response.data.message
            })
          }
        })
        .catch((error) => {
          this.status.fileUploading = false
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '圖片上傳失敗',
            content: error.response.data.message
          })
        })
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.productModal)
  }
}
</script>
