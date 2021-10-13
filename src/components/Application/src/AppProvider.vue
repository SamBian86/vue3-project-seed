<template>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppProvider",
  inheritAttrs: false,
  setup(props, { slots }) {},
});
</script>
