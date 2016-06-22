import React, { PropTypes } from 'react';
import Product from './Product';

const ProductList = ({ products }) => (
  <div className="product-list">
    {products.map(product => <Product product={product} />)}
  </div>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
