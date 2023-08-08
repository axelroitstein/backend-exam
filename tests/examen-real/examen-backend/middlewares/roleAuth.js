import jwt from 'jsonwebtoken'
import httpStatus from '../helpers/httpStatus.js'

export const auth = (req, res, next) => {
  const headers = req.headers
  const { authorization } = headers
  const token = authorization.split(' ')[1]

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  const { role } = decodedToken
  const adminRole = 'ADMIN'

  if (role !== adminRole) {
    return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'You are not authorized to access this resource' })
  }
  next()
}

export const userAuth = (req, res, next) => {
  const headers = req.headers
  const { authorization } = headers
  const token = authorization.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  const { id: paramId } = req.params
  const { id: tokenId } = decodedToken
  if (Number(paramId) !== tokenId) {
    return res.status(httpStatus.FORBIDDEN).json({ success: false, message: 'You cannot modify data from another user' })
  }
  next()
}
