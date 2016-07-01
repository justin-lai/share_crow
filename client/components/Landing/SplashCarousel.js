import React, { Component } from 'react';
import Slider from 'react-slick';

class SplashCarousel extends Component {
  constructor(props) {
    super(props);

    this.settings = {
      autoplay: true,
      infinite: true,
      fade: true,
    };
  }

  render() {
    return (
      <div id="splash-carousel">
        <Slider {...this.settings}>
          <img className="splash-image" alt="splash" src="splash.jpeg" />
          <img className="splash-image" alt="splash" src="splash2.jpg" />
          <img className="splash-image" alt="splash" src="splash3.jpg" />
          <img className="splash-image" alt="splash" src="splash4.jpg" />
        </Slider>
      </div>
    );
  }
}

export default SplashCarousel;
