<template>
  <div class="component-icon-list">
    <el-popover placement="bottom" :width="368" trigger="click" v-model:visible="visible">
      <template #reference>
        <el-input :size="StyleEnum.INPUT_SIZE" v-model="data" :placeholder="$t('components.iconList.iconPlaceholder')">
          <template #append>
            <el-button icon="el-icon-search" @click="visible = !visible"></el-button>
          </template>
        </el-input>
      </template>
      <div class="component-icon-list-wrapper">
        <div class="component-icon-list-content">
          <el-button
            :class="[{ 'el-button-selected': data === item.name }]"
            v-for="(item, index) in icons"
            :key="index"
            @click="clickHandle(item)"
          >
            <SvgIcon :name="item.name" :prefix="''" :color="data === item.name ? '#409eff' : '#333'" />
          </el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { StyleEnum } from '/@/enums/styleEnum'
import props from './props'
import { getIconList } from '/@/utils'
import { SvgIcon } from '/@/components/SvgIcon'
export default defineComponent({
  name: 'IconList',
  props: { ...props },
  components: { SvgIcon },
  setup(props, { emit }) {
    const visible = ref(false)
    const icons = getIconList()
    const data = ref(props.data)

    function clickHandle(item: any) {
      emit('icon-listen', item)
    }

    watch(
      () => props.data,
      (val) => {
        data.value = val
      }
    )

    return {
      StyleEnum,
      clickHandle,
      visible,
      icons,
      data
    }
  }
})
</script>