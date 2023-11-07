export interface User {
  name: string
  email: string
  password: string
}

export interface validatorError {
  name: string
  message: string
  properties: {
    message: string
    type: string
    regexp: object
    path: string
    value: string
  }
  kind: string
  path: string
  value: string
}
