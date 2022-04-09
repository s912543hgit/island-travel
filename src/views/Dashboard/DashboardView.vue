<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/admin">後台</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">前台</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/products">產品列表</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/orders">訂單</RouterLink>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout">登出</a>
          </li>
        </ul>
      </div>
    </div>
</nav>
<RouterView v-if="checkSuccess"/>
</template>

<script>
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    checkLogin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      // 如果token符合
      if (token) {
        // 把token夾帶到header裡面
        this.$http.defaults.headers.common.Authorization = `${token}`
        this.$http.post(`${process.env.VUE_APP_API}api/user/check`, { api_token: this.token })
          .then((res) => {
            this.checkSuccess = true
          })
          .catch((err) => {
            console.dir(err)
            alert(err.data.message)
            this.$router.push('/login')
          })
      } else {
        alert('您尚未登入')
        this.$router.push('/login')
      }
    },
    logout () {
      // 刪除cookie
      document.cookie = 'hexToken=;expires=;'
      alert('您已經登出')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
