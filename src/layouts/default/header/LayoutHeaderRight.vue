<template>
  <div class="yunlin-header-right"><solt></solt></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LayoutHeaderRight",
  components: {},
  setup(props, { slots }) {
    return () => slots.default?.();
  },
});
</script>
