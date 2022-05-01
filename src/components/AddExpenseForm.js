import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class AddExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseValue: '',
      description: '',
      coin: 'BRL',
      payMethod: 'Dinheiro',
      tag: 'Trabalho',
    };
  }

 // Handler genérico
 handleChange = ({ target }) => {
   const { name, value } = target;
   this.setState({ [name]: value });
 };

 addExpense = () => {
   // Criar função pra salvar no estado global
 }

 render() {
   const { handleChange, addExpense, filteredCoins } = this.props;
   const {
     expenseValue,
     description,
     coin,
     payMethod,
     tag,
   } = this.state;

   return (
     <form>
       <label htmlFor="value-input">
         Valor da despesa:
         <input
           type="number"
           id="value-input"
           data-testid="value-input"
           name="value-input"
           value={ expenseValue }
           onChange={ handleChange }
         />
       </label>
       <br />

       <label htmlFor="description-input">
         Descrição:
         <input
           type="text"
           id="description-input"
           data-testid="description-input"
           name="description-input"
           value={ description }
           onChange={ handleChange }
         />
       </label>
       <br />

       <label htmlFor="method-input">
         Método de Pagamento:
         <select
           name="method-input"
           id="method-input"
           data-testid="method-input"
           value={ payMethod }
           onChange={ handleChange }
         >
           <option value="Dinheiro">Dinheiro</option>
           <option value="Cartão de crédito">Cartão de crédito</option>
           <option value="Cartão de débito">Cartão de débito</option>
         </select>
       </label>
       <br />

       <label htmlFor="tag-input">
         Categoria:
         <select
           name="tag-input"
           id="tag-input"
           data-testid="tag-input"
           value={ tag }
           onChange={ handleChange }
         >
           <option value="Alimentação">Alimentação</option>
           <option value="Lazer">Lazer</option>
           <option value="Trabalho">Trabalho</option>
           <option value="Transporte">Transporte</option>
           <option value="Saúde">Saúde</option>
           <br />

         </select>
       </label>

       <button
         type="submit"
         onClick={ addExpense }
       >
         Adicionar despesa
       </button>

       <label htmlFor="currency-input">
         Moeda:
         <select
           name="currency-input"
           id="currency-input"
           data-testid="currency-input"
           value={ coin }
           onChange={ handleChange }
         >
           {filteredCoins.map((item, key) => (
             <option
               key={ key }
             >
               { item }
             </option>
           ))}
         </select>
       </label>
     </form>

   );
 }
}

const mapStateToProps = (state) => ({
  filteredCoins: state.wallet.currencies,
});

AddExpenseForm.propTypes = {
  handleChange: propTypes.func,
  addExpense: propTypes.func,
}.isRequired;

// Criar  mapStateToProps e dispatch

// const mapDispatchToProps = (dispatch) => ({
//   myDispatch: (state) => dispatch(ActionQueSalvaAsDespesasNoEstadoGlobal(state)),
// });

export default connect(mapStateToProps, null)(AddExpenseForm);
