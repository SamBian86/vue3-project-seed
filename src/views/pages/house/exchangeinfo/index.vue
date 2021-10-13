<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="linkman">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.linkman"
                    :placeholder="$t('HouseExchangeinfo.linkmanPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="communityName">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.communityName"
                    :placeholder="$t('HouseExchangeinfo.communityNamePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="exchangeType">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.exchangeType"
                    :placeholder="$t('HouseExchangeinfo.exchangeTypePlaceHolder')"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('exchangeType')"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="publishStatus">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.publishStatus"
                    :placeholder="$t('HouseExchangeinfo.publishStatusPlaceHolder')"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('publishStatus')"
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
                v-if="filterPermission('house:exchangeinfo:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('house:exchangeinfo:save')"
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
            prop="communityName"
            :show-overflow-tooltip="true"
            :label="$t('HouseExchangeinfo.communityName')"
            min-width="220"
          ></el-table-column>
          <el-table-column
            prop="exchangeTypeName"
            :show-overflow-tooltip="true"
            :label="$t('HouseExchangeinfo.exchangeTypeName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="exchangeLinkman"
            :show-overflow-tooltip="true"
            :label="$t('HouseExchangeinfo.exchangeLinkman')"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="exchangeLinkphone"
            :show-overflow-tooltip="true"
            :label="$t('HouseExchangeinfo.exchangeLinkphone')"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="proposeDate"
            :show-overflow-tooltip="true"
            :label="$t('HouseExchangeinfo.proposeDate')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="dataFrom"
            :show-overflow-tooltip="true"
            :label="$t('HouseExchangeinfo.dataFrom')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="publishStatusName"
            :show-overflow-tooltip="true"
            :label="$t('HouseExchangeinfo.publishStatusName')"
            width="100"
          >
            <template #default="scope">
              <el-tag v-if="scope.row.publishStatus === '1'" :size="StyleEnum.TAG_SIZE" type="primary">
                {{ scope.row.publishStatusName }}
              </el-tag>
              <el-tag v-if="scope.row.publishStatus === '2'" :size="StyleEnum.TAG_SIZE" type="success">
                {{ scope.row.publishStatusName }}
              </el-tag>
              <el-tag v-if="scope.row.publishStatus === '3'" :size="StyleEnum.TAG_SIZE" type="warning">
                {{ scope.row.publishStatusName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="publishDate"
            :show-overflow-tooltip="true"
            :label="$t('HouseExchangeinfo.publishDate')"
            width="160"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="120">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('house:exchangeinfo:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="detailHandle(scope.row)"
              >
                {{ $t('table.detail') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('house:exchangeinfo:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="
                  filterPermission('house:exchangeinfo:display:update') &&
                  (scope.row.publishStatus === '2' || scope.row.publishStatus === '3')
                "
                :size="StyleEnum.BUTTON_SIZE"
                @click="
                  displayHouseExchangeinfoHandle({ id: scope.row.id, status: scope.row.publishStatus === '2' ? 0 : 1 }, () => {
                    pgTableQuery(tableParams)
                  })
                "
              >
                {{ scope.row.publishStatus === '2' ? $t('table.off') : $t('table.on') }}
              </el-button>

              <!-- <el-button
                type="text"
                v-if="filterPermission('house:exchangeinfo:delete')"
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
              <HouseExchangeinfoForm
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
          {{ $t('HouseExchangeinfo.pageTitle') }}
        </template>
      </DialogPage>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="detailDialogPage">
        <template #body>
          <HouseExchangeinfoDetail :page-type="'detail'" :page-params="detailPageParams" />
        </template>
        <template #title>
          {{ $t('HouseExchangeinfo.pageDetailTitle') }}
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
import useHouseExchangeinfoRepository from './useHouseExchangeinfoRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import HouseExchangeinfoForm from './form.vue'
import HouseExchangeinfoDetail from './detail.vue'
export default defineComponent({
  name: 'HouseExchangeinfo', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, DialogPage, HouseExchangeinfoForm, HouseExchangeinfoDetail }, // 模板修改标记
  computed: {
    ...mapGetters('permission', ['filterPermission']),
    ...mapGetters('dict', ['getDictByType', 'getDictNameByValue'])
  },
  setup(props) {
    // 约定，在页面直接使用的方法都以Handle结尾，子组件中的方法不以Handle作为结尾
    const detailPageParams = ref({})
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
    const { getPageHandle, deleteHouseExchangeinfoByIdHandle, displayHouseExchangeinfoHandle } = useHouseExchangeinfoRepository() // 模板修改标记

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
      deleteHouseExchangeinfoByIdHandle(params, () => {
        // 模板修改标记
        pgTableQuery(tableParams)
      })
    }

    // dialogPage相关代码开始
    const detailDialogPage = ref(null)
    const detailDialogComponent = useDialogPageComponent(detailDialogPage)
    // 详情
    function detailHandle(params: any) {
      detailPageParams.value.id = params.id
      detailDialogComponent.showDialog()
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
      displayHouseExchangeinfoHandle,
      detailHandle,
      detailDialogPage,
      detailPageParams
    }
  }
})
</script>
