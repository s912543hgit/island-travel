<template>
  <div class="row">
    <div
      v-for="item in categories"
      :key="item.zh"
      class="col-lg-3 col-md-6"
    >
      <div>
        <h3 class="my-3">
          {{ item.zh }}
        </h3>
        <p>{{ item.txt }}</p>
        <a
          class="btn-primary btn"
          @click.prevent="toCategory(item.category)"
        >立即前往</a>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      categories: [
        {
          zh: '日本',
          category: '日本'
        },
        {
          zh: '太平洋',
          category: '太平洋'
        },
        {
          zh: '其他',
          category: '其他'
        }
      ],
      category: ''
    }
  },
  methods: {
    toCategory (category) {
      this.category = category
      emitter.emit('sendCategory', this.category)
      console.log(this.category)
      this.$router.push({
        path: 'Products'
        // params: { pathCategory: el },
      })
    }
  }
}
</script>
