import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { emailAction } from '../actions';
import './style/login.css';

class Login extends React.Component {
// pressionar o botão 'Entrar' usando a tecla Enter
// React.useEffect(() => { window.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter') {
//       document.getElementsByClassName('logar').click();
//     }
//   })
// });

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pwd: '',
    };
  }

allValidations = () => {
  const { email, pwd } = this.state;

  const validEmail = /\S+@\S+\.\S+/; // 4º ou 5º tentativa de regex e única que funcionou até agora. https://stackoverflow.com/questions/35788383/regex-validation-in-javascript-email
  const minimalLengthPwd = 5;
  if ((pwd.length > minimalLengthPwd) && (validEmail.test(email))) {
    return false;
  }
  return true;
}

// Handler genérico
handleChange = ({ target }) => {
  const { name, value } = target;
  this.setState({ [name]: value });
}

// handleEmailState(event) {
//   if (this.allValidations === true) {
//     this.setState({ email: event.target.email });
//   }
// }

render() {
  const { email, pwd } = this.state;
  const { myDispatch } = this.props;
  return (
    <div>
      <div>
        <h1>Faça login na sua carteira</h1>
      </div>
      <form className="form-login">

        <label htmlFor="email-input" className="label-login">
          <input
            type="text"
            name="email"
            className="login-input"
            placeholder="Seu email"
            required
            onChange={ this.handleChange }
            value={ email }
            data-testid="email-input"
          />
        </label>

        <label htmlFor="pwd-input" className="label-login">
          <input
            type="password"
            name="pwd"
            className="login-input"
            placeholder="Senha"
            required
            onChange={ this.handleChange }
            value={ pwd }
            data-testid="password-input"
          />
        </label>

        {/* https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button */}
        <Link to="/carteira">
          <button
            type="button"
            className="login-btn"
            //  this.handleSubmit,
            //  history.push('/carteira');
            disabled={ this.allValidations() }
            onClick={ () => myDispatch(email) } // Btn que dispacha o que foi inserido nos inputs para a Store
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
}
}

const mapDispatchToProps = (dispatch) => ({
  myDispatch: (email) => dispatch(emailAction(email)),
});

Login.propTypes = {
  myDispatch: PropTypes.object,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);

// Ref: https://bit.ly/3uXWDPX, https://bit.ly/3OqXv7e
