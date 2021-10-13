<template>
  <div class="component-tree-table">
    <!-- 查询区域 -->
    <div class="search-wrapper">
      <div class="search-input-area">
        <slot name="search"></slot>
      </div>
      <div class="search-button-area">
        <slot name="button"></slot>
      </div>
    </div>
    <!-- 列表区域 -->
    <div class="table-wrapper">
      <el-table :id="refName" :ref="refName" :data="data" :row-key="rowKey" :tree-props="treeProps">
        <slot name="content"></slot>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'
import props from './props'
export default defineComponent({
  name: 'TreeTable',
  props: { ...props },
  setup(props) {
    const data = ref([])
    const refName = ref(props.refName + Math.random())
    const tableMethod = props.tableMethod
    const tableParams = props.tableParams

    // 初始化获取数据
    getTableList()

    function getTableList() {
      tableMethod(tableParams).then((response: any) => {
        data.value = response
      })
    }

    function treeTableRefresh() {
      getTableList()
    }

    return {
      data,
      refName,
      treeTableRefresh
    }
  }
})
</script>