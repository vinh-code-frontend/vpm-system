import { ElNotification } from 'element-plus'

const NOTIFICATION_DURATION = 2000 //* 2s

export const ErrorNotification = (message?: string) => {
  return ElNotification({
    title: 'Failed',
    message: message || 'Unspecified error',
    type: 'error',
    duration: NOTIFICATION_DURATION
  })
}

export const SuccessNotification = (message?: string) => {
  return ElNotification({
    title: 'Success',
    message: message || 'Successful',
    type: 'success',
    duration: NOTIFICATION_DURATION
  })
}
