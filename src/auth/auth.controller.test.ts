// import supertest from 'supertest';
// import app from '../app'
// import { faker } from '@faker-js/faker';
// import mongoose from 'mongoose';
// import { userGenerator, readBuffer, loginGenerator, userAndProductGenerator, reviewGenerator } from '../utils/testUtils';

// const request = supertest(app);

// afterAll(async () => {
//   await mongoose.disconnect();
// });

// describe('auth controller', () => {
//   describe('GET /api/user', () => {
//     test('Should return error: Unauthorized! You have to log in first', async () => {
//       const response = await request.get('/api/user')

//       expect(response.status).toBe(400)
//       expect(response.body).toHaveProperty('error')
//       expect(response.body.error).toEqual('Unauthorized! You have to log in first')
//     })
//     test('Should return error: Invalid credentials', async () => {
//       const { email } = await userGenerator(request, 'USER')
//       const { token } = await loginGenerator(request, email)

//       const response = await request.get('/api/user').set('Authorization', `Bearer ${token}`)

//       expect(response.status).toBe(400)
//       expect(response.body).toHaveProperty('error')
//       expect(response.body.error).toEqual('Invalid credentials')
//     })
//     test('Should return status 200 OK', async () => {
//       const { email } = await userGenerator(request, 'ADMIN')
//       const { token } = await loginGenerator(request, email)

//       const response = await request.get('/api/user').set('Authorization', `Bearer ${token}`)

//       expect(response.status).toBe(200)
//       expect(response.body).toHaveProperty('message')
//       expect(response.body).toHaveProperty('data')
//       expect(response.body.message).toEqual('Users listed')
//     })
//   })
//   describe('POST /api/product', () => {
//     test('Should return error: Invalid credentials', async () => {
//       const { email } = await userGenerator(request, 'USER')
//       const { token } = await loginGenerator(request, email)
//       const { image, ...product } = {
//         image: readBuffer('../assets/images/fake-product.jpg'),
//         name: faker.commerce.productName(),
//         description: faker.commerce.productDescription(),
//         price: faker.commerce.price({ min: 10, max: 500, dec: 0 })
//       }

//       const response = await request.post('/api/product/create')
//         .set('Authorization', `Bearer ${token}`)
//         .set('Content-Type', 'multipart/form-data')
//         .attach('image', image)
//         .field({ ...product })

//       expect(response.status).toBe(400)
//       expect(response.body).toHaveProperty('error')
//       expect(response.body.error).toEqual('Invalid credentials')
//     })
//     test('Should return status 201 Created', async () => {
//       const { email } = await userGenerator(request, 'ADMIN')
//       const { token } = await loginGenerator(request, email)
//       const { image, ...product } = {
//         image: readBuffer('../assets/images/fake-product.jpg'),
//         name: faker.commerce.productName(),
//         description: faker.commerce.productDescription(),
//         price: faker.commerce.price({ min: 10, max: 500, dec: 0 })
//       }

//       const response = await request.post('/api/product/create')
//         .set('Authorization', `Bearer ${token}`)
//         .set('Content-Type', 'multipart/form-data')
//         .attach('image', image)
//         .field({ ...product })

//       expect(response.status).toBe(201)
//       expect(response.body).toHaveProperty('message')
//       expect(response.body.message).toEqual('Product created successfully')
//       expect(response.body.data).toHaveProperty('_id')
//       expect(response.body.data).toMatchObject({ name: product.name })
//     })
//   })
//   describe('DELETE /api/product', () => {
//     test('Should return error: Invalid credentials', async () => {
//       const { product: _id } = await userAndProductGenerator(request, 'ADMIN')

//       const { email } = await userGenerator(request, 'USER')
//       const { token } = await loginGenerator(request, email)

//       const response = await request.delete('/api/product/delete')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ _id })

//       expect(response.status).toBe(400)
//       expect(response.body).toHaveProperty('error')
//       expect(response.body.error).toEqual('Invalid credentials')
//     }, 10000)
//     test('Should return status 200', async () => {
//       const { product: _id, token } = await userAndProductGenerator(request, 'ADMIN')

//       const response = await request.delete('/api/product/delete')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ _id })

//       expect(response.status).toBe(200)
//       expect(response.body).toHaveProperty('message')
//       expect(response.body.message).toEqual('Product deleted successfully')
//       expect(response.body).toHaveProperty('data')
//       expect(response.body.data._id).toEqual(_id)
//     }, 10000)
//   })
//   describe('POST /api/review', () => {
//     test('Should return error: Unauthorized! You have to log in first', async () => {
//       const { user, product } = await userAndProductGenerator(request, 'USER')

//       const review = {
//         rating: faker.number.int({ min: 1, max: 5 }),
//         title: faker.commerce.productAdjective(),
//         comments: faker.commerce.productDescription(),
//         user,
//         product
//       }

//       const response = await request.post('/api/review/create').send(review)

//       expect(response.status).toBe(400)
//       expect(response.body).toHaveProperty('error')
//       expect(response.body.error).toEqual('Unauthorized! You have to log in first')
//     })
//     test('Should return status 201 Created', async () => {
//       const { user, product, token } = await userAndProductGenerator(request, 'USER')

//       const review = {
//         rating: faker.number.int({ min: 1, max: 5 }),
//         title: faker.commerce.productAdjective(),
//         comments: faker.commerce.productDescription(),
//         user,
//         product
//       }

//       const response = await request.post('/api/review/create').set('Authorization', `Bearer ${token}`).send(review)

//       expect(response.status).toBe(201)
//       expect(response.body).toHaveProperty('message')
//       expect(response.body.message).toEqual('Review created successfully')
//       expect(response.body.data).toHaveProperty('_id')
//       expect(response.body.data).toMatchObject({ title: review.title })
//     })
//   })
//   describe('DELETE /api/review', () => {
//     test('Should return error: Unauthorized! You have to log in first', async () => {
//       const { review, user } = await reviewGenerator(request)

//       const reviewDelete = {
//         reviewId: review._id,
//         user,
//         product: review.product
//       }

//       const response = await request.delete('/api/review/delete').send(reviewDelete)

//       expect(response.status).toBe(400)
//       expect(response.body).toHaveProperty('error')
//       expect(response.body.error).toEqual('Unauthorized! You have to log in first')
//     }, 10000)
//     test('Should return status 200 Ok', async () => {
//       const { review, user, token } = await reviewGenerator(request)

//       const reviewDelete = {
//         reviewId: review._id,
//         user,
//         product: review.product
//       }

//       const response = await request.delete('/api/review/delete')
//         .set('Authorization', `Bearer ${token}`)
//         .send(reviewDelete)

//       expect(response.status).toBe(200)
//       expect(response.body).toHaveProperty('message')
//       expect(response.body.message).toEqual('Review deleted successfully')
//       expect(response.body).toHaveProperty('data')
//       expect(response.body.data.title).toEqual(review.title)
//       expect(response.body.data.comments).toEqual(review.comments)
//     }, 10000)
//   })
// })
