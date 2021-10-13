<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="jobId">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.jobId"
                    :placeholder="$t('JobScheduleLog.jobId')"
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
                v-if="filterPermission('sys:schedule:view')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button :size="StyleEnum.BUTTON_SIZE" @click="pgTableResetHandle">
                {{ $t('table.reset') }}
              </el-button>
            </el-col>
          </el-row>
        </template>
        <template v-slot:content>
          <el-table-column
            prop="jobId"
            :show-overflow-tooltip="true"
            :label="$t('JobScheduleLog.jobId')"
            min-width="180"
          ></el-table-column>
          <el-table-column
            prop="beanName"
            :show-overflow-tooltip="true"
            :label="$t('JobScheduleLog.beanName')"
            min-width="200"
          ></el-table-column>
          <el-table-column
            prop="params"
            :show-overflow-tooltip="true"
            :label="$t('JobScheduleLog.params')"
            min-width="160"
          ></el-table-column>
          <el-table-column prop="status" :show-overflow-tooltip="true" :label="$t('JobSchedule.status')" width="??">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 0" :size="StyleEnum.TAG_SIZE" type="danger">
                {{ $t('JobScheduleLog.status0') }}
              </el-tag>
              <el-tag v-if="scope.row.status === 1" :size="StyleEnum.TAG_SIZE" type="success">
                {{ $t('JobScheduleLog.status1') }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="times"
            :show-overflow-tooltip="true"
            :label="$t('JobScheduleLog.times')"
            width="100"
          ></el-table-column>
        </template>
      </PgTable>
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
// hooks
import usePgTableComponent from '/@/hooks/component/pgTable'
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useJobScheduleLogRepository from './useJobScheduleLogRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 页面

export default defineComponent({
  name: 'JobScheduleLog', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable }, // 模板修改标记
  computed: {
    ...mapGetters('permission', ['filterPermission'])
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
      jobId: ''
    })

    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      pgTableReset()
    }

    // API相关
    const { getPageHandle } = useJobScheduleLogRepository() // 模板修改标记

    // formPage相关代码开始
    const formPage = ref(null)
    const { formPageType, formPageParams } = useFormPageComponent(formPage)

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
      // API
      getPageHandle // 模板修改标记 获取分页数据
    }
  }
})
</script>
