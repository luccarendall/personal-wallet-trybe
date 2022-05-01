import React from 'react';
import { Link } from 'react-router-dom';
import AddExpenseForm from '../components/AddExpenseForm';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <span>ihhh deu ruim... volta</span>
        <br />
        <Link to="/">Voltar</Link>
        <br />
        <AddExpenseForm />
      </div>
    );
  }
}

export default NotFound;
