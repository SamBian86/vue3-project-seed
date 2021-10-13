<template>
  <div class="common_iframe_container">
    <iframe :src="meta.url" class="common_iframe" frameborder="0"></iframe>
  </div>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, reactive, onMounted } from 'vue'
import tableMixin from '/@/mixins/tableMixin'
import router from '/@/router'
export default defineComponent({
  name: 'ReportOperationanalysis', // 模板修改标记
  mixins: [tableMixin],
  components: {}, // 模板修改标记
  computed: {},
  setup(props, { emit }) {
    const { meta } = router.currentRoute.value
    console.log()
    return {
      meta
    }
  }
})
</script>
