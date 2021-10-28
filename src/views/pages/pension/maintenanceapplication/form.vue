<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="160"
    :disabled="pageType === 'detail'"
  >
    <el-row :gutter="StyleEnum.ROW_GUTTER">
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.userName')" prop="userName">
          <el-input
            v-model="formData.userName"
            :placeholder="$t('PensionMaintenanceapplication.userNamePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.userPhoneNumber')" prop="userPhoneNumber">
          <el-input
            v-model="formData.userPhoneNumber"
            :placeholder="$t('PensionMaintenanceapplication.userPhoneNumberPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.applyTime')" prop="applyTime">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.applyTime"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            :disabledDate="disabledDate"
            type="datetime"
            :placeholder="$t('PensionMaintenanceapplication.applyTimePlaceHolder')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.communityId')" prop="communityId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.communityId"
            :placeholder="$t('PensionMaintenanceapplication.communityIdPlaceHolder')"
            filterable
            clearable
          >
            <el-option v-for="item in sysCommunityListAll" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.buildingNumber')" prop="buildingNumber">
          <el-input
            v-model="formData.buildingNumber"
            :placeholder="$t('PensionMaintenanceapplication.buildingNumberPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.roomNumber')" prop="roomNumber">
          <el-input
            v-model="formData.roomNumber"
            :placeholder="$t('PensionMaintenanceapplication.roomNumberPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.details')" prop="details">
          <el-input
            type="textarea"
            :rows="10"
            v-model="formData.details"
            :placeholder="$t('PensionMaintenanceapplication.detailsPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.fileList')" prop="fileList">
          <UploadFile
            ref="uploadFile"
            :type="'many'"
            :items="oss"
            :style-text="'width: 300px'"
            :disabled="pageType === 'detail'"
            :accept-file="'imageAndVideo'"
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
import usePensionMaintenanceapplicationRepository from './usePensionMaintenanceapplicationRepository' // 模板修改标记
import useSysCommunityRepository from '/@/views/pages/sys/community/useSysCommunityRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionMaintenanceapplicationForm', // 模板修改标记
  mixins: [formMixin],
  components: { UploadFile },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const oss = ref([])
    const pageType = ref(props.pageType)
    const {
      formData,
      createPensionMaintenanceapplicationHandle,
      getPensionMaintenanceapplicationByIdHandle,
      formPageResetHandle
    } = usePensionMaintenanceapplicationRepository() // 模板修改标记

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
          getPensionMaintenanceapplicationByIdHandle(params, hideSkeleton).then((response: any) => {
            const { fileList } = response
            if (fileList) {
              oss.value = fileList
            } else {
              oss.value = []
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
    const disabledDate = (time: any) => {
      return time.getTime() > Date.now()
    }
    // 模板修改标记

    // 校验
    const rules = {
      userName: [{ required: true, message: t('PensionMaintenanceapplication.userNamePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      userPhoneNumber: [
        {
          required: true,
          message: t('PensionMaintenanceapplication.userPhoneNumberPlaceHolder'),
          trigger: 'blur',
          validator: (rule: any, value: any, callback: any) => {
            validatePhoneHandle(rule, value, callback, t)
          }
        }
      ],

      applyTime: [{ required: true, message: t('PensionMaintenanceapplication.applyTimePlaceHolder'), trigger: 'change' }],
      communityId: [{ required: true, message: t('PensionMaintenanceapplication.communityIdPlaceHolder'), trigger: 'change' }],
      buildingNumber: [
        { required: true, message: t('PensionMaintenanceapplication.buildingNumberPlaceHolder'), trigger: 'blur' }
      ],
      roomNumber: [{ required: true, message: t('PensionMaintenanceapplication.roomNumberPlaceHolder'), trigger: 'blur' }],
      details: [{ required: true, message: t('PensionMaintenanceapplication.detailsPlaceHolder'), trigger: 'blur' }]
    }

    // 上传成功回调
    function uploadSuccessHandle(items: any) {
      oss.value = items
      // many
      if (items.length !== 0) {
        formData.value.fileList = items
      }
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = createPensionMaintenanceapplicationHandle // 模板修改标记
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
      oss,
      disabledDate,
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
