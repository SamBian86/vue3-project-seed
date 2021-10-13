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
                    :placeholder="$t('HospitalInfo.namePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="type">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.type"
                    :placeholder="$t('HospitalInfo.typePlaceHolder')"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('hospitalType')"
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
                v-if="filterPermission('hospital:info:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button
                type="primary"
                v-if="filterPermission('hospital:info:save')"
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
            :label="$t('HospitalInfo.name')"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="typeName"
            :show-overflow-tooltip="true"
            :label="$t('HospitalInfo.typeName')"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="createDate"
            :show-overflow-tooltip="true"
            :label="$t('HospitalInfo.createDate')"
            width="160"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="340">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('hospital:info:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('hospital:info:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle({ id: scope.row.id })"
              >
                {{ $t('table.delete') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('hospital:info:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="dialogHandle('introduce', 'showDialog', scope.row)"
              >
                {{ $t('HospitalInfo.introduce') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('hospital:info:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="dialogHandle('medical', 'showDialog', scope.row)"
              >
                {{ $t('HospitalInfo.medical') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('hospitalzone:info:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="dialogHandle('hospitalzone', 'showDialog', scope.row)"
              >
                {{ $t('HospitalInfo.hospitalzone') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('hospitaldepartment:info:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="dialogHandle('hospitaldepartment', 'showDialog', scope.row)"
              >
                {{ $t('HospitalInfo.hospitaldepartment') }}
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
              <HospitalInfoForm
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
          {{ $t('HospitalInfo.pageTitle') }}
        </template>
      </DialogPage>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="dialogIntroducePage">
        <template #body>
          <div class="component-skeleton-page">
            <HospitalInfoIntroduce
              :page-type="'update'"
              :page-params="dialogPageParams"
              @hide-dialog="dialogHandle('introduce', 'hideDialog')"
            />
          </div>
        </template>
        <template #title>
          {{ $t('HospitalInfo.introduce') }}
        </template>
      </DialogPage>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="dialogMedicalPage">
        <template #body>
          <div class="component-skeleton-page">
            <HospitalInfoMedicalInsurance
              :page-type="'update'"
              :page-params="dialogPageParams"
              @hide-dialog="dialogHandle('medical', 'hideDialog')"
            />
          </div>
        </template>
        <template #title>
          {{ $t('HospitalInfo.medical') }}
        </template>
      </DialogPage>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="dialogHospitalzonePage">
        <template #body>
          <HospitalInfoHospitalzone :page-params="dialogPageParams" />
        </template>
        <template #title>
          {{ $t('HospitalInfo.hospitalzone') }}
        </template>
      </DialogPage>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="dialogHospitaldepartmentPage">
        <template #body>
          <HospitalInfoHospitaldepartment :page-params="dialogPageParams" />
        </template>
        <template #title>
          {{ $t('HospitalInfo.hospitaldepartment') }}
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
import useHospitalInfoRepository from './useHospitalInfoRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import HospitalInfoForm from './form.vue'
import HospitalInfoIntroduce from './introduce.vue'
import HospitalInfoMedicalInsurance from './medical.vue'
import HospitalInfoHospitalzone from '../../hospitalZone/info/index.vue'
import HospitalInfoHospitaldepartment from '../../hospitaldepartment/info/index.vue'
export default defineComponent({
  name: 'HospitalInfo', // 模板修改标记
  mixins: [tableMixin],
  components: {
    PgTable,
    SkeletonPage,
    DialogPage,
    HospitalInfoForm,
    HospitalInfoIntroduce,
    HospitalInfoMedicalInsurance,
    HospitalInfoHospitalzone,
    HospitalInfoHospitaldepartment
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
    const { getPageHandle, deleteHospitalInfoByIdHandle } = useHospitalInfoRepository() // 模板修改标记

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
      deleteHospitalInfoByIdHandle(params, () => {
        // 模板修改标记
        pgTableQuery(tableParams)
      })
    }

    // 查询框初始化数据相关代码
    // 模板修改标记 是否有初始化数据
    // formPage相关代码开始
    // const { showDialog, hideDialog } = useDialogPageComponent(dialogPage)
    const dialogIntroducePage = ref(null)
    const dialogIntroduceComponent = useDialogPageComponent(dialogIntroducePage)
    const dialogMedicalPage = ref(null)
    const dialogMedicalComponent = useDialogPageComponent(dialogMedicalPage)
    const dialogHospitalzonePage = ref(null)
    const dialogHospitalzoneComponent = useDialogPageComponent(dialogHospitalzonePage)
    const dialogHospitaldepartmentPage = ref(null)
    const dialogHospitaldepartmentComponent = useDialogPageComponent(dialogHospitaldepartmentPage)
    const dialogPageParams = ref({})

    function dialogHandle(name: any, action: any, row: any) {
      const dialogPageComponent = {
        introduce: dialogIntroduceComponent,
        medical: dialogMedicalComponent,
        hospitalzone: dialogHospitalzoneComponent,
        hospitaldepartment: dialogHospitaldepartmentComponent
      }
      if (row) {
        dialogPageParams.value = row
      }
      dialogPageComponent[name][action]()
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
      dialogIntroducePage,
      dialogMedicalPage,
      dialogHospitalzonePage,
      dialogHospitaldepartmentPage,
      dialogPageParams,
      dialogHandle
    }
  }
})
</script>
