import { Router } from 'express'
import { userController } from '../controllers/userController.js'

export const userRoutes = () => {
  const userRouter = Router()
  const { createUser, getUsers, getUserById, updateUser, deleteUser } = userController()

  userRouter.route('/users')
    .get(getUsers)
    .post(createUser)

  userRouter.route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

  return userRouter
}
