// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INICIAL_STATE = {
  payload: 0,
};

const wallet = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case 'WALLET_ACTION':
    return {
      payload: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
