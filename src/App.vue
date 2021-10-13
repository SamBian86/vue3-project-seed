<template>
  <ElConfigProvider :locale="locale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ElConfigProvider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import { AppProvider } from '/@/components/Application'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useLocalStorage } from '/@/utils/cache'
import { STORAGE_KEYS } from '/@/utils/cache/localStorage/enums'

export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider,
    AppProvider
  },
  setup() {
    const { getLanguage } = useLocalStorage()
    return {
      locale: getLanguage() === STORAGE_KEYS.DEFAULT_LANGUAGE ? zhCn : en
    }
  }
})
</script>

<style></style>
