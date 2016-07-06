import React, { PropTypes } from 'react';
import Product from './Product';
import Lazyload from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import Infinite from 'react-infinite';

const ProductList = (props) => (
  <div className="product-list">
    {props.products.map(product =>
      <Lazyload throttle={200} height={100} offset={300} once>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Product
            product={product}
            key={product.id}
          />
        </ReactCSSTransitionGroup>
      </Lazyload>
    )}
  </div>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
