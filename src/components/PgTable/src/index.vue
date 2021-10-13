<template>
  <div class="component-pg-table">
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
      <el-table
        :id="refName"
        ref="pgTable"
        :data="data"
        :row-key="rowKey"
        :tree-props="treeProps"
        @selection-change="handleSelectionChange"
        @expand-change="handleExpandChange"
      >
        <el-table-column v-if="selection" type="selection" width="55"></el-table-column>
        <slot name="content"></slot>
      </el-table>
    </div>
    <div class="pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="paginationConfig.total"
        :layout="paginationConfig.layout"
        :page-sizes="paginationConfig.pageSizes"
        :page-size="paginationConfig.pageSize"
      ></el-pagination>
    </div>
    <div class="table-footer-wrapper">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import props from './props'
export default defineComponent({
  name: 'PgTable',
  props: { ...props },
  setup(props, { emit }) {
    const data = ref([])
    const pgTable = ref(null)
    const tableMethod = props.tableMethod
    const selection = ref(props.selection)
    const paginationConfig = ref({
      pageSizes: [10, 20, 50, 100],
      pageSize: 10,
      total: 0,
      layout: 'total, sizes, prev, pager, next, jumper'
    })
    const defaultParams = {
      pageNo: 1,
      pageSize: 10,
      // order: 'desc'
      order: ''
    }
    let firstTableParams = Object.assign({}, defaultParams, props.tableParams)
    let tableParams = Object.assign({}, defaultParams, firstTableParams)

    // 初始化获取数据
    getTableList()

    function getTableList() {
      tableMethod(tableParams).then((response: any) => {
        data.value = response.list
        paginationConfig.value.total = response.total
        emit('get-tabel-useful-data', {
          len: response.list.length,
          data: response.list
        })
      })
    }

    function handleSizeChange(val: any) {
      tableParams.pageSize = val
      paginationConfig.value.pageSize = val
      getTableList()
    }

    function handleCurrentChange(val: any) {
      tableParams.pageNo = val
      getTableList()
    }

    // 查询方法前的操作
    function pgTableBeforeQuery(params: any) {
      tableParams = { ...tableParams, ...params }
    }

    // 查询方法
    function pgTableQuery(params: any) {
      tableParams = { ...tableParams, ...params }
      getTableList()
    }

    // 清除方法
    function pgTableReset() {
      tableParams = firstTableParams
      getTableList()
    }

    // 多选方法
    function handleSelectionChange(rows: any[]) {
      emit('selection-change', rows)
    }

    // 清楚用户的选择
    function clearSelection() {
      pgTable.value.clearSelection()
    }

    // 展开回调方法
    function handleExpandChange(rows: any) {
      emit('expand-change', rows)
    }

    return {
      data,
      pgTable,
      selection,
      paginationConfig,
      handleSizeChange,
      handleCurrentChange,
      pgTableBeforeQuery,
      pgTableQuery,
      pgTableReset,
      handleSelectionChange,
      handleExpandChange,
      clearSelection
    }
  }
})
</script>