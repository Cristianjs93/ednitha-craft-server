import { faker } from '@faker-js/faker'
import { type SuperTest, type Test } from 'supertest'
import { type UserDocument } from '../user/user.types'
import { type LoginResponse } from '../../auth/local/local.types'
import { type Types } from 'mongoose'

interface generator {
  user: string
  product: Types.ObjectId
  token: string
}

export const userGenerator = async (request: SuperTest<Test>, role: string): Promise<UserDocument> => {
  const user = {
    email: faker.internet.email({ firstName: faker.person.firstName(), lastName: faker.person.lastName(), provider: 'test.com', allowSpecialCharacters: true }),
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
    password: 'Mypassword123',
    role
  }

  console.log('USER GENERATOR', user)
  const { body: { data: userResponse } } = await request.post('/api/user/register').send(user)

  return userResponse
}

export const userAndProductGenerator = async (request: SuperTest<Test>, role: string): Promise<generator> => {
  const { email } = await userGenerator(request, 'ADMIN')
  const { token } = await loginGenerator(request, email)

  const product = {
    image: 'https://picsum.photos/100/100',
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 10, max: 500, dec: 0 })
  }

  const { body: { data: productResponse } } = await request.post('/api/product/create').set('Authorization', `Bearer ${token}`).send(product)

  return { user: email, product: productResponse._id, token }
}

export const loginGenerator = async (request: SuperTest<Test>, email: string, password?: string): Promise<LoginResponse> => {
  const login = {
    email,
    password: password ?? 'Mypassword123'
  }
  const { body: loginResponse } = await request.post('/api/auth/local/login').send(login)

  return loginResponse
}
