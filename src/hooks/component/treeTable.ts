export default function useTreeTableComponent(treeTableRef: any) {

  function treeTableRefresh() {
    treeTableRef.value.treeTableRefresh()
  }

  return {
    treeTableRefresh
  }
}