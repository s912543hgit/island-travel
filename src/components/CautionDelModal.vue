<template>
    <div class="modal fade" tabindex="-1" ref="cautionModal" id="cautionModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">移除商品</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>您確定要移除此商品嗎？</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal">
                取消
            </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="$emit('del-product')"
              >
              確定移除</button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  data () {
    return {
      modal: ''
    }
  },
  props: {
    item: {}
  },
  emits: ['del-product'],
  methods: {
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.cautionModal)
  }
}
</script>
