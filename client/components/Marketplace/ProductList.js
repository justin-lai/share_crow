import React, { PropTypes } from 'react';
import Product from './Product';

const ProductList = (props) => (
  <div className="product-list">
    {props.products.map(product =>
      <Product
        profile={props.profile}
        product={product}
        key={product.id}
      />
    )}
  </div>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  profile: PropTypes.bool,
};

export default ProductList;
