import React, { Component } from 'react';
import './ProductElement.css';

export default class ProductElement extends Component {

    render() {
        const { label, category, price, balance, onDeleted } = this.props;

        return (
            <tr className='products__row'>
                <td className='products__row-item'>{ label }</td>
                <td>{ category }</td>
                <td>{ price }</td>
                <td>{ balance }</td>
                <td className='products__row-btns'>
                    <button
                        type='button'
                        onClick={onDeleted}>
                        Delete</button>
                </td>
            </tr>
        );
    }
}