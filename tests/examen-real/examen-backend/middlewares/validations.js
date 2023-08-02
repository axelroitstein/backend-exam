import { schema } from '../validations/userSchema.js'

export const userValidation = (req, res, next) => {
  const data = req.body
  const { error } = schema.validate(data)
  error ? next(error) : next()
}
