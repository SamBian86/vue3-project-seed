import { ref } from 'vue'
import { ElMessage } from "element-plus";
import { useI18n } from 'vue-i18n'
// 用于抽离所有表单页面的逻辑
export default function useFormPageComponent(formPageRef: any) {
  const { t } = useI18n()
  const formPageType = ref('')
  const formPageParams = ref({})

  // 移除校验结果
  function clearValidate() {
    formPageRef.value.clearValidate()
  }

  // 设置默认的值
  function setDefaultValue(key: string | number, value: string) {
    formPageParams.value[key] = value
  }

  // 创建
  function formPageCreateHandle() {
    formPageType.value = 'create'
    formPageParams.value = {}
  }

  // 修改
  function formPageUpdateHandle(params: any) {
    formPageType.value = 'update'
    formPageParams.value = params
  }

  // 详情
  function formPageDetailHandle(params: any) {
    formPageType.value = 'detail'
    formPageParams.value = params
  }

  // 提交逻辑封装
  const formPageSubmitHandle = (method: any, params: any, callback: any) => {
    formPageRef.value.validate((valid: any) => {
      if (valid) {
        // method(params)
        if (method) {
          method(params).then((response: any) => {
            ElMessage.success(t('form.submitSuccessMessage'));
            callback && callback()
          })
        } else {
          callback && callback()
        }
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }

  return {
    formPageType,
    formPageParams,
    clearValidate,
    setDefaultValue,
    formPageCreateHandle,
    formPageUpdateHandle,
    formPageDetailHandle,
    formPageSubmitHandle
  }
}