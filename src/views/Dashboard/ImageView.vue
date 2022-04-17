<template>
    <div class="container mt-5">
        <input
        type="file"
        id="customFile"
        class="form-control"
        ref="fileInput"
        @change="uploadFile"
      />
    </div>
</template>

<script>
export default {
  methods: {
    uploadFile () {
      const uploadFile = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadFile)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload/`
      this.$http.post(url, formData)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.dir(error)
        })
    }
  }
}
</script>
