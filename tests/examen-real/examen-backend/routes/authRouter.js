import { Router } from 'express'
import { authController } from '../controllers/authController.js'

export const authRoutes = () => {
  const authRouter = Router()
  const { login, register } = authController()

  authRouter.route('/auth/login')
    .post(login)

  authRouter.route('/auth/register')
    .post(register)

  return authRouter
}
