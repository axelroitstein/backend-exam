import { schema, userParamsSchema } from '../validations/userSchema.js'

export const userValidation = (req, _res, next) => {
  const data = req.body
  const { error } = schema.validate(data, { abortEarly: false })
  error ? next(error) : next()
}

export const userParamsValidation = (req, _res, next) => {
  const params = req.params
  const { error } = userParamsSchema.validate(params)
  error ? next(error) : next()
}
