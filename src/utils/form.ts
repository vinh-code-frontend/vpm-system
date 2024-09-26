import type { FormInstance } from 'element-plus'

export const resetForm = (formInstance?: FormInstance) => {
  formInstance?.resetFields()
}
