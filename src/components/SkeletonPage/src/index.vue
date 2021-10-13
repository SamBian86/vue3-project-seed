<template>
  <div :id="refName" :ref="refName" class="component-skeleton-page">
    <el-skeleton v-show="pageSkeleton"></el-skeleton>
    <div v-show="!pageSkeleton">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, watch, reactive } from 'vue'
import props from './props'
export default defineComponent({
  name: 'SkeletonPage',
  props: { ...props },
  setup(props, { emit }) {
    const refName = ref(props.refName + Math.random())
    const pageSkeleton = ref(true)

    function showSkeleton() {
      pageSkeleton.value = true
    }

    function hideSkeleton() {
      pageSkeleton.value = false
    }

    return {
      refName,
      pageSkeleton,
      showSkeleton,
      hideSkeleton
    }
  }
})
</script>