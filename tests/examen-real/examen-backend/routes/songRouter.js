import { Router } from 'express'
import { songController } from '../controllers/songController.js'

export const songRoutes = () => {
  const songRouter = Router()
  const { createSong, getSongs, getSongById, updateSong, deleteSong } = songController()

  songRouter.route('/songs')
    .get(getSongs)
    .post(createSong)

  songRouter.route('/songs/:id')
    .get(getSongById)
    .put(updateSong)
    .delete(deleteSong)

  return songRouter
}
