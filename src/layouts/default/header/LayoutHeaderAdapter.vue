<template>
  <div class="yunlin-header-adapter" @click="switchHandle">
    <i :class="[{ 'el-icon-s-fold': getIsOpen }, { 'el-icon-s-unfold': !getIsOpen }]"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import store from '/@/store'
export default defineComponent({
  name: 'LayoutHeaderAdapter',
  components: {},
  computed: {
    // 用于判断是否展开
    ...mapGetters('adapter', ['getIsOpen'])
  },
  methods: {
    switchHandle() {
      const isOpen = this.getIsOpen
      // 设置sider高亮 el-icon-s-unfold
      store.dispatch('adapter/SET_ISOPEN', !isOpen)
    }
  },
  setup(props, { slots }) {}
})
</script>
