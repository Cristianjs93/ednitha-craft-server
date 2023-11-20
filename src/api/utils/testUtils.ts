import { faker } from '@faker-js/faker'
import { type SuperTest, type Test } from 'supertest'
import { type UserDocument } from '../user/user.types'
import { type ProductDocument } from '../product/product.types'

interface generator {
  reviewUser: UserDocument
  reviewProduct: ProductDocument
}

export const userAndProductGenerator = async (request: SuperTest<Test>): Promise<generator> => {
  const user = {
    email: faker.internet.email({ firstName: faker.person.firstName(), lastName: faker.person.lastName(), provider: 'test.com', allowSpecialCharacters: true }),
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
    password: 'Mypassword123',
    role: 'USER'
  }

  const product = {
    image: 'https://picsum.photos/100/100',
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 10, max: 500, dec: 0 })
  }

  const reviewUser = await request.post('/api/user/register').send(user)
  const reviewProduct = await request.post('/api/product/create').send(product)

  return { reviewUser: reviewUser.body.data, reviewProduct: reviewProduct.body.data }
}
