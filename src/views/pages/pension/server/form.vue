<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="StyleEnum.FORM_LABEL_WIDTH"
    :disabled="pageType === 'detail'"
  >
    <el-row :gutter="StyleEnum.ROW_GUTTER">
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionServer.photo')" prop="photo">
          <UploadFile
            ref="uploadFile"
            :type="'one'"
            :items="images"
            :style-text="'width: 200px'"
            :disabled="pageType === 'detail'"
            @success-callback="uploadSuccessHandle"
          ></UploadFile>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionServer.name')" prop="name">
          <el-input v-model="formData.name" :placeholder="$t('PensionServer.namePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionServer.description')" prop="description">
          <el-input v-model="formData.description" :placeholder="$t('PensionServer.descriptionPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionServer.serverCategoryId')" prop="serverCategoryId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.serverCategoryId"
            :placeholder="$t('PensionServer.serverCategoryIdPlaceHolder')"
            clearable
          >
            <el-option
              v-for="(item, idx) in pensionServercategoryListAll"
              :key="idx"
              :label="pensionServercategoryListAll[idx]"
              :value="idx"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionServer.scaleId')" prop="scaleId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.scaleId"
            :placeholder="$t('PensionServer.scaleIdPlaceHolder')"
            clearable
          >
            <el-option
              v-for="item in pensionServerscaleListAll"
              :key="item.id"
              :label="item.scaleUnit"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionServer.serverItemSkuList')" prop="serverItemSkuList">
          <!-- 规格设置 serverItemSkuList -->
          <el-card>
            <template #header>
              <div class="card-header">
                <el-button type="text" :size="StyleEnum.FORM_SIZE" @click="addServerItemSkuHandle">
                  {{ $t('PensionServer.addServerItemSkuList') }}
                </el-button>
              </div>
            </template>
            <div class="card-body">
              <el-table :data="serverItemSkuList" border>
                <el-table-column prop="attrSymbolName" :label="$t('PensionServer.attrSymbolName')">
                  <template #default="scope">
                    <el-input
                      v-model="scope.row.attrSymbolName"
                      :placeholder="$t('PensionServer.attrSymbolNamePlaceHolder')"
                      clearable
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="price" :label="$t('PensionServer.price')">
                  <template #default="scope">
                    <el-input v-model="scope.row.price" :placeholder="$t('PensionServer.pricePlaceHolder')" clearable></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('table.handle')" width="60">
                  <template #default="scope">
                    <el-button type="text" :size="StyleEnum.BUTTON_SIZE" @click="deleteServerItemSkuHandle(scope.$index)">
                      {{ $t('table.delete') }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionServer.type')" prop="type">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.type"
            :placeholder="$t('PensionServer.typePlaceHolder')"
            clearable
          >
            <el-option
              v-for="item in getDictByType('serverType', 'number')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionServer.businessId')" prop="businessId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.businessId"
            :placeholder="$t('PensionServer.businessIdPlaceHolder')"
            clearable
          >
            <el-option v-for="item in sysBusinessListAll" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionServer.detailInformation')" prop="detailInformation">
          <!-- 服务内容 detailInformation -->
          <Tinymce
            ref="tinymce"
            :data="formData.detailInformation"
            :height="'400'"
            :placeholder="$t('PensionServer.detailInformationPlaceHolder')"
            @content-change-handle="contentChangeHandle"
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionServer.discountLinkList')" prop="discountLinkList">
          <!-- 服务折扣 discountLinkList -->
          <el-card>
            <template #header>
              <div class="card-header">
                <el-button type="text" :size="StyleEnum.FORM_SIZE" @click="addDiscountLinkHandle">
                  {{ $t('PensionServer.addDiscountLink') }}
                </el-button>
              </div>
            </template>
            <div class="card-body">
              <el-table :data="discountLinkList" border>
                <el-table-column prop="tagId" :label="$t('PensionServer.tagId')">
                  <template #default="scope">
                    <el-select
                      class="el-select-block"
                      :size="StyleEnum.FORM_SIZE"
                      v-model="scope.row.tagId"
                      :placeholder="$t('PensionServer.tagIdPlaceHolder')"
                      clearable
                    >
                      <el-option v-for="item in sysTagListAll" :key="item.id" :label="item.tagName" :value="item.id"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="discountId" :label="$t('PensionServer.discountId')">
                  <template #default="scope">
                    <el-select
                      class="el-select-block"
                      :size="StyleEnum.FORM_SIZE"
                      v-model="scope.row.discountId"
                      :placeholder="$t('PensionServer.discountIdPlaceHolder')"
                      clearable
                    >
                      <el-option
                        v-for="item in pensionServerdiscountdetailListAll"
                        :key="item.id"
                        :label="item.scalePrice"
                        :value="item.id"
                      >
                        <span style="float: left">{{ item.scalePrice }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.description }}</span>
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('table.handle')" width="60">
                  <template #default="scope">
                    <el-button type="text" :size="StyleEnum.BUTTON_SIZE" @click="deleteDiscountHandle(scope.$index)">
                      {{ $t('table.delete') }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item v-if="pageType === 'create' || pageType === 'update'">
          <el-button type="primary" @click="submitHandle" :size="StyleEnum.BUTTON_SIZE">
            {{ $t('form.submit') }}
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, watch, unref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { StyleEnum } from '/@/enums/styleEnum'
import { mapGetters } from 'vuex'
// components
import { UploadFile } from '/@/components/UploadFile'
import { Tinymce } from '/@/components/Tinymce'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import usePensionServerRepository from './usePensionServerRepository' // 模板修改标记
import usePensionServercategoryRepository from '/@/views/pages/pension/servercategory/usePensionServercategoryRepository'
import usePensionServerscaleRepository from '/@/views/pages/pension/serverscale/usePensionServerscaleRepository'
import useSysBusinessRepository from '/@/views/pages/sys/business/useSysBusinessRepository'
import useSysTagRepository from '/@/views/pages/sys/tag/useSysTagRepository'
import usePensionServerdiscountdetailRepository from '/@/views/pages/pension/serverdiscountdetail/usePensionServerdiscountdetailRepository'
// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionServerForm', // 模板修改标记
  mixins: [formMixin],
  components: { UploadFile, Tinymce },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, createPensionServerHandle, updatePensionServerHandle, getPensionServerByIdHandle, formPageResetHandle } =
      usePensionServerRepository() // 模板修改标记
    const { pensionServercategoryListAll, getPensionServercategoryListAllHandle } = usePensionServercategoryRepository()
    getPensionServercategoryListAllHandle()
    const { pensionServerscaleListAll, getPensionServerscaleListAllHandle } = usePensionServerscaleRepository()
    getPensionServerscaleListAllHandle()
    const { sysBusinessListAll, getSysBusinessListAllHandle } = useSysBusinessRepository()
    getSysBusinessListAllHandle()
    const { sysTagListAll, getSysTagListAllHandle } = useSysTagRepository()
    getSysTagListAllHandle()
    const { pensionServerdiscountdetailListAll, getPensionServerdiscountdetailListAllHandle } =
      usePensionServerdiscountdetailRepository()
    getPensionServerdiscountdetailListAllHandle()

    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)
    const images = ref([])
    const discountLinkList = ref([])
    const serverItemSkuList = ref([])
    const detailInformation = ref('')

    // 延迟显示方法
    const hideSkeleton = () => {
      setTimeout(() => {
        emit('hide-skeleton')
      }, StyleEnum.FORM_SKELETON_TIME)
    }

    // 显示方法
    const showSkeleton = () => {
      emit('show-skeleton')
    }

    onMounted(() => {
      // 监听当前组件的pageType、pageParams改变时的处理，默认先显示skeleton
      watch([() => props.pageType, () => props.pageParams], ([type, params], [prevType, prevParams]) => {
        showSkeleton()

        // console.log('already')
        // 修改变成创建
        if (type === 'create') {
          formPageResetHandle(hideSkeleton)
          defaultConfigHandle()
        }
        if (type === 'update' || type === 'detail') {
          getPensionServerByIdHandle(params, hideSkeleton).then((response: any) => {
            const { photo } = response
            if (photo) {
              images.value = [{ url: photo }]
            } else {
              images.value = []
            }
            discountLinkList.value = response.discountLinkList
            serverItemSkuList.value = response.serverItemSkuList
            detailInformation.value = response.detailInformation
          }) // 模板修改标记 // 模板修改标记
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {
      formData.value.display = 1
    }

    // 相关页面基础数据
    // 模板修改标记

    // 校验
    const rules = {
      name: [{ required: true, message: t('PensionServer.namePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      serverCategoryId: [{ required: true, message: t('PensionServer.serverCategoryIdPlaceHolder'), trigger: 'change' }],
      description: [{ required: true, message: t('PensionServer.descriptionPlaceHolder'), trigger: 'blur' }],
      scaleId: [{ required: true, message: t('PensionServer.scaleIdPlaceHolder'), trigger: 'change' }],
      serverItemSkuList: [{ required: true, message: t('PensionServer.serverItemSkuListPlaceHolder'), trigger: 'change' }],
      type: [{ required: true, message: t('PensionServer.typePlaceHolder'), trigger: 'change' }],
      businessId: [{ required: true, message: t('PensionServer.businessIdPlaceHolder'), trigger: 'change' }],
      detailInformation: [{ required: true, message: t('PensionServer.detailInformationPlaceHolder'), trigger: 'blur' }]
    }

    // 上传成功回调
    function uploadSuccessHandle(items: any) {
      images.value = items
      // one
      if (items.length !== 0) {
        formData.value.photo = items[0]['url']
      } else {
        formData.value.photo = ''
      }
      // many
      // if (items.length !== 0) {
      //   formData.value.bbb = items
      // }
    }

    // 新增规格
    function addServerItemSkuHandle() {
      const item = {
        attrSymbolName: '',
        price: ''
      }
      serverItemSkuList.value.push(item)
    }

    // 删除规格
    function deleteServerItemSkuHandle(idx: any) {
      serverItemSkuList.value.splice(idx, 1)
    }

    // 新增折扣
    function addDiscountLinkHandle() {
      const item = {
        tagId: null,
        serverId: formData.value.serverId ? formData.value.serverId : '',
        discountId: '',
        discountDescription: '尚未选择'
      }
      discountLinkList.value.push(item)
    }

    // 删除折扣
    function deleteDiscountHandle(idx: any) {
      discountLinkList.value.splice(idx, 1)
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createPensionServerHandle : updatePensionServerHandle // 模板修改标记
      formData.value.serverItemSkuList = serverItemSkuList.value
      formData.value.discountLinkList = discountLinkList.value
      formData.value.detailInformation = detailInformation.value
      const cFormData = unref(formData)
      formPageSubmitHandle(
        cMethod,
        {
          ...cFormData
        },
        () => {
          emit('update-table')
          emit('hide-dialog')
          emit('show-skeleton')
        }
      )
    }

    // 修改 detailInformation
    function contentChangeHandle(value: any) {
      detailInformation.value = value
      formData.value.detailInformation = value
    }

    return {
      // 基础支持
      StyleEnum,
      // 表单数据
      formData,
      pageType,
      images,
      serverItemSkuList,
      discountLinkList,
      detailInformation,
      rules,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      uploadSuccessHandle,
      pensionServercategoryListAll,
      pensionServerscaleListAll,
      sysBusinessListAll,
      sysTagListAll,
      pensionServerdiscountdetailListAll,
      // 规格
      addServerItemSkuHandle,
      deleteServerItemSkuHandle,
      // 折扣
      addDiscountLinkHandle,
      deleteDiscountHandle,
      // 富文本
      contentChangeHandle
    }
  }
})
</script>
