import httpStatus from '../helpers/httpStatus.js'
import { PrismaClient } from '@prisma/client'
import addSoftDelete from '../middlewares/softDelete.js'

const prisma = new PrismaClient()

export const songController = () => {
  const createSong = async (req, res, next) => {
    try {
      const { name, genre, duration } = req.body
      await prisma.songs.create({
        data: {
          name,
          genre,
          duration
        }
      })
      res
        .status(httpStatus.CREATED)
        .json({ success: true, message: 'Song successfully created' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getSongs = async (_, res, next) => {
    try {
      const songs = await prisma.songs.findMany({
        where: {
          deletedAt: null
        }
      })
      res.status(httpStatus.OK).json(songs)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getSongById = async (req, res, next) => {
    try {
      const { id } = req.params
      const song = await prisma.songs.findUnique({
        where: {
          id: Number(id)
        }
      })
      res.status(httpStatus.OK).json(song)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateSong = async (req, res, next) => {
    try {
      const { id } = req.params
      const { name, genre, duration } = req.body
      await prisma.songs.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          genre,
          duration
        }
      })
      res
        .status(httpStatus.OK)
        .json({ success: true, message: 'Song successfully updated' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteSong = async (req, res, next) => {
    try {
      const { id } = req.params
      prisma.$use(addSoftDelete)
      await prisma.songs.delete({
        where: {
          id: Number(id)
        }
      })
      res
        .status(httpStatus.OK)
        .json({ success: true, message: 'Song successfully deleted' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    createSong,
    getSongs,
    getSongById,
    updateSong,
    deleteSong
  }
}
