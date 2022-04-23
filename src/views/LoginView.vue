<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
          <h1 class="h3 mb-3 font-weight-normal text-center">登入頁面</h1>
          <div class="col-8">
            <form id="form" class="form-signin" @submit.prevent="login">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  v-model="user.username"
                  placeholder="name@example.com"
                  required
                  autofocus
                />
                <label for="username">電子信箱</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  v-model="user.password"
                  placeholder="Password"
                  required
                  autocomplete
                />
                <label for="password">密碼</label>
              </div>
              <button
                class="btn btn-lg btn-primary w-100 mt-3"
                id="login"
                type="submit"
                :disabled="this.user.username === '' || this.user.password === ''"
              >
                登入
              </button>
              <RouterLink  class="btn btn-lg btn-primary w-100 mt-3" to="/">回到首頁</RouterLink>
            </form>
          </div>
        </div>
        <p class="mt-5 mb-3 text-muted text-center">&copy; 2021~∞ 島遊</p>
      </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http.post(`${process.env.VUE_APP_API}admin/signin`, this.user)
        .then((res) => {
          console.log(res)
          const { token, expired } = res.data
          // 將token儲存在cookie裡面
          // expire設置有效時間
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
          this.$router.push('/admin/products')
        })
        .catch((error) => {
          alert(error.response.data.message)
          this.user.password = ''
        })
    }
  }
}
</script>
