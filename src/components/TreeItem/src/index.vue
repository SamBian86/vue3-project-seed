<template>
  <div class="component-tree-item">
    <el-tree
      ref="treeItem"
      :data="data"
      :default-checked-keys="defaultCheckedKeys"
      :expand-on-click-node="expandOnClickNode"
      :props="treeProps"
      :check-strictly="checkStrictly"
      :show-checkbox="showCheckbox"
      :highlight-current="highlightCurrent"
      :node-key="nodeKey"
      @node-click="nodeClickHandle"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import props from './props'
export default defineComponent({
  name: 'TreeItem',
  props: { ...props },
  setup(props, { emit }) {
    const treeItem = ref(null)
    const data = ref([])
    const defaultCheckedKeys = ref(props.defaultCheckedKeys)
    const expandOnClickNode = ref(props.expandOnClickNode)
    const treeProps = ref(props.props)
    const checkStrictly = ref(props.checkStrictly)
    const showCheckbox = ref(props.showCheckbox)
    const highlightCurrent = ref(props.highlightCurrent)
    const nodeKey = ref(props.nodeKey)
    const treeMethod = props.treeMethod
    const treeParams = props.treeParams
    const responseName = props.responseName
    // 初始化获取数据
    getTreeList()

    function getTreeList() {
      treeMethod(treeParams).then((response: any) => {
        if (responseName) {
          data.value = response[responseName]
        } else {
          data.value = response
        }
      })
    }

    // 获取选中项
    function getCheckedKeys() {
      const items = treeItem.value.getCheckedKeys()
      return items
    }

    // 设置选中项
    function setCheckedKeys(items: any) {
      treeItem && treeItem.value.setCheckedKeys(items)
    }

    watch(
      () => props.defaultCheckedKeys,
      (value) => {
        setCheckedKeys(value || [])
      }
    )

    // node点击
    function nodeClickHandle(data: any, node: any, component: any) {
      emit('node-click-handle', {
        data,
        node,
        component
      })
    }

    watch(
      () => props.highlightCurrent,
      (value) => {
        highlightCurrent.value = value
      }
    )

    return {
      treeItem,
      data,
      defaultCheckedKeys,
      expandOnClickNode,
      treeProps,
      checkStrictly,
      showCheckbox,
      highlightCurrent,
      nodeKey,
      getCheckedKeys,
      nodeClickHandle
    }
  }
})
</script>