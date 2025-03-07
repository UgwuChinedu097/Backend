const express = require('express')
const {createWallets} = require('../controller/walletController')

const walletsRouter = express.Router()

walletsRouter.post('/createWallet', createWallets)

module.exports = walletsRouter