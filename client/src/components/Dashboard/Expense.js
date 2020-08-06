import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import IncomeList from './IncomeList';
import { getExpenseList } from '../../actions/transactionsActions'

class Expense extends Component {

    state = {
        showExpenseList: [],
    }

    componentDidMount() {
        this.props.getExpenseList(this.props.auth.user.name);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.transactions);
        if(prevProps.transactions !== this.props.transactions) {
            const initList = this.props.transactions.expenseList.slice(0, 5);
            this.setState({
                showExpenseList: initList
            })
        }
    }

    goToPage = (e) => {
        const endLimit = parseInt(e.target.id) * 5;
        const startLimit = endLimit - 5;
        console.log(endLimit, startLimit);
        const newList = this.props.transactions.expenseList.slice(startLimit, endLimit);
        this.setState({
            showExpenseList: newList
        })
    }

    render() {
        const { expenseList } = this.props.transactions;
        const { showExpenseList } = this.state
        const pageNumbers = Math.ceil(expenseList.length / 5);
        let pageArray = [];
        for(let i = 1; i < pageNumbers + 1; i++) {
            pageArray.push(i)
        }
        console.log(pageArray);
        return(
            <ExpenseWrapper>
                <div className="expense-wrapper">
                    <div className="header-wrapper">
                        <div className="header text-white">Expense / Sent</div>
                    </div>
                    <table className="text-white">
                        <tbody>
                            {showExpenseList.map((expense, idx) => {
                                return (
                                    <IncomeList key={`expense${idx}`} sender={expense.name} amount={`$${expense.amount.toFixed(2)}`} />
                                )
                            }) }
                        </tbody>
                        <tfoot>
                            <ul className="pagination mt-4 ml-auto">
                                {
                                    pageArray.map((page, idx) => {
                                        if(parseInt(page) < 5) {
                                            return(
                                                <li className="page ml-3" key={`page_${idx}`}>
                                                    <button className="paginationBtn" onClick={this.goToPage} 
                                                    id={page}>
                                                        {page}
                                                    </button>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </tfoot>
                    </table>
                </div>
            </ExpenseWrapper>
        )
    }
}

const ExpenseWrapper = styled.div`
font-family: 'DM Sans', sans-serif;
.expense-wrapper {
    height: 25rem;
    background-color: #3a4149;
    border: 1px solid #000;
    // margin-left: 2rem
}

table {
    width: 95%;
    margin: 0 auto;
    position: relative;
}

tr:last-child {
    border-bottom: none
}

.pagination {
    position: absolute;
    top: 270px;
    left: 320px;
}

.paginationBtn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 14px;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 0);
}

.paginationBtn:focus, .paginationBtn:active {
    outline: none;
    background-color: #008000;
    border: none;
}

.header {
    text-align: left;
    font-family: 'DM Sans', sans-serif;
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