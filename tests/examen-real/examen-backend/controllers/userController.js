import httpStatus from '../helpers/httpStatus.js'
import { PrismaClient } from '@prisma/client'
import addSoftDelete from '../middlewares/softDelete.js'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const userController = () => {
  const createUser = async (req, res, next) => {
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

  const getUsers = async (_, res, next) => {
    try {
      const users = await prisma.users.findMany({
        where: {
          deletedAt: null
        },
        include: {
          favSongs: true
        }
      })
      return res.status(httpStatus.OK).json(users)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getUserById = async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await prisma.users.findFirst({
        where: {
          id: Number(id),
          deletedAt: null
        },
        include: {
          favSongs: true
        }
      })
      return res.status(httpStatus.OK).json(user)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateUser = async (req, res, next) => {
    try {
      const { id } = req.params
      const { firstName, lastName, email, password, birthday } = req.body
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      await prisma.users.update({
        where: {
          id: Number(id)
        },
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          birthday: new Date(birthday),
          favSongs: {
            connect: [{ id: 15 }]
          }
        }
      })
      return res.status(httpStatus.OK).json({ success: true, message: 'User successfully updated' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params
      prisma.$use(addSoftDelete)

      await prisma.users.delete({
        where: {
          id: Number(id)
        }
      })
      return res.status(httpStatus.OK).json({ success: true, message: 'User successfully deleted' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
  }
}
