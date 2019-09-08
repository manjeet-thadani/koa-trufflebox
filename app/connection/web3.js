const Web3 = require('web3')
const config = require('../config')
const logger = require('../logger')

const provider = `${config.web3_provider_host}:${config.web3_provider_port}`
logger.debug(`Requesting connected to ${provider} HTTP Provider`)

const web3 = new Web3(new Web3.providers.HttpProvider(provider))
logger.info(`Successfully connected to ${provider} HTTP Provider`)

module.exports = web3
