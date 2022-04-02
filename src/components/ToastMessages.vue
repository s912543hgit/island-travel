<template>
    <div class="toast-container position-fixed pe-3 top-0 end-0" style="z-index: 1500;">
        <div v-for="(msg, key) in messages" :key="key" :class="`toast${key}`" role="alert"
        class="toast show" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
            <strong class="me-auto">{{ msg.title }}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" @click="clearToast(key)"></button>
          </div>
          <div class="toast-body" v-if="msg.content">
            {{ msg.content }}
          </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  methods: {
    toastShow () {
      setTimeout(() => {
        this.messages.shift()
      }, 6000)
    },
    clearToast (index) {
      // 刪除特定訊息
      this.messages.splice(index, 1)
    }
  },
  mounted () {
    // 接收資料
    this.emitter.on('push-message', (message) => {
      // 解構賦值 預設style為success
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
      this.toastShow()
    })
  }
}
</script>
