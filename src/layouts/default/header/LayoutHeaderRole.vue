<template>
  <div class="yunlin-header-role" v-if="getIsOpen">
    <i class="el-icon-user"></i>
    <span>当前租户</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "LayoutHeaderRole",
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
