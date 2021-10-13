import { validatePhone } from './validate'

export function validatePhoneHandle(rule: any, value: any, callback: any, t: any) {
  if (value && !validatePhone(value)) {
    callback(new Error(t('validate.blur', { message: t('validate.phoneNumber') })))
  } else {
    callback()
  }
}
