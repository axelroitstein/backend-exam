import { Router } from 'express'
import { artistController } from '../controllers/artistController.js'

export const artistRoutes = () => {
  const artistRouter = Router()
  const { createArtist, getArtists, getArtistById, updateArtist, deleteArtist } = artistController()

  artistRouter.route('/artists')
    .get(getArtists)
    .post(createArtist)

  artistRouter.route('/songs/:id')
    .get(getArtistById)
    .put(updateArtist)
    .delete(deleteArtist)

  return artistRouter
}
