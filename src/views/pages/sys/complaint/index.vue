<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="complaintUserOr">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.complaintUserOr"
                    :placeholder="$t('SysComplaint.complaintUserOrPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="complaintType">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.complaintType"
                    :placeholder="$t('SysComplaint.complaintTypePlaceHolder')"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('complaintType')"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="complaintStatus">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.complaintStatus"
                    :placeholder="$t('SysComplaint.complaintStatusPlaceHolder')"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('complaintStatus')"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
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
                v-if="filterPermission('sys:complaint:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <!-- <el-button
                type="primary"
                v-if="filterPermission('sys:complaint:save')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('create')"
              >
                {{ $t('table.create') }}
              </el-button> -->
              <el-button :size="StyleEnum.BUTTON_SIZE" @click="pgTableResetHandle">
                {{ $t('table.reset') }}
              </el-button>
            </el-col>
          </el-row>
        </template>
        <template v-slot:content>
          <el-table-column
            prop="complaintUserName"
            :show-overflow-tooltip="true"
            :label="$t('SysComplaint.complaintUserName')"
            min-width="200"
          ></el-table-column>
          <el-table-column
            prop="complaintUserMobile"
            :show-overflow-tooltip="true"
            :label="$t('SysComplaint.complaintUserMobile')"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="complaintTypeName"
            :show-overflow-tooltip="true"
            :label="$t('SysComplaint.complaintTypeName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="complaintDate"
            :show-overflow-tooltip="true"
            :label="$t('SysComplaint.complaintDate')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="complaintStatusName"
            :show-overflow-tooltip="true"
            :label="$t('SysComplaint.complaintStatusName')"
            width="100"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="160">
            <template #default="scope">
              <el-button
                type="text"
                v-if="
                  filterPermission('sys:complaint:view') && (scope.row.complaintStatus === 0 || scope.row.complaintStatus === 1)
                "
                :size="StyleEnum.BUTTON_SIZE"
                @click="dialogHandle('complaintDetail', 'showDialog', scope.row)"
              >
                {{ $t('SysComplaint.complaintDetail') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('sys:complaint:view') && scope.row.complaintStatus === 1"
                :size="StyleEnum.BUTTON_SIZE"
                @click="dialogHandle('dealDetail', 'showDialog', scope.row)"
              >
                {{ $t('SysComplaint.dealDetail') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('sys:complaint:update') && scope.row.complaintStatus === 0"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.deal') }}
              </el-button>
              <!-- <el-button
                type="text"
                v-if="filterPermission('sys:complaint:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle({ id: scope.row.id })"
              >
                {{ $t('table.delete') }}
              </el-button> -->
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
              <SysComplaintForm
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
          {{ $t('SysComplaint.pageTitle') }}
        </template>
      </DialogPage>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="complaintDetailDialogPage">
        <template #body>
          <div class="component-skeleton-page">
            <SysComplaintComplaintDetail :page-type="'detail'" :page-params="detailPageParams" />
          </div>
        </template>
        <template #title>
          {{ $t('SysComplaint.complaintDetail') }}
        </template>
      </DialogPage>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="dealDetailDialogPage">
        <template #body>
          <div class="component-skeleton-page">
            <SysComplaintDealDetail :page-type="'detail'" :page-params="detailPageParams" />
          </div>
        </template>
        <template #title>
          {{ $t('SysComplaint.dealDetail') }}
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
import useSysComplaintRepository from './useSysComplaintRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import SysComplaintForm from './form.vue'
import SysComplaintComplaintDetail from './complaintDetail.vue'
import SysComplaintDealDetail from './dealDetail.vue'
export default defineComponent({
  name: 'SysComplaint', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, DialogPage, SysComplaintForm, SysComplaintComplaintDetail, SysComplaintDealDetail }, // 模板修改标记
  computed: {
    ...mapGetters('permission', ['filterPermission']),
    ...mapGetters('dict', ['getDictByType', 'getDictNameByValue'])
  },
  setup(props) {
    // 约定，在页面直接使用的方法都以Handle结尾，子组件中的方法不以Handle作为结尾

    // pgTable相关代码
    const pgTable = ref(null)
    const { pgTableQuery, pgTableReset } = usePgTableComponent(pgTable)

    // 查询条件
    const searchForm = ref(null)
    const tableParams = reactive({
      // 模板修改标记
    })
    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      pgTableReset()
    }

    // API相关
    const { getPageHandle } = useSysComplaintRepository() // 模板修改标记

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
    // function deleteHandle(params: any) {
    //   deleteSysComplaintByIdHandle(params, () => {
    //     // 模板修改标记
    //     pgTableQuery(tableParams)
    //   })
    // }

    // 查询框初始化数据相关代码
    // 模板修改标记 是否有初始化数据
    // formPage相关代码开始
    const complaintDetailDialogPage = ref(null)
    const dealDetailDialogPage = ref(null)
    const complaintDetailDialogComponent = useDialogPageComponent(complaintDetailDialogPage)
    const dealDetailDialogComponent = useDialogPageComponent(dealDetailDialogPage)
    const detailPageParams = ref({})
    function dialogHandle(name: any, action: any, row: any) {
      const dialogPageComponent = {
        complaintDetail: complaintDetailDialogComponent,
        dealDetail: dealDetailDialogComponent
      }
      if (row) {
        detailPageParams.value = row
      }
      dialogPageComponent[name][action]()
    }

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
      // deleteHandle
      dialogHandle,
      complaintDetailDialogPage,
      dealDetailDialogPage,
      detailPageParams
    }
  }
})
</script>
