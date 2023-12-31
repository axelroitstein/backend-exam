import { Router } from 'express'
import { userController } from '../controllers/userController.js'
import { userValidation, userParamsValidation } from '../middlewares/validations.js'
import { auth, userAuth } from '../middlewares/roleAuth.js'
export const userRoutes = () => {
  const userRouter = Router()
  const { createUser, getUsers, getUserById, updateUser, deleteUser } = userController()

  userRouter.route('/users')
    .post(userValidation, createUser)
    .get(auth, getUsers)

  userRouter.route('/users/:id')
    .get(auth, getUserById)
    .put(userParamsValidation, userValidation, userAuth, updateUser)
    .delete(auth, deleteUser)

  return userRouter
}
