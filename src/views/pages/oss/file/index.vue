<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <PgTable
        :table-method="getPageHandle"
        :table-params="tableParams"
        ref="pgTable"
        :selection="true"
        @selection-change="handleSelectionChangeHandle"
      >
        <template v-slot:search>
          <el-form ref="searchForm" :model="tableParams" label-position="left" @keydown.enter.native="pgTableQuery(tableParams)">
            <el-row :gutter="StyleEnum.ROW_GUTTER"></el-row>
          </el-form>
        </template>
        <template v-slot:button>
          <el-row :gutter="StyleEnum.ROW_GUTTER">
            <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
              <el-button type="primary" :size="StyleEnum.BUTTON_SIZE" @click="configHandle">
                {{ $t('OssFile.config') }}
              </el-button>
              <el-button type="danger" :size="StyleEnum.BUTTON_SIZE" @click="batchDeleteHandle(pgTableSelections)">
                {{ $t('table.delete') }}
              </el-button>
              <UploadFileButton ref="uploadFileButton" @success-callback="uploadSuccessHandle">
                <el-button type="primary" :size="StyleEnum.BUTTON_SIZE">{{ $t('OssFile.upload') }}</el-button>
              </UploadFileButton>
              <!-- <el-button
                type="primary"
                :size="StyleEnum.BUTTON_SIZE"
                @click="pgTableQuery(tableParams)"
              >
                {{ $t('table.search') }}
              </el-button>
              <el-button :size="StyleEnum.BUTTON_SIZE" @click="pgTableResetHandle">
                {{ $t('table.reset') }}
              </el-button> -->
            </el-col>
          </el-row>
        </template>
        <template v-slot:content>
          <el-table-column prop="url" :show-overflow-tooltip="true" :label="$t('OssFile.url')">
            <template #default="scope">
              <PopoverImage :url="scope.row.url">
                {{ scope.row.url }}
              </PopoverImage>
            </template>
          </el-table-column>
          <el-table-column prop="fileType" :show-overflow-tooltip="true" :label="$t('OssFile.fileType')" width="80">
            <template #default="scope">
              <el-tag v-if="scope.row.fileType === 1" :size="StyleEnum.TAG_SIZE" type="primary">
                {{ $t('OssFile.fileType1') }}
              </el-tag>
              <el-tag v-if="scope.row.fileType === 2" :size="StyleEnum.TAG_SIZE" type="success">
                {{ $t('OssFile.fileType2') }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="createDate"
            :show-overflow-tooltip="true"
            :label="$t('OssFile.createDate')"
            width="160"
          ></el-table-column>

          <el-table-column :show-overflow-tooltip="true" :label="$t('table.handle')" width="60">
            <template #default="scope">
              <el-button type="text" :size="StyleEnum.BUTTON_SIZE">
                <span v-clipboard :data-clipboard-text="scope.row.url">{{ $t('table.copy') }}</span>
              </el-button>
            </template>
          </el-table-column>
        </template>
      </PgTable>
    </el-col>
  </el-row>
  <DrawerPage ref="drawerPage" @before-close="handleClose" :with-header="true" :title="$t('OssFile.config')">
    <template v-slot:content>
      <OssFileConfig @before-close="handleClose" />
    </template>
  </DrawerPage>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, reactive } from 'vue'
import { mapGetters } from 'vuex'
import { StyleEnum } from '/@/enums/styleEnum'
// components
import { PgTable } from '/@/components/PgTable'
import { UploadFileButton } from '/@/components/UploadFileButton'
import { PopoverImage } from '/@/components/PopoverImage'
import { DrawerPage } from '/@/components/DrawerPage'
// directive
import { Clipboard } from '/@/directive/Clipboard'
// hooks
import usePgTableComponent from '/@/hooks/component/pgTable'
import useDrawerPageComponent from '/@/hooks/component/drawerPage'
// API封装
import useOssFileRepository from './useOssFileRepository' // 模板修改标记
// mixin
import tableMixin from '/@/mixins/tableMixin'
// 页面
import OssFileConfig from './config.vue'
export default defineComponent({
  name: 'OssFile', // 模板修改标记
  mixins: [tableMixin],
  directives: {
    Clipboard
  },
  components: { PgTable, UploadFileButton, PopoverImage, DrawerPage, OssFileConfig }, // 模板修改标记
  computed: {
    ...mapGetters('permission', ['filterPermission'])
  },
  setup(props) {
    // 约定，在页面直接使用的方法都以Handle结尾，子组件中的方法不以Handle作为结尾

    // pgTable相关代码
    const pgTable = ref(null)
    const { pgTableSelections, pgTableQuery, pgTableReset, handleSelectionChange, clearSelection } = usePgTableComponent(pgTable)

    // 查询条件
    const searchForm = ref(null)
    const tableParams = reactive({
      // 模板修改标记
    })

    // 重置方法
    function pgTableResetHandle() {
      searchForm.value.resetFields()
      clearSelection()
      pgTableReset()
    }

    // API相关
    const { getPageHandle, deleteOssFileByIdsHandle } = useOssFileRepository() // 模板修改标记

    // 过滤数据
    function handleSelectionChangeHandle(items: any[]) {
      handleSelectionChange(items, 'id')
    }

    // 批量删除
    function batchDeleteHandle(params: any) {
      deleteOssFileByIdsHandle(params, () => {
        // 模板修改标记
        clearSelection()
        pgTableQuery(tableParams)
      })
    }

    // 上传成功回调
    function uploadSuccessHandle() {
      clearSelection()
      pgTableReset()
    }

    // 查询框初始化数据相关代码
    // 模板修改标记 是否有初始化数据

    //drawerPage相关代码开始
    const drawerPage = ref(null)
    const { showDrawer, hideDrawer } = useDrawerPageComponent(drawerPage)

    // 关闭回调
    function handleClose() {
      hideDrawer()
      clearSelection()
    }

    // 云存储配置
    function configHandle() {
      showDrawer()
      clearSelection()
    }

    return {
      // 基础支持
      StyleEnum,
      // pgTable组件相关
      pgTable,
      pgTableSelections,
      pgTableQuery,
      handleSelectionChangeHandle,
      // 查询form区域
      searchForm,
      tableParams,
      pgTableResetHandle,
      // drawerPage相关代码开始
      drawerPage,
      handleClose,
      // 查询相关基础数据及方法
      // API
      getPageHandle, // 模板修改标记 获取分页数据
      batchDeleteHandle,
      configHandle,
      uploadSuccessHandle
    }
  }
})
</script>
