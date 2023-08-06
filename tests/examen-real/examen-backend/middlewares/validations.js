import { schema, userParamsSchema } from '../validations/userSchema.js'
import { artistSchema, artistParamsSchema } from '../validations/artistSchema.js'
import { albumSchema, albumParamsSchema } from '../validations/albumSchema.js'
import { songSchema, songParamsSchema } from '../validations/songSchema.js'

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

export const artistValidation = (req, _res, next) => {
  const data = req.body
  const { error } = artistSchema.validate(data, { abortEarly: false })
  error ? next(error) : next()
}

export const artistParamsValidation = (req, _res, next) => {
  const params = req.params
  const { error } = artistParamsSchema.validate(params)
  error ? next(error) : next()
}

export const albumValidation = (req, _res, next) => {
  const data = req.body
  const { error } = albumSchema.validate(data, { abortEarly: false })
  error ? next(error) : next()
}

export const albumParamsValidation = (req, _res, next) => {
  const params = req.params
  const { error } = albumParamsSchema.validate(params)
  error ? next(error) : next()
}

export const songValidation = (req, _res, next) => {
  const data = req.body
  const { error } = songSchema.validate(data, { abortEarly: false })
  error ? next(error) : next()
}

export const songParamsValidation = (req, _res, next) => {
  const params = req.params
  const { error } = songParamsSchema.validate(params)
  error ? next(error) : next()
}
