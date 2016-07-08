import React, { PropTypes } from 'react';
import Product from './Product';
import Lazyload from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import Infinite from 'react-infinite';

const ProductList = (props) => {
  if (props.lazyLoad) {
    return (
      <div className="product-list">
        {props.products.map(product =>
          <Lazyload key={product.id} throttle={200} height={50} offset={150} once>
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}
            >
              <Product
                product={product}
              />
            </ReactCSSTransitionGroup>
          </Lazyload>
        )}
      </div>
    );
  }
  return (
    <div className="product-list">
      {props.products.map(product =>
        <Product
          product={product}
        />
      )}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  lazyLoad: PropTypes.bool.isRequired,
};

export default ProductList;
