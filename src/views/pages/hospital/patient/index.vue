<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable :table-method="getHospitalDossierPatientPageHandle" :table-params="tableParams" ref="pgTable">
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="nameOrCardNo">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.nameOrCardNo"
                    :placeholder="$t('HospitalPatient.nameOrCardNoPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="phoneNumber">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.phoneNumber"
                    :placeholder="$t('HospitalPatient.phoneNumberPlaceHolder')"
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
                v-if="filterPermission('hospital:dossier:view')"
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
            :label="$t('HospitalPatient.name')"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="phoneNumber"
            :show-overflow-tooltip="true"
            :label="$t('HospitalPatient.phoneNumber')"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="cardNo"
            :show-overflow-tooltip="true"
            :label="$t('HospitalPatient.cardNo')"
            min-width="200"
          ></el-table-column>
          <el-table-column
            prop="healthFlagName"
            :show-overflow-tooltip="true"
            :label="$t('HospitalPatient.healthFlagName')"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="hisFlagName"
            :show-overflow-tooltip="true"
            :label="$t('HospitalPatient.hisFlagName')"
            width="160"
          ></el-table-column>

          <!-- <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="60">
            <template #default="scope">
              <el-button
                type="text"
                v-if="filterPermission('hospital:dossier:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="updateHandle({ id: scope.row.id })"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('hospital:dossier:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle([scope.row.id])"
              >
                {{ $t('table.delete') }}
              </el-button>
            </template>
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
import useHospitalDossierRepository from '../dossier/useHospitalDossierRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 页面

export default defineComponent({
  name: 'HospitalDossier', // 模板修改标记
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
    const { getHospitalDossierPatientPageHandle } = useHospitalDossierRepository() // 模板修改标记

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
      getHospitalDossierPatientPageHandle // 模板修改标记 获取分页数据
    }
  }
})
</script>
