import { Router } from 'express'
import { artistController } from '../controllers/artistController.js'
import { artistValidation, artistParamsValidation } from '../middlewares/validations.js'
import { auth } from '../middlewares/roleAuth.js'

export const artistRoutes = () => {
  const artistRouter = Router()
  const { createArtist, getArtists, getArtistById, updateArtist, deleteArtist } = artistController()

  artistRouter.route('/artists')
    .get(getArtists)
    .post(artistValidation, auth, createArtist)

  artistRouter.route('/artists/:id')
    .get(getArtistById)
    .put(artistParamsValidation, artistValidation, auth, updateArtist)
    .delete(auth, deleteArtist)

  return artistRouter
}
