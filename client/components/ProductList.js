import React, { PropTypes, Component } from 'react';
import Slider from 'react-slick';
import Product from './Product.js';

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.settings = {
      arrows: true,
      slidesToShow: 3,
      autoplay: false,
      draggable: true,
    };
  }

  render() {
    return (
      <div className="productList container">
        <Slider {...this.settings}>
          {
            this.props.products.map(product =>
              <div><Product
                product={product}
              /></div>)
          }
        </Slider>
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
