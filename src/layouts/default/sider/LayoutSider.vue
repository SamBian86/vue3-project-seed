<template>
  <div>
    <el-menu
      :class="getCustomClass"
      :collapse="!getIsOpen"
      :background-color="getBackgroundColor"
      :text-color="getTextColor"
      :active-text-color="getActiveTextColor"
      :unique-opened="getUniqueOpened"
      :menu-trigger="getMenuTrigger"
      :collapse-transition="getCollapseTransition"
      :default-active="getDefaultActive"
    >
      <LayoutSiderItem
        v-for="item in getSiderItems"
        :key="item.id"
        :item="item"
      >
      </LayoutSiderItem>
      <!-- <el-submenu index="1">
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
      </el-submenu> -->
    </el-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";
import { mapGetters } from "vuex";
import LayoutSiderItem from "./item.vue";
export default defineComponent({
  name: "LayoutSider",
  components: { LayoutSiderItem },
  computed: {
    // 用于判断是否有权限的方法
    ...mapGetters("sider", ["getSiderItems", "getDefaultActive"]),
    // 用于判断是否展开
    ...mapGetters("adapter", ["getIsOpen"]),
  },
  setup(props, { slots }) {
    const {
      getCustomClass,
      getCollapse,
      getBackgroundColor,
      getTextColor,
      getActiveTextColor,
      // getDefaultActive,
      // getDefaultOpeneds,
      getUniqueOpened,
      getMenuTrigger,
      getCollapseTransition,
    } = useMenuSetting();
    return {
      getCustomClass,
      getCollapse,
      getBackgroundColor,
      getTextColor,
      getActiveTextColor,
      // getDefaultActive,
      // getDefaultOpeneds,
      getUniqueOpened,
      getMenuTrigger,
      getCollapseTransition,
    };
  },
});
</script>
