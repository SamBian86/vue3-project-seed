<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="16" :lg="16" :xl="16">
      <PgTable
        :table-method="getPageHandle"
        :table-params="tableParams"
        ref="pgTable"
        :selection="true"
        @selection-change="handleSelectionChangeHandle"
      >
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="beanName">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.beanName"
                    :placeholder="$t('JobSchedule.beanNamePlaceHolder')"
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
                v-if="filterPermission('sys:schedule:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('sys:schedule:save')"
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
                v-if="filterPermission('sys:schedule:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="batchDeleteHandle(pgTableSelections)"
              >
                {{ $t('table.delete') }}
              </el-button>
              <el-button
                type="danger"
                v-if="filterPermission('sys:schedule:pause')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="batchPauseHandle(pgTableSelections)"
              >
                {{ $t('JobSchedule.pause') }}
              </el-button>
              <el-button
                type="danger"
                v-if="filterPermission('sys:schedule:resume')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="batchResumeHandle(pgTableSelections)"
              >
                {{ $t('JobSchedule.resume') }}
              </el-button>
              <el-button
                type="danger"
                v-if="filterPermission('sys:schedule:run')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="batchRunHandle(pgTableSelections)"
              >
                {{ $t('JobSchedule.run') }}
              </el-button>
              <el-button
                type="success"
                v-if="filterPermission('sys:schedule:log')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="logHandle"
              >
                {{ $t('JobSchedule.log') }}
              </el-button>
            </el-col>
          </el-row>
        </template>
        <template v-slot:content>
          <el-table-column
            prop="beanName"
            :show-overflow-tooltip="true"
            :label="$t('JobSchedule.beanName')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="params"
            :show-overflow-tooltip="true"
            :label="$t('JobSchedule.params')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="cronExpression"
            :show-overflow-tooltip="true"
            :label="$t('JobSchedule.cronExpression')"
            width="160"
          ></el-table-column>
          <el-table-column prop="remark" :show-overflow-tooltip="true" :label="$t('JobSchedule.remark')"></el-table-column>
          <el-table-column prop="status" :show-overflow-tooltip="true" :label="$t('JobSchedule.status')" width="??">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 0" :size="StyleEnum.TAG_SIZE" type="danger">
                {{ $t('JobSchedule.status0') }}
              </el-tag>
              <el-tag v-if="scope.row.status === 1" :size="StyleEnum.TAG_SIZE" type="success">
                {{ $t('JobSchedule.status1') }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="60">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('sys:schedule:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="updateHandle({ id: scope.row.id })"
              >
                {{ $t('table.update') }}
              </el-button>
              <!-- <el-button
                type="text"
                v-if="filterPermission('sys:schedule:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle([scope.row.id])"
              >
                {{ $t('table.delete') }}
              </el-button> -->
            </template>
          </el-table-column>
        </template>
      </PgTable>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
      <SkeletonPage ref="skeletonPage">
        <template v-slot:content>
          <JobScheduleForm
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
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="dialogPage">
        <template #body>
          <JobScheduleLog />
        </template>
        <template #title>
          {{ $t('JobSchedule.log') }}
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
// hooks
import useSkeletonPageComponent from '/@/hooks/component/skeletonPage'
import usePgTableComponent from '/@/hooks/component/pgTable'
import useFormPageComponent from '/@/hooks/component/formPage'
import useDialogPageComponent from '/@/hooks/component/dialogPage'
// API封装
import useJobScheduleRepository from './useJobScheduleRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 页面
import JobScheduleLog from '../scheduleLog/index.vue'
export default defineComponent({
  name: 'JobSchedule', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, DialogPage, JobScheduleLog }, // 模板修改标记
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
      beanName: ''
    })
    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      clearSelection()
      pgTableReset()
    }

    // API相关
    const { getPageHandle, deleteJobScheduleByIdHandle, pauseJobScheduleHandle, resumeJobScheduleHandle, runJobScheduleHandle } =
      useJobScheduleRepository() // 模板修改标记

    // formPage相关代码开始
    const formPage = ref(null)
    const { formPageType, formPageParams, formPageCreateHandle, formPageUpdateHandle } = useFormPageComponent(formPage)

    // skeletonPage相关代码开始
    const skeletonPage = ref(null)
    const { showSkeleton, hideSkeleton } = useSkeletonPageComponent(skeletonPage)

    // dialogPage相关代码开始
    const dialogPage = ref(null)
    const { showDialog, hideDialog } = useDialogPageComponent(dialogPage)

    // 打开日志列表
    function logHandle() {
      showDialog()
    }

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

    // 过滤数据
    function handleSelectionChangeHandle(items: any[]) {
      handleSelectionChange(items, 'id')
    }

    // 批量删除
    function batchDeleteHandle(params: any) {
      deleteJobScheduleByIdHandle(params, () => {
        // 模板修改标记
        clearSelection()
        pgTableQuery(tableParams)
        showSkeleton()
      })
    }

    // 批量暂停
    function batchPauseHandle(params: any) {
      pauseJobScheduleHandle(params, () => {
        // 模板修改标记
        clearSelection()
        pgTableQuery(tableParams)
        showSkeleton()
      })
    }

    // 批量恢复
    function batchResumeHandle(params: any) {
      resumeJobScheduleHandle(params, () => {
        // 模板修改标记
        clearSelection()
        pgTableQuery(tableParams)
        showSkeleton()
      })
    }

    // 批量立即执行
    function batchRunHandle(params: any) {
      runJobScheduleHandle(params, () => {
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
      formPage,
      formPageType,
      formPageParams,
      // API
      getPageHandle, // 模板修改标记 获取分页数据
      // exportHandle // 模板修改标记 导出方法
      createHandle,
      updateHandle,
      batchDeleteHandle,
      batchPauseHandle,
      batchResumeHandle,
      batchRunHandle,
      // 打开日志列表
      dialogPage,
      logHandle
    }
  }
})
</script>
