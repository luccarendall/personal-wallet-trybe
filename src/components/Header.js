import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      <>
        <h2>
          Olá,
          {' '}
          {username}
        </h2>
        {/* Email da pessoa usuária que fez login */}
        <p data-testid="email-field">
          {userEmail}
        </p>

        {/* Despesa total gerada pela lista de gastos */}
        Gastos totais:
        <p data-testid="total-field">
          {totalExpenses.length < 1
            ? 0
            : totalExpenses
              .map(
                (obj) => Number(obj.value) * Number(obj.exchangeRates[obj.currency].ask),
              )
              .reduce((a, b) => a + b)
              .toFixed(2)}
        </p>

        {/* Câmbio está sendo utilizado, que será neste caso será 'BRL' */}
        <p data-testid="header-currency-field">
          BRL
        </p>
      </>
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
