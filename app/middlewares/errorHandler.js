const Boom = require('@hapi/boom')
const boomifyError = require('../util/boomifyError')
const logger = require('../logger')

const errorHandler = async (ctx, next) => {
	try {
		await next()
	} catch (error) {
		if (!Boom.isBoom(error)) {
			error = boomifyError({ error, statusCode: 400, message: 'Error occurred' })
		}
		
		logger.error({ error }, error.output.payload.message)

		ctx.status = error.output.statusCode
		ctx.body = error.output.payload.message
	}
}

module.exports = errorHandler