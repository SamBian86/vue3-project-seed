
import type { siteConfig } from "/#/config"
import { useLocalStorage } from "/@/utils/cache"
const { getToken } = useLocalStorage()
export const setting: siteConfig = {
  // 保存token信息 完成
  token: getToken(),
  isMobile: false
}