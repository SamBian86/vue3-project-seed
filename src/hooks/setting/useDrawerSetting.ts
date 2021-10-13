import { DrawerEnum } from '/@/enums/drawerEnum'
import { computed, unref } from 'vue';

export function useDrawerSetting() {

  const getSize = computed(() => {
    return unref(DrawerEnum.size)
  })

  const getCloseSize = computed(() => {
    return unref(DrawerEnum.isCloseSize)
  })

  const getCustomClass = computed(() => {
    return DrawerEnum.customClass
  })

  const getCloseCustomClass = computed(() => {
    return DrawerEnum.isCloseCustomClass
  })

  const getModelValue = computed(() => {
    return !!DrawerEnum.modelValue
  })

  const getDrawerWrapperClass = computed(() => {
    return DrawerEnum.drawerWrapperClass
  })

  const getModal = computed(() => {
    return !!DrawerEnum.modal
  })

  const getWithHeader = computed(() => {
    return !!DrawerEnum.withHeader
  })

  const getDirection = computed(() => {
    return DrawerEnum.direction
  })

  const getCloseOnClickModal = computed(() => {
    return !!DrawerEnum.closeOnClickModal
  })

  const getCloseOnPressEscape = computed(() => {
    return !!DrawerEnum.closeOnPressEscape
  })

  return {
    getSize,
    getCloseSize,
    getCustomClass,
    getCloseCustomClass,
    getModelValue,
    getDrawerWrapperClass,
    getModal,
    getWithHeader,
    getDirection,
    getCloseOnClickModal,
    getCloseOnPressEscape
  }

}


