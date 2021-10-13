<template>
  <div class="yunlin-header-nav-wrapper">
    <el-tabs v-model="getMenuActiveId" @tab-click="menuClickHandle">
      <el-tab-pane v-for="item in getMenuItems" :label="item.name" :name="item.id"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import store from '/@/store'
export default defineComponent({
  name: 'LayoutHeaderNav',
  components: {},
  computed: {
    // 用于判断是否有权限的方法
    ...mapGetters('menu', ['getMenuItems', 'getMenuActiveId']),
    ...mapGetters('tabs', ['getTabItems']),
    ...mapGetters('route', ['getFlatData'])
  },
  setup(props, { slots }) {},
  methods: {
    // 点击tab
    menuClickHandle(item: any) {
      const { index } = item
      const items = this.getMenuItems
      const id = items[parseInt(index)]['id']
      // el-tabs使用activeId来显示选中的项目
      store.dispatch('menu/SET_MENU_ACTIVEID', id)
      store.dispatch('menu/SET_MENU_ACTIVEINDEX', parseInt(index))

      // 赋予左侧sider数据
      const children = items[parseInt(index)]['children']
      if (children.length !== 0) {
        // 设置sider数据
        store.dispatch('sider/SET_SIDER_ITEMS', children)
        // store.dispatch("sider/SET_SIDER_ITEMS", items);

        // 设置sider defaultActive
        // const firstItemId = children[0]["id"];
        // store.dispatch("sider/SET_SIDER_DEFAULTACTIVE", firstItemId);
      }
      console.log(store.state)

      // 默认添加第一个子集给tabs, 注意tabs中使用flatData数据
      // if (children.length !== 0) {
      //   const firstItemId = children[0]["id"];
      //   const routes = this.getFlatData;
      //   const item = routes.filter((ite: any) => ite.meta.id === firstItemId);
      //   item.length && addTab(item[0]);
      // }
    }
  }
})
</script>
