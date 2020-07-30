import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import IncomeList from './IncomeList';
import { getExpenseList } from '../../actions/transactionsActions'

class Expense extends Component {

    componentDidMount() {
        this.props.getExpenseList(this.props.auth.user.name);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.transactions);
    }

    render() {
        const { expenseList } = this.props.transactions;
        return(
            <ExpenseWrapper>
                <div className="expense-wrapper">
                    <div className="header-wrapper">
                        <div className="header text-white">Expense / Sent</div>
                    </div>
                    <table className="text-white">
                        <tbody>
                            {expenseList.map((expense, idx) => {
                                return (
                                    <IncomeList key={`expense${idx}`} sender={expense.name} amount={`$${expense.amount.toFixed(2)}`} />
                                )
                            }) }
                        </tbody>
                    </table>
                </div>
            </ExpenseWrapper>
        )
    }
}

const ExpenseWrapper = styled.div`
.expense-wrapper {
    height: 25rem;
    background-color: #3a4149;
    border: 1px solid #000;
    margin-left: 2rem
}

table {
    width: 95%;
    margin: 0 auto;
}

tr:last-child {
    border-bottom: none
}

.header {
    text-align: left;
    font-family: 'Open Sans';
    padding: 1.3rem 1rem 1rem 1rem;

}
.header-wrapper {
    background-color: #343b41;
    border-bottom: 1px solid #000;
}
`

const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
})

export default connect(mapStateToProps, { getExpenseList })(Expense);