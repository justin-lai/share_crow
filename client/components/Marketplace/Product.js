import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/userActions';
import { postMessage } from '../../actions/messageActions';
import $ from 'jquery';
import Modal from 'react-modal';
import fetch from 'isomorphic-fetch';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      rentRequestMessage: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.methods = props.methods;
    this.product = props.product;
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    fetch(`http://localhost:3000/main/imageUpload?id=${this.props.product.id}`)
      .then(response => response.json())
      .then(responseData => {
        this.props.product.image = responseData.image;
      });
  }

  componentWillReceiveProps() {
    // if (this.product.ownerId)
    // this.product.owner = nextProps.user.username;
  }
  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }
  handleSubmit() {
    $('.stripe-button-el').trigger('click');
    this.props.methods.postMessage({
      subject: this.product.id,
      text: `${this.props.isAuth.username} wants to rent your ${this.product.name}`,
      sender_id: this.props.isAuth.userInfo.id,
      recipient_id: this.product.ownerId,
    });
    this.state.rentRequestMessage = 'Your request has been sent!';
    fetch('http://localhost:3000/api/sendTextNotification',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientId: this.product.ownerId,
          text: `${this.props.isAuth.username} wants to rent your ${this.product.name}`,
        }),
      });
    this.closeModal();
    this.openModal();
  }
  render() {
    const product = this.props.product;
    if (product.rented) {
      return (
        <figure
          className="product rented product-snippet"
        >
          <img

            className="product-image"
            style={{ 'background-image': 'url(productListingImage[0].image)' }}
            alt="product"
          />
          {product.rented ? <img src="rented.png" className="rented-overlay" alt="rented" /> : null}
          <div
            className="add-to-cart"
            onClick={this.openModal}
          > <i className="ion-android-add"></i><span>Rent it! </span></div>
          <figcaption>
            <h3>{product.name}</h3>
            <p>XY miles away - Fremont, CA</p>
            <div className="price">${product.rentalFee} per day</div>
          </figcaption>
        </figure>
      );
    }
    if (this.props.isAuth.userInfo && product.ownerId === this.props.isAuth.userInfo.id) {
      return (
        <figure
          className={product.rented ? 'product rented product-snippet' : 'product product-snippet'}
        >
          <img
            src={product.listingImage[0] ? product.listingImage[0].image : null}
            className="product-image"
            alt="product"
          />
          {product.rented ? <img src="rented.png" className="rented-overlay" alt="rented" /> : null}
          <div
            className="add-to-cart"
            onClick={this.openModal}
          > <i className="ion-android-add"></i><span>Rent it! </span></div>
          <figcaption>
            <h3>{product.name}</h3>
            <p>XY miles away - Fremont, CA</p>
            <div className="price">${product.rentalFee} per day</div>
          </figcaption>
        </figure>
      );
    }
    return (
      <figure
        className={product.rented ? 'product rented product-snippet' : 'product product-snippet'}
      >
        <img
          className="product-image"
          src={product.listingImage[0] ? product.listingImage[0].image : null}
          alt="product"
        />
        {product.rented ? <img src="rented.png" className="rented-overlay" alt="rented" /> : null}
        <div
          className="add-to-cart"
          onClick={this.openModal}
        > <i className="ion-android-add"></i><span>Rent it! </span></div>
        <figcaption>
          <h3>{product.name}</h3>
          <p>XY miles away - Fremont, CA</p>
          <div className="price">${product.rentalFee} per day</div>
        </figcaption>
        <Modal
          style={{ content: { height: '650px', width: '800px' } }}
          isOpen={this.state.open}
          onRequestClose={this.closeModal}
          id="rent-item"
        >
          <h1 className="modal-header product-preview-header">{product.name}
            <span className="rent-request-message">{this.state.rentRequestMessage}</span>
          </h1>
          <p>
            <div
              className="product-preview"
            >
              <img
                className="product-image"
                alt="product-preview"
                src={product.listingImage[0] ? product.listingImage[0].image : null}
              />
            </div>
          </p>
          <p className="product-preview">${product.rentalFee}/day</p>
          <p className="product-preview">XY miles away - Fremont, CA</p>
          <a
            className="center"
            href="/"
          >
            {product.owner.username}
          </a>
          <div id="product-preview-buttons">
            <input
              className="modal-rent-button product-preview"
              type="submit"
              value="Rent It"
              onClick={this.handleSubmit}
            />
            <input
              className="modal-continue-shopping-button"
              type="submit"
              value="Continue Shopping"
              onClick={this.closeModal}
            />
          </div>
        </Modal>
      </figure>
    );
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  methods: PropTypes.object.isRequired,
  isAuth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user, message, isAuth } = state;

  return {
    user,
    message,
    isAuth,
  };
}

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    methods: {
      getUser: (id) => {
        dispatch(getUser(id));
      },
      postMessage: (data) => {
        dispatch(postMessage(data));
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
