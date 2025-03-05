const express = require('express')
const {createBill, getAllBills, getOne, updateBill, deleteById, splitBillEqually, checkOwedAmounts, findFullPayments,  trackOverpayments, findTopPayer, findTotalMoneyPaid } = require('../controllerBill/controller')
const billRouter = express.Router()
 


billRouter.post('/create', createBill)
billRouter.get('/get', getAllBills)
billRouter.get('/get/:id', getOne)
billRouter.patch('/:billId/update/:partId', updateBill)
billRouter.delete('/delete/:id', deleteById)
billRouter.patch("/bills/:id/split", splitBillEqually);
billRouter.get("/bills/:id/owed", checkOwedAmounts);
billRouter.get("/bills/:id/full-payments", findFullPayments);
billRouter.get("/bills/:id/overpayments", trackOverpayments);
billRouter.get("/bills/:id/top-payer", findTopPayer);
billRouter.get("/bills/:id/total-paid", findTotalMoneyPaid);



module.exports = billRouter