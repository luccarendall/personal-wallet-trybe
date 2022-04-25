// Esse reducer será responsável por tratar as informações da pessoa usuária
// import { emailAction } from '../actions';

const INICIAL_STATE = {
  email: '',
};

const user = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case 'EMAIL_ACTION':
    return {
      // ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
