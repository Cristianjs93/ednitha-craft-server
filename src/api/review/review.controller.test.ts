import supertest from 'supertest';
import app from '../../app';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { adminAndProductGenerator, reviewGenerator } from '../../utils/testUtils';

const request = supertest(app);

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Review controller', () => {
  describe('POST /api/review/create', () => {
    test('Should return error: Rating is required. Comments are required', async () => {
      const { user, product, token } = await adminAndProductGenerator(request);

      const review = {
        rating: '',
        title: faker.commerce.productAdjective(),
        comments: '',
        user,
        product
      };

      const response = await request.post('/api/review/create')
        .set('Authorization', `Bearer ${token}`)
        .send(review);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Error creating review');
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual('Rating is required. Comments are required');
    });
    test('Should return error: Comments must be at least 4 characters long', async () => {
      const { user, product, token } = await adminAndProductGenerator(request);

      const review = {
        rating: faker.number.int({ min: 1, max: 5 }),
        title: faker.commerce.productAdjective(),
        comments: 'abc',
        user,
        product
      };

      const response = await request.post('/api/review/create')
        .set('Authorization', `Bearer ${token}`)
        .send(review);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Error creating review');
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual('Comments must be at least 4 characters long');
    });
    test('Should return status 201 Created', async () => {
      const { user, product, token } = await adminAndProductGenerator(request);

      const review = {
        rating: faker.number.int({ min: 1, max: 5 }),
        title: faker.commerce.productAdjective(),
        comments: faker.commerce.productDescription(),
        user,
        product
      };

      const response = await request.post('/api/review/create')
        .set('Authorization', `Bearer ${token}`)
        .send(review);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Review created successfully');
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toMatchObject({ title: review.title });
    });
  });
  describe('GET /api/review', () => {
    test('Should return status 200 OK', async () => {
      const response = await request.get('/api/review');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('data');
      expect(response.body.message).toEqual('Reviews listed');
    });
  });
  describe('PUT /api/review/update', () => {
    test('Should return status 200', async () => {
      const { review, token } = await reviewGenerator(request);

      const updatedReview = {
        _id: review._id,
        rating: faker.number.int({ min: 1, max: 5 }),
        comments: faker.commerce.productDescription()
      };

      const response = await request.put('/api/review/update')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedReview);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Review updated successfully');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.rating).toEqual(updatedReview.rating);
      expect(response.body.data.comments).toEqual(updatedReview.comments);
    }, 10000);
  });
  describe('DELETE /api/review/delete', () => {
    test('Should return status 200', async () => {
      const { review, user, token } = await reviewGenerator(request);

      const reviewDelete = {
        reviewId: review._id,
        user,
        product: review.product
      };

      const response = await request.delete('/api/review/delete')
        .set('Authorization', `Bearer ${token}`)
        .send(reviewDelete);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Review deleted successfully');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.title).toEqual(review.title);
      expect(response.body.data.comments).toEqual(review.comments);
    }, 10000);
  });
});
