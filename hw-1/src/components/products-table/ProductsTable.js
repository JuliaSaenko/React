import React from 'react';

import ProductElement from '../product-element';

import './ProductsTable.css'

const ProductsTable = ({ products, onEdit, onDeleted }) => {

    const elements = products.map((item) => {
        const {id, ...itemProps} = item;

        return (
            <ProductElement
                key={id}
                {...itemProps }
                onEdit={()=> onEdit(id)}
                onDeleted={() => onDeleted(id)}
            />
        );
    });

    return (
        <table className='products'>
            <tbody>
                <tr className='products__heading'>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Balance</th>
                    <th>Action</th>
                </tr>
                { elements }
            </tbody>

        </table>
    );
};

export default ProductsTable;