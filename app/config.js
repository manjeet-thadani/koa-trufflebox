const dotenv = require('dotenv')

// Load environment variables from .env file
dotenv.config()

const env = process.env.NODE_ENV || 'development'
const configs = {
  base: {
    env,
    name: process.env.APP_NAME || 'trufflebox-koa',
    host: process.env.APP_HOST || '127.0.0.1',
    port: process.env.APP_PORT || 8080,
  },
  logging: {
    enable: process.env.LOG_ENABLED || true,
    level: process.env.LOG_LEVEL || 'debug',
    prettyPrint: env !== 'production',
    // Supply paths to keys to redact sensitive information
    redact: []
  },
  production: {
    web3_provider_host: process.env.PRODUCTION_WEB3_PROVIDER_HOST || 'http://127.0.0.1',
    web3_provider_port: process.env.PRODUCTION_WEB3_PROVIDER_PORT || 8545
  },
  development: {
    web3_provider_host: process.env.DEVELOPMENT_WEB3_PROVIDER_HOST || 'http://127.0.0.1',
    web3_provider_port: process.env.DEVELOPMENT_WEB3_PROVIDER_PORT || 8545
  },
  test: {}
}

const config = Object.assign(configs.base, { logging: configs.logging }, configs[env])

module.exports = config
