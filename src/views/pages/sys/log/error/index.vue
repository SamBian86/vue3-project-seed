<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item :prop="$t('SysLogError.module')">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.module"
                    :placeholder="$t('SysLogError.modulePlaceHolder')"
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
            prop="module"
            :show-overflow-tooltip="true"
            :label="$t('SysLogError.module')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="requestUri"
            :show-overflow-tooltip="true"
            :label="$t('SysLogError.requestUri')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="requestMethod"
            :show-overflow-tooltip="true"
            :label="$t('SysLogError.requestMethod')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="requestParams"
            :show-overflow-tooltip="true"
            :label="$t('SysLogError.requestParams')"
            width="100"
          ></el-table-column>
          <el-table-column prop="ip" :show-overflow-tooltip="true" :label="$t('SysLogError.ip')" width="140"></el-table-column>
          <el-table-column prop="userAgent" :show-overflow-tooltip="true" :label="$t('SysLogError.userAgent')"></el-table-column>
          <el-table-column
            prop="createDate"
            :show-overflow-tooltip="true"
            :label="$t('SysLogError.createDate')"
            width="160"
          ></el-table-column>
          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="120">
            <template #default="scope">
              <el-button type="text" :size="StyleEnum.BUTTON_SIZE" @click="drawerHandle(scope.row.errorInfo)">
                {{ $t('SysLogError.errorInfo') }}
              </el-button>
            </template>
          </el-table-column>
        </template>
      </PgTable>
    </el-col>
  </el-row>
  <DrawerPage ref="drawerPage" @before-close="handleClose" :with-header="true" :title="title">
    <template v-slot:content>
      {{ errorInfo }}
    </template>
  </DrawerPage>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { StyleEnum } from '/@/enums/styleEnum'
// components
import { PgTable } from '/@/components/PgTable'
import { DrawerPage } from '/@/components/DrawerPage'
// hooks
import usePgTableComponent from '/@/hooks/component/pgTable'
import useDrawerPageComponent from '/@/hooks/component/drawerPage'
// API封装
import useSysLogErrorRepository from './useSysLogErrorRepository' // 模板修改标记
export default defineComponent({
  name: 'SysLogError',
  components: { PgTable, DrawerPage },
  setup(props) {
    // 约定，在页面直接使用的方法都以Handle结尾，子组件中的方法不以Handle作为结尾
    const { t } = useI18n()
    // pgTable相关代码开始
    const pgTable = ref(null)
    const { pgTableQuery, pgTableReset } = usePgTableComponent(pgTable)

    // 查询条件
    const searchForm = ref(null)
    const tableParams = reactive({
      // 模板修改标记
      module: ''
    })
    const { getPageHandle, exportHandle } = useSysLogErrorRepository() // 模板修改标记

    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      pgTableReset()
    }

    // pgTable相关代码结束

    //drawerPage相关代码开始
    const drawerPage = ref(null)
    const { showDrawer, hideDrawer } = useDrawerPageComponent(drawerPage)
    const errorInfo = ref('')
    const title = ref('')
    // 填充内容
    function drawerHandle(str: any) {
      errorInfo.value = str
      title.value = t('SysLogError.errorInfo')
      showDrawer()
    }
    // 关闭回调
    function handleClose() {
      hideDrawer()
    }

    // 查询框初始化数据相关代码
    // 模板修改标记 是否有初始化数据

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
      // ?, // 模板修改标记 是否有初始化数据
      // drawerPage组件相关
      drawerPage,
      drawerHandle,
      handleClose,
      title,
      errorInfo,
      // API
      getPageHandle, // 模板修改标记 获取分页数据
      exportHandle // 模板修改标记 导出方法
    }
  }
})
</script>
