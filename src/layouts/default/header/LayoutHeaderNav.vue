<template>
  <!-- <div class="yunlin-header-nav-wrapper">
    <el-tabs v-model="getMenuActiveId" @tab-click="menuClickHandle">
      <el-tab-pane v-for="item in getMenuItems" :label="item.name" :name="item.id"></el-tab-pane>
    </el-tabs>
  </div> -->
  <div class="yunlin-header-nav-menu-wrapper">
    <el-menu :default-active="getMenuActiveIndex" class="yunlin-header-nav-menu" background-color="#191a23" mode="horizontal">
      <el-menu-item
        v-for="(item, index) in getMenuItems"
        :index="index"
        @click="menuClickHandle"
        :class="{ 'el-menu-item-hide': (splitIndex !== null && index > splitIndex) || splitIndex === 0 }"
      >
        <svg class="icon-svg" aria-hidden="true">
          <use :xlink:href="`#${item.icon}`" :fill="getMenuActiveId === item.id ? '#fff' : '#909399'" />
        </svg>
        {{ item.name }}
      </el-menu-item>
      <el-submenu :index="getMenuItems.length">
        <template #title>{{ $t('header.more') }}</template>
        <el-menu-item
          v-for="(item, index) in getMenuItems"
          :index="index"
          @click="menuClickHandle"
          :class="{ 'el-menu-item-hide': splitIndex !== null && index <= splitIndex }"
        >
          <svg class="icon-svg" aria-hidden="true">
            <use :xlink:href="`#${item.icon}`" :fill="getMenuActiveId === item.id ? '#fff' : '#909399'" />
          </svg>
          {{ item.name }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { mapGetters } from 'vuex'
import store from '/@/store'
import { getSplitIndexInArray } from '/@/utils'
export default defineComponent({
  name: 'LayoutHeaderNav',
  components: {},
  computed: {
    // 用于判断是否有权限的方法
    ...mapGetters('menu', ['getMenuItems', 'getMenuActiveId', 'getMenuActiveIndex']),
    ...mapGetters('tabs', ['getTabItems']),
    ...mapGetters('route', ['getFlatData'])
  },
  setup(props, { slots }) {
    const widths = []
    const stepWidth = []
    const splitIndex = ref(null)
    onMounted(() => {
      setTimeout(() => {
        const lis = document.querySelectorAll('.yunlin-header-nav-menu li')
        // yunlin-header-nav-menu
        const menuEl = document.querySelector('.yunlin-header-nav-menu')
        const menuWidth = menuEl.offsetWidth
        splitIndex.value = lis.length - 1
        // 收集li宽度
        for (let i = 0; i < lis.length; i++) {
          widths.push(lis[i].offsetWidth)
        }
        const submenuWidth = widths.pop()
        for (let i = 0; i < widths.length; i++) {
          if (i === 0) {
            stepWidth.push(widths[i] + submenuWidth)
          } else {
            stepWidth.push(stepWidth[i - 1] + widths[i])
          }
        }
        // 找出分割的index
        splitIndex.value = getSplitIndexInArray(stepWidth, menuWidth)

        window.addEventListener('resize', function () {
          const menuEl = document.querySelector('.yunlin-header-nav-menu')
          const menuWidth = menuEl.offsetWidth
          splitIndex.value = getSplitIndexInArray(stepWidth, menuWidth)
        })
      }, 200)
    })

    return {
      splitIndex
    }
  },
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

      // 监听 yunlin-header-nav-menu-wrapper 容器长度变化
    }
  }
})
</script>
