import { Router } from 'express'
import { songController } from '../controllers/songController.js'
import { auth } from '../middlewares/roleAuth.js'
import { songValidation, songParamsValidation } from '../middlewares/validations.js'

export const songRoutes = () => {
  const songRouter = Router()
  const { createSong, getSongs, getSongById, updateSong, deleteSong } = songController()

  songRouter.route('/songs')
    .get(getSongs)
    .post(songValidation, auth, createSong)

  songRouter.route('/songs/:id')
    .get(getSongById)
    .put(songParamsValidation, songValidation, auth, updateSong)
    .delete(auth, deleteSong)

  return songRouter
}
