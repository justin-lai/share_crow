import React, { Component } from 'react';
import Slider from 'react-slick';

class SplashCarousel extends Component {
  constructor(props) {
    super(props);

    this.settings = {
      autoplay: true,
      infinite: true,
      fade: true,
      speed: 3000,
    };
  }

  render() {
    return (
      <div id="splash-carousel">
        <Slider {...this.settings}>
          <img className="splash-image" alt="splash" src="splash.jpg" />
          <img className="splash-image" alt="splash" src="laptop.jpg" />
          <img className="splash-image" alt="splash" src="traintracks-camera.jpg" />
          <img className="splash-image" alt="splash" src="workspace.jpg" />
        </Slider>
      </div>
    );
  }
}

export default SplashCarousel;
