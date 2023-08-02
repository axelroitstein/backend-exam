import httpStatus from '../helpers/httpStatus.js'
import { PrismaClient } from '@prisma/client'
import addSoftDelete from '../middlewares/softDelete.js'

const prisma = new PrismaClient()

export const userController = () => {
  const createUser = async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, birthday } = req.body
      await prisma.users.create({
        data: {
          firstName,
          lastName,
          email,
          password,
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
      await prisma.users.update({
        where: {
          id: Number(id)
        },
        data: {
          firstName,
          lastName,
          email,
          password,
          birthday
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
