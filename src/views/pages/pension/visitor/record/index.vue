<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="visitorName">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.visitorName"
                    :placeholder="$t('PensionVisitorRecord.visitorNamePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="nameOrPhone">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.nameOrPhone"
                    :placeholder="$t('PensionVisitorRecord.nameOrPhonePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="communityId">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.communityId"
                    :placeholder="$t('PensionVisitorRecord.communityIdPlaceHolder')"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in sysCommunityListAll"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="visitorStatus">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.visitorStatus"
                    :placeholder="$t('PensionVisitorRecord.visitorStatusPlaceHolder')"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('visitorStatus')"
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
                v-if="filterPermission('pension:visitorrecord:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('pension:visitorrecord:save')"
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
            prop="visitorName"
            :show-overflow-tooltip="true"
            :label="$t('PensionVisitorRecord.visitorName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="visitorSexName"
            :show-overflow-tooltip="true"
            :label="$t('PensionVisitorRecord.visitorSexName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="communityName"
            :show-overflow-tooltip="true"
            :label="$t('PensionVisitorRecord.communityName')"
            min-width="160"
          ></el-table-column>
          <el-table-column
            prop="visitorNum"
            :show-overflow-tooltip="true"
            :label="$t('PensionVisitorRecord.visitorNum')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="userName"
            :show-overflow-tooltip="true"
            :label="$t('PensionVisitorRecord.userName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="userPhoneNumber"
            :show-overflow-tooltip="true"
            :label="$t('PensionVisitorRecord.userPhoneNumber')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="visitorStatusName"
            :show-overflow-tooltip="true"
            :label="$t('PensionVisitorRecord.visitorStatusName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="visitorTime"
            :show-overflow-tooltip="true"
            :label="$t('PensionVisitorRecord.visitorTime')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="createDate"
            :show-overflow-tooltip="true"
            :label="$t('PensionVisitorRecord.createDate')"
            width="160"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="60">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('pension:visitorrecord:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('detail', scope.row)"
              >
                {{ $t('table.detail') }}
              </el-button>
              <!-- <el-button
                type="text"
                v-if="filterPermission('pension:visitorrecord:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('pension:visitorrecord:delete')"
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
              <PensionVisitorRecordForm
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
          {{ $t('PensionVisitorRecord.pageTitle') }}
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
import usePensionVisitorRecordRepository from './usePensionVisitorRecordRepository' // 模板修改标记
import useSysCommunityRepository from '/@/views/pages/sys/community/useSysCommunityRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import PensionVisitorRecordForm from './form.vue'
export default defineComponent({
  name: 'PensionVisitorRecord', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, DialogPage, PensionVisitorRecordForm }, // 模板修改标记
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
    const { getPageHandle, deletePensionVisitorRecordByIdHandle } = usePensionVisitorRecordRepository() // 模板修改标记
    const { sysCommunityListAll, getSysCommunityListAllHandle } = useSysCommunityRepository()
    getSysCommunityListAllHandle()

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
    function deleteHandle(params: any) {
      deletePensionVisitorRecordByIdHandle(params, () => {
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
      deleteHandle,
      sysCommunityListAll
    }
  }
})
</script>
