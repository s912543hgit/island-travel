<template>
    <div class="container mt-5">
        <input
        type="file"
        id="customFile"
        class="form-control"
        ref="fileInput"
        @change="uploadFile"
      />
      <div class="container text-break">
        圖片網址：
        {{ text }}
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      text: ''
    }
  },
  inject: ['emitter'],
  methods: {
    uploadFile () {
      const uploadFile = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadFile)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload/`
      this.$http.post(url, formData)
        .then((response) => {
          // console.log(response)
          this.text = response.data.imageUrl
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '上傳成功',
            content: response.data.message
          })
        })
        .catch((error) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '上傳失敗',
            content: error.response.data.message
          })
        })
    }
  }
}
</script>
