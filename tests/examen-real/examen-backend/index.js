import express from 'express'
import dotenv from 'dotenv'
import errorHandler from './middlewares/errorHandler.js'
import { userRoutes } from './routes/userRouter.js'
import { songRoutes } from './routes/songRouter.js'
import { artistRoutes } from './routes/artistRouter.js'
import { albumRoutes } from './routes/albumRouter.js'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use('/api', userRoutes(), songRoutes(), artistRoutes(), albumRoutes())

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}!`)
})
