import httpStatus from '../helpers/httpStatus.js'

const ERROR_HANDLERS = {
  defaultError: (res, err) => {
    res
      .status(httpStatus.OK)
      .json({ success: false, message: err.message })
  }
}

const errorHandler = (err, _, res, next) => {
  const handler = ERROR_HANDLERS[err.name] ?? ERROR_HANDLERS.defaultError
  handler(res, err)
}

export default errorHandler
