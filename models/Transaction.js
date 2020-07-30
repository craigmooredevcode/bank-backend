const mongoose = require('mongoose');
const Schema =  mongoose.Schema;


const TransactionSchema = new Schema({
    source: {
        type: String,
        required: true
    },
    accountNumber: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Transaction = mongoose.model('transaction', TransactionSchema);