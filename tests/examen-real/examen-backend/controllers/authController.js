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
        name: user.firstName,
        role: user.role
      }, process.env.SECRET_KEY, { expiresIn: '2m' })

      const refreshToken = jwt.sign({
        name: user.firstName,
        role: user.role
      }, process.env.SECRET_REFRESH_KEY, { expiresIn: '30m' })
      return res.status(httpStatus.OK).json({
        message: 'login successful', token, refreshToken
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const refresh = async (req, res, next) => {
    try {
      const { refreshToken } = req.body

      const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY)

      const token = jwt.sign({
        name: decoded.name,
        role: decoded.role
      }, process.env.SECRET_KEY, { expiresIn: '1m' })

      const newRefreshtoken = jwt.sign({
        name: decoded.name
      }, process.env.SECRET_KEY, { expiresIn: '30m' })

      res.status(httpStatus.OK).json({
        message: 'Token refreshed successfully', token, refreshToken: newRefreshtoken
      })
    } catch (error) {
      next(error)
    }
  }

  const register = async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, birthday } = req.body
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      await prisma.users.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          birthday: new Date(birthday)
        }
      })
      return res.status(httpStatus.CREATED).json({ success: true, message: 'User successfully created' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    login,
    refresh,
    register
  }
}
