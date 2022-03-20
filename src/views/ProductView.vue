<template>
  <!DOCTYPE html>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-7">
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img :src="product.imageUrl" class="d-block w-100" alt="...">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <!-- <div class="my-4">
            <img  v-for="image in product.imagesUrl" :key="image" :src="image" alt="">
          </div> -->
        </div>

        <div class="col-md-5">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-white px-0 mb-0 py-3">
              <li class="breadcrumb-item"><a class="text-muted" href="./index.html">Home</a></li>
              <li class="breadcrumb-item"><a class="text-muted" href="./product.html">{{ product.category }}</a></li>
              <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
            </ol>
          </nav>
          <h2 class="fw-bold h1 mb-1">{{ product.title }}</h2>
          <p class="mb-0 text-muted text-end"><del>NT{{ product.origin_price }}</del></p>
          <p class="h4 fw-bold text-end">NT${{ product.price }}</p>
          <div class="row align-items-center">
            <div class="col-6">
              <div class="input-group my-3 bg-light rounded">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
                <input type="text" class="form-control border-0 text-center my-auto shadow-none bg-light" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" value="1">
                <div class="input-group-append">
                  <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-6">
              <button type="button" class="text-nowrap btn btn-dark w-100 py-2" @click.prevent="addToCart">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row my-5">
        <div class="col-md-4">
          <p>{{ product.description }}</p>
        </div>
      </div>
      <div class="row my-5">
        <h2 class="fw-bold h1 mb-1">{{ product.placeOne }}</h2>
        <div class="col-md-4">
          <p>{{ product.introOne }}</p>
        </div>
      </div>
      <div class="row my-5">
        <h2 class="fw-bold h1 mb-1">{{ product.placeTwo }}</h2>
        <div class="col-md-4">
          <p>{{ product.introTwo }}</p>
        </div>
      </div>
    </div>
</template>

<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      product: [],
      id: ''
    }
  },
  methods: {
    getProduct () {
      console.log(this.$route)
      // 找到產品id 並存起來
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then(res => {
          this.product = res.data.product
        })
    },
    addToCart () {
      const data = {
        product_id: this.id,
        qty: 1
      }
      this.$http.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((res) => {
          console.log(res)
          // 觸發設置的監聽
          emitter.emit('get-cart')
        })
    }
  },
  mounted () {
    // 找到產品id 並存起來
    this.id = this.$route.params.id
    this.getProduct()
  }
}
</script>
