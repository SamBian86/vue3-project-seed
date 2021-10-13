<template>
  <el-drawer
    v-model="pageDrawer"
    :id="refName"
    :ref="refName"
    :title="title"
    :before-close="handleClose"
    :destroy-on-close="destroyOnClose"
    :append-to-body="appendToBody"
    :direction="direction"
    :custom-class="'component-drawer-page'"
    :withHeader="withHeader"
  >
    <div class="component-drawer-message">
      <slot name="content"></slot>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import props from './props'
export default defineComponent({
  name: 'DrawerPage',
  props: { ...props },
  setup(props, { emit }) {
    const refName = ref(props.refName + Math.random())
    const title = ref(props.title)
    const withHeader = ref(props.withHeader)
    const direction = ref(props.direction)
    const pageDrawer = ref(false)
    function showDrawer() {
      pageDrawer.value = true
    }

    function hideDrawer() {
      pageDrawer.value = false
    }

    function handleClose() {
      emit('before-close')
    }

    watch(
      () => props.direction,
      (value) => {
        direction.value = value
      }
    )

    watch(
      () => props.title,
      (value) => {
        title.value = value
      }
    )

    return {
      refName,
      title,
      withHeader,
      direction,
      pageDrawer,
      handleClose,
      showDrawer,
      hideDrawer
    }
  }
})
</script>