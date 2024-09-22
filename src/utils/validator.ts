import type { FormInstance, FormItemRule } from 'element-plus'

export const isRequired = (): FormItemRule => ({
  required: true,
  message: 'This is required field. Please enter value to process'
})

export const isEmail = (): FormItemRule => ({
  type: 'email',
  message: 'Please input correct email address'
})

export const minCharacters = (minNumber: number, fieldName?: string): FormItemRule => ({
  min: minNumber,
  message: `${fieldName ?? 'The value'} must be at least ${minNumber} characters`
})

export const resetForm = (formInstance?: FormInstance) => {
  formInstance?.resetFields()
}
