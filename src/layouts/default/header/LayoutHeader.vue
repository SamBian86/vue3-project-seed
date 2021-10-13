<template>
  <!-- 头部布局 -->
  <div class="yunlin-header-wrapper">
    <!-- 头部菜单区域 -->
    <div class="yunlin-header-layout">
      <el-icon :size="getIconSize" :color="getWhiteColor">
        <fold />
      </el-icon>
    </div>
    <!-- 头部tabs区域 -->
    <div class="yunlin-header-tabs"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Fold } from "@element-plus/icons";
import { useGlobalSetting } from "/@/hooks/setting/GlobalAppSetting";
export default defineComponent({
  name: "LayoutHeader",
  components: { Fold },
  setup(props, { slots }) {
    console.log("LayoutHeaderWrapper");
    // return () => slots.default?.();
    const { getIconSize, getWhiteColor } = useGlobalSetting();
    return {
      getIconSize,
      getWhiteColor,
    };
  },
});
</script>
