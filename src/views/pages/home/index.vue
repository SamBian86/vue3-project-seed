<template>
  <div class="yunlin-home">
    <span style="display: none">{{ $t("language") }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "Home",
  setup(props, { slots }) {
    const { t } = useI18n();
  },
});
</script>
