<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="120"
    :disabled="pageType === 'detail'"
  >
    <el-row :gutter="StyleEnum.ROW_GUTTER">
      <!-- <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.headPhoto')" prop="headPhoto">
          <UploadFile
            ref="uploadFile"
            :type="'one'"
            :items="images"
            :style-text="'width: 300px'"
            :disabled="pageType === 'detail'"
            @success-callback="uploadSuccessHandle"
          ></UploadFile>
        </el-form-item>
      </el-col> -->
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.communityCode')" prop="communityCode">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.communityCode"
            :placeholder="$t('PensionResident.communityCodePlaceHolder')"
            @change="communityChangeHandle"
            :disabled="pageType === 'update' || pageParams.disabled"
            filterable
            clearable
          >
            <el-option v-for="item in sysCommunityListAll" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.buildingId')" prop="buildingId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.buildingId"
            :placeholder="$t('PensionResident.buildingIdPlaceHolder')"
            @change="buildingChangeHandle"
            :disabled="pageType === 'update' || pageParams.disabled"
            filterable
            clearable
          >
            <el-option
              v-for="item in pensionBuildingListAll"
              :key="item.id"
              :label="item.buildingNumber"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.familyId')" prop="familyId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.familyId"
            :placeholder="$t('PensionResident.familyIdPlaceHolder')"
            :disabled="pageType === 'update' || pageParams.disabled"
            filterable
            clearable
          >
            <el-option v-for="item in pensionFamilyListAll" :key="item.id" :label="item.roomNumber" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.relationShip')" prop="relationShip">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.relationShip"
            :placeholder="$t('PensionResident.relationShipPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('residentrelationship', 'number')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.name')" prop="name">
          <el-input v-model="formData.name" :placeholder="$t('PensionResident.namePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.phoneNumber')" prop="phoneNumber">
          <el-input
            v-model="formData.phoneNumber"
            :placeholder="$t('PensionResident.phoneNumberPlaceHolder')"
            @blur="getResidentInfoHandle"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.sex')" prop="sex">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.sex"
            :placeholder="$t('PensionResident.sexPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('sex', 'number')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.married')" prop="married">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.bbb"
            :placeholder="$t('PensionResident.marriedPlaceHolder')"
            filterable
            clearable
          >
            <el-option v-for="item in marriedSelectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.nation')" prop="nation">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.nation"
            :placeholder="$t('PensionResident.nationPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('ethnic')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.nativePlace')" prop="nativePlace">
          <el-input
            v-model="formData.nativePlace"
            :placeholder="$t('PensionResident.nativePlacePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.birthday')" prop="birthday">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.birthday"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            type="date"
            :placeholder="$t('PensionResident.birthdayPlaceHolder')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.idCard')" prop="idCard">
          <el-input v-model="formData.idCard" :placeholder="$t('PensionResident.idCardPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.emergencyContactName')" prop="emergencyContactName">
          <el-input
            v-model="formData.emergencyContactName"
            :placeholder="$t('PensionResident.emergencyContactNamePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.emergencyContactPhoneNumber')" prop="emergencyContactPhoneNumber">
          <el-input
            v-model="formData.emergencyContactPhoneNumber"
            :placeholder="$t('PensionResident.emergencyContactPhoneNumberPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24"></el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24"></el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24"></el-col>

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

// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import usePensionResidentRepository from './usePensionResidentRepository' // 模板修改标记
import useSysCommunityRepository from '/@/views/pages/sys/community/useSysCommunityRepository' // 模板修改标记
import usePensionBuildingRepository from '/@/views/pages/pension/building/usePensionBuildingRepository' // 模板修改标记
import usePensionFamilyRepository from '/@/views/pages/pension/family/usePensionFamilyRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionResidentForm', // 模板修改标记
  mixins: [formMixin],
  components: { UploadFile },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const images = ref([])
    const pageType = ref(props.pageType)
    const pageParams = ref(props.pageParams)
    const {
      formData,
      createPensionResidentHandle,
      updatePensionResidentHandle,
      getPensionResidentByIdHandle,
      getPensionResidentInfoHandle,
      formPageResetHandle
    } = usePensionResidentRepository() // 模板修改标记
    const { sysCommunityListAll, getSysCommunityListAllHandle } = useSysCommunityRepository()
    getSysCommunityListAllHandle({ familyLocation: true })
    const { pensionBuildingListAll, getPensionBuildingListAllHandle } = usePensionBuildingRepository()
    const { pensionFamilyListAll, getPensionFamilyListAllHandle } = usePensionFamilyRepository()
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

    // 其他页面打开逻辑
    if (pageParams.value.disabled) {
      getPensionBuildingListAllHandle({ communityCode: pageParams.value.communityCode })
      getPensionFamilyListAllHandle({ buildingId: pageParams.value.buildingId })
      formData.value.communityCode = pageParams.value.communityCode
      formData.value.buildingId = pageParams.value.buildingId
      formData.value.familyId = pageParams.value.familyId
      if (pageType.value === 'update') {
        getPensionResidentByIdHandle(unref(pageParams)).then((response: any) => {
          const { headPhoto } = response
          if (headPhoto) {
            images.value = [{ url: headPhoto }]
          } else {
            images.value = []
          }
        }) // 模板修改标记
      }
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
          getPensionResidentByIdHandle(params, hideSkeleton).then((response: any) => {
            const { headPhoto, communityCode, buildingId } = response
            if (headPhoto) {
              images.value = [{ url: headPhoto }]
            } else {
              images.value = []
            }

            getPensionBuildingListAllHandle({ communityCode })
            getPensionFamilyListAllHandle({ buildingId })
          }) // 模板修改标记
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {}

    // 相关页面基础数据
    const marriedSelectOptions = ref([
      { label: t('PensionResident.married0'), value: 0 },
      { label: t('PensionResident.married1'), value: 1 }
    ])

    // 模板修改标记

    // 上传成功回调
    function uploadSuccessHandle(items: any) {
      images.value = items
      // one
      if (items.length !== 0) {
        formData.value.headPhoto = items[0]['url']
      } else {
        formData.value.headPhoto = ''
      }
      // many
      // if (items.length !== 0) {
      //   formData.value.bbb = items
      // }
    }
    // 校验
    const rules = {
      communityCode: [{ required: true, message: t('PensionResident.communityCodePlaceHolder'), trigger: 'change' }], // 模板修改标记
      buildingId: [{ required: true, message: t('PensionResident.buildingIdPlaceHolder'), trigger: 'change' }],
      familyId: [{ required: true, message: t('PensionResident.familyIdPlaceHolder'), trigger: 'change' }],
      relationShip: [{ required: true, message: t('PensionResident.relationShipPlaceHolder'), trigger: 'change' }],
      name: [{ required: true, message: t('PensionResident.namePlaceHolder'), trigger: 'blur' }],
      phoneNumber: [
        {
          message: t('PensionResident.phoneNumberPlaceHolder'),
          trigger: 'blur',
          validator: (rule: any, value: any, callback: any) => {
            validatePhoneHandle(rule, value, callback, t)
          }
        }
      ]
    }

    // 社区变动事件
    function communityChangeHandle(value: any) {
      formData.value.buildingId = ''
      formData.value.familyId = ''
      if (value) {
        getPensionBuildingListAllHandle({ communityCode: value })
      } else {
        pensionBuildingListAll.value = []
        pensionFamilyListAll.value = []
      }
    }

    // 楼栋变动事件
    function buildingChangeHandle(value: any) {
      formData.value.familyId = ''
      if (value) {
        getPensionFamilyListAllHandle({ buildingId: value })
      } else {
        pensionFamilyListAll.value = []
      }
    }

    // getResidentInfoHandle getPensionResidentInfoHandle
    function getResidentInfoHandle(ele: any) {
      const phoneNumber = ele.target.value
      if (phoneNumber) {
        getPensionResidentInfoHandle({ phoneNumber }).then((response) => {
          if (response) {
            formData.value.name = response.name
            formData.value.sex = response.sex
            formData.value.married = response.married
            formData.value.nation = response.nation
            formData.value.nativePlace = response.nativePlace
            formData.value.birthday = response.birthday
            formData.value.idCard = response.idCard
            formData.value.emergencyContactName = response.emergencyContactName
            formData.value.emergencyContactPhoneNumber = response.emergencyContactPhoneNumber
            formData.value.headPhoto = response.headPhoto
          }
        })
      }
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createPensionResidentHandle : updatePensionResidentHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, cFormData, () => {
        emit('update-table')
        emit('hide-dialog')
        emit('show-skeleton')
      })
    }

    return {
      // 基础支持
      StyleEnum,
      // 表单数据
      formData,
      pageType,
      pageParams,
      rules,
      images,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      marriedSelectOptions,
      submitHandle,
      uploadSuccessHandle,
      sysCommunityListAll,
      communityChangeHandle,
      buildingChangeHandle,
      pensionBuildingListAll,
      pensionFamilyListAll,
      getResidentInfoHandle
    }
  }
})
</script>
