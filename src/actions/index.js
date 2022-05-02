export const EMAIL_ACTION = 'EMAIL_ACTION';
export const WALLET_ACTION = 'WALLET_ACTION';
export const FORM_ACTION = 'FORM_ACTION';
export const REMOVE_ACTION = 'REMOVE_ACTION';

export const emailAction = (email) => ({
  type: EMAIL_ACTION,
  email,
});

export const walletAction = (payload) => ({
  type: WALLET_ACTION,
  payload,
});

export function fetchApiCurrency() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(
        walletAction(
          // Prourando na API as siglas das moedas e filtrando pra tirar a moeda Tether (USDT)
          Object.keys(data).filter((key) => key !== 'USDT'),
        ),
      ));
  };
}

export const formAction = (submit) => ({
  type: FORM_ACTION,
  submit,
});

export const removeAction = (submit) => ({
  type: REMOVE_ACTION,
  submit,
});
