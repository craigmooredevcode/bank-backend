const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//Transaction model
const Transaction = require('../../models/Transaction');
const User = require('../../models/User');


async function transfer(from, to, amount) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const opts = { session, returnOriginal: false, useFindAndModify: false };
        const sender = await User.findOneAndUpdate({name: from}, { $inc: { balance: -amount } }, opts);

        const receiver = await User.findOneAndUpdate({name: to}, { $inc: { balance: +amount} }, opts );

        await session.commitTransaction();
        session.endSession();
        return { from: sender, to: receiver };
    } catch(err) {
        await session.abortTransaction();
        session.endSession();
        // throw error;
    }
}

//  @route    GET api/transactions
//  @desc     Get all transactions
//  @access   private
router.get('/', (req, res) => {
    Transaction
        .find()
        .sort({date: -1})
        .then(transactions => res.json(transactions))
})

//  @route    POST api/transactions
//  @desc     Post a transaction
//  @access   private
router.post('/', (req, res) => {
    const newTransaction = new Transaction({
        source: req.body.source,
        accountNumber: req.body.accountNumber,
        name: req.body.name,
        reference: req.body.reference,
        amount: req.body.amount
    })
    newTransaction
        .save()
        .then(transaction => res.json(transaction))

    transfer(req.body.source, req.body.name, req.body.amount);
})


// Getting incomes for a particular user
//  @route    GET api/transactions/:name
//  @desc     Get all transactions
//  @access   private
router.get('/:name', (req, res) => {
    const receiverName = req.params.name;
    Transaction
        .find({ name: receiverName })
        .sort({date: -1})
        .then(transactions => res.json(transactions))
})


// Getting expenses for a particular user
//  @route    GET api/transactions/:name
//  @desc     Get all transactions
//  @access   private
router.get('/find-source/:source', (req, res) => {
    const senderName = req.params.source;
    Transaction
        .find({ source: senderName })
        .sort({date: -1})
        .then(transactions => res.json(transactions))
})


module.exports = router;