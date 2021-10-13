import type { App } from 'vue';
import { createI18n } from 'vue-i18n'
import { getLanguage } from '/@/utils/cache/localStorage'
import zhCNMessages from './lang/zh-cn'
import enCNMessages from './lang/en'

const locale = getLanguage()

const localsMessages: any = {
  'zh-cn': zhCNMessages,
  'en': enCNMessages
}

export const i18n = createI18n({
  globalInjection: true,
  locale,
  messages: {
    ...localsMessages[locale]
  },
})
// config router
export function setupI18N(app: App<Element>) {
  // console.log(`i18n ready`)
  app.use(i18n);
}
