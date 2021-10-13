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
      <el-divider content-position="left">{{ $t('PensionEmployee.employeeCompanyInfo') }}</el-divider>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionEmployee.headPhoto')" prop="headPhoto">
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
        <el-form-item :label="$t('PensionEmployee.name')" prop="name">
          <el-input v-model="formData.name" :placeholder="$t('PensionEmployee.namePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.sex')" prop="sex">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.sex"
            :placeholder="$t('PensionEmployee.sexPlaceHolder')"
            clearable
          >
            <el-option
              v-for="item in getDictByType('sex')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.relationshipId')" prop="relationshipId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.relationshipId"
            :placeholder="$t('PensionEmployee.relationshipIdPlaceHolder')"
            clearable
          >
            <el-option
              v-for="item in getDictByType('employeerelationship')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.positionId')" prop="positionId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.positionId"
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
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.dutyId')" prop="dutyId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.dutyId"
            :placeholder="$t('PensionEmployee.dutyIdPlaceHolder')"
            clearable
          >
            <el-option
              v-for="item in getDictByType('employeeduty')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.deptId')" prop="deptId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.deptId"
            :placeholder="$t('PensionEmployee.deptIdPlaceHolder')"
            clearable
          >
            <el-option v-for="item in sysDeptList" :key="item.deptId" :label="item.name" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.status')" prop="status">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.status"
            :placeholder="$t('PensionEmployee.statusPlaceHolder')"
            clearable
          >
            <el-option v-for="item in statusSelectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.userPosition')" prop="userPosition">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.userPosition"
            :placeholder="$t('PensionEmployee.userPositionPlaceHolder')"
            clearable
          >
            <el-option
              v-for="item in userPositionSelectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.contractStartTime')" prop="contractStartTime">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.contractStartTime"
            type="date"
            :placeholder="$t('PensionEmployee.contractStartTimePlaceHolder')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.constractEndTime')" prop="constractEndTime">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.constractEndTime"
            type="date"
            :placeholder="$t('PensionEmployee.constractEndTimePlaceHolder')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-divider content-position="left">{{ $t('PensionEmployee.employeePersonalInfo') }}</el-divider>

      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.phoneNumber')" prop="phoneNumber">
          <el-input
            v-model="formData.phoneNumber"
            :placeholder="$t('PensionEmployee.phoneNumberPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.birthday')" prop="birthday">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.birthday"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            :placeholder="$t('PensionEmployee.birthdayPlaceHolder')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.nativePlace')" prop="nativePlace">
          <el-input
            v-model="formData.nativePlace"
            :placeholder="$t('PensionEmployee.nativePlacePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.nation')" prop="nation">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.nation"
            :placeholder="$t('PensionEmployee.nationPlaceHolder')"
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
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.education')" prop="education">
          <el-input v-model="formData.education" :placeholder="$t('PensionEmployee.educationPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.emergencyContactName')" prop="emergencyContactName">
          <el-input
            v-model="formData.emergencyContactName"
            :placeholder="$t('PensionEmployee.emergencyContactNamePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.emergencyContactPhoneNumber')" prop="emergencyContactPhoneNumber">
          <el-input
            v-model="formData.emergencyContactPhoneNumber"
            :placeholder="$t('PensionEmployee.emergencyContactPhoneNumberPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.address')" prop="address">
          <el-input v-model="formData.address" :placeholder="$t('PensionEmployee.addressPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.married')" prop="married">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.married"
            :placeholder="$t('PensionEmployee.marriedPlaceHolder')"
            clearable
          >
            <el-option v-for="item in marriedSelectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.censusRegister')" prop="censusRegister">
          <el-input
            v-model="formData.censusRegister"
            :placeholder="$t('PensionEmployee.censusRegisterPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionEmployee.idCard')" prop="idCard">
          <el-input v-model="formData.idCard" :placeholder="$t('PensionEmployee.idCardPlaceHolder')" clearable></el-input>
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
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import usePensionEmployeeRepository from './usePensionEmployeeRepository' // 模板修改标记
import useSysDeptRepository from '/@/views/pages/sys/dept/useSysDeptRepository' // 模板修改标记
// mixin
import formMixin from '/@/mixins/formMixin'
// validate
import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionEmployeeForm', // 模板修改标记
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
    const statusSelectOptions = ref([
      { label: '离职', value: 0 },
      { label: '在职', value: 1 }
    ])
    const userPositionSelectOptions = ref([
      { label: '员工', value: 0 },
      { label: '主管', value: 1 }
    ])
    const marriedSelectOptions = ref([
      { label: '否', value: 0 },
      { label: '是', value: 1 }
    ])
    const {
      formData,
      createPensionEmployeeHandle,
      updatePensionEmployeeHandle,
      getPensionEmployeeByIdHandle,
      formPageResetHandle
    } = usePensionEmployeeRepository() // 模板修改标记
    const { sysDeptList, getSysDeptListHandle } = useSysDeptRepository()
    getSysDeptListHandle()
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
    if (pageType.value === 'detail') {
      getPensionEmployeeByIdHandle(props.pageParams).then((response) => {
        const { headPhoto } = response
        if (headPhoto) {
          images.value = [{ url: headPhoto }]
        } else {
          images.value = []
        }
      }) // 模板修改标记
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
          getPensionEmployeeByIdHandle(params, hideSkeleton).then((response) => {
            const { headPhoto } = response
            if (headPhoto) {
              images.value = [{ url: headPhoto }]
            } else {
              images.value = []
            }
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
      name: [{ required: true, message: t('PensionEmployee.namePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      sex: [{ required: true, message: t('PensionEmployee.sexPlaceHolder'), trigger: 'blur' }],
      relationshipId: [{ required: true, message: t('PensionEmployee.relationshipIdPlaceHolder'), trigger: 'change' }],
      positionId: [{ required: true, message: t('PensionEmployee.positionIdPlaceHolder'), trigger: 'change' }],
      dutyId: [{ required: true, message: t('PensionEmployee.dutyIdPlaceHolder'), trigger: 'change' }],
      deptId: [{ required: true, message: t('PensionEmployee.deptIdPlaceHolder'), trigger: 'change' }],
      status: [{ required: true, message: t('PensionEmployee.statusPlaceHolder'), trigger: 'change' }],
      userPosition: [{ required: true, message: t('PensionEmployee.userPositionPlaceHolder'), trigger: 'change' }],
      phoneNumber: [
        {
          required: true,
          message: t('PensionEmployee.phoneNumberPlaceHolder'),
          trigger: 'blur',
          validator: (rule: any, value: any, callback: any) => {
            validatePhoneHandle(rule, value, callback, t)
          }
        }
      ]
    }

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
    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createPensionEmployeeHandle : updatePensionEmployeeHandle // 模板修改标记
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
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      images,
      uploadSuccessHandle,
      sysDeptList,
      statusSelectOptions,
      userPositionSelectOptions,
      marriedSelectOptions
    }
  }
})
</script>
