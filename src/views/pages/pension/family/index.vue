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
                    :placeholder="$t('PensionFamily.communityNamePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="buildingNumber">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.buildingNumber"
                    :placeholder="$t('PensionFamily.buildingNumberPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="roomNumber">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.roomNumber"
                    :placeholder="$t('PensionFamily.roomNumberPlaceHolder')"
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
                v-if="filterPermission('pension:family:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('pension:family:save')"
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
              <el-table :data="scope.row.residentList" :row-key="'id'" border class="component-pg-children-table">
                <el-table-column
                  prop="name"
                  :show-overflow-tooltip="true"
                  :label="$t('PensionFamily.name')"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="sexName"
                  :show-overflow-tooltip="true"
                  :label="$t('PensionFamily.sexName')"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="relationShipName"
                  :show-overflow-tooltip="true"
                  :label="$t('PensionFamily.relationShipName')"
                ></el-table-column>
                <el-table-column
                  prop="phoneNumber"
                  :show-overflow-tooltip="true"
                  :label="$t('PensionFamily.phoneNumber')"
                  width="200"
                ></el-table-column>
                <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="220">
                  <template #default="scope">
                    <el-button
                      type="text"
                      v-if="filterPermission('pension:resident:update')"
                      :size="StyleEnum.BUTTON_SIZE"
                      @click="residentUpdateHandle(scope.row)"
                    >
                      {{ $t('table.update') }}
                    </el-button>
                    <el-button
                      type="text"
                      v-if="filterPermission('pension:resident:delete')"
                      :size="StyleEnum.BUTTON_SIZE"
                      @click="residentDeleteHandle(scope.row)"
                    >
                      {{ $t('table.delete') }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            prop="communityName"
            :show-overflow-tooltip="true"
            :label="$t('PensionFamily.communityName')"
          ></el-table-column>
          <el-table-column
            prop="buildingNumber"
            :show-overflow-tooltip="true"
            :label="$t('PensionFamily.buildingNumber')"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="roomNumber"
            :show-overflow-tooltip="true"
            :label="$t('PensionFamily.roomNumber')"
            width="200"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="120">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('pension:family:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <!-- <el-button
                type="text"
                v-if="filterPermission('pension:family:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle({ id: scope.row.id })"
              >
                {{ $t('table.delete') }}
              </el-button> -->
              <el-button
                type="text"
                v-if="filterPermission('pension:family:save')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="residentAddHandle(scope.row)"
              >
                {{ $t('PensionFamily.addUser') }}
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
              <PensionFamilyForm
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
          {{ $t('PensionFamily.pageTitle') }}
        </template>
      </DialogPage>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="pensionResidentFormPage">
        <template v-slot:body>
          <SkeletonPage ref="pensionResidentFormSkeletonPage">
            <template v-slot:content>
              <PensionResidentForm
                :page-type="pensionResidentFormPageType"
                :page-params="pensionResidentFormPageParams"
                @show-skeleton="showPensionResidentFormSkeleton"
                @hide-skeleton="hidePensionResidentFormSkeleton"
                @hide-dialog="hideResidentFormPage"
                @update-table="pgTableQuery"
              />
            </template>
          </SkeletonPage>
        </template>
        <template #title>
          {{ $t('PensionResident.pageTitle') }}
        </template>
      </DialogPage>
    </el-col>
  </el-row>
</template>

<script lang='ts'>
// 基础支持
import { defineComponent, ref, reactive, watch } from 'vue'
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
// API封装
import usePensionFamilyRepository from './usePensionFamilyRepository' // 模板修改标记
import usePensionResidentRepository from '/@/views/pages/pension/resident/usePensionResidentRepository'
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import PensionFamilyForm from './form.vue'
import PensionResidentForm from '../resident/form.vue'
export default defineComponent({
  name: 'PensionFamily', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, SkeletonPage, DialogPage, PensionFamilyForm, PensionResidentForm }, // 模板修改标记
  computed: {
    ...mapGetters('permission', ['filterPermission']),
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props) {
    // 约定，在页面直接使用的方法都以Handle结尾，子组件中的方法不以Handle作为结尾
    const { query } = router.currentRoute.value
    // pgTable相关代码
    const pgTable = ref(null)
    const { pgTableQuery, pgTableReset } = usePgTableComponent(pgTable)

    // 查询条件
    const searchForm = ref(null)
    const tableParams = reactive({
      // 模板修改标记
      buildingId: query.buildingId ? query.buildingId : '',
      communityName: query.communityName ? query.communityName : ''
    })
    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      pgTableReset()
    }

    watch(
      () => router.currentRoute.value.query,
      (value) => {
        const { buildingId, communityName } = value
        if (!!buildingId && !!communityName) {
          tableParams.buildingId = buildingId
          tableParams.communityName = communityName
          pgTableQuery(tableParams)
        }
      }
    )

    // API相关
    const { getPageHandle, deletePensionFamilyByIdHandle } = usePensionFamilyRepository() // 模板修改标记
    const { deletePensionResidentByIdHandle } = usePensionResidentRepository()

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
      deletePensionFamilyByIdHandle(params, () => {
        // 模板修改标记
        pgTableQuery(tableParams)
      })
    }

    // 查询框初始化数据相关代码
    // 模板修改标记 是否有初始化数据
    // formPage相关代码开始

    const pensionResidentFormPage = ref(null)
    // const { showDialog, hideDialog } = useDialogPageComponent(dialogPage)
    const pensionResidentFormComponent = useDialogPageComponent(pensionResidentFormPage)
    const pensionResidentFormPageType = ref('')
    const pensionResidentFormPageParams = ref({})

    const pensionResidentFormSkeletonPage = ref(null)
    const pensionResidentFormSkeletonComponent = useSkeletonPageComponent(pensionResidentFormSkeletonPage)
    function showPensionResidentFormSkeleton() {
      pensionResidentFormSkeletonComponent.showSkeleton()
    }

    function hidePensionResidentFormSkeleton() {
      pensionResidentFormSkeletonComponent.hideSkeleton()
    }
    // 新增住户
    function residentAddHandle(row: any) {
      pensionResidentFormPageType.value = 'create'
      pensionResidentFormPageParams.value.communityCode = row.communityCode
      pensionResidentFormPageParams.value.buildingId = row.buildingId
      pensionResidentFormPageParams.value.familyId = row.id
      pensionResidentFormPageParams.value.disabled = true
      pensionResidentFormComponent.showDialog()
    }

    // 修改住户
    function residentUpdateHandle(row: any) {
      pensionResidentFormPageType.value = 'update'
      pensionResidentFormPageParams.value.communityCode = row.communityCode
      pensionResidentFormPageParams.value.buildingId = row.buildingId
      pensionResidentFormPageParams.value.familyId = row.familyId
      pensionResidentFormPageParams.value.id = row.id
      pensionResidentFormPageParams.value.disabled = true
      pensionResidentFormComponent.showDialog()
    }

    function hideResidentFormPage() {
      pensionResidentFormComponent.hideDialog()
    }

    // 删除住户
    function residentDeleteHandle(row: any) {
      deletePensionResidentByIdHandle({ id: row.id }, () => {
        pgTableQuery(tableParams)
      })
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
      pensionResidentFormPage,
      residentAddHandle,
      residentUpdateHandle,
      pensionResidentFormPageType,
      pensionResidentFormPageParams,
      pensionResidentFormSkeletonPage,
      showPensionResidentFormSkeleton,
      hidePensionResidentFormSkeleton,
      hideResidentFormPage,
      residentDeleteHandle
    }
  }
})
</script>
