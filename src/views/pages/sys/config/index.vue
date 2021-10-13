<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="16" :lg="16" :xl="16">
      <PgTable
        ref="pgTable"
        :table-method="getPageHandle"
        :table-params="tableParams"
        :selection="true"
        @selection-change="handleSelectionChangeHandle"
      >
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="paramKey">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.paramKey"
                    :placeholder="$t('SysConfig.paramKey')"
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
                v-if="filterPermission('sys:config:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('sys:config:save')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="createHandle"
              >
                {{ $t('table.create') }}
              </el-button>
              <el-button :size="StyleEnum.BUTTON_SIZE" @click="pgTableResetHandle">
                {{ $t('table.reset') }}
              </el-button>
              <el-button
                type="danger"
                v-if="filterPermission('sys:config:batch')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="batchDeleteHandle(pgTableSelections)"
              >
                {{ $t('table.batchDelete') }}
              </el-button>
            </el-col>
          </el-row>
        </template>
        <template v-slot:content>
          <el-table-column
            prop="paramKey"
            :show-overflow-tooltip="true"
            :label="$t('SysConfig.paramKey')"
            width="260"
          ></el-table-column>
          <el-table-column prop="paramValue" :show-overflow-tooltip="true" :label="$t('SysConfig.paramValue')"></el-table-column>
          <el-table-column
            prop="remark"
            :show-overflow-tooltip="true"
            :label="$t('SysConfig.remark')"
            width="240"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="120">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('sys:config:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="updateHandle({ id: scope.row.id })"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('sys:config:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle({ id: scope.row.id })"
              >
                {{ $t('table.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </template>
      </PgTable>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
      <SkeletonPage ref="skeletonPage">
        <template v-slot:content>
          <SysConfigForm
            ref="formPage"
            :page-type="formPageType"
            :page-params="formPageParams"
            @show-skeleton="showSkeleton"
            @hide-skeleton="hideSkeleton"
            @update-table="pgTableQuery(tableParams)"
          />
        </template>
      </SkeletonPage>
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
// hooks
import useSkeletonPageComponent from '/@/hooks/component/skeletonPage'
import usePgTableComponent from '/@/hooks/component/pgTable'
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useSysConfigRepository from './useSysConfigRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import SysConfigForm from './form.vue'
export default defineComponent({
  name: 'SysConfig', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, SysConfigForm }, // 模板修改标记
  computed: {
    ...mapGetters('permission', ['filterPermission'])
  },
  setup(props) {
    // 约定，在页面直接使用的方法都以Handle结尾，子组件中的方法不以Handle作为结尾

    // pgTable相关代码
    const pgTable = ref(null)
    const { pgTableSelections, pgTableQuery, pgTableReset, handleSelectionChange, clearSelection } = usePgTableComponent(pgTable)

    // 查询条件
    const searchForm = ref(null)
    const tableParams = reactive({
      // 模板修改标记
      paramKey: ''
    })
    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      clearSelection()
      pgTableReset()
    }

    // API相关
    const { getPageHandle, deleteSysConfigByIdHandle, deleteSysConfigBatchHandle } = useSysConfigRepository() // 模板修改标记

    // formPage相关代码开始
    const formPage = ref(null)
    const { formPageType, formPageParams, formPageCreateHandle, formPageUpdateHandle } = useFormPageComponent(formPage)

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
    // 删除
    function deleteHandle(params: any) {
      deleteSysConfigByIdHandle(params, () => {
        // 模板修改标记
        pgTableQuery(tableParams)
        showSkeleton()
      })
    }

    // 过滤数据
    function handleSelectionChangeHandle(items: any[]) {
      handleSelectionChange(items, 'id')
    }
    // 批量删除
    function batchDeleteHandle(params: any) {
      deleteSysConfigBatchHandle(params, () => {
        // 模板修改标记
        clearSelection()
        pgTableQuery(tableParams)
        showSkeleton()
      })
    }

    // 查询框初始化数据相关代码
    // 模板修改标记 是否有初始化数据
    // formPage相关代码开始

    return {
      // 基础支持
      StyleEnum,
      // pgTable组件相关
      pgTable,
      pgTableSelections,
      pgTableQuery,
      handleSelectionChangeHandle,
      // 查询form区域
      searchForm,
      tableParams,
      pgTableResetHandle,
      // skeletonPage组件
      skeletonPage,
      showSkeleton,
      hideSkeleton,
      // 查询相关基础数据及方法
      // ?, // 模板修改标记 是否有初始化数据
      // formPage
      formPageType,
      formPageParams,
      // API
      getPageHandle, // 模板修改标记 获取分页数据
      // exportHandle // 模板修改标记 导出方法
      createHandle,
      updateHandle,
      deleteHandle,
      batchDeleteHandle
    }
  }
})
</script>
