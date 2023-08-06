import Joi from 'joi'

export const artistSchema = Joi.object({
  name: Joi.string().min(3).required(),
  nationality: Joi.string().min(4).required()
})

export const artistParamsSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9]+$/, { name: 'numbers' }).required()
})
