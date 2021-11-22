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
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedAgedinfo.headPhoto')" prop="headPhoto">
          <UploadFile
            ref="uploadFile"
            :type="'one'"
            :items="images"
            :style-text="'width: 300px;'"
            :disabled="pageType === 'detail'"
            @success-callback="uploadSuccessHandle"
          ></UploadFile>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('AgedAgedinfo.name')" prop="name">
          <el-input v-model="formData.name" :placeholder="$t('AgedAgedinfo.namePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('AgedAgedinfo.phoneNumber')" prop="phoneNumber">
          <el-input v-model="formData.phoneNumber" :placeholder="$t('AgedAgedinfo.phoneNumberPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('AgedAgedinfo.sex')" prop="sex">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.sex"
            :placeholder="$t('AgedAgedinfo.sexPlaceHolder')"
            filterable
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
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('AgedAgedinfo.idCard')" prop="idCard">
          <el-input v-model="formData.idCard" :placeholder="$t('AgedAgedinfo.idCardPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedAgedinfo.paddress')" prop="paddress">
          <CascaderItem
            ref="cascaderItem"
            :show-text="formData.paddress"
            :data-method="getSysAddressHandle"
            :lazy="true"
            :disabled="pageType === 'detail'"
            :placeholder="$t('AgedAgedinfo.paddressPlaceHolder')"
            @cascader-change-handle="cascaderChangeHandle"
          ></CascaderItem>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('AgedAgedinfo.communityCode')" prop="communityCode">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.communityCode"
            :placeholder="$t('AgedAgedinfo.communityCodePlaceHolder')"
            @change="communityChangeHandle"
            filterable
            clearable
          >
            <el-option v-for="item in sysAddress" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('AgedAgedinfo.deptId')" prop="deptId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.deptId"
            :placeholder="$t('AgedAgedinfo.deptIdPlaceHolder')"
            filterable
            clearable
          >
            <el-option v-for="item in sysDeptList" :key="item.deptId" :label="item.name" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedAgedinfo.address')" prop="address">
          <el-input v-model="formData.address" :placeholder="$t('AgedAgedinfo.addressPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('AgedAgedinfo.age')" prop="age">
          <el-input v-model="formData.age" :placeholder="$t('AgedAgedinfo.agePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('AgedAgedinfo.birthday')" prop="birthday">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.birthday"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            type="date"
            :placeholder="$t('AgedAgedinfo.birthdayPlaceHolder')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('AgedAgedinfo.nativePlace')" prop="nativePlace">
          <el-input v-model="formData.nativePlace" :placeholder="$t('AgedAgedinfo.nativePlacePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('AgedAgedinfo.nation')" prop="nation">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.nation"
            :placeholder="$t('AgedAgedinfo.nationPlaceHolder')"
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
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('AgedAgedinfo.emergencyContactName')" prop="emergencyContactName">
          <el-input
            v-model="formData.emergencyContactName"
            :placeholder="$t('AgedAgedinfo.emergencyContactNamePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('AgedAgedinfo.emergencyContactPhoneNumber')" prop="emergencyContactPhoneNumber">
          <el-input
            v-model="formData.emergencyContactPhoneNumber"
            :placeholder="$t('AgedAgedinfo.emergencyContactPhoneNumberPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('AgedAgedinfo.married')" prop="married">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.married"
            :placeholder="$t('AgedAgedinfo.marriedPlaceHolder')"
            filterable
            clearable
          >
            <el-option v-for="item in marriedSelectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('AgedAgedinfo.spouse')" prop="spouse">
          <el-input v-model="formData.spouse" :placeholder="$t('AgedAgedinfo.spousePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('AgedAgedinfo.spousePhone')" prop="spousePhone">
          <el-input v-model="formData.spousePhone" :placeholder="$t('AgedAgedinfo.spousePhonePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('AgedAgedinfo.selectSituation')" prop="selectSituation">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.selectSituation"
            :placeholder="$t('AgedAgedinfo.selectSituationPlaceHolder')"
            multiple
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('situation')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('AgedAgedinfo.socialSecurity')" prop="socialSecurity">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.socialSecurity"
            :placeholder="$t('AgedAgedinfo.socialSecurityPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('socialsecurity', 'number')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
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
import { CascaderItem } from '/@/components/CascaderItem'
import { UploadFile } from '/@/components/UploadFile'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useAgedAgedinfoRepository from './useAgedAgedinfoRepository' // 模板修改标记
import useSysAddressRepository from '/@/views/pages/sys/address/useSysAddressRepository'
import useSysDeptRepository from '/@/views/pages/sys/dept/useSysDeptRepository'
// mixin
import formMixin from '/@/mixins/formMixin'
// validate
import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'AgedAgedinfoForm', // 模板修改标记
  mixins: [formMixin],
  components: { UploadFile, CascaderItem },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const images = ref([])
    const pageType = ref(props.pageType)
    const { formData, createAgedAgedinfoHandle, updateAgedAgedinfoHandle, getAgedAgedinfoByIdHandle, formPageResetHandle } =
      useAgedAgedinfoRepository() // 模板修改标记
    const { sysAddress, getSysAddressHandle } = useSysAddressRepository()
    const { sysDeptList, getSysDeptListHandle } = useSysDeptRepository()
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
          getAgedAgedinfoByIdHandle(params, hideSkeleton).then((response: any) => {
            const { headPhoto, provinceName, cityName, areaName, streetName, streetCode, communityCode } = response

            // 需要在获取数据那里处理paddress
            if (provinceName && cityName && areaName && streetName) {
              formData.value['paddress'] = `${provinceName} / ${cityName} / ${areaName} / ${streetName}`
            }
            if (headPhoto) {
              images.value = [{ url: headPhoto }]
            } else {
              images.value = []
            }
            getSysAddressHandle({ type: 5, code: streetCode })
            getSysDeptListHandle({ communityCode })
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
      { label: t('AgedAgedinfo.married0'), value: 0 },
      { label: t('AgedAgedinfo.married1'), value: 1 }
    ])
    // 模板修改标记

    // 校验
    const rules = {
      name: [{ required: true, message: t('AgedAgedinfo.namePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      phoneNumber: [
        {
          required: true,
          message: t('AgedAgedinfo.phoneNumberPlaceHolder'),
          trigger: 'blur',
          validator: (rule: any, value: any, callback: any) => {
            validatePhoneHandle(rule, value, callback, t)
          }
        }
      ],
      idCard: [{ required: true, message: t('AgedAgedinfo.idCardPlaceHolder'), trigger: 'blur' }],
      communityCode: [{ required: true, message: t('AgedAgedinfo.communityCodePlaceHolder'), trigger: 'blur' }],
      paddress: [{ required: true, message: t('AgedAgedinfo.paddressPlaceHolder'), trigger: 'blur' }],
      address: [{ required: true, message: t('AgedAgedinfo.addressPlaceHolder'), trigger: 'blur' }],
      deptId: [{ required: true, message: t('AgedAgedinfo.deptIdPlaceHolder'), trigger: 'blur' }]
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

    // 行政区块回调处理
    function cascaderChangeHandle(data: { selected: any[]; store: Object }) {
      const { selected, store } = data
      if (selected.length === 4) {
        formData.value['provinceCode'] = selected[0]
        formData.value['cityCode'] = selected[1]
        formData.value['areaCode'] = selected[2]
        formData.value['streetCode'] = selected[3]
        formData.value['paddress'] = `${getValue(selected[0])} / ${getValue(selected[1])} / ${getValue(selected[2])} / ${getValue(
          selected[3]
        )}`

        getSysAddressHandle({ type: 5, code: selected[3] }).then((response) => {
          formData.value.communityCode = ''
        })
      }

      function getValue(key: any) {
        return store[key] ? store[key] : ''
      }
    }

    // 切换社区
    function communityChangeHandle(value: any) {
      getSysDeptListHandle({ communityCode: value })
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createAgedAgedinfoHandle : updateAgedAgedinfoHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, cFormData, (response: any) => {
        emit('update-table')
        emit('hide-dialog', response)
        emit('show-skeleton')
      })
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
      uploadSuccessHandle,
      cascaderChangeHandle,
      getSysAddressHandle,
      sysAddress,
      communityChangeHandle,
      sysDeptList,
      marriedSelectOptions
    }
  }
})
</script>
