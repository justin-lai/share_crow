import React, { PropTypes, Component } from 'react';
import Product from './Product.js';

const ProductList = ({products}) => (
  <div className="productList">
    {
      products.map( product => <Product product={product} /> )
    }  
  </div>
);

export default ProductList;