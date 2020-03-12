import React, { Component } from 'react';

import './AddProductForm.css'


export default class AddProductForm extends Component {

    state = {
        label: '',
        category: '',
        price: '',
        balance: '',
    };

    handleFormChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });

    };


    addProduct = () => {
        this.props.onAddProduct(this.state);
        this.setState({
            label: '',
            category: '',
            price: '',
            balance: ''
        });

    };

  render() {

      return (
          <div className='new-product-from__wrapper'>
              <h2>Add new product</h2>
              <form className='new-product-from' id="productForm">
                  <p>
                      <label htmlFor="label">Enter product name:</label>
                      <input value={ this.state.label } onChange={ this.handleFormChange } type="text" id="label" name="label"/>
                  </p>
                  <p>
                      <label htmlFor="category">Enter product category:</label>
                      <select value={ this.state.category } onChange={ this.handleFormChange } name="category" id="category">
                          <option value="" defaultValue disabled hidden>Choose here</option>
                          <option value="Laptop">Laptop</option>
                          <option value="Tablet">Tablet</option>
                          <option value="Cellphone">Cellphone</option>
                      </select>
                  </p>
                  <p>
                      <label htmlFor="price">Enter product price:</label>
                      <input value={ this.state.price } onChange={ this.handleFormChange } type="number" id="price" name="price"/>
                  </p>
                  <p>
                      <label htmlFor="balance">Enter product balance:</label>
                      <input value={ this.state.balance } onChange={ this.handleFormChange } type="number" id="balance" name="balance"/>
                  </p>
                  <button type="button" onClick={ this.addProduct }>Add product</button>
              </form>
          </div>
      );
  }
}
