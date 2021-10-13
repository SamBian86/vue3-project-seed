import { MenuEnum } from '/@/enums/menuEnum'
import { computed, unref } from 'vue';

export function useMenuSetting() {

  const getCustomClass = computed(() => {
    return unref(MenuEnum.customClass)
  })

  const getCollapse = computed(() => {
    return !!MenuEnum.collapse
  })

  const getBackgroundColor = computed(() => {
    return unref(MenuEnum.backgroundColor)
  })

  const getTextColor = computed(() => {
    return MenuEnum.textColor
  })

  const getActiveTextColor = computed(() => {
    return MenuEnum.activeTextColor
  })

  const getDefaultActive = computed(() => {
    return !!MenuEnum.defaultActive
  })

  const getDefaultOpeneds = computed(() => {
    return MenuEnum.defaultOpeneds
  })

  const getUniqueOpened = computed(() => {
    return !!MenuEnum.uniqueOpened
  })

  const getMenuTrigger = computed(() => {
    return MenuEnum.menuTrigger
  })

  const getCollapseTransition = computed(() => {
    return !!MenuEnum.collapseTransition
  })

  return {
    getCustomClass,
    getCollapse,
    getBackgroundColor,
    getTextColor,
    getActiveTextColor,
    getDefaultActive,
    getDefaultOpeneds,
    getUniqueOpened,
    getMenuTrigger,
    getCollapseTransition
  }
}