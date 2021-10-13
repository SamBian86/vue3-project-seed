<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="ownerNameOrPhone">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.ownerNameOrPhone"
                    :placeholder="$t('PensionMaintenanceapplication.ownerNameOrPhonePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="status">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.status"
                    :placeholder="$t('PensionMaintenanceapplication.statusPlaceHolder')"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('maintenanceStatus')"
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
                v-if="filterPermission('pension:maintenanceapplication:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('pension:maintenanceapplication:save')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('create')"
              >
                {{ $t('PensionMaintenanceapplication.create') }}
              </el-button>
              <el-button :size="StyleEnum.BUTTON_SIZE" @click="pgTableResetHandle">
                {{ $t('table.reset') }}
              </el-button>
            </el-col>
          </el-row>
        </template>
        <template v-slot:content>
          <el-table-column
            prop="userName"
            :show-overflow-tooltip="true"
            :label="$t('PensionMaintenanceapplication.userName')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="userPhoneNumber"
            :show-overflow-tooltip="true"
            :label="$t('PensionMaintenanceapplication.userPhoneNumber')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="applyTime"
            :show-overflow-tooltip="true"
            :label="$t('PensionMaintenanceapplication.applyTime')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="applyHouse"
            :show-overflow-tooltip="true"
            :label="$t('PensionMaintenanceapplication.applyHouse')"
          ></el-table-column>
          <el-table-column
            prop="appointerName"
            :show-overflow-tooltip="true"
            :label="$t('PensionMaintenanceapplication.appointerName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="executorName"
            :show-overflow-tooltip="true"
            :label="$t('PensionMaintenanceapplication.executorName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="statusName"
            :show-overflow-tooltip="true"
            :label="$t('PensionMaintenanceapplication.statusName')"
            width="100"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="220">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('pension:maintenanceapplication:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="detailHandle(scope.row)"
              >
                {{ $t('table.detail') }}
              </el-button>
              <el-button
                type="text"
                v-if="
                  filterPermission('pension:maintenanceapplication:update') &&
                  scope.row.executorName === null &&
                  scope.row.isManager
                "
                :size="StyleEnum.BUTTON_SIZE"
                @click="assignHandle(scope.row)"
              >
                {{ $t('PensionMaintenanceapplication.assign') }}
              </el-button>
              <el-button
                type="text"
                v-if="
                  filterPermission('pension:maintenanceapplication:update') &&
                  scope.row.executorName !== null &&
                  scope.row.isManager &&
                  (scope.row.status === 1 || scope.row.status === 2)
                "
                :size="StyleEnum.BUTTON_SIZE"
                @click="reassignHandle(scope.row)"
              >
                {{ $t('PensionMaintenanceapplication.reassign') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('pension:maintenanceapplication:update') && scope.row.isWorker && scope.row.status === 2"
                :size="StyleEnum.BUTTON_SIZE"
                @click="dealHandle(scope.row)"
              >
                {{ $t('PensionMaintenanceapplication.deal') }}
              </el-button>
              <!-- <el-button
                type="text"
                v-if="filterPermission('pension:maintenanceapplication:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('pension:maintenanceapplication:delete')"
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
              <PensionMaintenanceapplicationForm
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
          {{ $t('PensionMaintenanceapplication.pageTitle') }}
        </template>
      </DialogPage>
    </el-col>
  </el-row>
  <DrawerPage
    ref="drawerAssignPage"
    @before-close="handleAssignClose"
    :with-header="true"
    :title="$t('PensionMaintenanceapplication.assign')"
  >
    <template v-slot:content>
      <PensionMaintenanceapplicationAssign
        :page-type="drawerPageType"
        :page-params="drawerPageParams"
        @before-close="handleAssignClose"
      />
    </template>
  </DrawerPage>
  <DrawerPage
    ref="drawerReassignPage"
    @before-close="handleReassignClose"
    :with-header="true"
    :title="$t('PensionMaintenanceapplication.reassign')"
  >
    <template v-slot:content>
      <PensionMaintenanceapplicationReassign
        :page-type="drawerPageType"
        :page-params="drawerPageParams"
        @before-close="handleReassignClose"
      />
    </template>
  </DrawerPage>
  <DrawerPage
    ref="drawerDealPage"
    @before-close="handleDealClose"
    :with-header="true"
    :title="$t('PensionMaintenanceapplication.deal')"
  >
    <template v-slot:content>
      <PensionMaintenanceapplicationDeal
        :page-type="drawerPageType"
        :page-params="drawerPageParams"
        @before-close="handleDealClose"
      />
    </template>
  </DrawerPage>
  <DialogPage ref="dialogDetailPage">
    <template #body>
      <PensionMaintenanceapplicationDetail :page-type="detailPageType" :page-params="detailPageParams" />
    </template>
    <template #title>
      {{ $t('PensionMaintenanceapplication.detail') }}
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
import { DrawerPage } from '/@/components/DrawerPage'
// hooks
import useSkeletonPageComponent from '/@/hooks/component/skeletonPage'
import usePgTableComponent from '/@/hooks/component/pgTable'
import useFormPageComponent from '/@/hooks/component/formPage'
import useDialogPageComponent from '/@/hooks/component/dialogPage'
import useDrawerPageComponent from '/@/hooks/component/drawerPage'
// API封装
import usePensionMaintenanceapplicationRepository from './usePensionMaintenanceapplicationRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import PensionMaintenanceapplicationForm from './form.vue'
import PensionMaintenanceapplicationAssign from './assign.vue'
import PensionMaintenanceapplicationReassign from './reassign.vue'
import PensionMaintenanceapplicationDeal from './deal.vue'
import PensionMaintenanceapplicationDetail from './detail.vue'
export default defineComponent({
  name: 'PensionMaintenanceapplication', // 模板修改标记
  mixins: [tableMixin],
  components: {
    PgTable,
    SkeletonPage,
    DialogPage,
    DrawerPage,
    PensionMaintenanceapplicationForm,
    PensionMaintenanceapplicationAssign,
    PensionMaintenanceapplicationReassign,
    PensionMaintenanceapplicationDeal,
    PensionMaintenanceapplicationDetail
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
    const { getPageHandle } = usePensionMaintenanceapplicationRepository() // 模板修改标记

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
          // updateHandle({ ...item, t: new Date().getTime() })
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
    // function updateHandle(params: any) {
    //   hideSkeleton()
    //   formPageUpdateHandle(params)
    // }
    // 删除
    // function deleteHandle(params: any) {
    //   deletePensionMaintenanceapplicationByIdHandle(params, () => {
    //     // 模板修改标记
    //     pgTableQuery(tableParams)
    //   })
    // }
    // 详情
    const dialogDetailPage = ref(null)
    const dialogDetailComponent = useDialogPageComponent(dialogDetailPage)
    const detailPageType = ref('')
    const detailPageParams = ref({})
    function detailHandle(row: any) {
      detailPageType.value = 'detail'
      detailPageParams.value.id = row.id
      dialogDetailComponent.showDialog()
    }

    //drawerPage相关代码开始
    const drawerPageType = ref('create')
    const drawerPageParams = ref({})
    const drawerAssignPage = ref(null)
    const drawerAssignComponent = useDrawerPageComponent(drawerAssignPage)

    // 指派
    function assignHandle(row: any) {
      drawerPageParams.value.id = row.id
      drawerPageParams.value.communityId = row.communityId
      drawerAssignComponent.showDrawer()
    }
    function handleAssignClose() {
      drawerAssignComponent.hideDrawer()
    }

    // drawerReassignPage handleReassignClose drawerDealPage handleDealClose
    const drawerReassignPage = ref(null)
    const drawerReassignComponent = useDrawerPageComponent(drawerReassignPage)
    // 重新指派
    function reassignHandle(row: any) {
      drawerPageParams.value.id = row.id
      drawerPageParams.value.communityId = row.communityId
      drawerReassignComponent.showDrawer()
    }
    function handleReassignClose() {
      drawerReassignComponent.hideDrawer()
    }

    const drawerDealPage = ref(null)
    const drawerDealComponent = useDrawerPageComponent(drawerDealPage)
    // 处理
    function dealHandle(row: any) {
      drawerPageParams.value.id = row.id
      drawerDealComponent.showDrawer()
    }
    function handleDealClose() {
      drawerDealComponent.hideDrawer()
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
      drawerPageType,
      drawerPageParams,
      detailHandle,

      drawerAssignPage,
      assignHandle,
      handleAssignClose,

      drawerReassignPage,
      reassignHandle,
      handleReassignClose,

      drawerDealPage,
      dealHandle,
      handleDealClose,

      dialogDetailPage,
      detailPageType,
      detailPageParams
    }
  }
})
</script>
