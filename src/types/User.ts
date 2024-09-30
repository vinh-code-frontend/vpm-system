export type User = {
  uid: string
  displayName: string
  email: string
  slug: string
  photoURL?: string
}

export type LoginModel = {
  email: string
  password: string
}

export type RegisterModel = {
  email: string
  password: string
  confirmPassword: string
  displayName: string
}
