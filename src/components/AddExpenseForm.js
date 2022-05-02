import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { formAction } from '../actions';

class AddExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Trabalho',
      exchangeRates: [],
      id: -1,
    };
  }

 // Handler genérico
 handleChange = ({ target }) => {
   const { name, value } = target;
   this.setState({ [name]: value });
 };

 addFetch = async () => {
   const data = await fetch('https://economia.awesomeapi.com.br/json/all');
   const response = await data.json();
   this.setState({ exchangeRates: response });
 }

 // onClick
 addExpense = async () => {
   this.setState((prevState) => ({ id: prevState.id + 1 }));
   //  const {
   //    value,
   //    description,
   //    currency,
   //    method,
   //    tag,
   //    exchangeRates,
   //  } = this.state;

   const { submitDispatch } = this.props;

   await this.addFetch();

   //  const info = {
   //    value,
   //    description,
   //    currency,
   //    method,
   //    tag,
   //    exchangeRates,
   //    id: expenses.length,
   //  };

   submitDispatch(this.state);

   this.setState({
     value: '',
     description: '',
     currency: 'USD',
     method: 'Dinheiro',
     tag: 'Trabalho',
     //  exchangeRates: [],
   });
   //  console.log(test[1]?.exchangeRates[test[1].currency]);
 }

 render() {
   const { filteredcurrencys } = this.props;
   const {
     value,
     description,
     currency,
     method,
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
           name="value"
           value={ value }
           onChange={ this.handleChange }
         />
       </label>
       <br />

       <label htmlFor="description-input">
         Descrição:
         <input
           type="text"
           id="description-input"
           data-testid="description-input"
           name="description"
           value={ description }
           onChange={ this.handleChange }
         />
       </label>
       <br />

       <label htmlFor="method-input">
         Método de Pagamento:
         <select
           name="method"
           id="method-input"
           data-testid="method-input"
           value={ method }
           onChange={ this.handleChange }
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
           name="tag"
           id="tag-input"
           data-testid="tag-input"
           value={ tag }
           onChange={ this.handleChange }
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
         type="button"
         onClick={ this.addExpense }
       >
         Adicionar despesa
       </button>

       <label htmlFor="currency-input">
         Moeda:
         <select
           name="currency"
           id="currency-input"
           data-testid="currency-input"
           value={ currency }
           onChange={ this.handleChange }
         >
           {filteredcurrencys.map((item, key) => (
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
  filteredcurrencys: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  submitDispatch: (form) => dispatch(formAction(form)),
});

AddExpenseForm.propTypes = {
  submitDispatch: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);
