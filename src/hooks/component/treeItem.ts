import { ref } from 'vue'
// 用于抽离所有分页列表页面的逻辑
export default function useTreeItemComponent(treeItemRef: any) {

  function getCheckedKeys() {
    return treeItemRef.value.getCheckedKeys()
  }

  return {
    getCheckedKeys
  }
}