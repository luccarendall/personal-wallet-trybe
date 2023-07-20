import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style/header.css';

class Header extends Component {
  componentDidMount() {
    const { totalExpenses } = this.props;
    console.log(totalExpenses);
  }

  render() {
    const { userEmail, totalExpenses } = this.props;

    // Extrair a parte antes do "@" no userEmail
    const username = userEmail.split('@')[0];

    return (
      <div className="header-container">
        <h2 className="header-title">
          Olá,
          {' '}
          {username}
        </h2>
        {/* Email da pessoa usuária que fez login */}
        <p className="header-email" data-testid="email-field">
          {userEmail}
        </p>

        {/* Despesa total gerada pela lista de gastos */}
        <div className="header-total">
          <div>
            <p>
              Gastos totais:
            </p>
          </div>
          <p className="total-expenses" data-testid="total-field">
            {totalExpenses.length < 1
              ? 0
              : totalExpenses
                .map(
                  (
                    obj,
                  ) => Number(obj.value) * Number(obj.exchangeRates[obj.currency].ask),
                )
                .reduce((a, b) => a + b)
                .toFixed(2)}
          </p>
        </div>

        {/* Câmbio que está sendo utilizado, que será neste caso será 'BRL' */}
        <p className="header-currency" data-testid="header-currency-field">
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  userEmail: email,
  totalExpenses: expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string,
  totalExpenses: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
