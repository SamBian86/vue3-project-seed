<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="name">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.name"
                    :placeholder="$t('SysCommunity.namePlaceHolder')"
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
                v-if="filterPermission('sys:community:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('sys:community:save')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('create')"
              >
                {{ $t('table.create') }}
              </el-button>
              <el-button :size="StyleEnum.BUTTON_SIZE" @click="pgTableResetHandle">
                {{ $t('table.reset') }}
              </el-button>
            </el-col>
          </el-row>
        </template>
        <template v-slot:content>
          <el-table-column
            prop="name"
            :show-overflow-tooltip="true"
            :label="$t('SysCommunity.name')"
            width="160"
          ></el-table-column>
          <el-table-column prop="provinceName" :show-overflow-tooltip="true" :label="$t('SysCommunity.address')">
            <template #default="scope">
              {{ scope.row.provinceName }}
              {{ scope.row.cityName }}
              {{ scope.row.areaName }}
              {{ scope.row.streetName }}
            </template>
          </el-table-column>
          <el-table-column prop="serverAreas" :show-overflow-tooltip="true" :label="$t('SysCommunity.serverAreas')" width="160">
            <template #default="scope">
              <span v-for="item in scope.row.serverAreas">{{ item.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="deptName"
            :show-overflow-tooltip="true"
            :label="$t('SysCommunity.deptName')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="familyLocation"
            :show-overflow-tooltip="true"
            :label="$t('SysCommunity.familyLocation')"
            width="160"
          >
            <template #default="scope">
              <el-tag v-if="scope.row.familyLocation === true" :size="StyleEnum.TAG_SIZE" type="success">
                {{ $t('SysCommunity.familyLocationTrue') }}
              </el-tag>
              <el-tag v-if="scope.row.familyLocation === false" :size="StyleEnum.TAG_SIZE" type="warning">
                {{ $t('SysCommunity.familyLocationFalse') }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="120">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('sys:community:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('sys:community:delete')"
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
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="dialogPage">
        <template #body>
          <SkeletonPage ref="skeletonPage">
            <template v-slot:content>
              <SysCommunityForm
                ref="formPage"
                :page-type="formPageType"
                :page-params="formPageParams"
                @show-skeleton="showSkeleton"
                @hide-skeleton="hideSkeleton"
                @hide-dialog="hideDialog"
                @update-table="pgTableQuery"
              />
            </template>
          </SkeletonPage>
        </template>
        <template #title>
          {{ $t('SysCommunity.pageTitle') }}
        </template>
      </DialogPage>
    </el-col>
  </el-row>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, reactive, watch } from 'vue'
import { mapGetters } from 'vuex'
import { StyleEnum } from '/@/enums/styleEnum'
import router from '/@/router'
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
import useSysCommunityRepository from './useSysCommunityRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import SysCommunityForm from './form.vue'
export default defineComponent({
  name: 'SysCommunity', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, DialogPage, SysCommunityForm }, // 模板修改标记
  computed: {
    ...mapGetters('permission', ['filterPermission']),
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props) {
    // 约定，在页面直接使用的方法都以Handle结尾，子组件中的方法不以Handle作为结尾
    const { query } = router.currentRoute.value

    // pgTable相关代码
    const pgTable = ref(null)
    const { pgTableQuery, pgTableReset } = usePgTableComponent(pgTable)

    // 查询条件
    const searchForm = ref(null)
    const tableParams = reactive({
      // 模板修改标记
      serverAreaId: query.serverAreaId ? query.serverAreaId : ''
    })
    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      pgTableReset()
    }

    watch(
      () => router.currentRoute.value.query,
      (value) => {
        const { serverAreaId } = value
        if (!!serverAreaId) {
          tableParams.serverAreaId = serverAreaId
          pgTableQuery(tableParams)
        }
      }
    )

    // API相关
    const { getPageHandle, deleteSysCommunityByIdHandle } = useSysCommunityRepository() // 模板修改标记

    // formPage相关代码开始
    const formPage = ref(null)
    const { formPageType, formPageParams, formPageCreateHandle, formPageUpdateHandle } = useFormPageComponent(formPage)

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
    // 删除
    function deleteHandle(params: any) {
      deleteSysCommunityByIdHandle(params, () => {
        // 模板修改标记
        pgTableQuery(tableParams)
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
      deleteHandle
    }
  }
})
</script>
