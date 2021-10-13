import { ref, unref } from 'vue'
// 用于抽离所有分页列表页面的逻辑
export default function usePgTableComponent(pgTableRef: any) {
  const pgTableSelections = ref([])
  const tableUsefulData = ref({})

  function pgTableQuery(params = {}) {
    pgTableRef.value.pgTableQuery(unref(params))
  }

  function pgTableReset() {
    pgTableRef.value.pgTableReset()
  }

  // 多选
  function handleSelectionChange(items: any[], key: string) {
    pgTableSelections.value = items.map(item => item[key])
  }

  // 重置多选
  function clearSelection() {
    pgTableRef.value.clearSelection()
  }

  // 获取TableUsefulData
  function getTableUsefulDataHandle(data: any) {
    tableUsefulData.value = data
  }

  return {
    pgTableSelections,
    pgTableQuery,
    pgTableReset,
    handleSelectionChange,
    clearSelection,
    tableUsefulData,
    getTableUsefulDataHandle
  }
}