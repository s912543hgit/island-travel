<template>
  <VueLoading :active="isLoading"/>
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in orders" :key="key">
          <tr v-if="orders.length" :class="{'text-secondary': !item.is_paid}">
            <td>{{ $filters.date(item.create_at) }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updateOrder(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openModal(item)"
                >
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openDelOrderModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <PaginationView :pages="pagination" @emit-pages="getOrders"/>
    <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder"/>
    <!-- 將tempOrder傳入order -->
    <OrderModal ref="orderModal" :order="tempOrder" @update-order="updateOrder"/>
  </div>
</template>

<script>
import DelModal from '@/components/DelModal.vue'
import OrderModal from '@/components/OrderModal.vue'
import PaginationView from '@/components/PaginationView.vue'

export default {
  data () {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1
    }
  },
  components: {
    DelModal,
    PaginationView,
    OrderModal
  },
  methods: {
    getOrders (Currentpage = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.orders = res.data.orders
        this.pagination = res.data.pagination
        this.isLoading = false
      })
        .catch((error) => {
          this.isLoading = false
          console.dir(error)
        })
    },
    openModal (item) {
      this.tempOrder = { ...item }
      this.isNew = false
      const orderComponent = this.$refs.orderModal
      orderComponent.openModal()
    },
    openDelOrderModal (item) {
      this.tempOrder = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    updateOrder (item) {
      this.tempOrder = { ...item }
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      // 更新付款狀態
      const paid = {
        is_paid: this.is_paid
      }
      this.isLoading = true
      const orderComponent = this.$refs.orderModal
      this.$http.put(api, { data: this.tempOrder, paid })
        .then((response) => {
          this.isLoading = false
          orderComponent.hideModal()
          this.getOrders(this.currentPage)
        })
        .catch((error) => {
          this.isLoading = false
          alert(error.response.data.message)
        })
    },
    delOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        alert(response.data.message)
        this.getOrders()
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
      })
        .catch((error) => {
          this.isLoading = false
          console.dir(error)
        })
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
