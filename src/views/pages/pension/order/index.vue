<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="orderNo">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.orderNo"
                    :placeholder="$t('PensionOrder.orderNoPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="nameOrphone">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.nameOrphone"
                    :placeholder="$t('PensionOrder.nameOrphonePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="name">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.name"
                    :placeholder="$t('PensionOrder.namePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="businessName">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.businessName"
                    :placeholder="$t('PensionOrder.businessNamePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="orderType">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.orderType"
                    :placeholder="$t('PensionOrder.orderTypePlaceHolder')"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('orderType')"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="type">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.type"
                    :placeholder="$t('PensionOrder.typePlaceHolder')"
                    clearable
                    @change="typeChangeHandle($event)"
                  >
                    <el-option
                      v-for="item in getDictByType('serverType')"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="orderStatus">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.orderStatus"
                    :placeholder="$t('PensionOrder.orderStatusPlaceHolder')"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('backstageOrderStatus')"
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
                v-if="filterPermission('pension:order:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('pension:order:save')"
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
            prop="orderNo"
            :show-overflow-tooltip="true"
            :label="$t('PensionOrder.orderNo')"
            width="210"
          ></el-table-column>
          <el-table-column
            prop="orderStatusName"
            :show-overflow-tooltip="true"
            :label="$t('PensionOrder.orderStatusName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="orderUserName"
            :show-overflow-tooltip="true"
            :label="$t('PensionOrder.orderUserName')"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="userPhoneNumber"
            :show-overflow-tooltip="true"
            :label="$t('PensionOrder.userPhoneNumber')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="name"
            :show-overflow-tooltip="true"
            :label="$t('PensionOrder.name')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="serverTypeName"
            :show-overflow-tooltip="true"
            :label="$t('PensionOrder.serverTypeName')"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="businessName"
            :show-overflow-tooltip="true"
            :label="$t('PensionOrder.businessName')"
            width="220"
          ></el-table-column>
          <el-table-column
            prop="realPrice"
            :show-overflow-tooltip="true"
            :label="$t('PensionOrder.realPrice')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="orderTypeName"
            :show-overflow-tooltip="true"
            :label="$t('PensionOrder.orderTypeName')"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="orderTime"
            :show-overflow-tooltip="true"
            :label="$t('PensionOrder.orderTime')"
            width="160"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="220">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('pension:order:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('detail', scope.row)"
              >
                {{ $t('table.detail') }}
              </el-button>
              <el-button
                type="text"
                v-if="
                  (filterPermission('pension:order:allocate:update') &&
                    (scope.row.orderType == 1 || scope.row.orderType == 4) &&
                    scope.row.orderStatus == 2 &&
                    scope.row.serverType !== 2) ||
                  (scope.row.orderType == 2 && scope.row.orderStatus == 1 && scope.row.serverType !== 2)
                "
                :size="StyleEnum.BUTTON_SIZE"
                @click="allocateHandle(scope.row)"
              >
                {{ $t('PensionOrder.allocate') }}
              </el-button>
              <el-button
                type="text"
                v-if="
                  (filterPermission('pension:order:allocate:update') &&
                    (scope.row.orderType == 1 || scope.row.orderType == 4) &&
                    scope.row.orderStatus == 4 &&
                    scope.row.serverType !== 2) ||
                  (scope.row.orderType == 2 && scope.row.orderStatus == 2 && scope.row.serverType !== 2)
                "
                :size="StyleEnum.BUTTON_SIZE"
                @click="dispatchHandle(scope.row)"
              >
                {{ $t('PensionOrder.dispatch') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('pension:order:verification') && scope.row.serverType === 2 && scope.row.orderStatus === 2"
                :size="StyleEnum.BUTTON_SIZE"
                @click="verificationHandle(scope.row)"
              >
                {{ $t('PensionOrder.verification') }}
              </el-button>
              <el-button
                type="text"
                v-if="
                  (filterPermission('pension:order:cancel') &&
                    scope.row.orderType == 4 &&
                    scope.row.payType == 4 &&
                    (scope.row.orderStatus == 2 || scope.row.orderStatus == 4)) ||
                  (scope.row.serverType === 2 && scope.row.orderStatus === 1) ||
                  scope.row.orderStatus === 1
                "
                :size="StyleEnum.BUTTON_SIZE"
                @click="cancelHandle(scope.row)"
              >
                {{ $t('PensionOrder.cancel') }}
              </el-button>

              <!-- <el-button
                type="text"
                v-if="filterPermission('pension:order:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('pension:order:delete')"
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
              <PensionOrderForm
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
          {{ $t('PensionOrder.pageTitle') }}
        </template>
      </DialogPage>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="dialogPageCreate">
        <template #body>
          <PensionOrderCreate
            :page-type="formPageType"
            :page-params="formPageParams"
            @hide-dialog="dialogPageCreateHideDialog"
            @update-table="pgTableQuery"
          />
        </template>
        <template #title>
          {{ $t('PensionOrder.createTitle') }}
        </template>
      </DialogPage>
    </el-col>
  </el-row>
  <DialogPage ref="dialogPageDispatch">
    <template #body>
      <PensionEmployeeDispatch
        :page-type="dialogPageDispatchType"
        :page-params="dialogPageDispatchParams"
        @hide-dialog="dialogPageDispatchHide"
        @update-table="pgTableQuery"
      ></PensionEmployeeDispatch>
    </template>
    <template #title>
      {{ $t('PensionOrder.dispatch') }}
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
import usePensionOrderRepository from './usePensionOrderRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import PensionOrderForm from './form.vue'
import PensionEmployeeDispatch from './dispatch.vue'
import PensionOrderCreate from './create.vue'

export default defineComponent({
  name: 'PensionOrder', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, DialogPage, PensionOrderCreate, PensionOrderForm, PensionEmployeeDispatch }, // 模板修改标记
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
    const { getPageHandle, deletePensionOrderByIdHandle, verificationPensionOrderHandle, cancelPensionOrderHandle } =
      usePensionOrderRepository() // 模板修改标记

    // formPage相关代码开始
    const formPage = ref(null)
    const { formPageType, formPageParams, formPageCreateHandle, formPageUpdateHandle, formPageDetailHandle } =
      useFormPageComponent(formPage)

    // dialogPageCreate相关代码开始
    const dialogPageCreate = ref(null)
    const dialogPageCreateComponent = useDialogPageComponent(dialogPageCreate)

    // dialogPage相关代码开始
    const dialogPage = ref(null)
    const { showDialog, hideDialog } = useDialogPageComponent(dialogPage)
    function openHandle(type: any, item: any) {
      if (type !== 'create') {
        showDialog()
      }
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
      formPageCreateHandle()
      dialogPageCreateComponent.showDialog()
    }
    function dialogPageCreateHideDialog() {
      dialogPageCreateComponent.hideDialog()
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
      deletePensionOrderByIdHandle(params, () => {
        // 模板修改标记
        pgTableQuery(tableParams)
      })
    }

    const dialogPageDispatch = ref(null)
    const dialogPageDispatchParams = ref({})
    const dialogPageDispatchType = ref('')
    // const { showDialog, hideDialog } = useDialogPageComponent(dialogPageDispatch)
    const dialogPageDispatchComponent = useDialogPageComponent(dialogPageDispatch)
    // 分配
    function allocateHandle(row: any) {
      dialogPageDispatchParams.value.orderId = row.id
      dialogPageDispatchType.value = 'allocate'
      dialogPageDispatchComponent.showDialog()
    }
    // 重新分配
    function dispatchHandle(row: any) {
      dialogPageDispatchParams.value.orderId = row.id
      dialogPageDispatchType.value = 'dispatch'
      dialogPageDispatchComponent.showDialog()
    }
    // 核销
    function verificationHandle(row: any) {
      verificationPensionOrderHandle(row)
    }
    // 取消
    function cancelHandle(row: any) {
      cancelPensionOrderHandle(row)
    }

    // 关闭弹层
    function dialogPageDispatchHide() {
      dialogPageDispatchComponent.hideDialog()
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
      dialogPageCreate,
      // ?, // 模板修改标记 是否有初始化数据
      // formPage
      formPageType,
      formPageParams,
      // API
      getPageHandle, // 模板修改标记 获取分页数据
      // exportHandle // 模板修改标记 导出方法
      deleteHandle,
      detailHandle,
      allocateHandle,
      dispatchHandle,
      verificationHandle,
      cancelHandle,
      dialogPageCreateHideDialog,
      dialogPageDispatch,
      dialogPageDispatchParams,
      dialogPageDispatchType,
      dialogPageDispatchHide
    }
  }
})
</script>
