<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
          <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
          <div class="col-8">
            <form id="form" class="form-signin">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  v-model="user.username"
                  placeholder="name@example.com"
                  required
                  autofocus
                />
                <label for="username">Email address</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  v-model="user.password"
                  placeholder="Password"
                  required
                />
                <label for="password">Password</label>
              </div>
              <button
                class="btn btn-lg btn-primary w-100 mt-3"
                id="login"
                type="button"
                @click="login"
              >
                登入
              </button>
            </form>
          </div>
        </div>
        <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
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
        // 成功的結果
        .then((res) => {
          console.log(res)
          const { token, expired } = res.data
          // 將token儲存在cookie裡面
          // expire設置有效時間
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
          // 登入成功後跳轉到商品頁面
          this.$router.push('/admin/products')
        })
        // 失敗的結果
        .catch((error) => {
          alert(error.data.message)
        })
    }
  },
  mounted () {

  }
}
</script>
