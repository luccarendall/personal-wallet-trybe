import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchApiCurrency } from '../actions';
import AddExpenseForm from '../components/AddExpenseForm';

class Wallet extends React.Component {
  componentDidMount() {
    const { FetchAPI } = this.props;
    const filteredCoins = FetchAPI();
    console.log(filteredCoins);
  }

  render() {
    const { FetchAPI, filteredCoins } = this.props;
    return (
      <>
        <Header />
        <AddExpenseForm />
        { FetchAPI ? <span>{filteredCoins}</span> : 'Buscando moedas...' }
      </>
    );
  }
}

// mapStateToProps, por meio do qual você mapeia todos os estados do Store, transformando-os em propriedades:
// const mapStateToProps = (state) => ({ todos: state.todos.allTodos });
const mapStateToProps = (state) => ({
  currencyAbbreviations: state.wallet.currencyAbbreviations,
});

// mapDispatchToProps, por meio do qual você conseguirá enviar a ação para alterar o estado da aplicação.
// const mapDispatchToProps = dispatch => ({
// myDispatch: state => dispatch(newAction(state))});
const mapDispatchToProps = (dispatch) => ({
  FetchAPI: () => dispatch(fetchApiCurrency()),
});

Wallet.propTypes = {
  FetchAPI: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
