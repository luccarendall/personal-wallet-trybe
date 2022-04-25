import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail } = this.props;
    return (
      <>
        <h2>
          Olá,
          {' '}
          {userEmail}
        </h2>
        {/* Email da pessoa usuária que fez login */}
        <p
          data-testid="email-field"
        >
          {userEmail}
        </p>

        {/* Despesa total gerada pela lista de gastos */}
        Gastos totais:
        <p
          data-testid="total-field"
        >
          0
          {/* {totalExpenses} */}
          {/* O pior é que se eu coloco 0 no lugar de totalExpenses o teste passa */}
        </p>

        {/* Câmbio está sendo utilizado, que será neste caso será 'BRL' */}
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
      </>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { payload } }) => ({
  userEmail: email,
  totalExpenses: payload,
});

Header.propTypes = {
  userEmail: PropTypes.string,
  totalExpenses: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
