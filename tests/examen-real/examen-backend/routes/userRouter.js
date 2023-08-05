import { Router } from 'express'
import { userController } from '../controllers/userController.js'
import { userValidation, userParamsValidation } from '../middlewares/validations.js'

export const userRoutes = () => {
  const userRouter = Router()
  const { createUser, getUsers, getUserById, updateUser, deleteUser } = userController()

  userRouter.route('/users')
    .post(userValidation, createUser)
    .get(getUsers)

  userRouter.route('/users/:id')
    .get(getUserById)
    .put(userParamsValidation, userValidation, updateUser)
    .delete(deleteUser)

  return userRouter
}
