import React, { PropTypes, Component } from 'react';
import Slider from 'react-slick';
import Product from '../Marketplace/Product';

class ProductCarousel extends Component {
  constructor(props) {
    super(props);

    this.settings = {
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
      autoplaySpeed: 6000,
      draggable: true,
      infinite: true,
      pauseOnHover: true,
    };
  }

  render() {
    return (
      <div className="product-carousel container">
        <Slider {...this.settings}>
          {
            this.props.products.map(product =>
              <div key={product.id}>
                <Product product={product} />
              </div>)
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
