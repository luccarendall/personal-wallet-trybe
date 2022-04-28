// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_ACTION } from '../actions';

const INICIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_ACTION:
    return {
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
