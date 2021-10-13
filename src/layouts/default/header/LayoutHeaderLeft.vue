<template>
  <div class="yunlin-header-left"><solt></solt></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LayoutHeaderLeft",
  components: {},
  setup(props, { slots }) {
    return () => slots.default?.();
  },
});
</script>
