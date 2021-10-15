<template>
  <div :class="[getDrawerWrapperClass, { 'yunlin-drawer-wrapper-isclose': !getIsOpen }]">
    <!-- 抽屉组件部分 -->
    <ElDrawer
      :size="getIsOpen ? getSize : getCloseSize"
      :custom-class="getIsOpen ? getCustomClass : getCloseCustomClass"
      v-model="getModelValue"
      :modal="getModal"
      :withHeader="getWithHeader"
      :direction="getDirection"
      :close-on-click-modal="getCloseOnClickModal"
      :close-on-press-escape="getCloseOnPressEscape"
    >
      <!-- logo部分 -->
      <LayoutLogo />
      <!-- 左侧导航部分 -->
      <LayoutSider />
    </ElDrawer>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LayoutLogo from './LayoutLogo.vue'
import LayoutSider from './LayoutSider.vue'
import { useDrawerSetting } from '/@/hooks/setting/useDrawerSetting'
import { mapGetters } from 'vuex'
export default defineComponent({
  name: 'LayoutSiderWrapper',
  components: { LayoutLogo, LayoutSider },
  computed: {
    // 用于判断是否展开
    ...mapGetters('adapter', ['getIsOpen'])
  },
  setup(props, { slots }) {
    const {
      getSize,
      getCloseSize,
      getCustomClass,
      getCloseCustomClass,
      getModelValue,
      getDrawerWrapperClass,
      getModal,
      getWithHeader,
      getDirection,
      getCloseOnClickModal,
      getCloseOnPressEscape
    } = useDrawerSetting()

    return {
      getSize,
      getCloseSize,
      getCustomClass,
      getCloseCustomClass,
      getModelValue,
      getDrawerWrapperClass,
      getModal,
      getWithHeader,
      getDirection,
      getCloseOnClickModal,
      getCloseOnPressEscape
    }
  }
})
</script>
