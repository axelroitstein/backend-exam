import httpStatus from '../helpers/httpStatus.js'
import { PrismaClient } from '@prisma/client'
import addSoftDelete from '../middlewares/softDelete.js'

const prisma = new PrismaClient()

export const artistController = () => {
  const createArtist = async (req, res, next) => {
    try {
      const { name, nationality } = req.body
      await prisma.artists.create({
        data: {
          name,
          nationality
        }
      })
      res
        .status(httpStatus.CREATED)
        .json({ success: true, message: 'Artist successfully created' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getArtists = async (_, res, next) => {
    try {
      const artists = await prisma.artists.findMany({
        where: {
          deletedAt: null
        }
      })
      res.status(httpStatus.OK).json(artists)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getArtistById = async (req, res, next) => {
    try {
      const { id } = req.params
      const artist = await prisma.artists.findUnique({
        where: {
          id: Number(id)
        }
      })
      res.status(httpStatus.OK).json(artist)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateArtist = async (req, res, next) => {
    try {
      const { id } = req.params
      const { name, nationality } = req.body
      await prisma.artists.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          nationality
        }
      })
      res
        .status(httpStatus.OK)
        .json({ success: true, message: 'Artist successfully updated' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteArtist = async (req, res, next) => {
    try {
      const { id } = req.params
      prisma.$use(addSoftDelete)
      await prisma.artists.delete({
        where: {
          id: Number(id)
        }
      })
      res
        .status(httpStatus.OK)
        .json({ success: true, message: 'Artist successfully deleted' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    createArtist,
    getArtists,
    getArtistById,
    updateArtist,
    deleteArtist
  }
}
