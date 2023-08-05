import express from 'express'
import dotenv from 'dotenv'
import errorHandler from './middlewares/errorHandler.js'
import { userRoutes } from './routes/userRouter.js'
import { songRoutes } from './routes/songRouter.js'
import { artistRoutes } from './routes/artistRouter.js'
import { albumRoutes } from './routes/albumRouter.js'
import { authRoutes } from './routes/authRouter.js'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api', authRoutes(), userRoutes(), songRoutes(), artistRoutes(), albumRoutes())

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}!`)
})
