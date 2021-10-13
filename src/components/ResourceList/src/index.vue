<template>
  <div class="component-resource-wrapper">
    <div class="component-resource-list" v-for="item in data">
      <el-input
        v-model="item.resourceUrl"
        :placeholder="$t('components.resourceList.url')"
        :size="StyleEnum.INPUT_SIZE"
        @input="inputHandle"
      >
        <template #prepend>
          <el-select v-model="item.resourceMethod" class="component-resource-select" @change="selectChangeHandle">
            <el-option v-for="(ite, idx) in resourceOptions" :key="idx" :label="ite.label" :value="ite.value"></el-option>
          </el-select>
        </template>
        <template #append>
          <el-button icon="el-icon-delete" @click="removeHandle(item)"></el-button>
        </template>
      </el-input>
    </div>
    <el-button :size="StyleEnum.BUTTON_SIZE" class="component-resource-button" @click="addOneHandle">
      {{ $t('components.resourceList.addOne') }}
    </el-button>
  </div>
</template>

<script lang="ts">
import { StyleEnum } from '/@/enums/styleEnum'
import { defineComponent, ref, watch, unref } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import props from './props'
export default defineComponent({
  name: 'ResourceList',
  props: { ...props },
  setup(props, { emit }) {
    const data = ref(props.data)
    const { t } = useI18n()
    const resourceOptions = ref([
      { label: 'GET', value: 'GET' },
      { label: 'POST', value: 'POST' },
      { label: 'PUT', value: 'PUT' },
      { label: 'DELETE', value: 'DELETE' }
    ])
    const one = {
      resourceUrl: '',
      resourceMethod: 'GET'
    }

    watch(
      () => props.data,
      (val) => {
        data.value = val
      }
    )

    // 添加
    function addOneHandle() {
      let hasEmpty = false
      data.value.forEach((item) => {
        if (item.resourceUrl === '') {
          hasEmpty = true
        }
      })
      if (hasEmpty) {
        ElMessage.error(t('components.resourceList.addOneErrorMessage'))
      } else {
        data.value.push(Object.assign({}, one))
      }
    }

    // 删除
    function removeHandle(item: any) {
      const idx = data.value.findIndex(
        (ite) => ite.resourceUrl === item.resourceUrl && ite.resourceMethod === item.resourceMethod
      )

      if (idx !== -1) {
        data.value.splice(idx, 1)
      }
    }

    // select选择框
    function selectChangeHandle() {
      emit('resource-listen', unref(data.value))
    }

    // input框修改
    function inputHandle() {
      emit('resource-listen', unref(data.value))
    }

    return {
      StyleEnum,
      resourceOptions,
      data,
      addOneHandle,
      removeHandle,
      selectChangeHandle,
      inputHandle
    }
  }
})
</script>