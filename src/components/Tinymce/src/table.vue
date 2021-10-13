<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable
        :table-method="getPageHandle"
        :table-params="tableParams"
        ref="pgTable"
        :selection="true"
        @selection-change="handleSelectionChange"
      >
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-form-item prop="title">
                  <el-input
                    :size="StyleEnum.INPUT_SIZE"
                    v-model="tableParams.title"
                    :placeholder="$t('SysVod.titlePlaceHolder')"
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
              <el-button :size="StyleEnum.BUTTON_SIZE" @click="pgTableResetHandle">
                {{ $t('table.reset') }}
              </el-button>
            </el-col>
          </el-row>
        </template>
        <template v-slot:content>
          <el-table-column prop="title" :show-overflow-tooltip="true" :label="$t('SysVod.title')" width="300"></el-table-column>
          <el-table-column prop="url" :show-overflow-tooltip="true" :label="$t('SysVod.url')"></el-table-column>
          <el-table-column
            prop="uploadDate"
            :show-overflow-tooltip="true"
            :label="$t('SysVod.uploadDate')"
            width="160"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="100">
            <template #default="scope">
              <el-button type="text" :size="StyleEnum.BUTTON_SIZE" @click="getVideoHandle(scope.row, scope.row.videoId)">
                {{ scope.row.url ? $t('SysVod.getVideoSuccess') : $t('SysVod.getVideo') }}
              </el-button>
              <!-- <el-button
                type="text"
                v-if="filterPermission('SysVod:SysVod:update')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="updateHandle({ id: scope.row.id })"
              >
                {{ $t('table.update') }}
              </el-button>
              <el-button
                type="text"
                v-if="filterPermission('SysVod:SysVod:delete')"
                :size="StyleEnum.BUTTON_SIZE"
                @click="deleteHandle([scope.row.id])"
              >
                {{ $t('table.delete') }}
              </el-button> -->
            </template>
          </el-table-column>
        </template>
        <template v-slot:footer>
          <el-button type="primary" :size="StyleEnum.BUTTON_SIZE" @click="insertVideoHandle">
            {{ $t('table.submit') }}
          </el-button>
        </template>
      </PgTable>
    </el-col>
  </el-row>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, reactive, unref } from 'vue'
import { mapGetters } from 'vuex'
import { StyleEnum } from '/@/enums/styleEnum'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
// components
import { PgTable } from '/@/components/PgTable'
// hooks
import usePgTableComponent from '/@/hooks/component/pgTable'
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useSysVodRepository from '/@/views/pages/sys/vod/useSysVodRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 页面

export default defineComponent({
  name: 'SysVodTable', // 模板修改标记
  mixins: [tableMixin],
  components: { PgTable }, // 模板修改标记
  computed: {
    ...mapGetters('permission', ['filterPermission'])
  },
  setup(props, { emit }) {
    // 约定，在页面直接使用的方法都以Handle结尾，子组件中的方法不以Handle作为结尾
    const { t } = useI18n()
    const list = ref([])
    // pgTable相关代码
    const pgTable = ref(null)
    const { pgTableQuery, pgTableReset, clearSelection } = usePgTableComponent(pgTable)

    // 查询条件
    const searchForm = ref(null)
    const tableParams = reactive({
      // 模板修改标记
      title: ''
    })

    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      pgTableReset()
    }

    // API相关
    const { getPageHandle, getSysVodPlayInfoHandle } = useSysVodRepository() // 模板修改标记

    // formPage相关代码开始
    const formPage = ref(null)
    const { formPageType, formPageParams } = useFormPageComponent(formPage)

    // 查询框初始化数据相关代码
    // 模板修改标记 是否有初始化数据
    // formPage相关代码开始

    // 获取视频
    function getVideoHandle(row: any, videoId: any) {
      getSysVodPlayInfoHandle({ videoId }).then((response) => {
        const url = response.playInfoList[0].playURL
        const imgUrl = response.videoBase.coverURL
        row.url = url
        row.imgUrl = imgUrl
      })
    }

    // 多选
    function handleSelectionChange(items: any) {
      let check = true
      list.value = []
      items.map((item) => {
        if (item.url !== undefined) {
          list.value.push(item)
        } else {
          check = false
        }
      })
      if (!check) {
        clearSelection()
        ElMessage({
          type: 'error',
          message: t('SysVod.checkVideoMessage')
        })
      }
    }

    // 确定
    function insertVideoHandle() {
      if (list.value.length !== 0) {
        emit('insert-video-handle', unref(list))
        emit('hide-dialog')
      }
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
      // API
      getPageHandle, // 模板修改标记 获取分页数据
      getVideoHandle,
      handleSelectionChange,
      insertVideoHandle
    }
  }
})
</script>
