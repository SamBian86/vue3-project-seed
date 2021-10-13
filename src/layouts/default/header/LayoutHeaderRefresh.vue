<template>
  <div class="yunlin-header-reflash" v-if="getIsOpen">
    <i class="el-icon-refresh-right"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "LayoutHeaderSwitch",
  computed: {
    // 用于判断是否展开
    ...mapGetters("adapter", ["getIsOpen"]),
  },
  components: {},
  setup(props, { slots }) {
    return {};
  },
});
</script>
