/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Request, type Response } from 'express'
import { createUser } from './user.services'

export const createUserHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body
    const user = await createUser(data)
    if (!(user)) {
      res.status(400).json({ message: 'error validating user' })
    }
    res.status(201).json({ message: 'User created successfully', data: user })
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating user', error: error.message })
  }
}
