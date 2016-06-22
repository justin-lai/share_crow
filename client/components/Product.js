import React, { PropTypes } from 'react';

const Product = ({ product }) => (
  <span className={product.rented ? 'product rented' : 'product'}>
    <img src={product.image} alt="product" />
    {product.rented ? <img src="rented.png" className="rented-overlay" alt="rented" /> : null}
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
