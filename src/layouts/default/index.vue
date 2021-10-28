<template>
  <LayoutContainer>
    <!-- 左侧导航区域 -->
    <LayoutSiderWrapper></LayoutSiderWrapper>
    <!-- 右侧区域 -->
    <LayoutHeaderWrapper></LayoutHeaderWrapper>
  </LayoutContainer>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LayoutContainer from './container/index.vue'
import LayoutSiderWrapper from './sider/index.vue'
import LayoutHeaderWrapper from './header/index.vue'
import { watchAppWidth } from '/@/hooks/layout'
import { useStore } from 'vuex'
import { getNavByMenuData } from '/@/utils/layout'
import { reViewWhenRefresh } from '/@/utils/tabs'
export default defineComponent({
  name: 'DefaultLayout',
  components: {
    LayoutContainer,
    LayoutSiderWrapper,
    LayoutHeaderWrapper
  },
  setup(props, { slots }) {
    const store = useStore()
    //获取用户信息
    store.dispatch('userInfo/SET_USERINFO').then((response) => {
      console.log(store.state)
    })

    // 获取字典
    store.dispatch('dict/SET_ITEMS').then((response) => {
      // console.log("获取dict成功");
      let dictStore: Object = {}
      response.forEach((item: { dictType: string; dataList: Array<any> }) => {
        const k = item.dictType
        dictStore[k] = item.dataList
      })
      // 建立字典仓库
      store.dispatch('dict/SET_DICT_STORE', dictStore)
    })

    // 获取权限
    store.dispatch('permission/SET_ITEMS').then((response) => {
      // console.log("获取permission成功");
    })

    // // 获取菜单 此处在路由 beforeEach 实现
    store.dispatch('menu/SET_MENU_DATAS').then((response) => {
      const navItems: any = getNavByMenuData(response)
      // 对原始菜单数据进行处理用于后续的一些逻辑
      store.dispatch('menu/SET_MENU_ITEMS', navItems)
      // console.log(navItems);
      // 如果是用户强制刷新，需要对视图某些状态进行重置
      if (store.getters['refresh/getRefreshByUser']) {
        reViewWhenRefresh(navItems)
      }
    })

    // 监听窗口变化
    watchAppWidth()
  }
})
</script>
