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
                    :placeholder="$t('CustomerCrm.namePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="phone">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.phone"
                    :placeholder="$t('CustomerCrm.phonePlaceHolder')"
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
                v-if="filterPermission('customer:crm:view')"
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
            prop="name"
            :show-overflow-tooltip="true"
            :label="$t('CustomerCrm.name')"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="phone"
            :show-overflow-tooltip="true"
            :label="$t('CustomerCrm.phone')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="idCard"
            :show-overflow-tooltip="true"
            :label="$t('CustomerCrm.idCard')"
            min-width="200"
          ></el-table-column>
          <el-table-column prop="age" :show-overflow-tooltip="true" :label="$t('CustomerCrm.age')" width="80"></el-table-column>
          <el-table-column prop="sex" :show-overflow-tooltip="true" :label="$t('CustomerCrm.sex')" width="80"></el-table-column>
          <el-table-column
            prop="profession"
            :show-overflow-tooltip="true"
            :label="$t('CustomerCrm.profession')"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="workArea"
            :show-overflow-tooltip="true"
            :label="$t('CustomerCrm.workArea')"
            min-width="140"
          ></el-table-column>
          <el-table-column
            prop="workAddress"
            :show-overflow-tooltip="true"
            :label="$t('CustomerCrm.workAddress')"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="liveArea"
            :show-overflow-tooltip="true"
            :label="$t('CustomerCrm.liveArea')"
            min-width="140"
          ></el-table-column>
          <el-table-column
            prop="liveAddress"
            :show-overflow-tooltip="true"
            :label="$t('CustomerCrm.liveAddress')"
            min-width="120"
          ></el-table-column>

          <!-- <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="60">
            <template #default="scope"> -->
          <!-- <el-button
                type="text"
                v-if="filterPermission('customer:crm:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="updateHandle({ id: scope.row.id })"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('customer:crm:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle([scope.row.id])"
              >
                {{ $t('table.delete') }}
              </el-button> -->
          <!-- </template>
          </el-table-column> -->
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
import useCustomerCrmRepository from './useCustomerCrmRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 页面

export default defineComponent({
  name: 'CustomerCrm', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable }, // 模板修改标记
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
    const { getPageHandle } = useCustomerCrmRepository() // 模板修改标记

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
