<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="activityTitle">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.activityTitle"
                    :placeholder="$t('AgedActivity.activityTitlePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="cateId">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.cateId"
                    :placeholder="$t('AgedActivity.cateIdPlaceHolder')"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('activitytype')"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="status">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.status"
                    :placeholder="$t('AgedActivity.statusPlaceHolder')"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('activityStatus')"
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
                v-if="filterPermission('aged:activity:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('aged:activity:save')"
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
            prop="title"
            :show-overflow-tooltip="true"
            :label="$t('AgedActivity.title')"
            min-width="250"
          ></el-table-column>
          <el-table-column
            prop="cateName"
            :show-overflow-tooltip="true"
            :label="$t('AgedActivity.cateName')"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="bgDate"
            :show-overflow-tooltip="true"
            :label="$t('AgedActivity.bgDate')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="endDate"
            :show-overflow-tooltip="true"
            :label="$t('AgedActivity.endDate')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="zans"
            :show-overflow-tooltip="true"
            :label="$t('AgedActivity.zans')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="hits"
            :show-overflow-tooltip="true"
            :label="$t('AgedActivity.hits')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="statusName"
            :show-overflow-tooltip="true"
            :label="$t('AgedActivity.statusName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            :show-overflow-tooltip="true"
            :label="$t('AgedActivity.createTime')"
            width="160"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="220">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('aged:activity:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('detail', scope.row)"
              >
                {{ $t('table.detail') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('aged:activity:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('aged:activity:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle({ id: scope.row.id })"
              >
                {{ $t('table.delete') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('aged:activitysignitem:list')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="infoHandle(scope.row)"
              >
                {{ $t('AgedActivity.info') }}
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
              <AgedActivityForm
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
          {{ $t('AgedActivity.pageTitle') }}
        </template>
      </DialogPage>
    </el-col>
  </el-row>
  <DrawerPage ref="drawerPage" @before-close="handleClose" :with-header="true" :title="$t('AgedActivity.info')">
    <template v-slot:content>
      <AgedActivitySignItemList :page-params="drawerPageParams" @before-close="handleClose" />
    </template>
  </DrawerPage>
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
import { DrawerPage } from '/@/components/DrawerPage'
// hooks
import useSkeletonPageComponent from '/@/hooks/component/skeletonPage'
import usePgTableComponent from '/@/hooks/component/pgTable'
import useFormPageComponent from '/@/hooks/component/formPage'
import useDialogPageComponent from '/@/hooks/component/dialogPage'
import useDrawerPageComponent from '/@/hooks/component/drawerPage'
// API封装
import useAgedActivityRepository from './useAgedActivityRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import AgedActivityForm from './form.vue'
import AgedActivitySignItemList from './list.vue'
export default defineComponent({
  name: 'AgedActivity', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, DialogPage, AgedActivityForm, DrawerPage, AgedActivitySignItemList }, // 模板修改标记
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
    const { getPageHandle, deleteAgedActivityByIdHandle } = useAgedActivityRepository() // 模板修改标记

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
      deleteAgedActivityByIdHandle(params, () => {
        // 模板修改标记
        pgTableQuery(tableParams)
      })
    }

    //drawerPage相关代码开始
    const drawerPage = ref(null)
    const { showDrawer, hideDrawer } = useDrawerPageComponent(drawerPage)
    const drawerPageParams = ref({})
    // 关闭回调
    function handleClose() {
      hideDrawer()
    }

    // 查看报名信息
    function infoHandle(row: any) {
      drawerPageParams.value.id = row.id
      showDrawer()
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
      detailHandle,
      infoHandle,
      drawerPage,
      drawerPageParams,
      handleClose
    }
  }
})
</script>
