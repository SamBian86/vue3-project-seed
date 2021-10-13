<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="nameOrCardNo">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.nameOrCardNo"
                    :placeholder="$t('HospitalMedical.nameOrCardNoPlaceHolder')"
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
                v-if="filterPermission('hospital:medical:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <!-- <el-button
                type="primary"
                v-if="filterPermission('hospital:medical:save')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('create')"
              >
                {{ $t('table.create') }}
              </el-button> -->
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
            :label="$t('HospitalMedical.name')"
            min-width="160"
          ></el-table-column>
          <el-table-column
            prop="reportName"
            :show-overflow-tooltip="true"
            :label="$t('HospitalMedical.reportName')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="reportTime"
            :show-overflow-tooltip="true"
            :label="$t('HospitalMedical.reportTime')"
            width="160"
          ></el-table-column>
          <el-table-column prop="reportType" :show-overflow-tooltip="true" :label="$t('HospitalMedical.reportType')" width="100">
            <template #default="scope">
              {{ scope.row.reportType === 0 ? $t('HospitalMedical.reportType0') : '' }}
              {{ scope.row.reportType === 1 ? $t('HospitalMedical.reportType1') : '' }}
              {{ scope.row.reportType === 2 ? $t('HospitalMedical.reportType2') : '' }}
              {{ scope.row.reportType === 3 ? $t('HospitalMedical.reportType3') : '' }}
            </template>
          </el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="60">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('hospital:medical:view') && scope.row.reportType === 1"
                :size="StyleEnum.BUTTON_SIZE"
                @click="dialogHandle('discharge', 'showDialog', scope.row)"
              >
                {{ $t('table.detail') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('hospital:medical:view') && scope.row.reportType === 2"
                :size="StyleEnum.BUTTON_SIZE"
                @click="dialogHandle('history', 'showDialog', scope.row)"
              >
                {{ $t('table.detail') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('hospital:medical:view') && scope.row.reportType === 3"
                :size="StyleEnum.BUTTON_SIZE"
                @click="dialogHandle('survey', 'showDialog', scope.row)"
              >
                {{ $t('table.detail') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('hospital:medical:view') && scope.row.reportType === 4"
                :size="StyleEnum.BUTTON_SIZE"
                @click="dialogHandle('inspect', 'showDialog', scope.row)"
              >
                {{ $t('table.detail') }}
              </el-button>
              <!-- <el-button
                type="text"
                v-if="filterPermission('hospital:medical:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('hospital:medical:delete')"
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
      <DialogPage ref="dischargeDialogPage">
        <template #body>
          <div class="component-skeleton-page">
            <HospitalMedicalDischarge :page-type="'detail'" :page-params="dialogPageParams" />
          </div>
        </template>
        <template #title>
          {{ $t('HospitalMedical.dischargePageTitle') }}
        </template>
      </DialogPage>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="historyDialogPage">
        <template #body>
          <div class="component-skeleton-page">
            <HospitalMedicalHistory :page-type="'detail'" :page-params="dialogPageParams" />
          </div>
        </template>
        <template #title>
          {{ $t('HospitalMedical.historyPageTitle') }}
        </template>
      </DialogPage>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="surveyDialogPage">
        <template #body>
          <div class="component-skeleton-page">
            <HospitalMedicalSurvey :page-type="'detail'" :page-params="dialogPageParams" />
          </div>
        </template>
        <template #title>
          {{ $t('HospitalMedical.surveyPageTitle') }}
        </template>
      </DialogPage>
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <DialogPage ref="inspectDialogPage">
        <template #body>
          <div class="component-skeleton-page">
            <HospitalMedicalInspect :page-type="'detail'" :page-params="dialogPageParams" />
          </div>
        </template>
        <template #title>
          {{ $t('HospitalMedical.inspectPageTitle') }}
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
import usePgTableComponent from '/@/hooks/component/pgTable'
import useDialogPageComponent from '/@/hooks/component/dialogPage'
// API封装
import useHospitalMedicalRepository from './useHospitalMedicalRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import HospitalMedicalDischarge from './discharge.vue'
import HospitalMedicalHistory from './history.vue'
import HospitalMedicalSurvey from './survey.vue'
import HospitalMedicalInspect from './inspect.vue'

export default defineComponent({
  name: 'HospitalMedical', // 模板修改标记
  mixins: [tableMixin],
  components: {
    PgTable,
    SkeletonPage,
    DialogPage,
    HospitalMedicalDischarge,
    HospitalMedicalHistory,
    HospitalMedicalSurvey,
    HospitalMedicalInspect
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
    const { getPageHandle } = useHospitalMedicalRepository() // 模板修改标记

    // dialogPage相关代码开始
    const dialogPageParams = ref({})
    const dischargeDialogPage = ref(null)
    const dischargeDialogComponent = useDialogPageComponent(dischargeDialogPage)
    const historyDialogPage = ref(null)
    const historyDialogComponent = useDialogPageComponent(historyDialogPage)
    const surveyDialogPage = ref(null)
    const surveyDialogComponent = useDialogPageComponent(surveyDialogPage)
    const inspectDialogPage = ref(null)
    const inspectDialogComponent = useDialogPageComponent(inspectDialogPage)

    function dialogHandle(name: any, action: any, row: any) {
      const dialogPageComponent = {
        discharge: dischargeDialogComponent,
        history: historyDialogComponent,
        survey: surveyDialogComponent,
        inspect: inspectDialogComponent
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
      // 查询相关基础数据及方法
      // dialogPage组件
      dialogPageParams,
      dischargeDialogPage,
      historyDialogPage,
      surveyDialogPage,
      inspectDialogPage,
      dialogHandle,
      // API
      getPageHandle // 模板修改标记 获取分页数据
      // exportHandle // 模板修改标记 导出方法
    }
  }
})
</script>
