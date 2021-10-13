<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getPensionEmployeeScoreListHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="sex">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.sex"
                    :placeholder="$t('PensionEmployeeScore.sexPlaceHolder')"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('sex')"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="dutyId">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.dutyId"
                    :placeholder="$t('PensionEmployeeScore.dutyIdPlaceHolder')"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('employeeduty')"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="positionId">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.positionId"
                    :placeholder="$t('PensionEmployeeScore.positionIdPlaceHolder')"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('positionId')"
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
                v-if="filterPermission('pension:employee:scorelist:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <!-- <el-button
                type="primary"
                v-if="filterPermission('pension:employee:scorelist:save')"
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
            :label="$t('PensionEmployeeScore.name')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="sexName"
            :show-overflow-tooltip="true"
            :label="$t('PensionEmployeeScore.sexName')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="dutyName"
            :show-overflow-tooltip="true"
            :label="$t('PensionEmployeeScore.dutyName')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="positionName"
            :show-overflow-tooltip="true"
            :label="$t('PensionEmployeeScore.positionName')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="phoneNumber"
            :show-overflow-tooltip="true"
            :label="$t('PensionEmployeeScore.phoneNumber')"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="200">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('pension:employee:scorelist:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle(scope.row)"
              >
                共接单{{ scope.row.orderNumber }}个,平均分{{ scope.row.orderScore }}
              </el-button>
              <!-- <el-button
                type="text"
                v-if="filterPermission('pension:employee:scorelist:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="openHandle('update', scope.row)"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('pension:employee:scorelist:delete')"
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
          <PensionEmployeeScoreList
            :page-params="pensionEmployeeScoreParams"
            @update-table="pgTableQuery"
            @hide-dialog="hideDialog"
          />
        </template>
        <template #title>
          {{ $t('PensionEmployeeScore.scoreList') }}
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
import { DialogPage } from '/@/components/DialogPage'
// hooks
import usePgTableComponent from '/@/hooks/component/pgTable'
import useDialogPageComponent from '/@/hooks/component/dialogPage'
// API封装
import usePensionEmployeeRepository from '../usePensionEmployeeRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 表单页面
import PensionEmployeeScoreList from './scoreList.vue'
export default defineComponent({
  name: 'PensionEmployeeScore', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, DialogPage, PensionEmployeeScoreList }, // 模板修改标记
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
      sex: '',
      dutyId: '',
      positionId: ''
    })
    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      pgTableReset()
    }

    // API相关
    const { getPensionEmployeeScoreListHandle } = usePensionEmployeeRepository() // 模板修改标记

    // dialogPage相关代码开始
    const dialogPage = ref(null)
    const pensionEmployeeScoreParams = ref({})
    const { showDialog, hideDialog } = useDialogPageComponent(dialogPage)
    function openHandle(item: any) {
      pensionEmployeeScoreParams.value.staffId = item.userId
      showDialog()
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
      // 查询相关基础数据及方法
      // dialogPage组件
      dialogPage,
      openHandle,
      hideDialog,
      // ?, // 模板修改标记 是否有初始化数据
      // API
      getPensionEmployeeScoreListHandle, // 模板修改标记 获取分页数据
      pensionEmployeeScoreParams
      // exportHandle // 模板修改标记 导出方法
    }
  }
})
</script>
