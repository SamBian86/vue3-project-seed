<template>
  <div class="yunlin-header-fullscreen" v-if="!getIsMobile" @click="screenFullHandle">
    <span>
      <i class="el-icon-full-screen" v-if="!getFullScreenStatus"></i>
      <SvgIcon name="screen-full-close" v-if="getFullScreenStatus" />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import store from '/@/store'
import screenfull from 'screenfull'
import { SvgIcon } from '/@/components/SvgIcon'
export default defineComponent({
  name: 'LayoutHeaderFullScreen',
  computed: {
    // 用于判断是否展开
    ...mapGetters('site', ['getIsMobile']),
    // 获取全屏状态
    ...mapGetters('fullScreen', ['getFullScreenStatus'])
  },
  components: {
    SvgIcon
  },
  methods: {
    screenFullHandle() {
      const status = this.getFullScreenStatus
      store.dispatch('fullScreen/SET_FULLSCREEN', !status)
      screenfull.toggle()
    }
  },
  setup(props, { slots }) {
    return {}
  }
})
</script>
