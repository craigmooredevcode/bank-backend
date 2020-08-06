const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();


//Transaction model
const Transaction = require('../../models/Transaction');
const User = require('../../models/User');


const sendFailedTrxEmail = async(destination, amount) => {
  const user = await User.findOne({name: destination});
  const {email, name, accountNumber} = user;
  let modAccNum = accountNumber.toString().split("").splice(6, 4);
  modAccNum = modAccNum.join('');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'noreply@primeonline.online',
    to: email,
    subject: `Prime Bank - Failed Transfer`,
    // text: 'It works!'
    html: `
      <h2>Oh no, your transfer transaction failed!</h2>
      <p>We are sorry to inform you that your transfer transaction for the amount of $${amount} failed on your Prime Savings Account XXXXXX${modAccNum}</p>
      <p>Please you can try again <a href="">here</a> and if you continue having an error, do not hesitate to send a reply to this mail or call us on 9000099</p>
      <p>Time: ${Date(Date.now().toString())}</p>
      <br />
      <p><em>Thank you, The Prime Bank Team</em></p>
    `
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if(err) {
      console.log('Error occurs', err);
    } else {
      console.log('Email sent!')
    }
  })
}


const sendEmail = async (destination, type, amount) => {
  const user = await User.findOne({name: destination});
  const {email, name, balance, accountNumber} = user;
  let modAccNum = accountNumber.toString().split("").splice(6, 4);
  modAccNum = modAccNum.join('');

  // send email on successful transactions

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'noreply@primeonline.online',
    to: email,
    subject: `Prime Bank - ${type} Alert [ Amount: ${amount}.00 ]`,
    // text: 'It works!'
    html: `
      <p>This is to inform you that a ${type} transaction just occurred on your account.<br/>
      See details below:</p>
      <p>Account Name: ${name}</p>
      <p>Account Number: XXXXXX${modAccNum}</p>
      <p>Amount: ${amount}.00</p>
      <p>Balance: ${balance}</p>
      <p>Time: ${Date(Date.now().toString())}</p>
      <p><a href="#">Sign in</a> to your account now and start sending payment</p>
      <p>If you have any questions, <a href="https://primeonline.online/#contact">contact us</a></p>
      <br />
      <p><em>Thank you, The Prime Bank Team</em></p>
    `
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if(err) {
      console.log('Error occurs', err);
    } else {
      console.log('Email sent!')
    }
  })
}

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
  const userExist = User.findOne({name: req.body.name}).then(user => {
    if(user.accountNumber === req.body.accountNumber) {
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
    sendEmail(req.body.source, 'Debit', req.body.amount);
    sendEmail(req.body.name, 'Credit', req.body.amount);
    } else {
      sendFailedTrxEmail(req.body.source, req.body.amount);
      return res.status(400).send({
        userExist: false
      })
    }
  }).catch(err => {
    sendFailedTrxEmail(req.body.source, req.body.amount);
    res.status(400).send({
      userExist: false
    })
  })
    
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