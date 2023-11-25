import { faker } from '@faker-js/faker';
import { type SuperTest, type Test } from 'supertest';
import { type UserDocument } from '../api/user/user.types';
import { type LoginResponse } from '../auth/local/local.types';
import { type Types } from 'mongoose';
import path from 'path';
import fs from 'fs';
import { type ReviewDocument } from '../api/review/review.types';

interface Generator {
  user: string
  product: Types.ObjectId
  productImage: string
  token: string
}

interface ReviewResponse {
  review: ReviewDocument
  user: string
  token: string
}

export const userGenerator = async (request: SuperTest<Test>, role: string): Promise<UserDocument> => {
  try {
    const { avatar, ...user } = {
      email: faker.internet.email({ firstName: faker.person.firstName(), lastName: faker.person.lastName(), provider: 'test.com', allowSpecialCharacters: true }),
      name: faker.person.firstName(),
      lastname: faker.person.lastName(),
      password: 'Mypassword123',
      avatar: readBuffer('../assets/images/fake-profile.jpg'),
      role
    };

    const { body: { data: userResponse } } = await request.post('/api/user/register')
      .set('Content-Type', 'multipart/form-data')
      .attach('avatar', avatar)
      .field({ ...user });

    return userResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const userAndProductGenerator = async (request: SuperTest<Test>, role: string): Promise<Generator> => {
  try {
    const { email } = await userGenerator(request, 'ADMIN');
    const { token } = await loginGenerator(request, email);

    const { image, ...product } = {
      image: readBuffer('../assets/images/fake-product.jpg'),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 10, max: 500, dec: 0 }),
      category: 'doll'
    };

    const { body: { data: productResponse } } = await request.post('/api/product/create')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .attach('image', image)
      .field({ ...product });

    return { user: email, product: productResponse._id, productImage: productResponse.image, token };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const reviewGenerator = async (request: SuperTest<Test>): Promise<ReviewResponse> => {
  try {
    const { user, product, token } = await userAndProductGenerator(request, 'USER');

    const review = {
      rating: faker.number.int({ min: 1, max: 5 }),
      title: faker.commerce.productAdjective(),
      comments: faker.commerce.productDescription(),
      user,
      product
    };

    const { body: { data: reviewResponse } } = await request.post('/api/review/create')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    return { review: reviewResponse, user, token };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loginGenerator = async (request: SuperTest<Test>, email: string, password?: string): Promise<LoginResponse> => {
  try {
    const login = {
      email,
      password: password ?? 'Mypassword123'
    };
    const { body: loginResponse } = await request.post('/api/auth/local/login').send(login);

    return loginResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const readBuffer = (relativePath: string): Buffer => {
  try {
    const absolutePath = path.resolve(__dirname, relativePath);
    const buffer = fs.readFileSync(absolutePath);
    return buffer;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
