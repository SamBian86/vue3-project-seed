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
                    :placeholder="$t('CardOperationinterface.namePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="operationId">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.operationId"
                    :placeholder="$t('CardOperationinterface.operationIdPlaceHolder')"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in cardOperationinfoSelect"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
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
                v-if="filterPermission('card:operationinterface:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('card:operationinterface:save')"
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
            prop="operationInterfaceName"
            :show-overflow-tooltip="true"
            :label="$t('CardOperationinterface.operationInterfaceName')"
            min-width="200"
          ></el-table-column>
          <el-table-column
            prop="operationInterfaceType"
            :show-overflow-tooltip="true"
            :label="$t('CardOperationinterface.operationInterfaceType')"
          >
            <template #default="scope">
              {{ getDictNameByValue('interfaceType', scope.row.operationInterfaceType) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="operationName"
            :show-overflow-tooltip="true"
            :label="$t('CardOperationinterface.operationName')"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="classPath"
            :show-overflow-tooltip="true"
            :label="$t('CardOperationinterface.classPath')"
            min-width="250"
          ></el-table-column>
          <el-table-column
            prop="requestType"
            :show-overflow-tooltip="true"
            :label="$t('CardOperationinterface.requestType')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="description"
            :show-overflow-tooltip="true"
            :label="$t('CardOperationinterface.description')"
          ></el-table-column>
          <el-table-column
            prop="operationInterfaceStatus"
            :show-overflow-tooltip="true"
            :label="$t('CardOperationinterface.operationInterfaceStatus')"
            width="100"
          >
            <template #default="scope">
              <el-tag v-if="scope.row.operationInterfaceStatus === 0" :size="StyleEnum.TAG_SIZE" type="success">
                {{ $t('CardOperationinterface.operationInterfaceStatus0') }}
              </el-tag>
              <el-tag v-if="scope.row.operationInterfaceStatus === 1" :size="StyleEnum.TAG_SIZE" type="warning">
                {{ $t('CardOperationinterface.operationInterfaceStatus1') }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="180">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('card:operationinterface:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="paramsListHandle(scope.row)"
              >
                {{ $t('CardOperationinterface.paramsList') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('card:operationinterface:display:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="
                  lockCardOperationinterfaceHandle(
                    { id: scope.row.id, lock: scope.row.operationInterfaceStatus === 1 ? 0 : 1 },
                    () => {
                      pgTableQuery(tableParams)
                    }
                  )
                "
              >
                {{ scope.row.operationInterfaceStatus === 1 ? $t('table.unlock') : $t('table.lock') }}
              </el-button>

              <el-button
                type="text"
                v-if="filterPermission('card:operationinterface:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('card:operationinterface:delete')"
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
              <CardOperationinterfaceForm
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
          {{ $t('CardOperationinterface.pageTitle') }}
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
import router from '/@/router'
// components
import { PgTable } from '/@/components/PgTable'
import { SkeletonPage } from '/@/components/SkeletonPage'
import { DialogPage } from '/@/components/DialogPage'
// hooks
import useSkeletonPageComponent from '/@/hooks/component/skeletonPage'
import usePgTableComponent from '/@/hooks/component/pgTable'
import useFormPageComponent from '/@/hooks/component/formPage'
import useDialogPageComponent from '/@/hooks/component/dialogPage'
import useRouterSetting from '/@/hooks/router/useRouterSetting'
// API封装
import useCardOperationinterfaceRepository from './useCardOperationinterfaceRepository' // 模板修改标记
import useCardOperationinfoRepository from '../operationinfo/useCardOperationinfoRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import CardOperationinterfaceForm from './form.vue'
export default defineComponent({
  name: 'CardOperationinterface', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, DialogPage, CardOperationinterfaceForm }, // 模板修改标记
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
    const { getPageHandle, deleteCardOperationinterfaceByIdHandle, lockCardOperationinterfaceHandle } =
      useCardOperationinterfaceRepository() // 模板修改标记
    const { cardOperationinfoSelect, getCardOperationinfoSelectHandle } = useCardOperationinfoRepository()
    getCardOperationinfoSelectHandle()
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
      deleteCardOperationinterfaceByIdHandle(params, () => {
        // 模板修改标记
        pgTableQuery(tableParams)
      })
    }

    const { routerPush } = useRouterSetting()
    // 跳转到参数列表 operationInterfaceId
    function paramsListHandle(row: any) {
      routerPush('/card/operationparameter', (path: any) => {
        router.push({ path, query: { operationInterfaceId: row.id } })
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
      cardOperationinfoSelect,
      lockCardOperationinterfaceHandle,
      paramsListHandle
    }
  }
})
</script>
