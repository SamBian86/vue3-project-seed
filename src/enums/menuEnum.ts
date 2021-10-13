export enum MenuEnum {
  // custom-class
  customClass = 'yunlin-el-menu',
  // 是否水平折叠收起菜单,默认0
  collapse = 0,
  // 菜单的背景色
  backgroundColor = "#191a23",
  // 菜单的文字颜色
  textColor = "#aaa",
  // 当前激活菜单的文字颜色
  activeTextColor = "#fff",
  // 当前激活菜单的index
  defaultActive = 0,
  // 当前打开的sub-menu的 index 的数组
  defaultOpeneds = 0,
  // 是否只保持一个子菜单的展开默认false
  uniqueOpened = 0,
  // 子菜单打开的触发方式(只在 mode 为 horizontal 时有效) "hover/click"
  menuTrigger = "hover",
  // 是否开启折叠动画默认true
  collapseTransition = 1
}