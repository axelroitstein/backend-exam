import jwt from 'jsonwebtoken'
import httpStatus from '../helpers/httpStatus.js'

export const auth = (req, res, next) => {
  const headers = req.headers
  const { authorization } = headers
  const token = authorization.split(' ')[1]

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  // console.log(decodedToken)
  const { role } = decodedToken
  const adminRole = 'ADMIN'

  if (role !== adminRole) {
    res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'You are not authorized to access this resource' })
  }
  next()
}
