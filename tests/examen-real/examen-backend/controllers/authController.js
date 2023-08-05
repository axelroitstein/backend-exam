import httpStatus from '../helpers/httpStatus.js'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const authController = () => {
  const login = async (req, res, next) => {
    try {
      const { email, password } = req.body
      const user = await prisma.users.findUnique({
        where: {
          email
        }
      })
      if (!email) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Invalid credentials' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Invalid credentials' })
      }

      const token = jwt.sign({
        name: user.firstName
      }, process.env.SECRET_KEY, { expiresIn: '3m' })

      return res.status(httpStatus.OK).json({
        message: 'login successful', token
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const register = async (req, res, next) => {}

  return {
    login,
    register
  }
}
