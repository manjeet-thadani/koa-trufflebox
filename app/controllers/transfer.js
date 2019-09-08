const connection = require('../connection')

const transfer = async (ctx, next) => {
    let { sender, receiver, amount } = ctx.request.body
    
    await connection.transfer({ sender, receiver, amount })
    ctx.body = { status: true }

    next()
}

module.exports = { transfer }
