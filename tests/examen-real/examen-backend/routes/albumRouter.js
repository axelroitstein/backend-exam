import { Router } from 'express'
import { albumController } from '../controllers/albumController.js'

export const albumRoutes = () => {
  const albumRouter = Router()
  const { createAlbum, getAlbums, getAlbumById, updateAlbum, deleteAlbum } = albumController()

  albumRouter.route('/artists')
    .get(getAlbums)
    .post(createAlbum)

  albumRouter.route('/songs/:id')
    .get(getAlbumById)
    .put(updateAlbum)
    .delete(deleteAlbum)

  return albumRouter
}
