<template>
  <div class="yunlin-header-tabs-wrapper">
    <div :class="[{ 'yunlin-header-tabs-home': true }, { 'is-active': getCurrentPath === '/home' }]" @click="goHomeHandle">
      <i class="el-icon-s-home"></i>
    </div>
    <div class="yunlin-header-tabs">
      <el-tabs v-model="getTabActiveId" closable @tab-click="tabClickHandle" @tab-remove="tabRemoveHandle">
        <el-tab-pane
          v-for="(item, index) in getTabItems"
          :key="index"
          :label="item.meta.title"
          :name="item.meta.id"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="yunlin-header-tabs-more">
      <el-dropdown size="small">
        <span>
          <i class="el-icon-arrow-down"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="closeCurrentHandle">
              <i class="el-icon-circle-close"></i>
              <span>关闭当前标签页</span>
            </el-dropdown-item>
            <el-dropdown-item @click="closeOtherHandle">
              <i class="el-icon-circle-close"></i>
              <span>关闭其他标签页</span>
            </el-dropdown-item>
            <el-dropdown-item @click="closeAllHandle">
              <i class="el-icon-circle-close"></i>
              <span>关闭全部标签页</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import store from '/@/store'
import { getNavIdByTabId, getSiderItemsByTabId } from '/@/utils/tabs'
export default defineComponent({
  name: 'LayoutHeaderTabs',
  components: {},
  computed: {
    // 用于判断是否有权限的方法
    ...mapGetters('tabs', ['getTabItems', 'getTabActiveId']),
    // 用于判断是否有权限的方法
    ...mapGetters('route', ['getFlatDataById', 'getCurrentPath'])
  },
  setup(props, { slots }) {},
  methods: {
    // 点击tab
    tabClickHandle(item: any) {
      const { index } = item
      const ite = this.getTabItems[index]
      const path = ite['path']
      const id = ite['meta']['id']
      // 路由跳转
      this.$router.push({ path })
      // 保存当前path
      store.dispatch('route/SET_CURRENT_PATH', path)
      // 设置sider高亮
      store.dispatch('sider/SET_SIDER_DEFAULTACTIVE', id)
      // 设置nav高亮
      const { menuActiveId, menuActiveIndex } = getNavIdByTabId(id)
      store.dispatch('menu/SET_MENU_ACTIVEID', menuActiveId)
      store.dispatch('menu/SET_MENU_ACTIVEINDEX', menuActiveIndex)

      // 设置siderItems
      const siderItems = getSiderItemsByTabId(id)
      store.dispatch('sider/SET_SIDER_ITEMS', siderItems)
      // 设置tabs高亮
      store.dispatch('tabs/SET_TAB_ACTIVEID', id)
    },
    // 删除tab
    tabRemoveHandle(id: any) {
      const cid = this.getTabActiveId
      let items = JSON.parse(JSON.stringify(this.getTabItems))
      const cIndex = items.findIndex((item: any) => item.meta.id === id)
      const nIndex = cIndex - 1 < 0 ? 0 : cIndex - 1
      // 如果删除的是高亮的tab
      if (cid === id) {
        store.dispatch('tabs/SET_TAB_ACTIVEID', items[nIndex]['meta']['id'])
        this.$router.push({ path: items[nIndex]['path'] })
        // 保存当前path
        store.dispatch('route/SET_CURRENT_PATH', items[nIndex]['path'])
      }
      items.splice(cIndex, 1)
      store.dispatch('tabs/SET_TAB_ITEMS', items)

      if (items.length === 0) {
        this.$router.push({ path: '/home' })
        // 保存当前path
        store.dispatch('route/SET_CURRENT_PATH', '/home')
      }
    },
    // 回到home页面
    goHomeHandle() {
      // 保存当前path
      store.dispatch('route/SET_CURRENT_PATH', '/home')

      store.dispatch('tabs/SET_TAB_ACTIVEID', '')
      store.dispatch('sider/SET_SIDER_DEFAULTACTIVE', '')
      this.$router.push({ path: '/home' })
    },
    // 关闭当前标签页
    closeCurrentHandle() {
      this.tabRemoveHandle(this.getTabActiveId)
    },
    // 关闭其他标签页
    closeOtherHandle() {
      const items = this.getTabItems
      const tabActiveId = this.getTabActiveId
      const item = items.find((item: any) => item.meta.id === tabActiveId)
      store.dispatch('tabs/SET_TAB_ITEMS', [item])
    },
    // 关闭所有标签页
    closeAllHandle() {
      // 修改tabs
      store.dispatch('tabs/SET_TAB_ITEMS', [])
      store.dispatch('tabs/SET_TAB_ACTIVEID', '')
      // 修改sider
      store.dispatch('sider/SET_SIDER_DEFAULTACTIVE', '')

      this.$router.push({ path: '/home' })
      // 保存当前path
      store.dispatch('route/SET_CURRENT_PATH', '/home')
    }
  }
})
</script>
