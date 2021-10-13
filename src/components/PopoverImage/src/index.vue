<template>
  <div class="component-popover-image-wrapper">
    <el-popover placement="bottom" trigger="hover">
      <div>
        <el-image class="component-popover-image" :src="url">
          <template #error>
            <div class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </template>
        </el-image>
      </div>
      <template #reference>
        <div>
          <slot></slot>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import props from './props'
export default defineComponent({
  name: 'PopoverImage',
  props: { ...props },
  setup(props) {
    const url = ref(props.url)
    const visible = ref(false)

    watch(
      () => props.url,
      (value: any) => {
        url.value = value
      }
    )
    return {
      url,
      visible
    }
  }
})
</script>