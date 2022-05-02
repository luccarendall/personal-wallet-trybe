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
      ...state,
      currencies: action.payload,
    };

  case 'FORM_ACTION':
    return {
      ...state,
      // o spread espalha o que tem o state.expenses e adiciona action.submit
      expenses: [...state.expenses,
        action.submit],
    };

  default:
    return state;
  }
};

export default wallet;
