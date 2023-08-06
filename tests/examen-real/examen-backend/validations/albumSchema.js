import Joi from 'joi'

export const albumSchema = Joi.object({
  name: Joi.string().min(1).required(),
  releaseDate: Joi.date().required()
})

export const albumParamsSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9]+$/, { name: 'numbers' }).required()
})
