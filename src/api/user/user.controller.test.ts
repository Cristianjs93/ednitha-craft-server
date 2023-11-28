import supertest from 'supertest';
import app from '../../app';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import {
  userGenerator,
  verifyAccountGenerator,
  loginGenerator,
  readBuffer
} from '../../utils/testUtils';

const request = supertest(app);

afterAll(async () => {
  await mongoose.disconnect();
});

describe('User controller', () => {
  describe('POST /api/user/register', () => {
    test('Should return error: Name must be at least 3 characters long', async () => {
      const { avatar, ...user } = {
        email: faker.internet.email({ firstName: faker.person.firstName(), lastName: faker.person.lastName(), provider: 'test.com', allowSpecialCharacters: true }),
        name: 'ab',
        lastname: faker.person.lastName(),
        password: 'Mypassword123',
        avatar: readBuffer('../assets/images/fake-profile.jpg'),
        role: 'USER'
      };

      const response = await request.post('/api/user/register')
        .set('Content-Type', 'multipart/form-data')
        .attach('avatar', avatar)
        .field({ ...user });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual('Name must be at least 3 characters long');
    });
    test('Should return error: Lastname is not valid. Email is not valid', async () => {
      const { avatar, ...user } = {
        email: 'abc1@test.com',
        name: faker.person.firstName(),
        lastname: 'ab@',
        password: 'Mypassword123',
        avatar: readBuffer('../assets/images/fake-profile.jpg'),
        role: 'USER'
      };

      const response = await request.post('/api/user/register')
        .set('Content-Type', 'multipart/form-data')
        .attach('avatar', avatar)
        .field({ ...user });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual('Lastname is not valid. Email is not valid');
    });
    test('Should return error: Email already exists', async () => {
      const { email, name, lastname, role } = await userGenerator(request, 'USER');

      const response = await request.post('/api/user/register')
        .set('Content-Type', 'multipart/form-data')
        .attach('avatar', readBuffer('../assets/images/fake-profile.jpg'))
        .field({
          email,
          name,
          password: 'Mypassword123',
          lastname,
          role
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual('Email already exists');
    });
    test('Should return status 201 Created', async () => {
      const { avatar, ...user } = {
        email: faker.internet.email({
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          provider: 'test.com',
          allowSpecialCharacters: true
        }),
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        password: 'Mypassword123',
        avatar: readBuffer('../assets/images/fake-profile.jpg'),
        role: 'USER'
      };

      const response = await request.post('/api/user/register')
        .set('Content-Type', 'multipart/form-data')
        .attach('avatar', avatar)
        .field({ ...user });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('User created successfully');
      expect(response.body.data).toMatchObject({ name: user.name });
    });
  });
  describe('GET /api/user', () => {
    test('Should return status 200 OK', async () => {
      const { email } = await userGenerator(request, 'ADMIN');

      await verifyAccountGenerator(email);

      const { token } = await loginGenerator(request, email);

      const response = await request.get('/api/user')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('data');
      expect(response.body.message).toEqual('Users listed');
    });
  });
  describe('GET /api/user/email', () => {
    test('Should return error: User not found', async () => {
      const { email } = await userGenerator(request, 'ADMIN');

      await verifyAccountGenerator(email);

      const { token } = await loginGenerator(request, email);
      const searchEmail = 'example@test.com';

      const response = await request.get('/api/user/email')
        .set('Authorization', `Bearer ${token}`)
        .send({ email: searchEmail });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Error searching user');
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toEqual('User not found');
    });
    test('Should return status 200 OK', async () => {
      const { email } = await userGenerator(request, 'ADMIN');

      await verifyAccountGenerator(email);

      const { token } = await loginGenerator(request, email);

      const response = await request.get('/api/user/email')
        .set('Authorization', `Bearer ${token}`)
        .send({ email });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('User found');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.email).toEqual(email);
    });
  });
  describe('PUT /api/user/update', () => {
    test('Should return status 200', async () => {
      const { email } = await userGenerator(request, 'USER');

      await verifyAccountGenerator(email);

      const { token } = await loginGenerator(request, email);
      const updatedUser = {
        email,
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        avatar: readBuffer('../assets/images/fake-profile2.jpg')
      };

      const response = await request.put('/api/user/update')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'multipart/form-data')
        .attach('avatar', updatedUser.avatar)
        .field({ ...updatedUser });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('User updated successfully');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.name).toEqual(updatedUser.name);
    });
  });
  describe('DELETE /api/user/delete', () => {
    test('Should return status 200', async () => {
      const { email } = await userGenerator(request, 'USER');

      await verifyAccountGenerator(email);

      const { token } = await loginGenerator(request, email);

      const response = await request.delete('/api/user/delete')
        .set('Authorization', `Bearer ${token}`)
        .send({ email });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('User deleted successfully');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.email).toEqual(email);
    });
  });
});
