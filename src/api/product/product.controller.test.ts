import supertest from 'supertest';
import app from '../../app';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import {
  userGenerator,
  adminAndProductGenerator,
  verifyAccountGenerator,
  loginGenerator,
  readBuffer
} from '../../utils/testUtils';

const request = supertest(app);

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Product controller', () => {
  describe('POST /api/product/create', () => {
    test('Should return error: Product name is required. Product description is required', async () => {
      const { email } = await userGenerator(request, 'ADMIN');

      await verifyAccountGenerator(email);

      const { token } = await loginGenerator(request, email);
      const { image, ...product } = {
        image: readBuffer('../assets/images/fake-product.jpg'),
        name: '',
        description: '',
        price: faker.commerce.price({ min: 10, max: 500, dec: 0 }),
        category: 'doll'
      };

      const response = await request.post('/api/product/create')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'multipart/form-data')
        .attach('image', image)
        .field({ ...product });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Error creating product');
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual('Product name is required. Product description is required');
    });
    test('Should return error: Product name must be at least 4 characters long', async () => {
      const { email } = await userGenerator(request, 'ADMIN');

      await verifyAccountGenerator(email);

      const { token } = await loginGenerator(request, email);
      const { image, ...product } = {
        image: readBuffer('../assets/images/fake-product.jpg'),
        name: 'abc',
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 10, max: 500, dec: 0 }),
        category: 'doll'
      };

      const response = await request.post('/api/product/create')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'multipart/form-data')
        .attach('image', image)
        .field({ ...product });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual('Product name must be at least 4 characters long');
    });
    test('Should return status 201 Created', async () => {
      const { email } = await userGenerator(request, 'ADMIN');

      await verifyAccountGenerator(email);

      const { token } = await loginGenerator(request, email);
      const { image, ...product } = {
        image: readBuffer('../assets/images/fake-product.jpg'),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 10, max: 500, dec: 0 }),
        category: 'doll'
      };

      const response = await request.post('/api/product/create')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'multipart/form-data')
        .attach('image', image)
        .field({ ...product });

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Product created successfully');
      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toMatchObject({ name: product.name });
    });
  });
  describe('GET /api/product', () => {
    test('Should return status 200 OK', async () => {
      const response = await request.get('/api/product?page=1&filter=all&limit=10');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Products listed');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('next');
      expect(response.body.data).toHaveProperty('result');
    });
  });
  describe('PUT /api/product/update', () => {
    test('Should return status 200', async () => {
      const { product, productImage, token } = await adminAndProductGenerator(request);
      const { image, ...updatedProduct } = {
        _id: product as unknown as string,
        price: faker.commerce.price({ min: 10, max: 500, dec: 0 }),
        image: readBuffer('../assets/images/fake-product2.jpg')
      };

      const response = await request.put('/api/product/update')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'multipart/form-data')
        .attach('image', image)
        .field({ ...updatedProduct });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Product updated successfully');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.price).toEqual(parseInt(updatedProduct.price));
      expect(response.body.data.image).not.toEqual(productImage);
    });
  });
  describe('DELETE /api/product/delete', () => {
    test('Should return error: Invalid credentials', async () => {
      const { product: _id } = await adminAndProductGenerator(request);

      const { email } = await userGenerator(request, 'USER');

      await verifyAccountGenerator(email);

      const { token } = await loginGenerator(request, email);

      const response = await request.delete('/api/product/delete')
        .set('Authorization', `Bearer ${token}`)
        .send({ _id });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual('Invalid credentials');
    }, 10000);
    test('Should return status 200', async () => {
      const { product: _id, token } = await adminAndProductGenerator(request);

      const response = await request.delete('/api/product/delete')
        .set('Authorization', `Bearer ${token}`)
        .send({ _id });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Product deleted successfully');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data._id).toEqual(_id);
    }, 10000);
  });
});
