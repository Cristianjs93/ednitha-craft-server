export interface LoginResponse {
  token: string
  newUser: {
    firstname: string
    lastname: string
    email: string
    role: string
  }
}
