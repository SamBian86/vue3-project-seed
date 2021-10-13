<template>
  <div class="component-cascader-item-wrapper">
    <div v-if="!show" class="component-cascader-item-input">
      <el-input :size="StyleEnum.FORM_SIZE" v-model="showText" :placeholder="placeholder" readonly>
        <template #append>
          <span class="cascader-show" @click="chooseHandle">重新选择</span>
        </template>
      </el-input>
    </div>
    <div v-if="show" class="component-cascader-item">
      <el-cascader
        v-if="!lazy"
        :size="StyleEnum.FORM_SIZE"
        :class="'form-page-cascader'"
        :options="options"
        :props="_props"
        :disabled="disabled"
        :placeholder="placeholder"
        @change="cascaderChangeHandle"
      ></el-cascader>
      <el-cascader
        v-else
        :size="StyleEnum.FORM_SIZE"
        :class="'form-page-cascader'"
        :props="_props"
        :disabled="disabled"
        :placeholder="placeholder"
        @change="cascaderChangeHandle"
      ></el-cascader>
    </div>
  </div>
</template>

<script lang="ts">
import { StyleEnum } from '/@/enums/styleEnum'
import { defineComponent, ref, unref, watch } from 'vue'
import props from './props'
export default defineComponent({
  name: 'CascaderItem',
  props: { ...props },
  setup(props, { emit }) {
    let _props = ref(props.props)
    const lazy = ref(props.lazy)
    const disabled = ref(props.disabled)
    const placeholder = ref(props.placeholder)
    const showText = ref(props.showText || '')
    const options = ref(props.options)
    const dataMethod = props.dataMethod
    const dataStore = ref({})
    const show = ref(false)
    if (lazy.value === true) {
      _props.value = {
        lazy: true,
        lazyLoad(node: { level: any; data: any }, resolve: (arg0: any) => void) {
          const { level, data } = node
          const { code } = data
          const type = level + 1
          dataMethod({ type, code }).then((response: any) => {
            response.forEach((item: any) => {
              if (!dataStore.value[item.code]) {
                dataStore.value[item.code] = item.name
              }
              item.label = item.name
              item.value = item.code
              item.leaf = level >= 3
            })
            resolve(response)
          })
        }
      }
    }

    // cascaderChangeHandle
    function cascaderChangeHandle(value: any) {
      const store = unref(dataStore)
      const selected = unref(value)
      emit('cascader-change-handle', {
        store,
        selected
      })
      show.value = false
    }

    // 重新选择
    function chooseHandle() {
      show.value = true
    }

    watch(
      () => props.showText,
      (val) => {
        showText.value = val
      }
    )

    return {
      StyleEnum,
      _props,
      lazy,
      disabled,
      placeholder,
      showText,
      options,
      dataMethod,
      cascaderChangeHandle,
      chooseHandle,
      show
    }
  }
})
</script>