<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="16" :lg="16" :xl="16">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="dictName">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.dictName"
                    :placeholder="$t('SysDictType.dictNamePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="dictType">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.dictType"
                    :placeholder="$t('SysDictType.dictTypePlaceHolder')"
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
                v-if="filterPermission('sys:dict:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('sys:dict:save')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="createHandle"
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
            prop="dictName"
            :show-overflow-tooltip="true"
            :label="$t('SysDictType.dictName')"
            width="200"
          ></el-table-column>
          <el-table-column prop="dictType" :show-overflow-tooltip="true" :label="$t('SysDictType.dictType')">
            <template #default="scope">
              <el-button type="text" @click="openHandle(scope.row)">{{ scope.row.dictType }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="sort"
            :show-overflow-tooltip="true"
            :label="$t('SysDictType.sort')"
            width="100"
          ></el-table-column>
          <el-table-column prop="remark" :show-overflow-tooltip="true" :label="$t('SysDictType.remark')"></el-table-column>
          <el-table-column
            prop="createDate"
            :show-overflow-tooltip="true"
            :label="$t('SysDictType.createDate')"
            width="160"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="120">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('sys:dict:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="updateHandle({ id: scope.row.id })"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('sys:dict:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle([scope.row.id])"
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
          <SysDictTypeForm
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
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <DialogPage ref="dialogPage" @hide-dialog="hideDialog">
      <template #body>
        <SysDictData :page-params="pageParams" />
      </template>
      <template #title>
        {{ $t('SysDictType.dictDataTitle') }}
      </template>
    </DialogPage>
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
import useSysDictTypeRepository from './useSysDictTypeRepository' // 模板修改标记
// 表单页面
import SysDictTypeForm from './form.vue'
import SysDictData from '../data/index.vue'
export default defineComponent({
  name: 'SysDictType', // 模板修改标记
  components: { PgTable, SkeletonPage, DialogPage, SysDictTypeForm, SysDictData },
  computed: {
    ...mapGetters('permission', ['filterPermission'])
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
      dictName: '',
      dictType: ''
    })
    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      pgTableReset()
    }

    // API相关
    const { getPageHandle, deleteSysDictTypeByIdHandle } = useSysDictTypeRepository() // 模板修改标记

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
      deleteSysDictTypeByIdHandle(params, () => {
        // 模板修改标记
        pgTableQuery(tableParams)
        showSkeleton()
      })
    }

    // dialogPage相关代码开始
    const dialogPage = ref(null)
    const { showDialog, hideDialog } = useDialogPageComponent(dialogPage)
    const pageParams = ref({})
    function openHandle(item: any) {
      pageParams.value = item
      showDialog()
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
      hideDialog,
      openHandle,
      pageParams,
      // ?, // 模板修改标记 是否有初始化数据
      // formPage
      formPageType,
      formPageParams,
      // API
      getPageHandle, // 模板修改标记 获取分页数据
      // exportHandle // 模板修改标记 导出方法
      createHandle,
      updateHandle,
      deleteHandle
    }
  }
})
</script>
