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
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('VolunteerActivity.title')" prop="title">
          <el-input v-model="formData.title" :placeholder="$t('VolunteerActivity.titlePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('VolunteerActivity.type')" prop="type">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.type"
            :placeholder="$t('VolunteerActivity.typePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('volunteerActivityType', 'number')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('VolunteerActivity.communityIds')" prop="communityIds">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.communityIds"
            :placeholder="$t('VolunteerActivity.communityIdsPlaceHolder')"
            multiple
            filterable
            clearable
          >
            <el-option v-for="item in sysCommunityListAll" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('VolunteerActivity.address')" prop="address">
          <el-input v-model="formData.address" :placeholder="$t('VolunteerActivity.addressPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('VolunteerActivity.date')" prop="date">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.date"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            type="datetimerange"
            :placeholder="$t('VolunteerActivity.datePlaceHolder')"
            @change="dateHandle"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('VolunteerActivity.signEndDate')" prop="signEndDate">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.signEndDate"
            format="YYYY-MM-DD HH:mm"
            value-format="YYYY-MM-DD HH:mm"
            :disabledDate="disabledDate"
            type="datetime"
            :placeholder="$t('VolunteerActivity.signEndDatePlaceHolder')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('VolunteerActivity.signNum')" prop="signNum">
          <el-input v-model="formData.signNum" :placeholder="$t('VolunteerActivity.signNumPlaceHolder')" clearable>
            <template #append>人</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('VolunteerActivity.managerId')" prop="managerId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.managerId"
            :placeholder="$t('VolunteerActivity.managerIdPlaceHolder')"
            filterable
            clearable
          >
            <el-option v-for="item in volunteerInfoListAll" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('VolunteerActivity.details')" prop="details">
          <el-input
            type="textarea"
            :rows="5"
            v-model="formData.details"
            :placeholder="$t('VolunteerActivity.detailsPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('VolunteerActivity.photo')" prop="photo">
          <UploadFile
            ref="uploadFile"
            :type="'one'"
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
import useVolunteerActivityRepository from './useVolunteerActivityRepository' // 模板修改标记
import useSysCommunityRepository from '/@/views/pages/sys/community/useSysCommunityRepository' // 模板修改标记
import useVolunteerInfoRepository from '/@/views/pages/volunteer/info/useVolunteerInfoRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'VolunteerActivityForm', // 模板修改标记
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
      createVolunteerActivityHandle,
      updateVolunteerActivityHandle,
      getVolunteerActivityByIdHandle,
      formPageResetHandle
    } = useVolunteerActivityRepository() // 模板修改标记
    const { sysCommunityListAll, getSysCommunityListAllHandle } = useSysCommunityRepository()
    getSysCommunityListAllHandle()
    const { volunteerInfoListAll, getVolunteerInfoListAllHandle } = useVolunteerInfoRepository()
    getVolunteerInfoListAllHandle({ type: 2 })
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
          getVolunteerActivityByIdHandle(params, hideSkeleton).then((response: any) => {
            const { startDate, endDate, photo } = response
            if (photo) {
              images.value = [{ url: photo }]
            } else {
              images.value = []
            }
            if (startDate && endDate) {
              formData.value.date = [startDate, endDate]
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
      title: [{ required: true, message: t('VolunteerActivity.titlePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      type: [{ required: true, message: t('VolunteerActivity.typePlaceHolder'), trigger: 'change' }],
      communityIds: [{ required: true, message: t('VolunteerActivity.communityIdsPlaceHolder'), trigger: 'change' }],
      address: [{ required: true, message: t('VolunteerActivity.addressPlaceHolder'), trigger: 'blur' }],
      date: [{ required: true, message: t('VolunteerActivity.datePlaceHolder'), trigger: 'change' }],
      signEndDate: [{ required: true, message: t('VolunteerActivity.signEndDatePlaceHolder'), trigger: 'change' }],
      signNum: [{ required: true, message: t('VolunteerActivity.signNumPlaceHolder'), trigger: 'blur' }],
      managerId: [{ required: true, message: t('VolunteerActivity.managerIdPlaceHolder'), trigger: 'change' }],
      details: [{ required: true, message: t('VolunteerActivity.detailsPlaceHolder'), trigger: 'blur' }],
      photo: [{ required: true, message: t('VolunteerActivity.photoPlaceHolder'), trigger: 'change' }]
    }

    // 时间选择
    function dateHandle(value: any) {
      if (value) {
        formData.value.startDate = value[0]
        formData.value.endDate = value[1]
      } else {
        formData.value.startDate = ''
        formData.value.endDate = ''
      }
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

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createVolunteerActivityHandle : updateVolunteerActivityHandle // 模板修改标记
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
      dateHandle,
      sysCommunityListAll,
      volunteerInfoListAll,
      uploadSuccessHandle
    }
  }
})
</script>
