import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <span>ihhh deu ruim... volta</span>
        <br />
        <Link to="/">Voltar</Link>
        <br />
      </div>
    );
  }
}

export default NotFound;
