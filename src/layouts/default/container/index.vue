<template>
  <div class="yunlin-container">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "LayoutContainer",
  computed: {
    // 用于判断是否展开
    ...mapGetters("adapter", ["getIsOpen"]),
  },
  setup(props, { slots }) {
    console.log("Container");
    // return () => slots.default?.();
  },
});
</script>
