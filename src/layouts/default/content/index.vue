<template>
  <div class="yunlin-content-wrapper">
    <Transition mode="out-in">
      <RouterView v-slot="{ Component, route }">
        <!-- {{ route.meta.action }} -->
        <!-- PensionEpidemicsituationForm 这个页面不使用KeepAlive -->
        <KeepAlive exclude="PensionEpidemicsituationForm">
          <Component :is="Component" />
        </KeepAlive>
      </RouterView>
    </Transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, Transition } from 'vue'
export default defineComponent({
  name: 'LayoutContent',
  setup(props, { slots }) {
    const filterPath = ['/pension/epidemicsituation']
    console.log('LayoutContent')
    // return () => slots.default?.();

    return {
      filterPath
    }
  }
})
</script>
