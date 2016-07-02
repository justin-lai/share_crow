import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

class StarRating extends Component {
  constructor() {
    super();

    this.state = {
      rating: 1,
    };

    this.onStarClick = this.onStarClick.bind(this);
  }

  onStarClick(name, value) {
    this.setState({ rating: value });
  }

  render() {
    const { rating } = this.state;
    return (
      <div>
        <h2>Rating from state: {rating}</h2>
        <StarRatingComponent
          name="rate1"
          starCount={10}
          value={rating}
          onStarClick={this.onStarClick}
        />
      </div>
    );
  }
}

export default StarRating;
