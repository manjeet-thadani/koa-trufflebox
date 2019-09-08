const Router = require('koa-router')
const serve = require('koa-static')
const accountsController = require('./controllers/account')
const transferController = require('./controllers/transfer')

module.exports = function () {
	let router = new Router()

	// index page
	router.get('/', serve(__dirname + '/public'))

	// get all available accounts
	router.get('/accounts', accountsController.getAccounts)

	// get balance of a account
	router.get('/accounts/:id', accountsController.getAccount)

	// transfer coins to account
	router.post('/transfer', transferController.transfer)

	return router
}
