import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { removeAction } from '../actions';

class ExpensesTable extends React.Component {
 removeExpense = (event) => {
   const { expenses, tableDispatch } = this.props;
   tableDispatch(expenses.filter((obj) => obj.id !== Number(event.target.id)));
   //    console.log(event.target.id);
   //    console.log(expenses.filter((obj) => obj.id !== Number(event.target.id)));
 }

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
         { expenses.map((obj) => (
           <tr key={ obj.id }>
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
               <button
                 type="button"
                 id={ obj.id }
                 data-testid="delete-btn"
                 onClick={ (event) => this.removeExpense(event) }
               >
                 Excluir

               </button>
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

const mapDispatchToProps = (dispatch) => ({
  tableDispatch: (table) => dispatch(removeAction(table)),
});

ExpensesTable.propTypes = {
  expenses: propTypes.arrayOf(Object),
  tableDispatch: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
