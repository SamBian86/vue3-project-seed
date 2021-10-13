<template>
  <div :class="['yunlin-logo', { 'yunlin-logo-isclose': !getIsOpen }]">
    <img :src="ylLogo" class="yunlin-logo-image" />
    <span>{{ $t("appName") }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ylLogo from "/@/assets/images/logo.png";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "LayoutLogo",
  computed: {
    // 用于判断是否展开
    ...mapGetters("adapter", ["getIsOpen"]),
  },
  setup(props, { slots }) {
    return {
      ylLogo,
    };
  },
});
</script>
