/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Request, type Response } from 'express'
import { createUser, getAllUsers, getUserByEmail } from './user.services'

export const createUserHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body
    const user = await createUser(data)
    res.status(201).json({ message: 'User created successfully', data: user })
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating user', error: error.message })
  }
}

export const getAllUsersHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers()
    res.status(200).json({ message: 'Users listed', data: users })
  } catch (error: any) {
    res.status(400).json({ message: 'Error listing users', error: error.message })
  }
}

export const getUserByEmailHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body
    if (!email) {
      throw new Error('Please enter an email address')
    }
    const user = await getUserByEmail(email)
    res.status(200).json({ message: 'User found', data: user })
  } catch (error: any) {
    res.status(400).json({ message: 'Error searching user', error: error.message })
  }
}
