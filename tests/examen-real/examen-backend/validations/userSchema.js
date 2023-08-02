import Joi from 'joi'

export const schema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).max(16).required(),
  birthday: Joi.date().required()
})
