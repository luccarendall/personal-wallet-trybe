import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formAction } from '../actions';
import './style/expensesForm.css';

class AddExpenseForm extends Component {
  constructor({ expenses }) {
    super({ expenses });
    this.state = {
      id: expenses.length,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Trabalho',
      description: '',
      exchangeRates: [],
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
   const { expenses } = this.props;
   this.setState({ id: expenses.length });
   const { submitDispatch } = this.props;

   await this.addFetch();

   submitDispatch(this.state);

   this.setState({
     value: '',
     description: '',
     currency: 'USD',
     method: 'Dinheiro',
     tag: 'Trabalho',
   });
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
     <form className="form-container">
       <div className="form-column">
         <label className="input-label" htmlFor="description-input">
           Descrição
           <input
             type="text"
             className="input-field"
             id="description-input"
             data-testid="description-input"
             name="description"
             placeholder="Mercado, delivery, taxi..."
             value={ description }
             onChange={ this.handleChange }
           />
         </label>

         <label className="input-label" htmlFor="value-input">
           Valor
           <input
             type="number"
             className="input-field"
             id="value-input"
             data-testid="value-input"
             name="value"
             placeholder="Adicionar valor"
             value={ value }
             onChange={ this.handleChange }
           />
           <select
             className="input-field"
             name="currency"
             id="currency-input"
             data-testid="currency-input"
             value={ currency }
             onChange={ this.handleChange }
           >
             {filteredcurrencys.map((item, key) => (
               <option key={ key }>{item}</option>
             ))}
           </select>
         </label>
         <label className="input-label" htmlFor="tag-input">
           Categoria
           <select
             className="input-field"
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
           </select>
         </label>
       </div>

       <div className="form-column">
         <label className="input-label" htmlFor="method-input">
           Método de Pagamento
           <select
             className="input-field"
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

         <button
           className="button"
           type="button"
           onClick={ this.addExpense }
         >
           Adicionar despesa
         </button>
       </div>
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
  submitDispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);
