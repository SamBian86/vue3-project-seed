<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="serverCategoryId">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.serverCategoryId"
                    :placeholder="$t('PensionServerSequence.serverCategoryIdPlaceHolder')"
                    clearable
                  >
                    <el-option
                      v-for="(item, idx) in pensionServercategoryListAll"
                      :key="idx"
                      :label="pensionServercategoryListAll[idx]"
                      :value="idx"
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
                v-if="filterPermission('pension:server:sequence:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('pension:server:sequence:save')"
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
            prop="serverCategoryName"
            :show-overflow-tooltip="true"
            :label="$t('PensionServerSequence.serverCategoryName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="name"
            :show-overflow-tooltip="true"
            :label="$t('PensionServerSequence.name')"
            min-width="300"
          ></el-table-column>
          <el-table-column
            prop="businessName"
            :show-overflow-tooltip="true"
            :label="$t('PensionServerSequence.businessName')"
            min-width="200"
          ></el-table-column>
          <el-table-column prop="display" :show-overflow-tooltip="true" :label="$t('PensionServerSequence.display')" width="100">
            <template #default="scope">
              <el-tag v-if="scope.row.display === 0" :size="StyleEnum.TAG_SIZE" type="warning">
                {{ $t('PensionServerSequence.display0') }}
              </el-tag>
              <el-tag v-if="scope.row.display === 1" :size="StyleEnum.TAG_SIZE" type="success">
                {{ $t('PensionServerSequence.display1') }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sidx" :show-overflow-tooltip="true" :label="$t('PensionServerSequence.sidx')" width="200">
            <template #default="scope">
              <el-input
                v-model="scope.row.sidx"
                :placeholder="$t('PensionServerSequence.sidxPlaceHolder')"
                :size="StyleEnum.INPUT_SIZE"
                clearable
                @input="inputHandle(scope.row.id, $event, scope.row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="120">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('pension:server:sequence:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('detail', scope.row)"
              >
                {{ $t('table.detail') }}
              </el-button>
              <!-- <el-button
                type="text"
                v-if="filterPermission('pension:server:sequence:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('pension:server:sequence:delete')"
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
              <PensionServerSequenceForm
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
          {{ $t('PensionServerSequence.pageTitle') }}
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
import usePensionServerSequenceRepository from './usePensionServerSequenceRepository' // 模板修改标记
import usePensionServercategoryRepository from '/@/views/pages/pension/servercategory/usePensionServercategoryRepository' // 模板修改标记

// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import PensionServerSequenceForm from './form.vue'
export default defineComponent({
  name: 'PensionServerSequence', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, DialogPage, PensionServerSequenceForm }, // 模板修改标记
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
      serverCategoryId: ''
    })
    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      pgTableReset()
    }

    // API相关
    const { getPageHandle, updatePensionServerSequenceHandle } = usePensionServerSequenceRepository() // 模板修改标记
    const { pensionServercategoryListAll, getPensionServercategoryListAllHandle } = usePensionServercategoryRepository()
    getPensionServercategoryListAllHandle()

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
    //   deletePensionServerSequenceByIdHandle(params, () => {
    //     // 模板修改标记
    //     pgTableQuery(tableParams)
    //   })
    // }

    // 排序方法
    function inputHandle(id: any, sidx: any, row: any) {
      const reg = /^[1-9]\d*|0$/
      const m = sidx.match(reg)
      let timer = null
      if (sidx === '') {
        return false
      }
      if (m !== null) {
        row.sidx = m[0]
      } else {
        row.sidx = 0
      }
      if (timer) {
        window.clearTimeout(timer)
      }
      timer = setTimeout(() => {
        updatePensionServerSequenceHandle({ id, sidx })
      }, 200)
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
      // deleteHandle,
      detailHandle,
      pensionServercategoryListAll,
      inputHandle
    }
  }
})
</script>
