import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../actions/userActions.js';


class Product extends Component {
  constructor(props) {
    super(props);

    this.methods = props.methods;
    this.product = props.product;
  }

  componentDidMount() {
    // this.methods.getUser(`id=${this.product.ownerId}`);
  }

  componentWillReceiveProps() {
    // if (this.product.ownerId)
    // this.product.owner = nextProps.user.username;
  }

  render() {
    const product = this.props.product;

    return (
      <span className={product.rented ? 'product rented' : 'product'}>
        <img src={product.image} alt="product" />
        {product.rented ? <img src="rented.png" className="rented-overlay" alt="rented" /> : null}
        <div className="product-info">
          <h4>{product.name}</h4>
          <p>${product.rentalFee}/day</p>
          <p>XY miles away - Fremont, CA</p>
          <a href="/">{product.User.username}</a>
        </div>
      </span>
    );
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  methods: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user } = state;

  return {
    user,
  };
}

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    methods: {
      getUser: (id) => {
        dispatch(getUser(id));
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
