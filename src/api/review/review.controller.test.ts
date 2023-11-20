import supertest from 'supertest'
import app from '../../app'
import { faker } from '@faker-js/faker'
import mongoose from 'mongoose'
import { userAndProductGenerator } from '../utils/testUtils'

const request = supertest(app)

afterAll(async () => {
  await mongoose.disconnect()
})

describe('Review controller', () => {
  describe('POST /api/review', () => {
    test('Should return error: Rating is required. Comments are required', async () => {
      const { reviewUser, reviewProduct } = await userAndProductGenerator(request)

      const review = {
        rating: '',
        title: faker.commerce.productAdjective(),
        comments: '',
        user: reviewUser.email,
        product: reviewProduct._id
      }

      const response = await request.post('/api/review/create').send(review)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Error creating review')
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Rating is required. Comments are required')
    })
    test('Should return error: Comments must be at least 4 characters long', async () => {
      const { reviewUser, reviewProduct } = await userAndProductGenerator(request)

      const review = {
        rating: faker.number.int({ min: 1, max: 5 }),
        title: faker.commerce.productAdjective(),
        comments: 'abc',
        user: reviewUser.email,
        product: reviewProduct._id
      }

      const response = await request.post('/api/review/create').send(review)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Error creating review')
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Comments must be at least 4 characters long')
    })
    test('Should return status 201 Created', async () => {
      const { reviewUser, reviewProduct } = await userAndProductGenerator(request)

      const review = {
        rating: faker.number.int({ min: 1, max: 5 }),
        title: faker.commerce.productAdjective(),
        comments: faker.commerce.productDescription(),
        user: reviewUser.email,
        product: reviewProduct._id
      }

      const response = await request.post('/api/review/create').send(review)

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Review created successfully')
      expect(response.body.data).toHaveProperty('_id')
      expect(response.body.data).toMatchObject({ title: review.title })
    })
  })
  describe('GET /api/review', () => {
    test('Should return status 200 OK', async () => {
      const response = await request.get('/api/review')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message')
      expect(response.body).toHaveProperty('data')
      expect(response.body.message).toEqual('Reviews listed')
    })
  })
  describe('PUT /api/review/update', () => {
    test('Should return status 200', async () => {
      const { reviewUser, reviewProduct } = await userAndProductGenerator(request)

      const review = {
        rating: faker.number.int({ min: 1, max: 5 }),
        title: faker.commerce.productAdjective(),
        comments: faker.commerce.productDescription(),
        user: reviewUser.email,
        product: reviewProduct._id
      }

      const reviewCreateResponse = await request.post('/api/review/create').send(review)

      const updatedReview = {
        _id: reviewCreateResponse.body.data._id,
        rating: faker.number.int({ min: 1, max: 5 }),
        comments: faker.commerce.productDescription()
      }

      const response = await request.put('/api/review/update').send(updatedReview)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Review updated successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data.rating).toEqual(updatedReview.rating)
      expect(response.body.data.comments).toEqual(updatedReview.comments)
    })
  })
  describe('DELETE /api/review/delete', () => {
    test('Should return status 200', async () => {
      const { reviewUser, reviewProduct } = await userAndProductGenerator(request)

      const review = {
        rating: faker.number.int({ min: 1, max: 5 }),
        title: faker.commerce.productAdjective(),
        comments: faker.commerce.productDescription(),
        user: reviewUser.email,
        product: reviewProduct._id
      }

      const reviewCreateResponse = await request.post('/api/review/create').send(review)

      const { _id } = reviewCreateResponse.body.data

      const reviewDelete = {
        reviewId: _id,
        user: reviewUser.email,
        productId: reviewProduct._id
      }

      const response = await request.delete('/api/review/delete').send(reviewDelete)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Review deleted successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data.title).toEqual(review.title)
      expect(response.body.data.comments).toEqual(review.comments)
    })
  })
})
