import type { FormItemRule } from 'element-plus'
import { computed } from 'vue'

export const useValidator = () => {
  const required = (message?: string): FormItemRule => ({
    required: true,
    message: message || 'This is required field. Please enter value to process'
  })

  const email = (message?: string): FormItemRule => ({
    type: 'email',
    message: message || 'Please input correct email address'
  })

  const min = (minNumber: number, name?: string): FormItemRule => ({
    min: minNumber,
    message: `${name || 'The value'} must be at least ${minNumber} characters`
  })

  const max = (maxNumber: number, name?: string): FormItemRule => ({
    max: maxNumber,
    message: `${name || 'The value'} must be least then ${maxNumber} characters`
  })

  return { required, email, min, max }
}
