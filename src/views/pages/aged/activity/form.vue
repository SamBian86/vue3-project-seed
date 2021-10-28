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
        <el-form-item :label="$t('AgedActivity.photo')" prop="bbb">
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
        <el-form-item :label="$t('AgedActivity.title')" prop="title">
          <el-input v-model="formData.title" :placeholder="$t('AgedActivity.titlePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedActivity.cateId')" prop="cateId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.cateId"
            :placeholder="$t('AgedActivity.cateIdPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('activitytype')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedActivity.communityIds')" prop="communityIds">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.communityIds"
            :placeholder="$t('AgedActivity.communityIdsPlaceHolder')"
            multiple
            filterable
            clearable
          >
            <el-option v-for="item in sysCommunityListAll" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedActivity.date')" prop="date">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.date"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            type="datetimerange"
            :placeholder="$t('AgedActivity.datePlaceHolder')"
            @change="dateHandle"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedActivity.signEnd')" prop="signEnd">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.signEnd"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            type="datetime"
            :placeholder="$t('AgedActivity.signEndPlaceHolder')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedActivity.deptId')" prop="deptId">
          <el-cascader
            :class="'form-page-cascader'"
            v-model="formData.deptId"
            :options="sysDeptTree"
            :props="cascaderProps"
            :placeholder="$t('AgedActivity.deptIdPlaceHolder')"
            @change="deptChangeHandle"
          ></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedActivity.closed')" prop="closed">
          <el-radio-group v-model="formData.closed">
            <el-radio v-for="item in closedItems" :label="item.label">
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedActivity.isCarousel')" prop="isCarousel">
          <el-radio-group v-model="formData.isCarousel">
            <el-radio v-for="item in isCarouselItems" :label="item.label">
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedActivity.jionNum')" prop="jionNum">
          <el-input v-model="formData.jionNum" :placeholder="$t('AgedActivity.jionNumPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedActivity.price')" prop="price">
          <el-input v-model="formData.price" :placeholder="$t('AgedActivity.pricePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedActivity.manager')" prop="manager">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.manager"
            :placeholder="$t('AgedActivity.managerPlaceHolder')"
            @change="managerChangeHandle"
            filterable
            clearable
          >
            <el-option v-for="item in pensionEmployeeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedActivity.contactNumber')" prop="contactNumber">
          <el-input
            v-model="formData.contactNumber"
            :placeholder="$t('AgedActivity.contactNumberPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedActivity.addr')" prop="addr">
          <el-input v-model="formData.addr" :placeholder="$t('AgedActivity.addrPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedActivity.introduce')" prop="introduce">
          <el-input
            type="textarea"
            :rows="10"
            v-model="formData.introduce"
            :placeholder="$t('AgedActivity.introducePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('AgedActivity.details')" prop="details">
          <el-input
            type="textarea"
            :rows="10"
            v-model="formData.details"
            :placeholder="$t('AgedActivity.detailsPlaceHolder')"
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
import useAgedActivityRepository from './useAgedActivityRepository' // 模板修改标记
import useSysCommunityRepository from '/@/views/pages/sys/community/useSysCommunityRepository' // 模板修改标记
import useSysDeptRepository from '/@/views/pages/sys/dept/useSysDeptRepository' // 模板修改标记
import usePensionEmployeeRepository from '/@/views/pages/pension/employee/usePensionEmployeeRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'AgedActivityForm', // 模板修改标记
  mixins: [formMixin],
  components: { UploadFile },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const images = ref([])
    const pageType = ref(props.pageType)
    const { formData, createAgedActivityHandle, updateAgedActivityHandle, getAgedActivityByIdHandle, formPageResetHandle } =
      useAgedActivityRepository() // 模板修改标记
    const { sysCommunityListAll, getSysCommunityListAllHandle } = useSysCommunityRepository()
    getSysCommunityListAllHandle()
    const { sysDeptTree, getSysDeptTreeHandle } = useSysDeptRepository()
    getSysDeptTreeHandle()
    const { pensionEmployeeList, getPensionEmployeeListHandle } = usePensionEmployeeRepository()
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
          getAgedActivityByIdHandle(params, hideSkeleton).then((response: any) => {
            const { photo, bgDate, endDate, deptId } = response
            if (photo) {
              images.value = [{ url: photo }]
            } else {
              images.value = []
            }
            if (bgDate && endDate) {
              formData.value.date = [bgDate, endDate]
            }
            if (deptId) {
              getPensionEmployeeListHandle({ deptId })
            }
          }) // 模板修改标记
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {
      formData.value.closed = 0
      formData.value.isCarousel = 1
    }

    // 相关页面基础数据
    const cascaderProps = ref({
      label: 'label',
      value: 'id',
      checkStrictly: true,
      emitPath: false
    })

    const closedItems = ref([
      { name: t('AgedActivity.closed0'), label: 0 },
      { name: t('AgedActivity.closed1'), label: 1 }
    ])

    const isCarouselItems = ref([
      { name: t('AgedActivity.isCarousel1'), label: 1 },
      { name: t('AgedActivity.isCarousel2'), label: 2 }
    ])
    // 模板修改标记

    // 校验
    const rules = {
      title: [{ required: true, message: t('AgedActivity.titlePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      cateId: [{ required: true, message: t('AgedActivity.cateIdPlaceHolder'), trigger: 'change' }], // 模板修改标记
      communityIds: [{ required: true, message: t('AgedActivity.communityIdsPlaceHolder'), trigger: 'change' }], // 模板修改标记
      signEnd: [{ required: true, message: t('AgedActivity.signEndPlaceHolder'), trigger: 'change' }], // 模板修改标记
      date: [{ required: true, message: t('AgedActivity.datePlaceHolder'), trigger: 'change' }], // 模板修改标记
      deptId: [{ required: true, message: t('AgedActivity.deptIdPlaceHolder'), trigger: 'change' }], // 模板修改标记
      closed: [{ required: true, message: t('AgedActivity.closedPlaceHolder'), trigger: 'change' }], // 模板修改标记
      isCarousel: [{ required: true, message: t('AgedActivity.isCarouselPlaceHolder'), trigger: 'change' }], // 模板修改标记
      jionNum: [{ required: true, message: t('AgedActivity.jionNumPlaceHolder'), trigger: 'blur' }], // 模板修改标记
      price: [{ required: true, message: t('AgedActivity.pricePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      manager: [{ required: true, message: t('AgedActivity.managerPlaceHolder'), trigger: 'change' }], // 模板修改标记
      contactNumber: [{ required: true, message: t('AgedActivity.contactNumberPlaceHolder'), trigger: 'blur' }], // 模板修改标记
      addr: [{ required: true, message: t('AgedActivity.addrPlaceHolder'), trigger: 'blur' }], // 模板修改标记
      introduce: [{ required: true, message: t('AgedActivity.introducePlaceHolder'), trigger: 'blur' }] // 模板修改标记
    }

    // 上传成功回调
    function uploadSuccessHandle(items: any) {
      images.value = items
      // one
      if (items.length !== 0) {
        formData.value.bbb = items[0]['url']
      } else {
        formData.value.bbb = ''
      }
      // many
      // if (items.length !== 0) {
      //   formData.value.bbb = items
      // }
    }

    // 时间选择
    function dateHandle(value: any) {
      if (value) {
        formData.value.bgDate = value[0]
        formData.value.endDate = value[1]
      } else {
        formData.value.bgDate = ''
        formData.value.endDate = ''
      }
    }

    // 部门切换
    function deptChangeHandle(value: any) {
      if (value) {
        getPensionEmployeeListHandle({ deptId: value })
      } else {
        pensionEmployeeList.value = []
      }
    }

    // 选择主管
    function managerChangeHandle(value: any) {
      const item = pensionEmployeeList.value.find((item) => item.id === value)
      if (item) {
        formData.value.contactNumber = item.phoneNumber
      }
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createAgedActivityHandle : updateAgedActivityHandle // 模板修改标记
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
      uploadSuccessHandle,
      sysCommunityListAll,
      dateHandle,
      sysDeptTree,
      cascaderProps,
      closedItems,
      isCarouselItems,
      pensionEmployeeList,
      deptChangeHandle,
      managerChangeHandle
    }
  }
})
</script>
