import React, { PropTypes } from 'react';
import Product from './Product.js';

const ProductList = ({ products }) => (
  <div className="productList">
    {
      products.map(product => <Product product={product} />)
    }
  </div>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
