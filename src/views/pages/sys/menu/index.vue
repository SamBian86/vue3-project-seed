<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="16" :lg="16" :xl="16">
      <TreeTable :table-method="getSysMenuListHandle" :table-params="tableParams" ref="treeTable">
        <template v-slot:search>
          <el-button type="primary" v-if="filterPermission('sys:menu:save')" :size="StyleEnum.BUTTON_SIZE" @click="createHandle">
            {{ $t('table.create') }}
            <i class="el-icon-document-add"></i>
          </el-button>
          <el-button type="primary" :size="StyleEnum.BUTTON_SIZE" @click="treeTableRefresh">
            {{ $t('table.refresh') }}
            <i class="el-icon-refresh"></i>
          </el-button>
        </template>
        <template v-slot:button></template>
        <template v-slot:content>
          <el-table-column prop="name" :label="$t('SysMenu.name')" width="200"></el-table-column>
          <el-table-column prop="icon" :label="$t('SysMenu.icon')" width="80">
            <template #default="scope">
              <div class="icon-svg-wrapper">
                <svg class="icon-svg" aria-hidden="true">
                  <use :xlink:href="`#${scope.row.icon}`" />
                </svg>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="type" :label="$t('SysMenu.type')" :show-overflow-tooltip="true" width="50">
            <template #default="scope">
              {{ scope.row.type === 0 ? $t('SysMenu.type0') : $t('SysMenu.type1') }}
            </template>
          </el-table-column>
          <el-table-column prop="sort" :label="$t('SysMenu.sort')" :show-overflow-tooltip="true" width="50"></el-table-column>
          <el-table-column prop="url" :label="$t('SysMenu.url')" :show-overflow-tooltip="true" width="160"></el-table-column>
          <el-table-column prop="permissions" :show-overflow-tooltip="true" :label="$t('SysMenu.permissions')"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="120">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('sys:menu:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="updateHandle({ id: scope.row.id })"
              >
                {{ $t('table.update') }}
              </el-button>

              <el-button
                type="text"
                v-if="filterPermission('sys:menu:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle({ id: scope.row.id })"
              >
                {{ $t('table.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </template>
      </TreeTable>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
      <SkeletonPage ref="skeletonPage">
        <template v-slot:content>
          <SysMenuForm
            ref="formPage"
            :page-type="formPageType"
            :page-params="formPageParams"
            @show-skeleton="showSkeleton"
            @hide-skeleton="hideSkeleton"
            @update-table="treeTableRefresh"
          />
        </template>
      </SkeletonPage>
    </el-col>
  </el-row>
</template>
<script lang="ts">
// 基础支持
import { defineComponent, ref, reactive } from 'vue'
import { mapGetters } from 'vuex'
import { StyleEnum } from '/@/enums/styleEnum'
// components
import { TreeTable } from '/@/components/TreeTable'
import { SkeletonPage } from '/@/components/SkeletonPage'
// hooks
import useSkeletonPageComponent from '/@/hooks/component/skeletonPage'
import useTreeTableComponent from '/@/hooks/component/treeTable'
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useSysMenuRepository from './useSysMenuRepository'
// 表单页面
import SysMenuForm from './form.vue'
// mixin
import treeTableMixin from '/@/mixins/treeTableMixin'
export default defineComponent({
  name: 'SysMenu',
  mixins: [treeTableMixin],
  components: {
    TreeTable,
    SkeletonPage,
    SysMenuForm
  },
  computed: {
    ...mapGetters('permission', ['filterPermission'])
  },
  setup(props) {
    // treeTable相关代码开始
    const treeTable = ref(null)
    const { treeTableRefresh } = useTreeTableComponent(treeTable)
    // 查询条件
    const tableParams = reactive({})
    // API相关
    const { getSysMenuListHandle, deleteSysMenuByIdHandle } = useSysMenuRepository()
    // treeTable相关代码结束

    // skeletonPage相关代码开始
    const skeletonPage = ref(null)
    const { showSkeleton, hideSkeleton } = useSkeletonPageComponent(skeletonPage)

    // formPage相关代码开始
    const formPage = ref(null)
    const { formPageType, formPageParams, formPageCreateHandle, formPageUpdateHandle } = useFormPageComponent(formPage)

    // 创建
    function createHandle() {
      hideSkeleton()
      formPageCreateHandle()
    }

    // 修改
    function updateHandle(params: any) {
      hideSkeleton()
      formPageUpdateHandle(params)
    }

    // 删除
    function deleteHandle(params: any) {
      deleteSysMenuByIdHandle(params, () => {
        // 模板修改标记
        treeTableRefresh()
        showSkeleton()
      })
    }

    return {
      // 基础支持
      StyleEnum,
      // treeTable组件相关
      treeTable,
      treeTableRefresh,
      // 查询条件
      tableParams,
      // skeletonPage组件
      skeletonPage,
      showSkeleton,
      hideSkeleton,
      // formPage
      formPageType,
      formPageParams,
      // API相关
      getSysMenuListHandle, // 获取列表方法
      // 当前页面提供的方法
      createHandle,
      updateHandle,
      deleteHandle
    }
  }
})
</script>
