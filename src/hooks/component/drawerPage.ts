export default function useDrawerPageComponent(drawerPageRef: any) {

  // 显示
  function showDrawer() {
    drawerPageRef.value.showDrawer()
  }

  // 隐藏
  function hideDrawer() {
    drawerPageRef.value.hideDrawer()
  }

  return {
    showDrawer,
    hideDrawer,
  }
}