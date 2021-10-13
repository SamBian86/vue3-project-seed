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
                    :placeholder="$t('HouseReplacementinfo.namePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="linkman">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.linkman"
                    :placeholder="$t('HouseReplacementinfo.linkmanPlaceHolder')"
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
                v-if="filterPermission('house:replacementinfo:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('house:replacementinfo:save')"
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
          <el-table-column type="expand" width="40">
            <template #default="scope">
              <el-table :data="scope.row.communityLinkEntityList" :row-key="'id'" border class="component-pg-children-table">
                <el-table-column
                  prop="communityName"
                  :show-overflow-tooltip="true"
                  :label="$t('HouseReplacementinfo.communityName')"
                ></el-table-column>
                <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="120">
                  <template #default="scope">
                    <el-button
                      type="text"
                      v-if="filterPermission('house:replacementinfo:bound')"
                      :size="StyleEnum.BUTTON_SIZE"
                      @click="unBoundHandle(scope.row)"
                    >
                      {{ $t('HouseReplacementinfo.unbound') }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            :show-overflow-tooltip="true"
            :label="$t('HouseReplacementinfo.name')"
            min-width="250"
          ></el-table-column>
          <el-table-column
            prop="contactName"
            :show-overflow-tooltip="true"
            :label="$t('HouseReplacementinfo.contactName')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="mobile"
            :show-overflow-tooltip="true"
            :label="$t('HouseReplacementinfo.mobile')"
            width="160"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="120">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('house:replacementinfo:bound')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="boundHandle(scope.row)"
              >
                {{ $t('HouseReplacementinfo.bound') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('house:replacementinfo:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <!-- <el-button
                type="text"
                v-if="filterPermission('house:replacementinfo:delete')"
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
              <HouseReplacementinfoForm
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
          {{ $t('HouseReplacementinfo.pageTitle') }}
        </template>
      </DialogPage>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="boundDialogPage">
        <template #body>
          <HouseReplacementinfoBound :page-params="boundPageParams" @hide-dialog="hideBoundDialog" @update-table="pgTableQuery" />
        </template>
        <template #title>
          {{ $t('HouseReplacementinfo.bound') }}
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
import useHouseReplacementinfoRepository from './useHouseReplacementinfoRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import HouseReplacementinfoForm from './form.vue'
import HouseReplacementinfoBound from './bound.vue'
export default defineComponent({
  name: 'HouseReplacementinfo', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, DialogPage, HouseReplacementinfoForm, HouseReplacementinfoBound }, // 模板修改标记
  computed: {
    ...mapGetters('permission', ['filterPermission']),
    ...mapGetters('dict', ['getDictByType', 'getDictNameByValue'])
  },
  setup(props) {
    // 约定，在页面直接使用的方法都以Handle结尾，子组件中的方法不以Handle作为结尾
    const boundPageParams = ref({})
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
    const { getPageHandle, deleteHouseReplacementinfoByIdHandle, unboundHouseReplacementinfoByIdHandle } =
      useHouseReplacementinfoRepository() // 模板修改标记

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
      deleteHouseReplacementinfoByIdHandle(params, () => {
        // 模板修改标记
        pgTableQuery(tableParams)
      })
    }

    // 查询框初始化数据相关代码
    // 模板修改标记 是否有初始化数据
    // formPage相关代码开始

    const boundDialogPage = ref(null)
    // const { showDialog, hideDialog } = useDialogPageComponent(dialogPage)
    const boundDialogComponent = useDialogPageComponent(boundDialogPage)
    // boundPageParams
    // 绑定社区
    function boundHandle(row: any) {
      boundPageParams.value.id = row.id
      boundDialogComponent.showDialog()
    }

    // 解除绑定
    function unBoundHandle(item: any) {
      unboundHouseReplacementinfoByIdHandle(item, () => {
        pgTableQuery(tableParams)
      })
    }

    function hideBoundDialog() {
      boundDialogComponent.hideDialog()
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
      boundHandle,
      unBoundHandle,
      boundDialogPage,
      boundPageParams,
      hideBoundDialog
    }
  }
})
</script>
