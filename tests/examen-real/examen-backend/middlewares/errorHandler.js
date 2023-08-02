import httpStatus from '../helpers/httpStatus.js'

const ERROR_HANDLERS = {

  validationError: (res, err) => {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ success: false, message: 'Validation error on request', error: err.message })
  },
  defaultError: (res, err) => {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: err.message })
  }
}

const errorHandler = (err, _, res, _next) => {
  const handler = ERROR_HANDLERS[err.name] ?? ERROR_HANDLERS.defaultError
  handler(res, err)
}

export default errorHandler
