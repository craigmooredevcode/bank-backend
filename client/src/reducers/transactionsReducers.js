import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  TRANSACTIONS_LOADING,
  GET_INCOME_LIST,
  GET_EXPENSE_LIST,
  SEARCH
} from "../actions/types";

const initialState = {
  transactions: [],
  loading: false,
  value: "",
  works: [],
  incomeList: [],
  expenseList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        loading: false
      };
    case GET_INCOME_LIST:
      return {
        ...state,
        incomeList: [...action.payload, ...state.incomeList]
      }
    case GET_EXPENSE_LIST:
      return {
        ...state,
        expenseList: [...action.payload, ...state.expenseList]
      }
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
    case TRANSACTIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SEARCH:
      const value = action.payload;
      const works = state.transactions.filter(val => val.includes(value));
      return {
        ...state,
        value,
        works
      };
    default:
      return state;
  }
}
