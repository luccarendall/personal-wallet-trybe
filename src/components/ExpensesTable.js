import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class ExpensesTable extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          { expenses.map((obj, index) => (
            <tr key={ index }>
              <td>{obj.description}</td>
              <td>{obj.tag}</td>
              <td>{obj.method}</td>
              <td>{Number(obj.value).toFixed(2)}</td>
              <td>{obj.exchangeRates[obj.currency].name}</td>
              <td>{Number(obj.exchangeRates[obj.currency].ask).toFixed(2)}</td>
              <td>
                {(Number(obj.value)
            * Number(obj.exchangeRates[obj.currency].ask)).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: propTypes.arrayOf(Object),
}.isRequired;

export default connect(mapStateToProps, null)(ExpensesTable);
