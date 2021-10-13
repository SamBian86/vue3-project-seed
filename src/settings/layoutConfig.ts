import { LayoutConfig } from "/#/layout"
import ylLogo from "/@/assets/images/logo.png";
import { getLanguage } from "/@/utils/cache/localStorage";

export const setting: LayoutConfig = {
  sider: {
    logoUrl: ylLogo,
    appName: `${import.meta.env.VITE_APP_Name}`,
    defaultActive: '',
    defaultOpeneds: [],
    items: [],
  },
  adapter: {
    isOpen: true
  },
  refresh: {
    refreshPage: false,
    refreshByUser: false
  },
  menu: {
    datas: [],
    items: [],
    activeId: '',
    activeIndex: -1
  },
  role: {
    name: ''
  },
  fullScreen: {
    status: false
  },
  userInfo: {
    deptId: "",
    headUrl: null,
    id: "",
    kill: 0,
    mobile: "",
    password: null,
    realName: "",
    resourceList: [],
    roles: [],
    salt: "",
    superAdmin: 0,
    username: "",
  },
  language: {
    language: getLanguage()
  },
  tabs: {
    // tabs集合
    items: [],
    // 选中项
    activeId: ''
  }
}

export default setting;