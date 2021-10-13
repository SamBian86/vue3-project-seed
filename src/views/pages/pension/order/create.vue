<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="StyleEnum.FORM_LABEL_WIDTH"
    :disabled="pageType === 'detail'"
  >
    <el-row :gutter="StyleEnum.ROW_GUTTER" style="padding-top: 20px">
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOrder.categoryId')" prop="categoryId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.categoryId"
            :placeholder="$t('PensionOrder.categoryIdPlaceHolder')"
            @change="categoryChangeHandle"
            filterable
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
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOrder.serverId')" prop="serverId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.serverId"
            :placeholder="$t('PensionOrder.serverIdPlaceHolder')"
            @change="serverChangeHandle"
            filterable
            clearable
          >
            <el-option
              v-for="(item, idx) in pensionServerListAll"
              :key="idx"
              :label="pensionServerListAll[idx]"
              :value="idx"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOrder.skuId')" prop="skuId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.skuId"
            :placeholder="$t('PensionOrder.skuIdPlaceHolder')"
            clearable
          >
            <el-option
              v-for="(item, idx) in serverItemSkuList"
              :key="idx"
              :label="`${item.attrSymbolName} - ${item.price}`"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOrder.skuPrice')" prop="skuPrice">
          <el-input v-model="formData.skuPrice" :placeholder="$t('PensionOrder.skuPrice')" readonly clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOrder.orderServerTime')" prop="orderServerTime">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            :disabledDate="disabledDate"
            v-model="formData.orderServerTime"
            format="YYYY-MM-DD HH:mm"
            type="datetime"
            :placeholder="$t('PensionOrder.orderServerTimePlaceHolder')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOrder.userId')" prop="userId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.userId"
            :remote-method="getUserListHandle"
            remote
            reserve-keyword
            :loading="userListLoading"
            :placeholder="$t('PensionOrder.userPhonePlaceHolder')"
            @change="userChangeHandle"
            filterable
            clearable
          >
            <el-option v-for="item in sysFrontUserPhonelist" :key="item.userId" :label="item.mobile" :value="item.userId">
              <span style="float: left">{{ item.mobile }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
            </el-option>
          </el-select>
          <el-button type="text" :size="StyleEnum.FORM_SIZE" @click="handleAddUser">{{ $t('PensionOrder.add') }}</el-button>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOrder.userPhoneName')" prop="userPhoneName">
          <el-input v-model="formData.userPhoneName" clearable readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOrder.addressId')" prop="addressId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.addressId"
            :placeholder="$t('PensionOrder.addressIdPlaceHolder')"
            @change="addressChangeHandle"
            filterable
            clearable
          >
            <el-option
              v-for="item in agedLinkaddressDelivery"
              :disabled="!item.inRange"
              :key="item.familyId"
              :label="item.address"
              :value="item.addressId"
            >
              <div>{{ item.address }}</div>
              <div style="color: #8492a6; font-size: 13px">{{ item.name }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.mobile }}</div>
            </el-option>
          </el-select>
          <el-button type="text" :size="StyleEnum.FORM_SIZE" @click="handleAddAddress">{{ $t('PensionOrder.add') }}</el-button>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOrder.discount')" prop="discount">
          <el-input v-model="formData.discount" clearable readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOrder.orderUnitNum')" prop="orderUnitNum">
          <el-input v-model="formData.orderUnitNum" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOrder.isCash')" prop="isCash">
          <el-radio-group v-model="formData.isCash">
            <el-radio v-for="item in isCashItems" :label="item.label">
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOrder.totalPrice')" prop="totalPrice">
          <el-input
            :value="Math.floor(formData.orderUnitNum * formData.price * formData.discount * 100) / 100 || 0"
            readonly
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionOrder.orderRemark')" prop="orderRemark">
          <el-input
            type="textarea"
            :rows="10"
            v-model="formData.orderRemark"
            :placeholder="$t('PensionOrder.orderRemarkPlaceHolder')"
            clearable
          ></el-input>
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
  <DialogPage ref="addUserPage">
    <template #body>
      <AgedAgedinfoForm :page-type="'create'" />
    </template>
    <template #title>
      {{ $t('AgedAgedinfo.pageTitle') }}
    </template>
  </DialogPage>
  <DialogPage ref="addAddressPage">
    <template #body>
      <AgedLinkaddressForm :page-type="'create'" />
    </template>
    <template #title>
      {{ $t('AgedLinkaddress.pageTitle') }}
    </template>
  </DialogPage>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, watch, unref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { StyleEnum } from '/@/enums/styleEnum'
import { mapGetters } from 'vuex'
// components
import { DialogPage } from '/@/components/DialogPage'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
import useDialogPageComponent from '/@/hooks/component/dialogPage'
// API封装
import usePensionOrderRepository from './usePensionOrderRepository' // 模板修改标记
import usePensionServercategoryRepository from '/@/views/pages/pension/servercategory/usePensionServercategoryRepository' // 模板修改标记
import usePensionServerRepository from '/@/views/pages/pension/server/usePensionServerRepository'
import useSysFrontUserRepository from '/@/views/pages/sys/front/user/useSysFrontUserRepository'
import useAgedLinkaddressRepository from '/@/views/pages/aged/linkaddress/useAgedLinkaddressRepository'
// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
// 页面
import AgedAgedinfoForm from '../../aged/agedinfo/form.vue'
import AgedLinkaddressForm from '../../aged/linkaddress/form.vue'
export default defineComponent({
  name: 'PensionOrderCreate', // 模板修改标记
  mixins: [formMixin],
  components: { DialogPage, AgedAgedinfoForm, AgedLinkaddressForm },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, createPensionOrderHandle, updatePensionOrderHandle, getPensionOrderByIdHandle, formPageResetHandle } =
      usePensionOrderRepository() // 模板修改标记
    const { pensionServercategoryListAll, getPensionServercategoryListAllHandle } = usePensionServercategoryRepository()
    getPensionServercategoryListAllHandle()
    const { pensionServerListAll, getPensionServerListAllHandle, getPensionServerByIdHandle } = usePensionServerRepository()
    const { sysFrontUserPhonelist, getSysFrontUserPhonelistHandle } = useSysFrontUserRepository()
    const userListLoading = ref(false)
    const { agedLinkaddressDelivery, getAgedLinkaddressDeliveryHandle } = useAgedLinkaddressRepository()

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

    defaultConfigHandle()

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
          getPensionOrderByIdHandle(params, hideSkeleton) // 模板修改标记
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {
      formData.value.isCash = true
    }

    // 相关页面基础数据
    const disabledDate = (time: any) => {
      return time.getTime() <= Date.now() - 24 * 60 * 60 * 1000
    }

    const isCashItems = ref([
      { name: '是', label: true },
      { name: '否', label: false }
    ])
    // 模板修改标记

    // 校验
    const rules = {
      categoryId: [{ required: true, message: t('PensionOrder.categoryIdPlaceHolder'), trigger: 'change' }], // 模板修改标记
      serverId: [{ required: true, message: t('PensionOrder.serverIdPlaceHolder'), trigger: 'change' }],
      skuId: [{ required: true, message: t('PensionOrder.skuIdPlaceHolder'), trigger: 'change' }],
      orderServerTime: [{ required: true, message: t('PensionOrder.orderServerTimePlaceHolder'), trigger: 'change' }],
      userId: [{ required: true, message: t('PensionOrder.userIdPlaceHolder'), trigger: 'change' }],
      addressId: [{ required: true, message: t('PensionOrder.addressIdPlaceHolder'), trigger: 'change' }],
      orderUnitNum: [{ required: true, message: t('PensionOrder.orderUnitNumPlaceHolder'), trigger: 'blur' }]
      // categoryId: [{ required: true, message: t('PensionOrder.categoryIdPlaceHolder'), trigger: 'change' }],
    }

    const serverItemSkuList = ref([])

    // 切换服务类别
    function categoryChangeHandle(value: any) {
      pensionServerListAll.value = []
      formData.value.serverId = ''
      serverItemSkuList.value = []
      formData.value.skuId = ''
      if (value) {
        getPensionServerListAllHandle({ categoryId: value, type: 1 })
      }
    }

    // 切换服务
    function serverChangeHandle(value: any) {
      serverItemSkuList.value = []
      formData.value.skuId = ''
      formData.value.skuPrice = ''
      if (value) {
        getPensionServerByIdHandle({ id: value }).then((response) => {
          serverItemSkuList.value = response.serverItemSkuList
          if (response.serverItemSkuList.length !== 0) {
            formData.value.skuId = response.serverItemSkuList[0]['id']
            formData.value.skuPrice = response.serverItemSkuList[0]['price']
          }
        })
      }
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
      formData.value.addressId = ''
      formData.value.discount = ''
      formData.value.userPhoneName = ''
      agedLinkaddressDelivery.value = []
      if (value && sysFrontUserPhonelist.value.length !== 0) {
        const item = sysFrontUserPhonelist.value.find((item) => item.userId === value)
        if (item) {
          formData.value.userPhoneName = item.name
        }
      }
      if (value && formData.value.serverId) {
        getAgedLinkaddressDeliveryHandle({
          userId: value,
          serverId: formData.value.serverId
        })
      }
    }
    // 选择地址
    function addressChangeHandle(value: any) {
      formData.value.addressType = ''
      formData.value.discount = ''

      if (value && agedLinkaddressDelivery.value.length !== 0) {
        const item = agedLinkaddressDelivery.value.find((item) => item.addressId === value)
        if (item) {
          formData.value.addressType = item.type
          formData.value.discount = item.discount
        }
      }
    }

    const addUserPage = ref(null)
    const addAddressPage = ref(null)
    const addUserComponent = useDialogPageComponent(addUserPage)
    const addAddressComponent = useDialogPageComponent(addAddressPage)
    // 用户手机号添加 addUserPage addAddressPage
    function handleAddUser() {
      addUserComponent.showDialog()
    }

    // 服务地址添加
    function handleAddAddress() {
      addAddressComponent.showDialog()
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createPensionOrderHandle : updatePensionOrderHandle // 模板修改标记
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
      categoryChangeHandle,
      serverChangeHandle,
      handleAddUser,
      handleAddAddress,
      disabledDate,
      isCashItems,
      serverItemSkuList,
      pensionServercategoryListAll,
      pensionServerListAll,
      sysFrontUserPhonelist,
      getUserListHandle,
      userChangeHandle,
      addressChangeHandle,
      userListLoading,
      agedLinkaddressDelivery,
      addUserPage,
      addAddressPage
    }
  }
})
</script>
