<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="StyleEnum.FORM_LABEL_WIDTH"
    :disabled="pageType === 'detail'"
  >
    <el-row :gutter="StyleEnum.ROW_GUTTER" v-if="houseExchangeInfo.dataFrom === '1'">
      <el-divider content-position="left">{{ $t('HouseExchangeinfo.houseExchangeInfoTitle') }}</el-divider>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.exchangeType')" prop="exchangeType">
          {{ houseExchangeApply.exchangeTypeName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.communityCode')" prop="communityCode">
          {{ houseExchangeApply.communityName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.exchangeLinkman')" prop="exchangeLinkman">
          {{ houseExchangeApply.exchangeLinkman }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.exchangeLinkphone')" prop="exchangeLinkphone">
          {{ houseExchangeApply.exchangeLinkphone }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.proposerName')" prop="proposerName">
          {{ houseExchangeApply.proposerName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.proposerPhoneNumber')" prop="proposerPhoneNumber">
          {{ houseExchangeApply.proposerPhoneNumber }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HouseExchangeinfo.proposeDate')" prop="proposeDate">
          {{ houseExchangeApply.proposeDate }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HouseExchangeinfo.remark')" prop="remark">
          {{ houseExchangeApply.remark }}
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="StyleEnum.ROW_GUTTER" v-if="houseExchangeInfo.publishStatus !== '1'">
      <el-divider content-position="left">{{ $t('HouseExchangeinfo.houseExchangeInfoPublishTitle') }}</el-divider>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.publisherName')" prop="publisherName">
          {{ houseExchangeInfo.publisherName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.publisherPhoneNumber')" prop="publisherPhoneNumber">
          {{ houseExchangeInfo.publisherPhoneNumber }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.publishStatusName')" prop="publishStatusName">
          {{ houseExchangeInfo.publishStatusName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.publishDate')" prop="publishDate">
          {{ houseExchangeInfo.publishDate }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.exchangeTypeName')" prop="exchangeTypeName">
          {{ houseExchangeInfo.exchangeTypeName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.communityCode')" prop="communityCode">
          {{ houseExchangeInfo.communityName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.houseArea')" prop="houseArea">
          {{ houseExchangeInfo.houseArea }}m
          <sup>2</sup>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.decorationType')" prop="decorationType">
          {{ houseExchangeInfo.decorationTypeName }}
        </el-form-item>
      </el-col>
      <el-col
        :xs="StyleEnum.COL_XS"
        :sm="StyleEnum.COL_SM"
        :md="12"
        :lg="12"
        :xl="12"
        v-if="houseExchangeInfo.exchangeType === '1'"
      >
        <el-form-item :label="$t('HouseExchangeinfo.leaseTypeName')" prop="leaseTypeName">
          {{ houseExchangeInfo.leaseTypeName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12" v-else>
        <el-form-item :label="$t('HouseExchangeinfo.year')" prop="year">{{ houseExchangeInfo.year }}年</el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HouseExchangeinfo.exchangePrice')" prop="exchangePrice">
          {{ houseExchangeInfo.exchangePrice }}
          <span v-if="houseExchangeInfo.exchangeType === '1'">元/月</span>
          <span v-else>万元</span>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HouseExchangeinfo.houseTitle')" prop="houseTitle">
          {{ houseExchangeInfo.houseTitle }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HouseExchangeinfo.houseIntroduction')" prop="houseIntroduction">
          {{ houseExchangeInfo.houseIntroduction }}
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

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'HouseExchangeinfoDetail', // 模板修改标记
  mixins: [formMixin],
  components: { UploadFile },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const images = ref([])
    const pageType = ref(props.pageType)
    const { formData, createHouseExchangeinfoHandle, updateHouseExchangeinfoHandle, getHouseExchangeinfoByIdHandle } =
      useHouseExchangeinfoRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)
    const houseExchangeInfo = ref({})
    const houseExchangeApply = ref({})

    getHouseExchangeinfoByIdHandle({ id: props.pageParams.id }).then((response) => {
      houseExchangeInfo.value = response.houseExchangeInfo
      houseExchangeApply.value = response.houseExchangeApply
      const { photoList } = response.houseExchangeInfo
      if (photoList) {
        images.value = photoList
      } else {
        images.value = []
      }
    })

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {}

    // 相关页面基础数据
    // 模板修改标记

    // 校验
    const rules = {
      // bbb: [{ required: true, message: t('AAA.bbbPlaceHolder'), trigger: 'blur' }] // 模板修改标记
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
      houseExchangeInfo,
      houseExchangeApply,
      uploadSuccessHandle
    }
  }
})
</script>
