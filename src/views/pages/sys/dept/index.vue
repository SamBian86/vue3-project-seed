<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
      <TreeItem
        ref="deptTree"
        :tree-method="getSysDeptPermissionListTreeHandle"
        :expand-on-click-node="false"
        :props="defaultDeptProps"
        :check-strictly="true"
        :highlight-current="highlightCurrent"
        node-key="id"
        @node-click-handle="nodeClickHandle"
      />
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="18" :lg="18" :xl="18">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="name">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.name"
                    :placeholder="$t('SysDept.namePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
        <template v-slot:button>
          <el-row :gutter="StyleEnum.ROW_GUTTER">
            <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
              <el-button
                type="primary"
                v-if="filterPermission('sys:dept:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('sys:dept:save')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('create')"
              >
                {{ $t('table.create') }}
              </el-button>
              <el-button :size="StyleEnum.BUTTON_SIZE" @click="resetHandle">
                {{ $t('table.reset') }}
              </el-button>
            </el-col>
          </el-row>
        </template>
        <template v-slot:content>
          <el-table-column prop="name" :show-overflow-tooltip="true" :label="$t('SysDept.name')" width="260"></el-table-column>
          <el-table-column
            prop="secretary"
            :show-overflow-tooltip="true"
            :label="$t('SysDept.secretary')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="groupTypeName"
            :show-overflow-tooltip="true"
            :label="$t('SysDept.groupTypeName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="parentName"
            :show-overflow-tooltip="true"
            :label="$t('SysDept.parentName')"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="unitTypeName"
            :show-overflow-tooltip="true"
            :label="$t('SysDept.unitTypeName')"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="140">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('sys:dept:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('detail', scope.row)"
              >
                {{ $t('table.detail') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('sys:dept:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('sys:dept:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle({ id: scope.row.deptId })"
              >
                {{ $t('table.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </template>
      </PgTable>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="dialogPage">
        <template #body>
          <SkeletonPage ref="skeletonPage">
            <template v-slot:content>
              <SysDeptForm
                ref="formPage"
                :page-type="formPageType"
                :page-params="formPageParams"
                @show-skeleton="showSkeleton"
                @hide-skeleton="hideSkeleton"
                @hide-dialog="hideDialog"
                @update-table="pgTableQuery(tableParams)"
              />
            </template>
          </SkeletonPage>
        </template>
        <template #title>
          {{ $t('SysDept.pageTitle') }}
        </template>
      </DialogPage>
    </el-col>
  </el-row>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, reactive } from 'vue'
import { mapGetters } from 'vuex'
import { StyleEnum } from '/@/enums/styleEnum'
// components
import { PgTable } from '/@/components/PgTable'
import { SkeletonPage } from '/@/components/SkeletonPage'
import { DialogPage } from '/@/components/DialogPage'
import { TreeItem } from '/@/components/TreeItem'
// hooks
import useSkeletonPageComponent from '/@/hooks/component/skeletonPage'
import usePgTableComponent from '/@/hooks/component/pgTable'
import useFormPageComponent from '/@/hooks/component/formPage'
import useDialogPageComponent from '/@/hooks/component/dialogPage'
import useTreeItemComponent from '/@/hooks/component/treeItem'
// API封装
import useSysDeptRepository from './useSysDeptRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import SysDeptForm from './form.vue'
export default defineComponent({
  name: 'SysDept', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, DialogPage, SysDeptForm, TreeItem }, // 模板修改标记
  computed: {
    ...mapGetters('permission', ['filterPermission']),
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props) {
    // 约定，在页面直接使用的方法都以Handle结尾，子组件中的方法不以Handle作为结尾

    // pgTable相关代码
    const pgTable = ref(null)
    const { pgTableQuery, pgTableReset } = usePgTableComponent(pgTable)

    // 查询条件
    const searchForm = ref(null)
    const tableParams = ref({
      // 模板修改标记
      deptId: '',
      name: ''
    })
    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      pgTableReset()
    }

    // API相关
    const { getPageHandle, deleteSysDeptByIdHandle, getSysDeptPermissionListTreeHandle } = useSysDeptRepository() // 模板修改标记
    const highlightCurrent = ref(false)
    const deptTree = ref(null)
    const deptTreeComponent = useTreeItemComponent(deptTree)
    const defaultDeptProps = ref({
      children: 'children',
      label: 'label',
      id: 'id'
    })
    // formPage相关代码开始
    const formPage = ref(null)
    const { formPageType, formPageParams, formPageCreateHandle, formPageUpdateHandle, formPageDetailHandle } =
      useFormPageComponent(formPage)

    // dialogPage相关代码开始
    const dialogPage = ref(null)
    const { showDialog, hideDialog } = useDialogPageComponent(dialogPage)
    function openHandle(type: any, item: any) {
      showDialog()
      setTimeout(() => {
        if (type === 'create') {
          createHandle()
        }
        if (type === 'update') {
          updateHandle({ ...item, t: new Date().getTime() })
        }
        if (type === 'detail') {
          detailHandle({ ...item, t: new Date().getTime() })
        }
      }, StyleEnum.OPEN_DIALOG_TIME)
    }

    // skeletonPage相关代码开始
    const skeletonPage = ref(null)
    const { showSkeleton, hideSkeleton } = useSkeletonPageComponent(skeletonPage)
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
    // 详情
    function detailHandle(params: any) {
      hideSkeleton()
      formPageDetailHandle(params)
    }

    // 重置
    function resetHandle() {
      highlightCurrent.value = false
      pgTableResetHandle()
    }

    // 删除
    function deleteHandle(params: any) {
      deleteSysDeptByIdHandle(params, () => {
        // 模板修改标记
        pgTableQuery(tableParams)
      })
    }

    // tree node点击
    function nodeClickHandle(item: any) {
      const { data, node, component } = item
      tableParams.value.deptId = data.id
      highlightCurrent.value = true
      pgTableQuery(tableParams)
    }

    // 查询框初始化数据相关代码
    // 模板修改标记 是否有初始化数据
    // formPage相关代码开始

    return {
      // 基础支持
      StyleEnum,
      // pgTable组件相关
      pgTable,
      pgTableQuery,
      // 查询form区域
      searchForm,
      tableParams,
      pgTableResetHandle,
      // skeletonPage组件
      skeletonPage,
      showSkeleton,
      hideSkeleton,
      // 查询相关基础数据及方法
      // dialogPage组件
      dialogPage,
      openHandle,
      hideDialog,
      // ?, // 模板修改标记 是否有初始化数据
      // formPage
      formPageType,
      formPageParams,
      // API
      getPageHandle, // 模板修改标记 获取分页数据
      // exportHandle // 模板修改标记 导出方法
      deleteHandle,
      resetHandle,
      // 左侧树
      highlightCurrent,
      deptTree,
      defaultDeptProps,
      getSysDeptPermissionListTreeHandle,
      nodeClickHandle
    }
  }
})
</script>
