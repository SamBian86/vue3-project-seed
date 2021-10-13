import { ProjectEnum } from '/@/enums/projectEnum'
import { useStore } from "vuex"

export const watchAppWidth = () => {
  const store = useStore()
  const body = document.body

  function bindResize() {
    const w = document.documentElement.clientWidth
    if (w > ProjectEnum.adapterMaxWidth) {
      store.dispatch("adapter/SET_ISOPEN", true);
      removeClass()
    } else {
      store.dispatch("adapter/SET_ISOPEN", false);
      addClass()
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

  window.addEventListener('resize', () => {
    bindResize()
  })

  bindResize()
}