export enum DrawerEnum {
  // sider 宽度
  size = 260,
  // isOpen为false时候的宽度
  isCloseSize = 64,
  // custom-class
  customClass = 'yunlin-sider',
  // isOpen为false时候的custom-class
  isCloseCustomClass = 'yunlin-sider yunlin-sider-isclose',
  // drawer默认状态
  modelValue = 1,
  // drawer容器样式
  drawerWrapperClass = 'yunlin-drawer-wrapper',
  // 是否需要遮罩层
  modal = 0,
  // 控制是否显示 header 栏，默认1
  withHeader = 0,
  // 打开的方向 从左往右
  direction = "ltr",
  // 是否可以通过点击 modal 关闭 Drawer，默认1
  closeOnClickModal = 0,
  // 是否可以通过按下 ESC 关闭 Drawer，默认1
  closeOnPressEscape = 0
}