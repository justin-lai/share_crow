import React, { PropTypes, Component } from 'react';
import Slider from 'react-slick';
import Product from './Product.js';

class ProductCarousel extends Component {
  constructor(props) {
    super(props);

    this.settings = {
      arrows: true,
      slidesToShow: 4,
      autoplay: true,
      draggable: true,
      infinite: true,
    };
  }

  render() {
    return (
      <div className="product-carousel container">
        <Slider {...this.settings}>
          {
            this.props.products.map(product =>
              <div><Product
                product={product}
                key={product.id}
              /></div>)
          }
        </Slider>
      </div>
    );
  }
}

ProductCarousel.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductCarousel;
