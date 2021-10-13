<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
      <TreeItem
        ref="deptTree"
        :tree-method="getSysDeptPermissionListTreeHandle"
        :expand-on-click-node="false"
        :props="defaultDeptProps"
        :check-strictly="true"
        :highlight-current="highlightCurrent"
        node-key="id"
        @node-click-handle="nodeClickHandle"
      />
    </el-col>
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="18" :lg="18" :xl="18">
      <PgTable :table-method="getPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="nameOrPhone">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.nameOrPhone"
                    :placeholder="$t('PensionEmployee.nameOrPhone')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="positionId">
                  <el-select
                    class="el-select-block"
                    :size="StyleEnum.FORM_SIZE"
                    v-model="tableParams.positionId"
                    :placeholder="$t('PensionEmployee.positionIdPlaceHolder')"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictByType('employeeposition')"
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
              <el-button type="primary" :size="StyleEnum.BUTTON_SIZE" @click="pgTableQuery(tableParams)">
                {{ $t('table.search') }}
              </el-button>
              <el-button :size="StyleEnum.BUTTON_SIZE" @click="resetHandle">
                {{ $t('table.reset') }}
              </el-button>
            </el-col>
          </el-row>
        </template>
        <template v-slot:content>
          <el-table-column
            prop="name"
            :show-overflow-tooltip="true"
            :label="$t('PensionEmployee.name')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="sexName"
            :show-overflow-tooltip="true"
            :label="$t('PensionEmployee.sexName')"
            width="60"
          ></el-table-column>
          <el-table-column
            prop="dutyName"
            :show-overflow-tooltip="true"
            :label="$t('PensionEmployee.dutyName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="positionName"
            :show-overflow-tooltip="true"
            :label="$t('PensionEmployee.positionName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="relationshipName"
            :show-overflow-tooltip="true"
            :label="$t('PensionEmployee.relationshipName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="workStatusName"
            :show-overflow-tooltip="true"
            :label="$t('PensionEmployee.workStatusName')"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="deptName"
            :show-overflow-tooltip="true"
            :label="$t('PensionEmployee.deptName')"
          ></el-table-column>
          <el-table-column
            prop="phoneNumber"
            :show-overflow-tooltip="true"
            :label="$t('PensionEmployee.phoneNumber')"
            width="140"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="140">
            <template #default="scope">
              <!-- 是否维修工相关操作 -->
              <div v-if="pageParams.actionTag === 'isMaintenanceWorker'">
                <el-button v-if="currentId === scope.row.id" type="danger" :size="StyleEnum.BUTTON_SIZE">
                  {{ $t('PensionMaintenanceworker.currentMaintenanceWorker') }}
                </el-button>

                <el-button
                  v-if="currentId !== scope.row.id && scope.row.isMaintenanceWorker === 1"
                  type="text"
                  :size="StyleEnum.BUTTON_SIZE"
                  disabled
                >
                  {{ $t('PensionMaintenanceworker.isMaintenanceWorker1') }}
                </el-button>
                <el-button
                  v-if="currentId !== scope.row.id && scope.row.isMaintenanceWorker === 0"
                  type="text"
                  :size="StyleEnum.BUTTON_SIZE"
                  @click="setHandle(scope.row)"
                >
                  {{ $t('PensionMaintenanceworker.isMaintenanceWorker0') }}
                </el-button>
              </div>
              <!-- <el-button
                type="text"
                v-if="filterPermission('sys:dept:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle({ id: scope.row.deptId })"
              >
                {{ $t('table.delete') }}
              </el-button> -->
            </template>
          </el-table-column>
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
import { TreeItem } from '/@/components/TreeItem'
// hooks
import usePgTableComponent from '/@/hooks/component/pgTable'
import useTreeItemComponent from '/@/hooks/component/treeItem'
// API封装
import useSysDeptRepository from '/@/views/pages/sys/dept/useSysDeptRepository' // 模板修改标记
import usePensionEmployeeRepository from '/@/views/pages/pension/employee/usePensionEmployeeRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
export default defineComponent({
  name: 'EmployeeTable', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable, TreeItem }, // 模板修改标记
  computed: {
    ...mapGetters('permission', ['filterPermission']),
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    // 约定，在页面直接使用的方法都以Handle结尾，子组件中的方法不以Handle作为结尾
    const currentId = ref(props.pageParams.employeeId)
    const pageParams = ref(props.pageParams)
    // pgTable相关代码
    const pgTable = ref(null)
    const { pgTableQuery, pgTableReset } = usePgTableComponent(pgTable)

    // 查询条件
    const searchForm = ref(null)
    const tableParams = ref({
      // 模板修改标记
    })
    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      pgTableReset()
    }

    // API相关
    const { getSysDeptPermissionListTreeHandle } = useSysDeptRepository() // 模板修改标记
    const { getPageHandle } = usePensionEmployeeRepository()
    const highlightCurrent = ref(false)
    const deptTree = ref(null)
    const deptTreeComponent = useTreeItemComponent(deptTree)
    const defaultDeptProps = ref({
      children: 'children',
      label: 'label',
      id: 'id'
    })

    // 重置
    function resetHandle() {
      highlightCurrent.value = false
      pgTableResetHandle()
    }

    // tree node点击
    function nodeClickHandle(item: any) {
      const { data, node, component } = item
      tableParams.value.deptId = data.id
      highlightCurrent.value = true
      pgTableQuery(tableParams)
    }

    // 设为维修人员
    function setHandle(row: any) {
      const { id, name } = row
      currentId.value = id
      emit('set-handle', {
        id,
        name
      })
      emit('hide-dialog')
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
      // ?, // 模板修改标记 是否有初始化数据
      // API
      getPageHandle, // 模板修改标记 获取分页数据
      // exportHandle // 模板修改标记 导出方法
      resetHandle,
      // 左侧树
      highlightCurrent,
      deptTree,
      defaultDeptProps,
      getSysDeptPermissionListTreeHandle,
      nodeClickHandle,
      pageParams,
      currentId,
      setHandle
    }
  }
})
</script>
