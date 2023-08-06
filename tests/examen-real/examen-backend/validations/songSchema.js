import Joi from 'joi'

export const songSchema = Joi.object({
  name: Joi.string().min(1).required(),
  genre: Joi.string().min(3).required(),
  duration: Joi.number().min(60).max(600).required()
})

export const songParamsSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9]+$/, { name: 'numbers' }).required()
})
