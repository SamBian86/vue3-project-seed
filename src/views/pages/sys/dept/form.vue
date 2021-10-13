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
        <el-form-item :label="$t('SysDept.paddress')" prop="paddress">
          <CascaderItem
            ref="cascaderItem"
            :show-text="formData.paddress"
            :data-method="getSysAddressHandle"
            :lazy="true"
            :disabled="pageType === 'detail'"
            :placeholder="$t('SysDept.paddressPlaceHolder')"
            @cascader-change-handle="cascaderChangeHandle"
          ></CascaderItem>
          <!-- <el-cascader
            :class="'form-page-cascader'"
            v-model="formData.paddress"
            :options="sysDeptTree"
            :props="cascaderProps"
            :placeholder="$t('SysDept.parentIdPlaceHolder')"
          ></el-cascader> -->
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('SysDept.parentId')" prop="parentId">
          <el-cascader
            :class="'form-page-cascader'"
            v-model="formData.parentId"
            :options="sysDeptTree"
            :props="cascaderProps"
            :placeholder="$t('SysDept.parentIdPlaceHolder')"
          ></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysDept.name')" prop="name">
          <el-input v-model="formData.name" :placeholder="$t('SysDept.namePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysDept.groupType')" prop="groupType">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.groupType"
            :placeholder="$t('SysDept.groupTypePlaceHolder')"
            clearable
          >
            <el-option
              v-for="item in getDictByType('grouptype')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysDept.establishTime')" prop="establishTime">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.establishTime"
            type="date"
            :placeholder="$t('SysDept.establishTimePlaceHolder')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysDept.unitType')" prop="unitType">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.unitType"
            :placeholder="$t('SysDept.unitTypePlaceHolder')"
            clearable
          >
            <el-option
              v-for="item in getDictByType('unittype', 'number')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysDept.secretary')" prop="secretary">
          <el-input v-model="formData.secretary" :placeholder="$t('SysDept.secretaryPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysDept.deputySecretary')" prop="deputySecretary">
          <el-input
            v-model="formData.deputySecretary"
            :placeholder="$t('SysDept.deputySecretaryPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysDept.commissioner')" prop="commissioner">
          <el-input v-model="formData.commissioner" :placeholder="$t('SysDept.commissionerPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysDept.linkman')" prop="linkman">
          <el-input v-model="formData.linkman" :placeholder="$t('SysDept.linkmanPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysDept.linktelephone')" prop="linktelephone">
          <el-input v-model="formData.linktelephone" :placeholder="$t('SysDept.linktelephonePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysDept.address')" prop="address">
          <AMapAddress
            :show-text="formData.address"
            :lng="formData.lng"
            :lat="formData.lat"
            :style-text="'height: 300px'"
            :placeholder="$t('SysDept.addressPlaceHolder')"
            :page-type="pageType"
            :auto-complete-open="true"
            @address-change-handle="addressChangeHandle"
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysDept.introduction')" prop="introduction">
          <el-input
            type="textarea"
            :rows="10"
            v-model="formData.introduction"
            :placeholder="$t('SysDept.introductionPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysDept.assocCmm')" prop="assocCmm">
          <el-switch
            v-model="formData.assocCmm"
            :active-value="1"
            :inactive-value="0"
            :active-color="StyleEnum.FORM_SWITCH_ACTIVE_COLOR"
            :inactive-color="StyleEnum.FORM_SWITCH_INACTIVE_COLOR"
          ></el-switch>
        </el-form-item>
      </el-col>
      <el-col v-if="formData.assocCmm" :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysDept.storeInfoIdList')" prop="storeInfoIdList">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.storeInfoIdList"
            :placeholder="$t('SysDept.storeInfoIdListPlaceHolder')"
            multiple
            clearable
          >
            <el-option
              v-for="item in cardStoreList"
              :key="item.storeId"
              :label="item.storeName"
              :value="item.storeId"
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
import { AMapAddress } from '/@/components/AMapAddress'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useSysDeptRepository from './useSysDeptRepository' // 模板修改标记
import useCardStoreRepository from '/@/views/pages/card/store/useCardStoreRepository' // 模板修改标记
import useSysAddressRepository from '/@/views/pages/sys/address/useSysAddressRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'SysDeptForm', // 模板修改标记
  mixins: [formMixin],
  components: { CascaderItem, AMapAddress },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const {
      formData,
      createSysDeptHandle,
      updateSysDeptHandle,
      getSysDeptByIdHandle,
      formPageResetHandle,
      sysDeptTree,
      getSysDeptTreeHandle
    } = useSysDeptRepository() // 模板修改标记
    getSysDeptTreeHandle()

    const { cardStoreList, getCardStoreListHandle } = useCardStoreRepository()
    getCardStoreListHandle()

    const { getSysAddressHandle } = useSysAddressRepository()

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
          getSysDeptByIdHandle(params, hideSkeleton).then((response) => {
            const { provinceName, cityName, areaName, streetName } = response
            if (provinceName && cityName && areaName && streetName) {
              formData.value['paddress'] = `${provinceName} / ${cityName} / ${areaName} / ${streetName}`
            }
          }) // 模板修改标记
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {
      formData.value.assocCmm = 0
    }

    // 相关页面基础数据
    // 模板修改标记
    const cascaderProps = ref({
      label: 'label',
      value: 'id',
      checkStrictly: true,
      emitPath: false
    })

    // 校验
    const rules = {
      parentId: [{ required: true, message: t('SysDept.parentIdPlaceHolder'), trigger: 'change' }], // 模板修改标记
      name: [{ required: true, message: t('SysDept.namePlaceHolder'), trigger: 'blur' }],
      groupType: [{ required: true, message: t('SysDept.groupTypePlaceHolder'), trigger: 'change' }],
      storeInfoIdList: [{ required: true, message: t('SysDept.storeInfoIdListPlaceHolder'), trigger: 'change' }]
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
      }

      function getValue(key: any) {
        return store[key] ? store[key] : ''
      }
      // console.log(selected)
      // console.log(store)
    }

    // 地址变动事件
    function addressChangeHandle(data: { address: any; lng: any; lat: any }) {
      const { address, lng, lat } = data
      formData.value['address'] = address
      formData.value['lng'] = lng
      formData.value['lat'] = lat
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createSysDeptHandle : updateSysDeptHandle // 模板修改标记
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
      cardStoreList,
      cascaderProps,
      sysDeptTree,
      getSysAddressHandle,
      cascaderChangeHandle,
      addressChangeHandle
    }
  }
})
</script>
