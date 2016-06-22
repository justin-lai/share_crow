import React, { PropTypes } from 'react';

const Product = ({ product }) => (
  <span className="product">
    <img alt="product" src={product.image} width="300px" />
    <div className="product-info">
      <h4>{product.name}</h4>
      <p>{product.price}</p>
      <p>XY miles away - Fremont, CA</p>
      <a href="/">{product.owner}</a>
    </div>
  </span>
);

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
