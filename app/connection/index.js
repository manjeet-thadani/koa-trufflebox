const truffleContract = require('truffle-contract')
const boomifyError = require('../util/boomifyError')
const metacoinArtifact = require('../../build/contracts/MetaCoin.json')
const web3 = require('./web3')

const MetaCoin = truffleContract(metacoinArtifact)
MetaCoin.setProvider(web3.currentProvider)

const getAccounts = async () => {
	return new Promise((resolve, reject) => {
		web3.eth.getAccounts((error, accounts) => {
			if (error) {
				reject(boomifyError({ error, message: 'Unable to get accounts' }))
			}

			if (!accounts || accounts.length === 0) {
				error = new Error('Unable to get accounts')
				reject(boomifyError({ error }))
			}

			resolve(accounts)
		})
	})
}

const getBalance = (account) => {
	return new Promise((resolve, reject) => {
		MetaCoin.deployed().then((instance) => {
			return instance.getBalance.call(account, { from: account })
		}).then((value) => {
			resolve(value.valueOf())
		}).catch((error) => {
			reject(boomifyError({ error, message: 'Unable to get balance of account' }))
		})
	})
}

const transfer = ({ sender, receiver, amount }) => {
	return new Promise((resolve, reject) => {
		MetaCoin.deployed().then((instance) => {
			return instance.sendCoin(receiver, amount, { from: sender })
		}).then(resolve)
			.catch((error) => {
				reject(boomifyError({ error, message: 'Unable to transfer coins' }))
			})
	})
}

module.exports = { getAccounts, getBalance, transfer }
