export default function useDialogPageComponent(dialogPageRef: any) {

  // 显示占位
  function showDialog() {
    dialogPageRef.value.showDialog()
  }

  // 隐藏占位
  function hideDialog() {
    dialogPageRef.value.hideDialog()
  }

  return {
    showDialog,
    hideDialog,
  }
}