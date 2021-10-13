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
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane :label="$t('SysDataplatform.one')" name="one">
            <el-row :gutter="StyleEnum.ROW_GUTTER" v-for="(item, index) in areaDistribution" :key="index">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="10" :lg="10" :xl="10">
                <el-form-item :label="$t('SysDataplatform.areaDistributionName')" prop="name">
                  <el-input
                    v-model="item.name"
                    :placeholder="$t('SysDataplatform.areaDistributionNamePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="10" :lg="10" :xl="10">
                <el-form-item :label="$t('SysDataplatform.areaDistributionValue')" prop="value">
                  <el-input
                    v-model="item.value"
                    :placeholder="$t('SysDataplatform.areaDistributionValuePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-button
                  v-if="areaDistribution.length - 1 === index"
                  type="primary"
                  @click="addItem('areaDistribution')"
                  :size="StyleEnum.BUTTON_SIZE"
                >
                  {{ $t('form.add') }}
                </el-button>
                <el-button v-else type="danger" @click="deleteItem('areaDistribution', index)" :size="StyleEnum.BUTTON_SIZE">
                  {{ $t('form.delete') }}
                </el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t('SysDataplatform.two')" name="two">
            <el-row :gutter="StyleEnum.ROW_GUTTER" v-for="(item, index) in residentAge" :key="index">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="10" :lg="10" :xl="10">
                <el-form-item :label="$t('SysDataplatform.residentAgeName')" prop="name">
                  <el-input
                    v-model="item.name"
                    :placeholder="$t('SysDataplatform.residentAgeNamePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="10" :lg="10" :xl="10">
                <el-form-item :label="$t('SysDataplatform.residentAgeValue')" prop="value">
                  <el-input
                    v-model="item.value"
                    :placeholder="$t('SysDataplatform.residentAgeValuePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-button
                  v-if="residentAge.length - 1 === index"
                  type="primary"
                  @click="addItem('residentAge')"
                  :size="StyleEnum.BUTTON_SIZE"
                >
                  {{ $t('form.add') }}
                </el-button>
                <el-button v-else type="danger" @click="deleteItem('residentAge', index)" :size="StyleEnum.BUTTON_SIZE">
                  {{ $t('form.delete') }}
                </el-button>
              </el-col>
            </el-row>
            <el-row :gutter="StyleEnum.ROW_GUTTER" v-for="(item, index) in residentSex" :key="index">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="10" :lg="10" :xl="10">
                <el-form-item :label="$t('SysDataplatform.residentSexName')" prop="name">
                  <el-input
                    v-model="item.name"
                    :placeholder="$t('SysDataplatform.residentSexNamePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="10" :lg="10" :xl="10">
                <el-form-item :label="$t('SysDataplatform.residentSexValue')" prop="value">
                  <el-input
                    v-model="item.value"
                    :placeholder="$t('SysDataplatform.residentSexValuePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-button
                  v-if="residentSex.length - 1 === index"
                  type="primary"
                  @click="addItem('residentSex')"
                  :size="StyleEnum.BUTTON_SIZE"
                >
                  {{ $t('form.add') }}
                </el-button>
                <el-button v-else type="danger" @click="deleteItem('residentSex', index)" :size="StyleEnum.BUTTON_SIZE">
                  {{ $t('form.delete') }}
                </el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t('SysDataplatform.three')" name="three">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
                <el-form-item :label="$t('SysDataplatform.deptNum')" prop="deptNum">
                  <el-input
                    v-model="formData.deptNum"
                    :placeholder="$t('SysDataplatform.deptNumPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
                <el-form-item :label="$t('SysDataplatform.doctorNum')" prop="doctorNum">
                  <el-input
                    v-model="formData.doctorNum"
                    :placeholder="$t('SysDataplatform.doctorNumPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
                <el-form-item :label="$t('SysDataplatform.registerNum')" prop="registerNum">
                  <el-input
                    v-model="formData.registerNum"
                    :placeholder="$t('SysDataplatform.registerNumPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
                <el-form-item :label="$t('SysDataplatform.dailyRegisterNum')" prop="dailyRegisterNum">
                  <el-input
                    v-model="formData.dailyRegisterNum"
                    :placeholder="$t('SysDataplatform.dailyRegisterNumPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t('SysDataplatform.four')" name="four">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
                <el-form-item :label="$t('SysDataplatform.serverNum')" prop="serverNum">
                  <el-input
                    v-model="formData.serverNum"
                    :placeholder="$t('SysDataplatform.serverNumPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
                <el-form-item :label="$t('SysDataplatform.serverAmount')" prop="serverAmount">
                  <el-input
                    v-model="formData.serverAmount"
                    :placeholder="$t('SysDataplatform.serverAmountPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="StyleEnum.ROW_GUTTER" v-for="(item, index) in serverTypeDistribution" :key="index">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="10" :lg="10" :xl="10">
                <el-form-item :label="$t('SysDataplatform.serverTypeDistributionName')" prop="name">
                  <el-input
                    v-model="item.name"
                    :placeholder="$t('SysDataplatform.serverTypeDistributionNamePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="10" :lg="10" :xl="10">
                <el-form-item :label="$t('SysDataplatform.serverTypeDistributionValue')" prop="value">
                  <el-input
                    v-model="item.value"
                    :placeholder="$t('SysDataplatform.serverTypeDistributionValuePlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="4" :lg="4" :xl="4">
                <el-button
                  v-if="serverTypeDistribution.length - 1 === index"
                  type="primary"
                  @click="addItem('serverTypeDistribution')"
                  :size="StyleEnum.BUTTON_SIZE"
                >
                  {{ $t('form.add') }}
                </el-button>
                <el-button
                  v-else
                  type="danger"
                  @click="deleteItem('serverTypeDistribution', index)"
                  :size="StyleEnum.BUTTON_SIZE"
                >
                  {{ $t('form.delete') }}
                </el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t('SysDataplatform.five')" name="five">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
                <el-form-item :label="$t('SysDataplatform.activityNum')" prop="activityNum">
                  <el-input
                    v-model="formData.activityNum"
                    :placeholder="$t('SysDataplatform.activityNumPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
                <el-form-item :label="$t('SysDataplatform.activityAttendNum')" prop="activityAttendNum">
                  <el-input
                    v-model="formData.activityAttendNum"
                    :placeholder="$t('SysDataplatform.activityAttendNumPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t('SysDataplatform.six')" name="six">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
                <el-form-item :label="$t('SysDataplatform.stewardNum')" prop="stewardNum">
                  <el-input
                    v-model="formData.stewardNum"
                    :placeholder="$t('SysDataplatform.stewardNumPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
                <el-form-item :label="$t('SysDataplatform.stewardEvaluateAvg')" prop="stewardEvaluateAvg">
                  <el-input
                    v-model="formData.stewardEvaluateAvg"
                    :placeholder="$t('SysDataplatform.stewardEvaluateAvgPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
                <el-form-item :label="$t('SysDataplatform.maintenanceWorkerNum')" prop="maintenanceWorkerNum">
                  <el-input
                    v-model="formData.maintenanceWorkerNum"
                    :placeholder="$t('SysDataplatform.maintenanceWorkerNumPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
                <el-form-item :label="$t('SysDataplatform.maintenanceWorkerEvaluateAvg')" prop="maintenanceWorkerEvaluateAvg">
                  <el-input
                    v-model="formData.maintenanceWorkerEvaluateAvg"
                    :placeholder="$t('SysDataplatform.maintenanceWorkerEvaluateAvgPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t('SysDataplatform.seven')" name="seven">
            <el-row :gutter="StyleEnum.ROW_GUTTER">
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
                <el-form-item :label="$t('SysDataplatform.visitCount')" prop="visitCount">
                  <el-input
                    v-model="formData.visitCount"
                    :placeholder="$t('SysDataplatform.visitCountPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
                <el-form-item :label="$t('SysDataplatform.visitNum')" prop="visitNum">
                  <el-input
                    v-model="formData.visitNum"
                    :placeholder="$t('SysDataplatform.visitNumPlaceHolder')"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col
        :xs="StyleEnum.COL_XS"
        :sm="StyleEnum.COL_SM"
        :md="24"
        :lg="24"
        :xl="24"
        style="padding-top: 20px; text-align: right"
      >
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
import { defineComponent, ref, reactive, watch, unref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { StyleEnum } from '/@/enums/styleEnum'
import { mapGetters } from 'vuex'
// components
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useSysDataplatformRepository from './useSysDataplatformRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'SysDataplatformForm', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const activeName = ref('one')
    const pageType = ref(props.pageType)
    const {
      formData,
      createSysDataplatformHandle,
      updateSysDataplatformHandle,
      getSysDataplatformByIdHandle,
      formPageResetHandle
    } = useSysDataplatformRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)
    const areaDistribution = ref([
      {
        name: '',
        value: ''
      }
    ])
    const residentAge = ref([
      {
        name: '',
        value: ''
      }
    ])
    const residentSex = ref([
      {
        name: '',
        value: ''
      }
    ])
    const serverTypeDistribution = ref([
      {
        name: '',
        value: ''
      }
    ])

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
          getSysDataplatformByIdHandle(params, hideSkeleton).then((response) => {
            areaDistribution.value = JSON.parse(response.areaDistribution)
            residentAge.value = JSON.parse(response.residentAge)
            residentSex.value = JSON.parse(response.residentSex)
            serverTypeDistribution.value = JSON.parse(response.serverTypeDistribution)
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
      deptNum: [{ required: true, message: t('SysDataplatform.deptNumPlaceHolder'), trigger: 'blur' }], // 模板修改标记
      doctorNum: [{ required: true, message: t('SysDataplatform.doctorNumPlaceHolder'), trigger: 'blur' }],
      registerNum: [{ required: true, message: t('SysDataplatform.registerNumPlaceHolder'), trigger: 'blur' }],
      dailyRegisterNum: [{ required: true, message: t('SysDataplatform.dailyRegisterNumPlaceHolder'), trigger: 'blur' }],
      serverNum: [{ required: true, message: t('SysDataplatform.serverNumPlaceHolder'), trigger: 'blur' }],
      serverAmount: [{ required: true, message: t('SysDataplatform.serverAmountPlaceHolder'), trigger: 'blur' }],
      activityNum: [{ required: true, message: t('SysDataplatform.activityNumPlaceHolder'), trigger: 'blur' }],
      activityAttendNum: [{ required: true, message: t('SysDataplatform.activityAttendNumPlaceHolder'), trigger: 'blur' }],
      stewardNum: [{ required: true, message: t('SysDataplatform.stewardNumPlaceHolder'), trigger: 'blur' }],
      stewardEvaluateAvg: [{ required: true, message: t('SysDataplatform.stewardEvaluateAvgPlaceHolder'), trigger: 'blur' }],
      maintenanceWorkerNum: [{ required: true, message: t('SysDataplatform.maintenanceWorkerNumPlaceHolder'), trigger: 'blur' }],
      maintenanceWorkerEvaluateAvg: [
        { required: true, message: t('SysDataplatform.maintenanceWorkerEvaluateAvgPlaceHolder'), trigger: 'blur' }
      ],
      visitCount: [{ required: true, message: t('SysDataplatform.visitCountPlaceHolder'), trigger: 'blur' }],
      visitNum: [{ required: true, message: t('SysDataplatform.visitNumPlaceHolder'), trigger: 'blur' }]
    }

    // 添加
    function addItem(type: any) {
      if (type === 'areaDistribution') {
        areaDistribution.value.push({ name: '', value: '' })
      }
      if (type === 'residentAge') {
        residentAge.value.push({ name: '', value: '' })
      }
      if (type === 'residentSex') {
        residentSex.value.push({ name: '', value: '' })
      }
      if (type === 'serverTypeDistribution') {
        serverTypeDistribution.value.push({ name: '', value: '' })
      }
    }

    // 删除
    function deleteItem(type: any, index: any) {
      if (type === 'areaDistribution') {
        areaDistribution.value.splice(index, 1)
      }
      if (type === 'residentAge') {
        residentAge.value.splice(index, 1)
      }
      if (type === 'residentSex') {
        residentSex.value.splice(index, 1)
      }
      if (type === 'serverTypeDistribution') {
        serverTypeDistribution.value.splice(index, 1)
      }
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createSysDataplatformHandle : updateSysDataplatformHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(
        cMethod,
        {
          ...cFormData,
          areaDistribution: JSON.stringify(unref(areaDistribution)),
          residentAge: JSON.stringify(unref(residentAge)),
          residentSex: JSON.stringify(unref(residentSex)),
          serverTypeDistribution: JSON.stringify(unref(serverTypeDistribution))
        },
        () => {
          emit('update-table')
          emit('hide-dialog')
          emit('show-skeleton')
        }
      )
    }

    return {
      // 基础支持
      StyleEnum,
      // 表单数据
      formData,
      pageType,
      rules,
      activeName,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      addItem,
      deleteItem,
      areaDistribution,
      residentAge,
      residentSex,
      serverTypeDistribution
    }
  }
})
</script>
