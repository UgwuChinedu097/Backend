const express = require('express')
const {createWallet} = require('../controller/walletController')

const walletsRouter = express.Router()

walletsRouter.post('/createWallet/:userId', createWallet)

module.exports = walletsRouter