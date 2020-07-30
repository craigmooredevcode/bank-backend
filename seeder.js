const Transaction = require('./models/Transaction');
const faker = require('faker');

const seedExpenseTransactions = async() => {
    try {
        const quantity = 12;
        const expenseTransaction = [];

        for(let i = 0; i < quantity; i++) {
            expenseTransaction.push(
                new Transaction({
                    source: `Lawal Olaotan`,
                    accountNumber: faker.finance.account(10),
                    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                    reference: faker.random.alphaNumeric(6),
                    amount: faker.finance.amount(600, 3500, 2),
                    date: faker.date.past(0.5)
                })
            )
        }

        await Transaction.remove();
        expenseTransaction.forEach(expense => {
            Transaction.create(expense);
        })

        // const test = {
        //     fname: `Lawal Olaotan`,
        //     lname: faker.name.lastName(),
        //     accountNumber: faker.finance.account(10),
        //     reference: faker.random.alphaNumeric(6),
        //     amount: faker.finance.amount(600, 3500, 2, '$'),
        //     date: faker.date.past(0.5)
        // }
        // console.log(expenseTransaction.length);
    } catch(err) {
        console.log(err)
    }
}

const seedIncomeTransactions = async () => {
    try {
        const quantity = 12;
        const incomeTransaction = [];

        for(let i = 0; i < quantity; i++) {
            incomeTransaction.push(
                new Transaction({
                    source: `${faker.name.firstName()} ${faker.name.lastName()}`,
                    accountNumber: faker.finance.account(10),
                    name: `Lawal Olaotan`,
                    reference: faker.random.alphaNumeric(6),
                    amount: faker.finance.amount(600, 3500, 2),
                    date: faker.date.past(0.5)
                })
            )
        }

        await Transaction.remove();
        incomeTransaction.forEach(income => {
            Transaction.create(income);
        })

    } catch(err) {
        console.log(err)
    }
}


module.exports = {seedExpenseTransactions, seedIncomeTransactions};

