import React, { PropTypes } from 'react';

const Product = ({ product }) => (
  <div className="product">
    <img alt="product" src={product.image} width="300px" />
    <p>{product.name}</p>
    <p>{product.price}</p>
    <p>{product.owner}</p>
  </div>
);

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
