import Joi from 'joi'

export const schema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
  birthday: Joi.date().required()
})

export const userParamsSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9]+$/, { name: 'numbers' }).required()
})
