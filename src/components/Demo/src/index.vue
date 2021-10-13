<template></template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { StyleEnum } from '/@/enums/styleEnum'
import props from './props'
export default defineComponent({
  name: 'Demo',
  props: { ...props },
  setup(props) {
    return {
      StyleEnum
    }
  }
})
</script>