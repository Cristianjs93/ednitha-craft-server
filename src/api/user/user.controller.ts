import { type Request, type Response } from 'express'
import { faker } from '@faker-js/faker';

export const createUserHandler = (req: Request, res: Response): void => {
  const { email, name } = req.body
  const id = faker.string.uuid()
  const user = { id, email, name }
  res.status(201).json({ message: 'User created successfully', user })
}
