<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="communityName">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.communityName"
                    :placeholder="$t('PensionBuilding.communityNamePlaceHolder')"
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
                v-if="filterPermission('pension:building:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('pension:building:save')"
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
          <el-table-column type="expand">
            <template #default="scope">
              <el-table :data="scope.row.employeeLinkList" :row-key="'id'" border class="component-pg-children-table">
                <el-table-column
                  prop="employeeName"
                  :show-overflow-tooltip="true"
                  :label="$t('PensionBuilding.employeeName')"
                  width="200"
                ></el-table-column>
                <el-table-column
                  prop="dutyName"
                  :show-overflow-tooltip="true"
                  :label="$t('PensionBuilding.dutyName')"
                ></el-table-column>
                <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="160">
                  <template #default="scope">
                    <el-button
                      type="text"
                      v-if="filterPermission('pension:resident:update')"
                      :size="StyleEnum.BUTTON_SIZE"
                      @click="employeeDetailHandle(scope.row)"
                    >
                      {{ $t('PensionBuilding.employeeDetail') }}
                    </el-button>
                    <el-button
                      type="text"
                      v-if="filterPermission('pension:buildingemployeelink:delete')"
                      :size="StyleEnum.BUTTON_SIZE"
                      @click="employeeDeleteHandle(scope.row)"
                    >
                      {{ $t('PensionBuilding.employeeDelete') }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            prop="communityName"
            :show-overflow-tooltip="true"
            :label="$t('PensionBuilding.communityName')"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="buildingNumber"
            :show-overflow-tooltip="true"
            :label="$t('PensionBuilding.buildingNumber')"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="220">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('pension:building:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="familyListHandle(scope.row)"
              >
                {{ $t('PensionBuilding.familyList') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('pension:buildingemployeelink:save')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="bindHandle(scope.row)"
              >
                {{ $t('PensionBuilding.bind') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('pension:building:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('pension:building:delete')"
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
              <PensionBuildingForm
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
          {{ $t('PensionBuilding.pageTitle') }}
        </template>
      </DialogPage>
    </el-col>
  </el-row>
  <DrawerPage ref="drawerPage" @before-close="handleClose" :with-header="true" :title="$t('PensionBuilding.bind')">
    <template v-slot:content>
      <PensionBuildingemployeelinkForm
        :page-type="'create'"
        :page-params="pensionBuildingemployeelinkParams"
        @before-close="handleClose"
      />
    </template>
  </DrawerPage>
  <DialogPage ref="dialogEmployeeDetailPage">
    <template #body>
      <PensionEmployeeForm :page-type="dialogEmployeeDetailPageType" :page-params="dialogEmployeeDetailPageParams" />
    </template>
    <template #title>
      {{ $t('PensionBuilding.employeeDetail') }}
    </template>
  </DialogPage>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, reactive } from 'vue'
import { mapGetters } from 'vuex'
import { StyleEnum } from '/@/enums/styleEnum'
import router from '/@/router'
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
import useRouterSetting from '/@/hooks/router/useRouterSetting'
import useDrawerPageComponent from '/@/hooks/component/drawerPage'
// API封装
import usePensionBuildingRepository from './usePensionBuildingRepository' // 模板修改标记
import usePensionBuildingemployeelinkRepository from '../buildingemployeelink/usePensionBuildingemployeelinkRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import PensionBuildingForm from './form.vue'
import PensionBuildingemployeelinkForm from '../buildingemployeelink/form.vue'
import PensionEmployeeForm from '../employee/form.vue'
export default defineComponent({
  name: 'PensionBuilding', // 模板修改标记
  mixins: [tableMixin],
  components: {
    PgTable,
    SkeletonPage,
    DialogPage,
    PensionBuildingForm,
    DrawerPage,
    PensionBuildingemployeelinkForm,
    PensionEmployeeForm
  }, // 模板修改标记
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
    const { getPageHandle, deletePensionBuildingByIdHandle } = usePensionBuildingRepository() // 模板修改标记
    const { deletePensionBuildingemployeelinkByIdHandle } = usePensionBuildingemployeelinkRepository()
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
      deletePensionBuildingByIdHandle(params, () => {
        // 模板修改标记
        pgTableQuery(tableParams)
      })
    }

    const { routerPush } = useRouterSetting()
    // 房屋列表
    function familyListHandle(row: any) {
      routerPush('/pension/family', (path: any) => {
        router.push({ path, query: { buildingId: row.id, communityName: row.communityName } })
      })
    }

    //drawerPage相关代码开始
    const drawerPage = ref(null)
    const pensionBuildingemployeelinkParams = ref({})
    const { showDrawer, hideDrawer } = useDrawerPageComponent(drawerPage)
    // 关闭回调
    function handleClose() {
      hideDrawer()
      pgTableQuery(tableParams)
    }
    // 绑定管家
    function bindHandle(row: any) {
      row.buildingId = row.id
      delete row.id
      pensionBuildingemployeelinkParams.value = row
      showDrawer()
    }

    const dialogEmployeeDetailPage = ref(null)
    const dialogEmployeeDetailPageParams = ref({})
    const dialogEmployeeDetailPageType = ref('')
    const dialogEmployeeDetailComponent = useDialogPageComponent(dialogEmployeeDetailPage)
    // 员工详情
    function employeeDetailHandle(row: any) {
      dialogEmployeeDetailPageParams.value.id = row.employeeId
      dialogEmployeeDetailPageType.value = 'detail'
      dialogEmployeeDetailComponent.showDialog()
    }

    // 删除->解绑管家
    function employeeDeleteHandle(row: any) {
      deletePensionBuildingemployeelinkByIdHandle(row, () => {
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
      familyListHandle,
      bindHandle,
      employeeDetailHandle,
      employeeDeleteHandle,
      drawerPage,
      handleClose,
      pensionBuildingemployeelinkParams,
      dialogEmployeeDetailPage,
      dialogEmployeeDetailPageType,
      dialogEmployeeDetailPageParams
    }
  }
})
</script>
