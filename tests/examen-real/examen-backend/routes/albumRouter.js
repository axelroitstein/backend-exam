import { Router } from 'express'
import { albumController } from '../controllers/albumController.js'
import { albumValidation, albumParamsValidation } from '../middlewares/validations.js'
import { auth } from '../middlewares/roleAuth.js'

export const albumRoutes = () => {
  const albumRouter = Router()
  const { createAlbum, getAlbums, getAlbumById, updateAlbum, deleteAlbum } = albumController()

  albumRouter.route('/albums')
    .get(getAlbums)
    .post(albumValidation, auth, createAlbum)

  albumRouter.route('/albums/:id')
    .get(getAlbumById)
    .put(albumParamsValidation, albumValidation, auth, updateAlbum)
    .delete(auth, deleteAlbum)

  return albumRouter
}
