import { ProjectEnum } from '/@/enums/projectEnum'
import { checkDevice } from '/@/utils'
import { useStore } from "vuex"

export const watchAppWidth = () => {
  const store = useStore()
  const body = document.body

  function bindResize() {
    const w = document.documentElement.clientWidth
    if (w > ProjectEnum.adapterMaxWidth) {
      store.dispatch("adapter/SET_ISOPEN", true);

    } else {
      store.dispatch("adapter/SET_ISOPEN", false);

    }
  }

  function addClass() {
    if (!body.classList.contains('is-mobile')) {
      body.classList.add('is-mobile')
    }
  }

  function removeClass() {
    if (body.classList.contains('is-mobile')) {
      body.classList.remove('is-mobile')
    }
  }

  // 检测设备类型
  function checkDeviceHandle() {
    const browser = checkDevice()
    const isMobile = browser.versions.android || browser.versions.iPhone || browser.versions.iPad
    // console.log(isMobile)
    if (isMobile) {
      addClass()
    } else {
      removeClass()
    }
    store.dispatch("site/SET_ISMOBILE", isMobile)
  }

  window.addEventListener('resize', () => {
    bindResize()
  })

  checkDeviceHandle()
  bindResize()
}