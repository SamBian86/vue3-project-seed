<template>
  <!-- 一级 getIsOpen为false-->
  <el-submenu v-if="!getIsOpen && item.children && item.children.length === 0" :index="item.id">
    <template #title>
      <svg class="icon-svg" aria-hidden="true">
        <use :xlink:href="`#${item.icon}`" :fill="getDefaultActive === item.id ? '#fff' : '#aaa'" />
      </svg>
      <span class="menu-text">{{ item.name }}</span>
    </template>
    <el-menu-item :index="item.id" @click="clickSiderItemHandle">
      <svg class="icon-svg" aria-hidden="true">
        <use :xlink:href="`#${item.icon}`" :fill="getDefaultActive === item.id ? '#fff' : '#aaa'" />
      </svg>
      <span class="menu-text">{{ item.name }}</span>
    </el-menu-item>
  </el-submenu>
  <!-- 一级 getIsOpen为true-->
  <el-menu-item v-if="getIsOpen && item.children && item.children.length === 0" :index="item.id" @click="clickSiderItemHandle">
    <svg class="icon-svg" aria-hidden="true">
      <use :xlink:href="`#${item.icon}`" :fill="getDefaultActive === item.id ? '#fff' : '#aaa'" />
    </svg>
    <span class="menu-text">{{ item.name }}</span>
  </el-menu-item>
  <!-- 二级 -->
  <el-submenu v-else-if="item.children && item.children.length !== 0" :index="item.id">
    <template #title>
      <svg class="icon-svg" aria-hidden="true">
        <use :xlink:href="`#${item.icon}`" :fill="'#fff'" />
      </svg>
      <span class="menu-text">{{ item.name }}</span>
    </template>
    <el-menu-item v-for="ite in item.children" :index="ite.id" @click="clickSiderItemHandle">
      <svg class="icon-svg" aria-hidden="true">
        <use :xlink:href="`#${ite.icon}`" :fill="getDefaultActive === ite.id ? '#fff' : '#aaa'" />
      </svg>
      <span class="menu-text">{{ ite.name }}</span>
    </el-menu-item>
  </el-submenu>
  <!--   
  <el-submenu index="1">
    <template #title>
      <i class="el-icon-location"></i>
      <span>导航一</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <template #title>选项4</template>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu>
  </el-submenu>
   -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, useStore } from 'vuex'
import router from '/@/router'
import { addTab } from '/@/utils/tabs'
export default defineComponent({
  name: 'LayoutSiderItem',
  props: {
    item: Object
  },
  computed: {
    // 用于判断是否有权限的方法
    ...mapGetters('route', ['getFlatDataById']),
    // 获取sider defaultActive
    ...mapGetters('sider', ['getDefaultActive']),
    // 用于判断是否展开
    ...mapGetters('adapter', ['getIsOpen'])
  },
  setup(props, { slots }) {
    const store = useStore()

    function clickSiderItemHandle(item: any) {
      console.log('clickSiderItemHandle')
      const { index } = item
      const ite = store.getters['route/getFlatDataById'](index)
      if (ite.length) {
        const path = ite[ite.length - 1]['path']
        const id = ite[ite.length - 1]['meta']['id']
        const isTab = ite[ite.length - 1]['meta']['isTab']
        const action = ite[ite.length - 1]['meta']['action']
        const url = ite[ite.length - 1]['meta']['url']

        // 如果有打开新标签页面的需要则打开，否则使用正常标签页逻辑
        if (/_target/.test(action)) {
          window.open(url, '_target')
        } else {
          // 路由跳转
          router.push({ path })
          // 设置高亮
          store.dispatch('sider/SET_SIDER_DEFAULTACTIVE', id)
          // 保存当前path
          store.dispatch('route/SET_CURRENT_PATH', path)
          // 只有isTab为true才能添加
          if (isTab) {
            addTab(ite[ite.length - 1])
          }
        }
      }
    }

    return {
      clickSiderItemHandle
    }
  }
})
</script>
