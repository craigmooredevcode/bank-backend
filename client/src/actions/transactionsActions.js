import axios from "axios";
import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  TRANSACTIONS_LOADING,
  GET_INCOME_LIST,
  GET_EXPENSE_LIST,
  TRANSACTION_STATUS,
  RESET_TRANSACTION_STATUS,
  SEARCH
} from "./types";

export const getTransactions = () => dispatch => {
  dispatch(transactionsLoading());
  axios.get("/api/transactions").then(res =>
    dispatch({
      type: GET_TRANSACTIONS,
      payload: res.data
    })
  );
};

export const getIncomeList = name => dispatch => {
  axios.get(`/api/transactions/${name}`).then(res => {
    dispatch({
      type: GET_INCOME_LIST,
      payload: res.data
    })
  }).catch(err => {
    console.log(err);
  })
}

export const getExpenseList = source => dispatch => {
  axios.get(`/api/transactions/find-source/${source}`).then(res => {
    dispatch({
      type: GET_EXPENSE_LIST,
      payload: res.data
    })
  }).catch(err => {
    console.log(err.res);
  })
}

export const addTransaction = transaction => dispatch => {
  axios.post("/api/transactions", transaction).then(res => {
      dispatch({ type: RESET_TRANSACTION_STATUS });
      dispatch({
        type: ADD_TRANSACTION,
        payload: res.data
      })
    }
  ).catch(err => {
    console.log(err.response.data);
    dispatch({ type: RESET_TRANSACTION_STATUS });
    dispatch({
      type: TRANSACTION_STATUS,
      payload: err.response.data.userExist
    })
  });
};

export const search = value => {
  return {
    type: SEARCH,
    payload: value
  };
};

export const transactionsLoading = () => {
  return {
    type: TRANSACTIONS_LOADING
  };
};
