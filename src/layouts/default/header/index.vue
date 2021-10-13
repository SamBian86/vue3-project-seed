<template>
  <!-- 头部布局 -->
  <div :class="['yunlin-header-wrapper', { 'yunlin-header-wrapper-isclose': !getIsOpen }]">
    <el-affix :offset="0">
      <div class="yunlin-header-layout-wrapper">
        <!-- 头部菜单区域 -->
        <div class="yunlin-header-layout">
          <LayoutHeaderLeft>
            <!-- 收缩功能 -->
            <LayoutHeaderAdapter />
            <!-- 刷新功能 -->
            <!-- <LayoutHeaderRefresh /> -->
          </LayoutHeaderLeft>
          <!-- 导航功能 -->
          <LayoutHeaderNav />
          <LayoutHeaderRight>
            <!-- 租户切换 -->
            <LayoutHeaderRole />
            <!-- 全屏 -->
            <LayoutHeaderFullScreen />
            <!-- 当前登录用户信息 -->
            <LayoutHeaderUser />
            <!-- 国际化 -->
            <LayoutHeaderLanguage />
          </LayoutHeaderRight>
        </div>
        <!-- 头部tabs区域 -->
        <LayoutHeaderTabs />
      </div>
    </el-affix>
    <!-- 右侧内容区域 -->
    <LayoutContent />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LayoutHeaderLeft from './LayoutHeaderLeft.vue'
import LayoutHeaderAdapter from './LayoutHeaderAdapter.vue'
import LayoutHeaderRefresh from './LayoutHeaderRefresh.vue'
import LayoutHeaderNav from './LayoutHeaderNav.vue'
import LayoutHeaderRight from './LayoutHeaderRight.vue'
import LayoutHeaderRole from './LayoutHeaderRole.vue'
import LayoutHeaderFullScreen from './LayoutHeaderFullScreen.vue'
import LayoutHeaderUser from './LayoutHeaderUser.vue'
import LayoutHeaderLanguage from './LayoutHeaderLanguage.vue'
import LayoutHeaderTabs from './LayoutHeaderTabs.vue'
import LayoutContent from '../content/index.vue'
import { mapGetters } from 'vuex'
export default defineComponent({
  name: 'LayoutHeaderWrapper',
  components: {
    LayoutHeaderLeft,
    LayoutHeaderAdapter,
    LayoutHeaderRefresh,
    LayoutHeaderNav,
    LayoutHeaderRight,
    LayoutHeaderRole,
    LayoutHeaderFullScreen,
    LayoutHeaderUser,
    LayoutHeaderLanguage,
    LayoutHeaderTabs,
    LayoutContent
  },
  computed: {
    // 用于判断是否展开
    ...mapGetters('adapter', ['getIsOpen'])
  },
  setup(props, { slots }) {
    console.log('LayoutHeaderWrapper')
    // return () => slots.default?.();
    return {}
  }
})
</script>
