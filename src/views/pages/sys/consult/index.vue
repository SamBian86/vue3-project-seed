<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="consultUserOrMobile">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.consultUserOrMobile"
                    :placeholder="$t('SysConsult.consultUserOrMobilePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="consultType">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.consultType"
                    :placeholder="$t('SysConsult.consultTypePlaceHolder')"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('consultType')"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="consultStatus">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.consultStatus"
                    :placeholder="$t('SysConsult.consultStatusPlaceHolder')"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('consultStatus')"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="consultBeginDate">
                  <el-date-picker
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.consultBeginDate"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    type="datetime"
                    :placeholder="$t('SysConsult.consultBeginDatePlaceHolder')"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="consultEndDate">
                  <el-date-picker
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.consultEndDate"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    :disabledDate="consultEndDate.disabledDate"
                    type="datetime"
                    :placeholder="$t('SysConsult.consultEndDatePlaceHolder')"
                    clearable
                  />
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
                v-if="filterPermission('sys:consult:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <!-- <el-button
                type="primary"
                v-if="filterPermission('sys:consult:save')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('create')"
              >
                {{ $t('table.create') }}
              </el-button> -->
              <el-button
                type="primary"
                v-if="filterPermission('sys:consult:export')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="exportHandle(tableParams)"
              >
                {{ $t('table.export') }}
              </el-button>
              <el-button :size="StyleEnum.BUTTON_SIZE" @click="pgTableResetHandle">
                {{ $t('table.reset') }}
              </el-button>
            </el-col>
          </el-row>
        </template>
        <template v-slot:content>
          <el-table-column
            prop="consultUser"
            :show-overflow-tooltip="true"
            :label="$t('SysConsult.consultUser')"
            min-width="200"
          ></el-table-column>
          <el-table-column
            prop="consultPhone"
            :show-overflow-tooltip="true"
            :label="$t('SysConsult.consultPhone')"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="consultTypeName"
            :show-overflow-tooltip="true"
            :label="$t('SysConsult.consultTypeName')"
            min-width="200"
          ></el-table-column>
          <el-table-column
            prop="consultDate"
            :show-overflow-tooltip="true"
            :label="$t('SysConsult.consultDate')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="consultStatusName"
            :show-overflow-tooltip="true"
            :label="$t('SysConsult.consultStatusName')"
            width="140"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="120">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('sys:consult:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('detail', scope.row)"
              >
                {{ $t('table.detail') }}
              </el-button>
              <!-- <el-button
                type="text"
                v-if="filterPermission('sys:consult:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button> -->
              <!-- <el-button
                type="text"
                v-if="filterPermission('sys:consult:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle({ id: scope.row.id })"
              >
                {{ $t('table.delete') }}
              </el-button> -->
              <el-button
                type="text"
                v-if="filterPermission('sys:consult:deal')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="dealHandle(scope.row)"
              >
                {{ $t('table.deal') }}
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
              <SysConsultForm
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
          {{ $t('SysConsult.pageTitle') }}
        </template>
      </DialogPage>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="dealDialogPage">
        <template #body>
          <div class="component-skeleton-page">
            <SysConsultDeal :page-type="'update'" :page-params="dealPageParams" @hide-dialog="dealDialogHide" />
          </div>
        </template>
        <template #title>
          {{ $t('SysConsult.pageDealTitle') }}
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
import useSysConsultRepository from './useSysConsultRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import SysConsultForm from './form.vue'
import SysConsultDeal from './deal.vue'
export default defineComponent({
  name: 'SysConsult', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, DialogPage, SysConsultForm, SysConsultDeal }, // 模板修改标记
  computed: {
    ...mapGetters('permission', ['filterPermission']),
    ...mapGetters('dict', ['getDictByType', 'getDictNameByValue'])
  },
  setup(props) {
    // 约定，在页面直接使用的方法都以Handle结尾，子组件中的方法不以Handle作为结尾
    const consultEndDate = ref({
      disabledDate: (time: any) => {
        return (
          time.getTime() <
          (tableParams.consultBeginDate ? new Date(tableParams.consultBeginDate).getTime() : new Date().getTime())
        )
      }
    })
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
    const { getPageHandle, exportHandle } = useSysConsultRepository() // 模板修改标记

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
    // 删除
    // function deleteHandle(params: any) {
    //   deleteSysConsultByIdHandle(params, () => {
    //     // 模板修改标记
    //     pgTableQuery(tableParams)
    //   })
    // }

    // 查询框初始化数据相关代码
    // 模板修改标记 是否有初始化数据
    // formPage相关代码开始

    // dealDialogPage dealPageParams
    const dealDialogPage = ref(null)
    const dealPageParams = ref({})
    const dealDialogComponent = useDialogPageComponent(dealDialogPage)
    // 处理
    function dealHandle(row: any) {
      dealPageParams.value = row
      dealDialogComponent.showDialog()
    }

    function dealDialogHide() {
      dealDialogComponent.hideDialog()
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
      exportHandle, // 模板修改标记 导出方法
      detailHandle,
      dealHandle,
      dealDialogPage,
      dealPageParams,
      consultEndDate,
      dealDialogHide
    }
  }
})
</script>
