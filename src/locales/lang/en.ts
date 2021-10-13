import type { LocaleMessageObject, VueMessageType } from "vue-i18n"

export const messages: LocaleMessageObject<VueMessageType> = {
  'en': {
    language: '英语',
    appName: '耘林微服务平台',
    global: {
      tips: '提示',
      confirm: '确定',
      cancel: '取消'
    },
    login: {
      captcha: '验证码',
      login: '登录',
      success: '登录成功',
      usernamePlaceholder: '请输入账号',
      passwordPlaceholder: '请输入密码',
      captchaPlaceholder: '请输入验证码'
    },
    logout: {
      title: '确定要退出登录?'
    }
  }
}

export default messages