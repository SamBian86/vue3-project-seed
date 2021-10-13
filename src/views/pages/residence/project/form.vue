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
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('ResidenceProject.projectName')" prop="projectName">
          <el-input
            v-model="formData.projectName"
            :placeholder="$t('ResidenceProject.projectNamePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('ResidenceProject.projectStatus')" prop="projectStatus">
          <el-input
            v-model="formData.projectStatus"
            :placeholder="$t('ResidenceProject.projectStatusPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('ResidenceProject.projectSaleStatus')" prop="projectSaleStatus">
          <el-input
            v-model="formData.projectSaleStatus"
            :placeholder="$t('ResidenceProject.projectSaleStatusPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('ResidenceProject.houseApartment')" prop="houseApartment">
          <el-input
            v-model="formData.houseApartment"
            :placeholder="$t('ResidenceProject.houseApartmentPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('ResidenceProject.houseArea')" prop="houseArea">
          <el-input v-model="formData.houseArea" :placeholder="$t('ResidenceProject.houseAreaPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('ResidenceProject.salePrice')" prop="salePrice">
          <el-input v-model="formData.salePrice" :placeholder="$t('ResidenceProject.salePricePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('ResidenceProject.linkman')" prop="linkman">
          <el-input v-model="formData.linkman" :placeholder="$t('ResidenceProject.linkmanPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('ResidenceProject.linktelephone')" prop="linktelephone">
          <el-input
            v-model="formData.linktelephone"
            :placeholder="$t('ResidenceProject.linktelephonePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('ResidenceProject.businessLocation')" prop="businessLocation">
          <el-input
            v-model="formData.businessLocation"
            :placeholder="$t('ResidenceProject.businessLocationPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('ResidenceProject.businessLocation')" prop="businessLocation">
          <AMapAddress
            :show-text="formData.address"
            :lng="formData.lng"
            :lat="formData.lat"
            :style-text="'height: 300px'"
            :placeholder="$t('ResidenceProject.addressPlaceHolder')"
            :page-type="pageType"
            :auto-complete-open="true"
            @address-change-handle="addressChangeHandle"
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('ResidenceProject.introduction')" prop="introduction">
          <el-input
            type="textarea"
            :rows="5"
            v-model="formData.introduction"
            :placeholder="$t('ResidenceProject.introductionPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('ResidenceProject.projectDetail')" prop="projectDetail">
          <Tinymce
            ref="tinymce"
            :data="formData.projectDetail"
            :height="'400'"
            :placeholder="$t('ResidenceProject.projectDetailPlaceHolder')"
            @content-change-handle="contentChangeHandle"
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('ResidenceProject.houseProjectOsslinkEntityList')" prop="houseProjectOsslinkEntityList">
          <UploadFile
            ref="uploadFile"
            :type="'many'"
            :items="images"
            :style-text="'width: 300px'"
            :disabled="pageType === 'detail'"
            @success-callback="uploadSuccessHandle"
          ></UploadFile>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('ResidenceProject.houseApartmentinfoEntityList')" prop="houseApartmentinfoEntityList">
          <!-- 户型展示 houseApartmentinfoEntityList -->
          <el-card>
            <template #header>
              <div class="card-header">
                <el-button type="text" :size="StyleEnum.FORM_SIZE" @click="addHouseApartmentinfo">
                  {{ $t('ResidenceProject.addHouseApartmentinfoEntityList') }}
                </el-button>
              </div>
            </template>
            <div class="card-body">
              <el-table :data="houseApartmentinfoEntityList" border>
                <el-table-column prop="apartmentName" :label="$t('ResidenceProject.apartmentName')">
                  <template #default="scope">
                    {{ scope.row.apartmentName }}
                    <!-- <el-input
                      v-model="scope.row.apartmentName"
                      :placeholder="$t('ResidenceProject.apartmentNamePlaceHolder')"
                      clearable
                    ></el-input> -->
                  </template>
                </el-table-column>
                <el-table-column prop="projectApartmentDetail" :label="$t('ResidenceProject.projectApartmentDetail')">
                  <template #default="scope">
                    {{ scope.row.projectApartmentDetail }}
                    <!-- <el-input
                      v-model="scope.row.projectApartmentDetail"
                      :placeholder="$t('ResidenceProject.projectApartmentDetailPlaceHolder')"
                      clearable
                    ></el-input> -->
                  </template>
                </el-table-column>
                <el-table-column :label="$t('table.handle')" width="120">
                  <template #default="scope">
                    <el-button
                      type="text"
                      :size="StyleEnum.BUTTON_SIZE"
                      @click="updateHouseApartmentinfo(scope.row, scope.$index)"
                    >
                      {{ $t('table.update') }}
                    </el-button>
                    <el-button type="text" :size="StyleEnum.BUTTON_SIZE" @click="deleteHouseApartmentinfo(scope.$index)">
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
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <DialogPage ref="dialogPage">
          <template #body>
            <div class="component-skeleton-page">
              <ResidenceProjectHouse
                ref="formPage"
                :page-type="housePageType"
                :page-params="housePageParams"
                @hide-dialog="hideDialog"
                @update-form="houseApartmentinfoHandle"
              />
            </div>
          </template>
          <template #title>
            {{ $t('ResidenceProject.pageTitle') }}
          </template>
        </DialogPage>
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
import { AMapAddress } from '/@/components/AMapAddress'
import { Tinymce } from '/@/components/Tinymce'
import { UploadFile } from '/@/components/UploadFile'
import { DialogPage } from '/@/components/DialogPage'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
import useDialogPageComponent from '/@/hooks/component/dialogPage'
// API封装
import useResidenceProjectRepository from './useResidenceProjectRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
import ResidenceProjectHouse from './house.vue'

export default defineComponent({
  name: 'ResidenceProjectForm', // 模板修改标记
  mixins: [formMixin],
  components: { AMapAddress, Tinymce, UploadFile, DialogPage, ResidenceProjectHouse },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const images = ref([])
    const houseApartmentinfoEntityList = ref([])
    const projectDetail = ref('')
    const housePageType = ref('')
    const housePageParams = ref({})

    const {
      formData,
      createResidenceProjectHandle,
      updateResidenceProjectHandle,
      getResidenceProjectByIdHandle,
      formPageResetHandle
    } = useResidenceProjectRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)
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
          getResidenceProjectByIdHandle(params, hideSkeleton).then((response) => {
            const { houseProjectOsslinkEntityList } = response
            if (houseProjectOsslinkEntityList) {
              images.value = houseProjectOsslinkEntityList
            } else {
              images.value = []
            }
            projectDetail.value = response.projectDetail
            houseApartmentinfoEntityList.value = response.houseApartmentinfoEntityList
          }) // 模板修改标记
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {}

    // 相关页面基础数据
    // 模板修改标记

    // 校验
    const rules = {
      projectName: [{ required: true, message: t('ResidenceProject.projectNamePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      projectStatus: [{ required: true, message: t('ResidenceProject.projectStatusPlaceHolder'), trigger: 'blur' }],
      houseApartment: [{ required: true, message: t('ResidenceProject.houseApartmentPlaceHolder'), trigger: 'blur' }],
      houseArea: [{ required: true, message: t('ResidenceProject.houseAreaPlaceHolder'), trigger: 'blur' }],
      salePrice: [{ required: true, message: t('ResidenceProject.salePricePlaceHolder'), trigger: 'blur' }],
      linktelephone: [{ required: true, message: t('ResidenceProject.linktelephonePlaceHolder'), trigger: 'blur' }],
      businessLocation: [{ required: true, message: t('ResidenceProject.businessLocationPlaceHolder'), trigger: 'blur' }],
      address: [{ required: true, message: t('ResidenceProject.addressPlaceHolder'), trigger: 'blur' }],
      introduction: [{ required: true, message: t('ResidenceProject.introductionPlaceHolder'), trigger: 'blur' }],
      projectDetail: [{ required: true, message: t('ResidenceProject.projectDetailPlaceHolder'), trigger: 'blur' }],
      houseProjectOsslinkEntityList: [
        { required: true, message: t('ResidenceProject.houseProjectOsslinkEntityListPlaceHolder'), trigger: 'blur' }
      ]
      // bbb: [{ required: true, message: t('ResidenceProject.bbbPlaceHolder'), trigger: 'blur' }]
    }

    // 地址变动事件
    function addressChangeHandle(data: { address: any; lng: any; lat: any }) {
      const { address, lng, lat } = data
      formData.value['address'] = address
      formData.value['lng'] = lng
      formData.value['lat'] = lat
    }

    function contentChangeHandle(value: any) {
      projectDetail.value = value
      formData.value.projectDetail = value
    }

    // 上传成功回调
    function uploadSuccessHandle(items: any) {
      items.forEach((element: any) => {
        if (!element.ossId) {
          element.ossId = element.id
        }
        element.houseProjectId = formData.value.id ? formData.value.id : ''
      })

      images.value = items
      // one
      // if (items.length !== 0) {
      //   formData.value.bbb = items[0]['url']
      // } else {
      //   formData.value.bbb = ''
      // }
      // many
      if (items.length !== 0) {
        formData.value.houseProjectOsslinkEntityList = items
      }
    }

    // 删除户型
    function deleteHouseApartmentinfo(idx: any) {
      houseApartmentinfoEntityList.value.splice(idx, 1)
    }

    // dialogPage相关代码开始
    const dialogPage = ref(null)
    const { showDialog, hideDialog } = useDialogPageComponent(dialogPage)

    // 添加户型
    function addHouseApartmentinfo() {
      housePageType.value = 'create'
      housePageParams.value = {}
      housePageParams.value.houseProjectId = formData.value.id ? formData.value.id : ''
      showDialog()
    }

    // 更新户型
    function updateHouseApartmentinfo(row: any, index: any) {
      housePageType.value = 'update'
      row.idx = index
      housePageParams.value = row
      showDialog()
    }

    // 更新数据
    function houseApartmentinfoHandle(type: any, item: any) {
      if (type === 'create') {
        houseApartmentinfoEntityList.value.push(item)
      }
      if (type === 'update') {
        houseApartmentinfoEntityList.value.splice(item.idx, 1, item)
      }
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createResidenceProjectHandle : updateResidenceProjectHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(
        cMethod,
        {
          ...cFormData,
          houseApartmentinfoEntityList: unref(houseApartmentinfoEntityList)
        },
        () => {
          emit('update-table')
          emit('hide-dialog')
          emit('show-skeleton')
        }
      )
    }

    return {
      // 基础支持
      StyleEnum,
      // 表单数据
      formData,
      pageType,
      rules,
      images,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      projectDetail,
      addressChangeHandle,
      contentChangeHandle,
      uploadSuccessHandle,
      deleteHouseApartmentinfo,
      hideDialog,
      addHouseApartmentinfo,
      updateHouseApartmentinfo,
      houseApartmentinfoHandle,
      dialogPage,
      housePageType,
      housePageParams,
      houseApartmentinfoEntityList
    }
  }
})
</script>
