import express from 'express'
import dotenv from 'dotenv'
import errorHandler from './middlewares/errorHandler.js'
import { userRoutes } from './routes/userRouter.js'
import { songRoutes } from './routes/songRouter.js'
import { artistRoutes } from './routes/artistRouter.js'
import { albumRoutes } from './routes/albumRouter.js'
import { authRoutes } from './routes/authRouter.js'
import { expressjwt as jwt } from 'express-jwt'
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(
  jwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256']
  }).unless({ path: ['/api/auth/login', '/api/auth/register', '/api/auth/refresh'] })
)

app.use(express.json())

app.use('/api', authRoutes(), userRoutes(), songRoutes(), artistRoutes(), albumRoutes())

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}!`)
})
