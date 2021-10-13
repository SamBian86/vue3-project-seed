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
                    :placeholder="$t('PensionDishesintroduction.namePlaceHolder')"
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
                v-if="filterPermission('pension:dishesintroduction:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('pension:dishesintroduction:save')"
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
            :label="$t('PensionDishesintroduction.name')"
            min-width="200"
          ></el-table-column>
          <el-table-column
            prop="linkman"
            :show-overflow-tooltip="true"
            :label="$t('PensionDishesintroduction.linkman')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="linktelephone"
            :show-overflow-tooltip="true"
            :label="$t('PensionDishesintroduction.linktelephone')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="streetName"
            :show-overflow-tooltip="true"
            :label="$t('PensionDishesintroduction.streetName')"
            min-width="300"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="300">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('pension:dishesintroduction:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('pension:dishesintroduction:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle({ id: scope.row.id })"
              >
                {{ $t('table.delete') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('pension:dishesintroduction:details:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="drawerHandle('details', 'showDrawer', scope.row)"
              >
                {{ $t('PensionDishesintroduction.detailsTitle') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('pension:dishesintroduction:mealdetails:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="drawerHandle('mealdetails', 'showDrawer', scope.row)"
              >
                {{ $t('PensionDishesintroduction.mealDetailsTitle') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('pension:dishesintroduction:orderlink:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="drawerHandle('orderlink', 'showDrawer', scope.row)"
              >
                {{ $t('PensionDishesintroduction.orderLinkTitle') }}
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
              <PensionDishesintroductionForm
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
          {{ $t('PensionDishesintroduction.pageTitle') }}
        </template>
      </DialogPage>
    </el-col>
  </el-row>
  <DrawerPage
    ref="drawerDetailsPage"
    @before-close="drawerHandle('details', 'hideDrawer')"
    :with-header="true"
    :title="$t('PensionDishesintroduction.detailsTitle')"
  >
    <template v-slot:content>
      <PensionDishesintroductionDetails
        :page-type="'create'"
        :page-params="drawerPageParams"
        @before-close="drawerHandle('details', 'hideDrawer')"
      />
    </template>
  </DrawerPage>
  <DrawerPage
    ref="drawerMealdetailsPage"
    @before-close="drawerHandle('mealdetails', 'hideDrawer')"
    :with-header="true"
    :title="$t('PensionDishesintroduction.mealDetailsTitle')"
  >
    <template v-slot:content>
      <PensionDishesintroductionMealdetails
        :page-type="'create'"
        :page-params="drawerPageParams"
        @before-close="drawerHandle('mealdetails', 'hideDrawer')"
      />
    </template>
  </DrawerPage>
  <DrawerPage
    ref="drawerOrderlinkPage"
    @before-close="drawerHandle('orderlink', 'hideDrawer')"
    :with-header="true"
    :title="$t('PensionDishesintroduction.orderLinkTitle')"
  >
    <template v-slot:content>
      <PensionDishesintroductionOrderlink
        :page-type="'create'"
        :page-params="drawerPageParams"
        @before-close="drawerHandle('orderlink', 'hideDrawer')"
      />
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
import usePensionDishesintroductionRepository from './usePensionDishesintroductionRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import PensionDishesintroductionForm from './form.vue'
import PensionDishesintroductionDetails from './details.vue'
import PensionDishesintroductionMealdetails from './mealdetails.vue'
import PensionDishesintroductionOrderlink from './orderlink.vue'

export default defineComponent({
  name: 'PensionDishesintroduction', // 模板修改标记
  mixins: [tableMixin],
  components: {
    PgTable,
    SkeletonPage,
    DialogPage,
    DrawerPage,
    PensionDishesintroductionForm,
    PensionDishesintroductionDetails,
    PensionDishesintroductionMealdetails,
    PensionDishesintroductionOrderlink
  }, // 模板修改标记
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
    const { getPageHandle, deletePensionDishesintroductionByIdHandle } = usePensionDishesintroductionRepository() // 模板修改标记

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
      deletePensionDishesintroductionByIdHandle(params, () => {
        // 模板修改标记
        pgTableQuery(tableParams)
      })
    }

    //drawerPage相关代码开始
    const drawerDetailsPage = ref(null)
    const drawerMealdetailsPage = ref(null)
    const drawerOrderlinkPage = ref(null)
    const drawerPageParams = ref({})
    const drawerDetailsPageComponent = useDrawerPageComponent(drawerDetailsPage)
    const drawerMealdetailsComponent = useDrawerPageComponent(drawerMealdetailsPage)
    const drawerOrderlinkComponent = useDrawerPageComponent(drawerOrderlinkPage)

    // 关闭回调
    function drawerHandle(name: any, action: any, row: any) {
      const drawerPageComponent = {
        details: drawerDetailsPageComponent,
        mealdetails: drawerMealdetailsComponent,
        orderlink: drawerOrderlinkComponent
      }
      if (row) {
        drawerPageParams.value.id = row.id
      }
      drawerPageComponent[name][action]()
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
      drawerHandle,
      drawerPageParams,
      drawerDetailsPage,
      drawerMealdetailsPage,
      drawerOrderlinkPage
    }
  }
})
</script>
