/* eslint-disable max-len */
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
      loading: true,
      shortName: 'Placeholder',
    };
    this.ownerName = '';
    this.handleSubmit = this.handleSubmit.bind(this);
    this.methods = props.methods;
    this.product = props.product;
    this.product.distance = '';
    this.product.distanceCity = '';
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    // eslint-disable-next-line
    fetch(`http://localhost:3000/main/imageUpload?id=${this.props.product.id}`)
      .then(response => response.json())
      .then(responseData => {
        this.props.product.image = responseData.image;
      })
        .then(() => {
          fetch(`http://localhost:3000/main/profile?id=${this.props.isAuth.userInfo.id}`)
            .then(response => response.json())
              .then(responseData => `${responseData.address} ${responseData.state}`)
                .then(user1location => {
                  fetch(`http://localhost:3000/main/profile?id=${this.product.ownerId}`)
                    .then(response2 => response2.json())
                      .then(responseData2 => {
                        this.ownerName = responseData2.username;
                        this.product.distanceCity = responseData2.city;
                        return `${responseData2.address} ${responseData2.state}`;
                      })
                        .then(user2location => {
                          fetch(`http://localhost:3000/api/distanceMatrix?origin=${user1location}&destination=${user2location}`)
                            .then(response3 => response3.json())
                              .then(responseData3 => {
                                this.product.distance = responseData3.miles;
                                this.setState({
                                  loading: false,
                                  // eslint-disable-next-line
                                  shortName: this.product.name.length > 24 ? this.product.name.split('').slice(0, 24).join('').concat('...') : this.product.name,
                                });
                              });
                        });
                });
        });
  }
  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }
  handleSubmit() {
    $('.stripe-button-el').trigger('click');
    fetch(`http://localhost:3000/main/payment?payerId=${this.props.isAuth.userInfo.id}`)
      .then(response => response.json())
        .then(responseData => {
          let paymentFlag = false;
          let paymentInfo = '';
          for (let i = 0; i < responseData.length; i++) {
            if (!responseData[i].paymentComplete) {
              paymentFlag = true;
              // eslint-disable-next-line
              paymentInfo = <span><br />All pending payments must be completed before renting again.<br />
              {responseData[i].itemName} for ${responseData[i].$Amount} is unpaid.`</span>;
              break;
            }
          }
          if (paymentFlag) {
            this.state.rentRequestMessage = paymentInfo;
            this.closeModal();
            this.openModal();
          } else {
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
        });
  }
  render() {
    // if (this.state.loading) {
    //   return (
    //     <div></div>
    //   );
    // }
    const product = this.product;
    if (product.rented) {
      return (
        <figure
          className="product rented product-snippet"
        >
          <div className="rent-overlay">
            <img
              className="product-image bottom-image"
              src={product.listingImage[0].image}
              alt="product"
            />
            <img
              src="rented.png"
              className="rented-overlay top-image"
              alt="rented"
            />
          </ div>
          <figcaption>
            <h3>{this.state.shortName}</h3>
            <p>{this.product.distance} from {this.product.distanceCity}</p>
            <div className="price">${product.rentalFee} per day
              <span>by <a href={`/#/profile/${this.ownerName}&${this.product.ownerId}`} className="preview-owner">{this.ownerName}</a></span>
            </div>
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
          > <i className="ion-android-add"></i><span>Your listing is LIVE!</span></div>
          <figcaption>
            <h3>{this.state.shortName}</h3>
            <p>{this.product.distance} from {this.product.distanceCity}</p>
            <div className="price">${product.rentalFee} per day
              <span>by <a href={`/#/profile/${this.ownerName}&${this.product.ownerId}`} className="preview-owner">{this.ownerName}</a></span>
            </div>
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
          <h3>{this.state.shortName}</h3>
          <p>{this.product.distance} from {this.product.distanceCity}</p>
          <div className="price">${product.rentalFee} per day
            <span>by <a href={`/#/profile/${this.ownerName}&${this.product.ownerId}`} className="preview-owner">{this.ownerName}</a></span>
          </div>
        </figcaption>
        <Modal
          style={{ content: { height: '650px', width: '800px' } }}
          isOpen={this.state.open}
          onRequestClose={this.closeModal}
          id="rent-item"
        >
          <h1 className="modal-header product-preview-header">{product.name}
          </h1>
          <p>
            <div
              className="product-preview"
            >
              <img
                className="product-image-modal"
                alt="product-preview"
                src={product.listingImage[0] ? product.listingImage[0].image : null}
              />
            </div>
          </p>
          <p className="product-preview">${product.rentalFee}/day from <a
            href={`/#/profile/${product.owner.username}&${this.product.ownerId}`}
          >
            {product.owner.username}
          </a>
          </p>
          <p className="product-preview">
          {this.product.distance} from {this.product.distanceCity}</p>
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
          <span className="rent-request-message">{this.state.rentRequestMessage}</span>
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
