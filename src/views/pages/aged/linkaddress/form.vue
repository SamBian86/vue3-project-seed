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
        <el-form-item :label="$t('AgedLinkaddress.userId')" prop="userId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.userId"
            :remote-method="getUserListHandle"
            remote
            reserve-keyword
            :loading="userListLoading"
            :placeholder="$t('AgedLinkaddress.userPhonePlaceHolder')"
            @change="userChangeHandle"
            filterable
            clearable
          >
            <el-option v-for="item in sysFrontUserPhonelist" :key="item.userId" :label="item.mobile" :value="item.userId">
              <span style="float: left">{{ item.mobile }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedLinkaddress.name')" prop="name">
          <el-input v-model="formData.name" :placeholder="$t('AgedLinkaddress.namePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedLinkaddress.mobile')" prop="mobile">
          <el-input v-model="formData.mobile" :placeholder="$t('AgedLinkaddress.mobilePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedLinkaddress.paddress')" prop="paddress">
          <CascaderItem
            ref="cascaderItem"
            :show-text="formData.paddress"
            :data-method="getSysAddressHandle"
            :lazy="true"
            :disabled="pageType === 'detail'"
            :placeholder="$t('AgedLinkaddress.paddressPlaceHolder')"
            @cascader-change-handle="cascaderChangeHandle"
          ></CascaderItem>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedLinkaddress.communityCode')" prop="communityCode">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.communityCode"
            :placeholder="$t('AgedLinkaddress.communityCodePlaceHolder')"
            filterable
            clearable
          >
            <el-option v-for="item in sysAddress" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedLinkaddress.address')" prop="address">
          <el-input v-model="formData.address" :placeholder="$t('AgedLinkaddress.addressPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedLinkaddress.defaultAddress')" prop="defaultAddress">
          <el-switch
            v-model="formData.defaultAddress"
            :active-color="StyleEnum.FORM_SWITCH_ACTIVE_COLOR"
            :inactive-color="StyleEnum.FORM_SWITCH_INACTIVE_COLOR"
          ></el-switch>
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
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useAgedLinkaddressRepository from './useAgedLinkaddressRepository' // 模板修改标记
import useSysFrontUserRepository from '/@/views/pages/sys/front/user/useSysFrontUserRepository'
import useSysAddressRepository from '/@/views/pages/sys/address/useSysAddressRepository'
// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'AgedLinkaddressForm', // 模板修改标记
  mixins: [formMixin],
  components: { CascaderItem },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const {
      formData,
      createAgedLinkaddressHandle,
      updateAgedLinkaddressHandle,
      getAgedLinkaddressByIdHandle,
      formPageResetHandle
    } = useAgedLinkaddressRepository() // 模板修改标记
    const { sysFrontUserPhonelist, getSysFrontUserPhonelistHandle, getSysFrontUserByIdHandle } = useSysFrontUserRepository()
    const { sysAddress, getSysAddressHandle } = useSysAddressRepository()
    const ruleForm = ref(null)
    const userListLoading = ref(false)
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
          getAgedLinkaddressByIdHandle(params, hideSkeleton).then((response) => {
            // 需要在获取数据那里处理paddress
            const { provinceName, cityName, areaName, streetName, userId, streetCode } = response
            if (provinceName && cityName && areaName && streetName) {
              formData.value['paddress'] = `${provinceName} / ${cityName} / ${areaName} / ${streetName}`
            }
            if (streetCode) {
              getSysAddressHandle({ type: 5, code: streetCode })
            }
            if (userId) {
              getSysFrontUserByIdHandle({ id: userId }).then((response) => {
                response.userId = response.id
                response.name = response.username
                sysFrontUserPhonelist.value.push(response)
              })
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
      userId: [{ required: true, message: t('AgedLinkaddress.userPhonePlaceHolder'), trigger: 'change' }], // 模板修改标记
      name: [{ required: true, message: t('AgedLinkaddress.namePlaceHolder'), trigger: 'blur' }],
      paddress: [{ required: true, message: t('AgedLinkaddress.paddressPlaceHolder'), trigger: 'change' }],
      communityCode: [{ required: true, message: t('AgedLinkaddress.communityCodePlaceHolder'), trigger: 'change' }],
      address: [{ required: true, message: t('AgedLinkaddress.addressPlaceHolder'), trigger: 'blur' }],
      mobile: [{ required: true, message: t('AgedLinkaddress.mobilePlaceHolder'), trigger: 'blur' }]
    }

    // 远程获取用户手机号
    function getUserListHandle(phoneNumber: any) {
      userListLoading.value = true
      getSysFrontUserPhonelistHandle({ phoneNumber: phoneNumber })
        .then((response) => {
          userListLoading.value = false
        })
        .catch(() => {
          userListLoading.value = false
        })
    }
    // 选中用户
    function userChangeHandle(value: any) {
      if (value && sysFrontUserPhonelist.value.length !== 0) {
        const item = sysFrontUserPhonelist.value.find((item) => item.userId === value)
        if (item) {
          formData.value.name = item.name
        }
      } else {
        formData.value.name = ''
      }
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

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createAgedLinkaddressHandle : updateAgedLinkaddressHandle // 模板修改标记
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
      rules,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      getUserListHandle,
      sysAddress,
      getSysAddressHandle,
      sysFrontUserPhonelist,
      userChangeHandle,
      cascaderChangeHandle
    }
  }
})
</script>
