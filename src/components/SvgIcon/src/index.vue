<template>
  <svg aria-hidden="true" :width="width" :height="height">
    <use :xlink:href="symbolId" :fill="color" :width="width" :height="height" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { StyleEnum } from "/@/enums/styleEnum";

export default defineComponent({
  name: "SvgIcon",
  props: {
    prefix: {
      type: String,
      default: "icon-",
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: StyleEnum.ICON_DEFAULT_COLOR,
    },
    width: {
      type: Number,
      default: StyleEnum.ICON_SIZE,
    },
    height: {
      type: Number,
      default: StyleEnum.ICON_SIZE,
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}${props.name}`);
    return { symbolId };
  },
});
</script>