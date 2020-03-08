import React, { Component } from 'react';

import './AddProductForm.css'

export default class AddProductForm extends Component {

    state = {
        name: '',
        category: '',
        price: '',
        balance: '',
    };

    handleFormChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

  render() {
      const { onClick } = this.props;
      return (
          <div>
              <h2>Add new product</h2>
              <form className='new-product-from' id="productForm">
                  <p>
                      <label htmlFor="name">Enter product name:</label>
                      <input onChange={this.handleFormChange} type="text" id="name" name="name"/>
                  </p>
                  <p>
                      <label htmlFor="category">Enter product category:</label>
                      <select onChange={this.handleFormChange} name="category" id="category">
                          <option>Laptop</option>
                          <option>Tablet</option>
                          <option>Cellphone</option>
                      </select>
                  </p>
                  <p>
                      <label htmlFor="price">Enter product price:</label>
                      <input onChange={this.handleFormChange} type="number" id="price" name="price"/>
                  </p>
                  <p>
                      <label htmlFor="balance">Enter product balance:</label>
                      <input onChange={this.handleFormChange} type="number" id="balance" name="balance"/>
                  </p>
                  <button type="button" onClick={() => onClick(this.state.name, this.state.category, this.state.price, this.state.balance, document.querySelector(`#productForm`))}>Add product</button>
              </form>
          </div>
      );
  }
}
