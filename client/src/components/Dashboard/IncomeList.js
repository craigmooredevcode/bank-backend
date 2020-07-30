import React, { Component } from 'react';
import styles from './IncomeList.module.css';

class IncomeList extends Component {
    render () {
        return (
            <tr className={styles.SingleIncome}>
                <td className={styles.Cell}>{this.props.sender}</td>
                <td className={styles.Cell}>{this.props.amount}</td>
            </tr>
        )
    }
}

export default IncomeList;