<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable
        :table-method="getPageHandle"
        :table-params="tableParams"
        ref="pgTable"
        @get-tabel-useful-data="getTableUsefulDataHandle"
      >
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="title">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.title"
                    :placeholder="$t('SysFunctioninfo.title')"
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
                v-if="filterPermission('sys:functioninfo:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('sys:functioninfo:save')"
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
          <!-- 图标 -->
          <el-table-column prop="icon" :show-overflow-tooltip="true" :label="$t('SysFunctioninfo.icon')" width="100">
            <template #default="scope">
              <el-image
                style="width: 50px; height: 50px"
                :fit="'cover'"
                :src="scope.row.icon"
                :preview-src-list="[scope.row.icon]"
              ></el-image>
            </template>
          </el-table-column>
          <!-- 适老图标 -->
          <el-table-column
            prop="elderlyIcon"
            :show-overflow-tooltip="true"
            :label="$t('SysFunctioninfo.elderlyIcon')"
            width="100"
          >
            <template #default="scope">
              <el-image
                style="width: 50px; height: 50px"
                :fit="'cover'"
                :src="scope.row.elderlyIcon"
                :preview-src-list="[scope.row.elderlyIcon]"
              ></el-image>
            </template>
          </el-table-column>
          <!-- 名称 -->
          <el-table-column prop="title" :show-overflow-tooltip="true" :label="$t('SysFunctioninfo.title')"></el-table-column>
          <!-- App版本号 -->
          <el-table-column
            prop="appVersion"
            :show-overflow-tooltip="true"
            :label="$t('SysFunctioninfo.appVersion')"
            width="100"
          ></el-table-column>
          <!-- 状态 -->
          <el-table-column prop="isDisplay" :show-overflow-tooltip="true" :label="$t('SysFunctioninfo.isDisplay')" width="80">
            <template #default="scope">
              <el-tag v-if="scope.row.isDisplay === 0" :size="StyleEnum.TAG_SIZE" type="warning">
                {{ $t('SysFunctioninfo.isDisplay0') }}
              </el-tag>
              <el-tag v-if="scope.row.isDisplay === 1" :size="StyleEnum.TAG_SIZE" type="success">
                {{ $t('SysFunctioninfo.isDisplay1') }}
              </el-tag>
            </template>
          </el-table-column>
          <!-- 功能 -->
          <el-table-column
            prop="typeName"
            :show-overflow-tooltip="true"
            :label="$t('SysFunctioninfo.typeName')"
            width="100"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="220">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('sys:functioninfo:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('sys:functioninfo:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle({ id: scope.row.id })"
              >
                {{ $t('table.delete') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('sys:functioninfo:exchange') && scope.$index !== 0"
                :size="StyleEnum.BUTTON_SIZE"
                @click="
                  exchangeSysFunctioninfoHandle(
                    { id: scope.row.id, exchangeId: tableUsefulData['data'][scope.$index - 1]['id'] },
                    () => {
                      pgTableQuery(tableParams)
                    }
                  )
                "
              >
                {{ $t('table.up') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('sys:functioninfo:exchange') && scope.$index !== tableUsefulData.len - 1"
                :size="StyleEnum.BUTTON_SIZE"
                @click="
                  exchangeSysFunctioninfoHandle(
                    { id: scope.row.id, exchangeId: tableUsefulData.data[scope.$index + 1]['id'] },
                    () => {
                      pgTableQuery(tableParams)
                    }
                  )
                "
              >
                {{ $t('table.down') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('sys:functioninfo:display')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="
                  displaySysFunctioninfoHandle({ id: scope.row.id, isdisplay: scope.row.isDisplay === 1 ? 0 : 1 }, () => {
                    pgTableQuery(tableParams)
                  })
                "
              >
                {{ scope.row.isDisplay === 1 ? $t('table.off') : $t('table.on') }}
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
              <SysFunctioninfoForm
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
          {{ $t('SysFunctioninfo.pageTitle') }}
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
import useSysFunctioninfoRepository from './useSysFunctioninfoRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import SysFunctioninfoForm from './form.vue'
export default defineComponent({
  name: 'SysFunctioninfo', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, DialogPage, SysFunctioninfoForm }, // 模板修改标记
  computed: {
    ...mapGetters('permission', ['filterPermission']),
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props) {
    // 约定，在页面直接使用的方法都以Handle结尾，子组件中的方法不以Handle作为结尾

    // pgTable相关代码
    const pgTable = ref(null)
    const { pgTableQuery, pgTableReset, tableUsefulData, getTableUsefulDataHandle } = usePgTableComponent(pgTable)

    // 查询条件
    const searchForm = ref(null)
    const tableParams = reactive({
      // 模板修改标记
      title: ''
    })
    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      pgTableReset()
    }

    // API相关
    const { getPageHandle, deleteSysFunctioninfoByIdHandle, displaySysFunctioninfoHandle, exchangeSysFunctioninfoHandle } =
      useSysFunctioninfoRepository() // 模板修改标记

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
      deleteSysFunctioninfoByIdHandle(params, () => {
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
      tableUsefulData,
      getTableUsefulDataHandle,
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
      displaySysFunctioninfoHandle,
      exchangeSysFunctioninfoHandle
    }
  }
})
</script>
