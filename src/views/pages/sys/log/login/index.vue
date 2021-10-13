<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="creatorName">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.creatorName"
                    :placeholder="$t('SysLogLogin.creatorNamePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="status">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.status"
                    :placeholder="$t('SysLogLogin.statusPlaceHolder')"
                    clearable
                  >
                    <el-option
                      v-for="item in statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="16" :lg="16" :xl="16"></el-col>
            </el-row>
          </el-form>
        </template>
        <template v-slot:button>
          <el-row :gutter="StyleEnum.ROW_GUTTER">
            <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
              <el-button type="primary" :size="StyleEnum.BUTTON_SIZE" @click="pgTableQuery(tableParams)">
                {{ $t('table.search') }}
              </el-button>
              <el-button type="primary" :size="StyleEnum.BUTTON_SIZE" @click="exportHandle(tableParams)">
                {{ $t('table.export') }}
              </el-button>
              <el-button :size="StyleEnum.BUTTON_SIZE" @click="pgTableResetHandle">
                {{ $t('table.reset') }}
              </el-button>
            </el-col>
          </el-row>
        </template>
        <template v-slot:content>
          <el-table-column
            prop="creatorName"
            :show-overflow-tooltip="true"
            :label="$t('SysLogLogin.creatorName')"
            width="100"
          ></el-table-column>
          <el-table-column prop="operation" :show-overflow-tooltip="true" :label="$t('SysLogLogin.operation')" width="200">
            <template #default="scope">
              <el-tag v-if="scope.row.operation === 0" :size="StyleEnum.TAG_SIZE" type="success">
                {{ $t('SysLogLogin.operation0') }}
              </el-tag>
              <el-tag v-if="scope.row.operation === 1" :size="StyleEnum.TAG_SIZE">{{ $t('SysLogLogin.operation1') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" :show-overflow-tooltip="true" :label="$t('SysLogLogin.status')" width="100">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 0" :size="StyleEnum.TAG_SIZE" type="danger">
                {{ $t('SysLogLogin.status0') }}
              </el-tag>
              <el-tag v-if="scope.row.status === 1" :size="StyleEnum.TAG_SIZE" type="success">
                {{ $t('SysLogLogin.status1') }}
              </el-tag>
              <el-tag v-if="scope.row.status === 2" :size="StyleEnum.TAG_SIZE" type="danger">
                {{ $t('SysLogLogin.status2') }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="ip" :show-overflow-tooltip="true" :label="$t('SysLogLogin.ip')" width="150"></el-table-column>
          <el-table-column prop="userAgent" :show-overflow-tooltip="true" :label="$t('SysLogLogin.userAgent')"></el-table-column>
          <el-table-column
            prop="createDate"
            :show-overflow-tooltip="true"
            :label="$t('SysLogLogin.createDate')"
            width="160"
          ></el-table-column>
        </template>
      </PgTable>
    </el-col>
  </el-row>
</template>
<script lang="ts">
// 基础支持
import { defineComponent, ref, reactive } from 'vue'
import { StyleEnum } from '/@/enums/styleEnum'
// components
import { PgTable } from '/@/components/PgTable'
// hooks
import usePgTableComponent from '/@/hooks/component/pgTable'
// API封装
import useSysLogLoginRepository from './useSysLogLoginRepository'
export default defineComponent({
  name: 'SysLogLogin',
  components: { PgTable },
  setup(props) {
    // 约定，在页面直接使用的方法都以Handle结尾，子组件中的方法不以Handle作为结尾

    // pgTable相关代码开始
    const pgTable = ref(null)
    const { pgTableQuery, pgTableReset } = usePgTableComponent(pgTable)

    // 查询条件
    const searchForm = ref(null)
    const tableParams = reactive({
      creatorName: '',
      status: ''
    })
    const { getPageHandle, exportHandle } = useSysLogLoginRepository()

    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      pgTableReset()
    }

    // pgTable相关代码结束

    // 查询框初始化数据相关代码
    const statusOptions = ref([
      {
        label: '失败',
        value: 0
      },
      {
        label: '成功',
        value: 1
      },
      {
        label: '账号已锁定',
        value: 2
      }
    ])

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
      // 查询相关基础数据
      statusOptions,
      // API
      getPageHandle, // 获取分页数据
      exportHandle // 导出方法
    }
  }
})
</script>
