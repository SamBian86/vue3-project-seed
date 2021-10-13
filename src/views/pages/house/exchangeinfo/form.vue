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
        <el-form-item :label="$t('HouseExchangeinfo.exchangeType')" prop="exchangeType">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.exchangeType"
            :placeholder="$t('HouseExchangeinfo.exchangeTypePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('exchangeType')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.communityCode')" prop="communityCode">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.communityCode"
            :placeholder="$t('HouseExchangeinfo.communityCodePlaceHolder')"
            filterable
            clearable
          >
            <el-option v-for="item in sysCommunityListAll" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.houseArea')" prop="houseArea">
          <el-input v-model="formData.houseArea" :placeholder="$t('HouseExchangeinfo.houseAreaPlaceHolder')" clearable>
            <template #append>
              m
              <sup>2</sup>
            </template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.decorationType')" prop="decorationType">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.decorationType"
            :placeholder="$t('HouseExchangeinfo.decorationTypePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('decorationType')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col
        :xs="StyleEnum.COL_XS"
        :sm="StyleEnum.COL_SM"
        :md="12"
        :lg="12"
        :xl="12"
        v-if="formData.exchangeType === 1 || pageType === 'create'"
      >
        <el-form-item :label="$t('HouseExchangeinfo.leaseType')" prop="leaseType">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.leaseType"
            :placeholder="$t('HouseExchangeinfo.leaseTypePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('leaseType')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12" v-if="formData.exchangeType === 2">
        <el-form-item :label="$t('HouseExchangeinfo.year')" prop="year">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.year"
            format="YYYY"
            value-format="YYYY"
            type="year"
            :placeholder="$t('HouseExchangeinfo.yearPlaceHolder')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.exchangePrice')" prop="exchangePrice">
          <el-input v-model="formData.exchangePrice" :placeholder="$t('HouseExchangeinfo.exchangePricePlaceHolder')" clearable>
            <template #append>
              <span v-if="formData.exchangeType === '2'">万元</span>
              <span v-else>元/月</span>
            </template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HouseExchangeinfo.houseTitle')" prop="houseTitle">
          <el-input
            v-model="formData.houseTitle"
            :placeholder="$t('HouseExchangeinfo.houseTitlePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HouseExchangeinfo.houseIntroduction')" prop="houseIntroduction">
          <el-input
            type="textarea"
            :rows="5"
            v-model="formData.houseIntroduction"
            :placeholder="$t('HouseExchangeinfo.houseIntroductionPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HouseExchangeinfo.photoList')" prop="photoList">
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
import useHouseExchangeinfoRepository from './useHouseExchangeinfoRepository' // 模板修改标记
import useSysCommunityRepository from '/@/views/pages/sys/community/useSysCommunityRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'HouseExchangeinfoForm', // 模板修改标记
  mixins: [formMixin],
  components: { UploadFile },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const images = ref([])
    const pageType = ref(props.pageType)
    const {
      formData,
      createHouseExchangeinfoHandle,
      updateHouseExchangeinfoHandle,
      getHouseExchangeinfoByIdHandle,
      formPageResetHandle
    } = useHouseExchangeinfoRepository() // 模板修改标记
    const { sysCommunityListAll, getSysCommunityListAllHandle } = useSysCommunityRepository()
    getSysCommunityListAllHandle()
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
          getHouseExchangeinfoByIdHandle(params, hideSkeleton).then((response: any) => {
            const { photoList } = response.houseExchangeInfo
            if (photoList) {
              images.value = photoList
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
      exchangeType: [{ required: true, message: t('HouseExchangeinfo.exchangeTypePlaceHolder'), trigger: 'change' }], // 模板修改标记
      communityCode: [{ required: true, message: t('HouseExchangeinfo.communityCodePlaceHolder'), trigger: 'change' }],
      houseArea: [{ required: true, message: t('HouseExchangeinfo.houseAreaPlaceHolder'), trigger: 'blur' }],
      decorationType: [{ required: true, message: t('HouseExchangeinfo.decorationTypePlaceHolder'), trigger: 'change' }],
      leaseType: [{ required: true, message: t('HouseExchangeinfo.leaseTypePlaceHolder'), trigger: 'change' }],
      year: [{ required: true, message: t('HouseExchangeinfo.yearPlaceHolder'), trigger: 'blur' }],
      exchangePrice: [{ required: true, message: t('HouseExchangeinfo.exchangePricePlaceHolder'), trigger: 'blur' }],
      houseTitle: [{ required: true, message: t('HouseExchangeinfo.houseTitlePlaceHolder'), trigger: 'blur' }],
      houseIntroduction: [{ required: true, message: t('HouseExchangeinfo.houseIntroductionPlaceHolder'), trigger: 'blur' }],
      photoList: [{ required: true, message: t('HouseExchangeinfo.photoListPlaceHolder'), trigger: 'change' }]
    }

    // 上传成功回调
    function uploadSuccessHandle(items: any) {
      images.value = items
      // one
      // if (items.length !== 0) {
      //   formData.value.bbb = items[0]['url']
      // } else {
      //   formData.value.bbb = ''
      // }
      // many
      if (items.length !== 0) {
        formData.value.photoList = items
      }
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createHouseExchangeinfoHandle : updateHouseExchangeinfoHandle // 模板修改标记
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
      images,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      sysCommunityListAll,
      uploadSuccessHandle
    }
  }
})
</script>
