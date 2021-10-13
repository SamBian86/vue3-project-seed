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
                    :placeholder="$t('AgedAgedinfo.namePlaceHolder')"
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
                v-if="filterPermission('aged:agedinfo:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('aged:agedinfo:save')"
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
            :label="$t('AgedAgedinfo.name')"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="phoneNumber"
            :show-overflow-tooltip="true"
            :label="$t('AgedAgedinfo.phoneNumber')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="communityName"
            :show-overflow-tooltip="true"
            :label="$t('AgedAgedinfo.communityName')"
            width="140"
          ></el-table-column>
          <el-table-column prop="provinceName" :show-overflow-tooltip="true" :label="$t('AgedAgedinfo.provinceName')" width="240">
            <template #default="scope">
              {{ scope.row.provinceName }}{{ scope.row.cityName }}{{ scope.row.areaName }}{{ scope.row.streetName }}
            </template>
          </el-table-column>
          <el-table-column prop="address" :show-overflow-tooltip="true" :label="$t('AgedAgedinfo.address')"></el-table-column>
          <el-table-column
            prop="idCard"
            :show-overflow-tooltip="true"
            :label="$t('AgedAgedinfo.idCard')"
            width="220"
          ></el-table-column>
          <el-table-column
            prop="sexName"
            :show-overflow-tooltip="true"
            :label="$t('AgedAgedinfo.sexName')"
            width="60"
          ></el-table-column>
          <el-table-column
            prop="birthday"
            :show-overflow-tooltip="true"
            :label="$t('AgedAgedinfo.birthday')"
            width="140"
          ></el-table-column>
          <el-table-column prop="age" :show-overflow-tooltip="true" :label="$t('AgedAgedinfo.age')" width="60"></el-table-column>
          <el-table-column
            prop="emergencyContactName"
            :show-overflow-tooltip="true"
            :label="$t('AgedAgedinfo.emergencyContactName')"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="emergencyContactPhoneNumber"
            :show-overflow-tooltip="true"
            :label="$t('AgedAgedinfo.emergencyContactPhoneNumber')"
            width="160"
          ></el-table-column>
          <el-table-column prop="married" :show-overflow-tooltip="true" :label="$t('AgedAgedinfo.married')" width="100">
            <template #default="scope">
              <el-tag v-if="scope.row.married === 0" :size="StyleEnum.TAG_SIZE" type="primary">
                {{ $t('AgedAgedinfo.married0') }}
              </el-tag>
              <el-tag v-if="scope.row.married === 1" :size="StyleEnum.TAG_SIZE" type="success">
                {{ $t('AgedAgedinfo.married1') }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="nationName"
            :show-overflow-tooltip="true"
            :label="$t('AgedAgedinfo.nationName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="nativePlace"
            :show-overflow-tooltip="true"
            :label="$t('AgedAgedinfo.nativePlace')"
            width="100"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="160">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('aged:agedinfo:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="listHandle(scope.row)"
              >
                {{ $t('AgedAgedinfo.list') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('aged:agedinfo:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('aged:agedinfo:delete')"
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
              <AgedAgedinfoForm
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
          {{ $t('AgedAgedinfo.pageTitle') }}
        </template>
      </DialogPage>
    </el-col>
  </el-row>
  <DialogPage ref="dialogListPage">
    <template #body>
      <AgedLinkaddress :page-params="agedLinkaddressParams" />
    </template>
    <template #title>
      {{ $t('AgedAgedinfo.list') }}
    </template>
  </DialogPage>
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
import useAgedAgedinfoRepository from './useAgedAgedinfoRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import AgedAgedinfoForm from './form.vue'
import AgedLinkaddress from '../linkaddress/index.vue'
export default defineComponent({
  name: 'AgedAgedinfo', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, DialogPage, AgedAgedinfoForm, AgedLinkaddress }, // 模板修改标记
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
    const tableParams = reactive({
      // 模板修改标记
    })
    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      pgTableReset()
    }

    // API相关
    const { getPageHandle, deleteAgedAgedinfoByIdHandle } = useAgedAgedinfoRepository() // 模板修改标记

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
      deleteAgedAgedinfoByIdHandle(params, () => {
        // 模板修改标记
        pgTableQuery(tableParams)
      })
    }

    // 查询框初始化数据相关代码
    // 模板修改标记 是否有初始化数据
    // formPage相关代码开始

    const dialogListPage = ref(null)
    const agedLinkaddressParams = ref({})
    const dialogListComponent = useDialogPageComponent(dialogListPage)
    function listHandle(row: any) {
      agedLinkaddressParams.value.userId = row.userId
      dialogListComponent.showDialog()
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
      deleteHandle,
      listHandle,
      dialogListPage,
      agedLinkaddressParams
    }
  }
})
</script>
