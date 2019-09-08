const connection = require('../connection')

const getAccounts = async (ctx, next) => {
  const accounts = await connection.getAccounts()
  ctx.body = { accounts }

  next()
}

const getAccount = async (ctx, next) => {
  const address = ctx.params.id

  const balance = await connection.getBalance(address)
  ctx.body = { balance, account: address }

  next()
}

module.exports = { getAccounts, getAccount }
