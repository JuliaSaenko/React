import React, { Component } from 'react';

import ProductsTable from '../products-table';
import AddProductForm from '../add-product-form';

import './App.css'

export default class App extends Component {

    state = {
        productsElements: [
            { id: 1, label: `MacBook Pro`, category: `Laptop`, price: 2000,  balance: 25, },
            { id: 2, label: `Asus ROG Strix`, category: `Laptop`, price: 1000, balance: 21, },
            { id: 3, label: `MSI Modern 14`, category: `Laptop`, price: 1100, balance: 34, },
            { id: 4, label: 'Samsung Galaxy Tab S5e', category: `Tablet`, price: 500, balance: 24, },
            { id: 5, label: 'Apple iPad mini', category: `Tablet`, price: 600, balance: 43, },
            { id: 6, label: 'Huawei MediaPad', category: `Tablet`, price: 300, balance: 30, },
            { id: 7, label: 'Xiaomi Mi Note 10', category: `Cellphone`, price: 450, balance: 59, },
            { id: 8, label: 'Samsung Galaxy Note 10', category: `Cellphone`, price: 1000, balance: 36, },
            { id: 9, label: 'Apple iPhone Xs', category: `Cellphone`, price: 800, balance: 40, },
        ]
    };

    deleteItem = (id) => {
        this.setState(({ productsElements }) => {
            const idx = productsElements.findIndex((el) => el.id === id);

            const newArray = [
                ...productsElements.slice(0, idx),
                ...productsElements.slice(idx + 1)
            ];

            return {
                productsElements: newArray
            };
        });
    };

    addItem = (newProductData) => {
        const newItem = {
            id: Math.random() +'',
            ...newProductData
        };

        console.log(newItem);

        this.setState(({ productsElements }) => {
            const newArr = [
                ...productsElements,
                newItem
            ];

            return {
                productsElements: newArr
            };
        });
    };


    render () {
        return (
            <div className="main">
                <ProductsTable
                    products={this.state.productsElements}
                    onDeleted={ this.deleteItem }
                />
                <AddProductForm onAddProduct = { this.addItem }/>
            </div>
        );
    }

};
