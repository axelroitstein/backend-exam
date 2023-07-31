import httpStatus from '../helpers/httpStatus.js'
import { PrismaClient } from '@prisma/client'
import addSoftDelete from '../middlewares/softDelete.js'

const prisma = new PrismaClient()

export const albumController = () => {
  const createAlbum = async (req, res, next) => {
    try {
      const { name, releaseDate } = req.body
      await prisma.albums.create({
        data: {
          name,
          releaseDate
        }
      })
      res
        .status(httpStatus.CREATED)
        .json({ success: true, message: 'Album successfully created' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getAlbums = async (_, res, next) => {
    try {
      const albums = await prisma.albums.findMany({
        where: {
          deletedAt: null
        }
      })
      res.status(httpStatus.OK).json(albums)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getAlbumById = async (req, res, next) => {
    try {
      const { id } = req.params
      const album = await prisma.albums.findUnique({
        where: {
          id: Number(id)
        }
      })
      res.status(httpStatus.OK).json(album)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateAlbum = async (req, res, next) => {
    try {
      const { id } = req.params
      const { name, releaseDate } = req.body
      await prisma.album.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          releaseDate
        }
      })
      res
        .status(httpStatus.OK)
        .json({ success: true, message: 'Album successfully updated' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteAlbum = async (req, res, next) => {
    try {
      const { id } = req.params
      prisma.$use(addSoftDelete)
      await prisma.albums.delete({
        where: {
          id: Number(id)
        }
      })
      res
        .status(httpStatus.OK)
        .json({ success: true, message: 'Album successfully deleted' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    createAlbum,
    getAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum
  }
}
