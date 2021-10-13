import { StyleEnum } from '/@/enums/styleEnum'
import { computed } from 'vue';

export function useGlobalSetting() {
  const getIconSize = computed(() => {
    return StyleEnum.ICON_SIZE
  })

  const getWhiteColor = computed(() => {
    return StyleEnum.ICON_DEFAULT_COLOR
  })

  return {
    getIconSize,
    getWhiteColor
  }
}