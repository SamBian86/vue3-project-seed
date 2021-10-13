
<template>
  <el-dialog
    ref="dialogComponent"
    :fullscreen="fullscreen"
    v-model="pageDialog"
    custom-class="component-dialog-page"
    append-to-body
    destroy-on-close
  >
    <slot name="body"></slot>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, provide, ref, watch, reactive } from 'vue'
import props from './props'
export default defineComponent({
  name: 'DialogPage',
  props: { ...props },
  setup(props, { emit }) {
    const dialogComponent = ref(null)
    const refName = ref(props.refName + Math.random())
    const fullscreen = ref(true)
    const pageDialog = ref(false)

    function showDialog() {
      pageDialog.value = true
    }

    function hideDialog() {
      pageDialog.value = false
    }

    return {
      dialogComponent,
      refName,
      fullscreen,
      pageDialog,
      showDialog,
      hideDialog
    }
  }
})
</script>