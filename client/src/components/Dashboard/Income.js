import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getIncomeList } from '../../actions/transactionsActions';
// import Loader from '../Loader/Loader';
import IncomeList from './IncomeList';


class Income extends Component {

    componentDidMount() {
        this.props.getIncomeList(this.props.auth.user.name);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.transactions);
    }

    render() {
        const { incomeList } = this.props.transactions;
        return (
            <IncomeWrapper>
                <div className="income-wrapper">
                    <div className="header-wrapper">
                        <div className="header text-white">Income / Received</div>
                    </div>
                    <table className="text-white">
                        <tbody>
                            {incomeList.map((income, idx) => {
                                return (
                                    <IncomeList key={`income${idx}`} sender={income.source} amount={`$${income.amount.toFixed(2)}`} />
                                )
                            }) }
                        </tbody>
                    </table>
                </div>
            </IncomeWrapper>
        )
    }
}

const IncomeWrapper = styled.div`
margin-left: 2rem;
.income-wrapper {
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
});

export default connect(mapStateToProps, { getIncomeList })(Income);