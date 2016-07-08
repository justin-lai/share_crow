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
    this.isLoggedIn = props.isAuth.status;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.methods = props.methods;
    this.product = props.product;
    this.product.distance = this.product.distance || '';
    this.product.distanceCity = this.product.distanceCity || this.product.owner.city;
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
          if (this.isLoggedIn && !this.product.distance) {
            // fetch(`http://localhost:3000/main/profile?id=${this.product.ownerId}`)
              // .then(response2 => response2.json())
                // .then(responseData2 => {
            this.product.distanceCity = this.product.owner.city;
            const user2location = `${this.product.owner.address} ${this.product.owner.state}`;
            fetch(`http://localhost:3000/api/distanceMatrix?origin=${this.props.isAuth.userInfo.address}&destination=${user2location}`)
                .then(response3 => response3.json())
                  .then(responseData3 => {
                    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                    console.log(this.props.isAuth.userInfo.address);
                    console.log(user2location);
                    console.log(responseData3);
                    this.product.distance = responseData3.miles;
                    this.setState({
                      loading: false,
                      // eslint-disable-next-line
                      shortName: this.product.name.length > 17 ? this.product.name.split('').slice(0, 17).join('').concat('...') : this.product.name,
                    });
                  });
          } else {
            this.setState({
              loading: false,
            // eslint-disable-next-line
              shortName: this.product.name.length > 17 ? this.product.name.split('').slice(0, 17).join('').concat('...') : this.product.name,
            });
          }
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
    const product = this.product;

    if (!this.isLoggedIn) {
      // RENTED ITEMS
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
                src="rented-horizontal.png"
                className="rented-overlay top-image"
                alt="rented"
              />
            </div>
            <figcaption>
              <h3>{this.state.shortName}</h3>
              <span className="fuschia"><a href={`/profile/${this.ownerName}`} className="preview-owner">@{this.ownerName}</a></span>
              <div className="price">${product.rentalFee}/day
              </div>
            </figcaption>
          </figure>
        );
      }
      // EVERYTHING ELSE
      return (
        <figure
          className={product.rented ? 'product rented product-snippet' : 'product product-snippet'}
        >
          <img
            onClick={this.openModal}
            className="product-image"
            style={{ cursor: 'pointer' }}
            src={product.listingImage[0] ? product.listingImage[0].image : null}
            alt="product"
          />
          {product.rented ? <img src="rented-diagonal.png" className="rented-overlay" alt="rented" /> : null}
          <div
            className="rent-it"
          > <i className="ion-android-add"></i><span>Rent it! </span></div>
          <figcaption>
            <h3>{this.state.shortName}</h3>
            <span className="fuschia"><a href={`/profile/${this.ownerName}`} className="preview-owner">@{this.ownerName}</a></span>
            <div className="price">${product.rentalFee}/day</div>
          </figcaption>
          <Modal
            style={{ content: { height: '500px', width: '500px' } }}
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
              href={`/profile/${product.owner.username}`}
            >
              {product.owner.username}
            </a>
            </p>
            <div id="product-preview-button-not-logged-in">
              <input
                className="modal-continue-shopping-button center"
                type="submit"
                value="Back to Marketplace"
                onClick={this.closeModal}
              />
            </div>
            <span className="rent-request-message">{this.state.rentRequestMessage}</span>
          </Modal>
        </figure>
      );
    }
    // YOUR OWN ITEMS
    if (this.props.isAuth.userInfo && product.ownerId === this.props.isAuth.userInfo.id && product.rented) {
      return (
        <figure
          className={product.rented ? 'product rented product-snippet' : 'product product-snippet'}
        >
          <div className="rent-overlay">
            <img
              className="product-image bottom-image"
              src={product.listingImage[0].image}
              alt="product"
            />
            <img
              src="rented-horizontal.png"
              className="rented-overlay top-image"
              alt="rented"
            />
          </div>
          <div
            className="rent-it"
          > <i className="ion-android-add"></i><span>Your listing is LIVE!</span></div>
          <p id="product-banner"></p>
          <figcaption>
            <h3>{this.state.shortName}</h3>
            <span className="fuschia"><a href={`/profile/${this.product.owner.username}`} className="preview-owner">@{this.product.owner.username}</a></span>
            <div className="price">${product.rentalFee} per day
              <span>by <a href={`/profile/${this.product.owner.username}`} className="preview-owner">{this.product.owner.username}</a></span>
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
          <div className="rent-overlay">
            <img
              className="product-image bottom-image"
              src={product.listingImage[0].image}
              alt="product"
            />
          </div>
          <div
            className="rent-it"
          > <i className="ion-android-add"></i><span>Your listing is LIVE!</span></div>
          <p id="product-banner" style={{ 'background-color': 'white' }}></p>
          <figcaption>
            <h3>{this.state.shortName}</h3>
            <span className="fuschia"><a href={`/profile/${this.product.owner.username}`} className="preview-owner">@{this.product.owner.username}</a></span>
            <div className="price">${product.rentalFee} per day
            </div>
          </figcaption>
        </figure>
      );
    }

    // RENTED ITEMS
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
              src="rented-diagonal.png"
              className="rented-overlay top-image"
              alt="rented"
            />
          </div>
          <p id="product-banner">{this.product.distance} from {this.product.distanceCity}</p>
          <figcaption>
            <h3>{this.state.shortName}</h3>
            <span className="fuschia"><a href={`/profile/${this.product.owner.username}`} className="preview-owner">@{this.product.owner.username}</a></span>
            <div className="price">${product.rentalFee}/day
            </div>
          </figcaption>
        </figure>
      );
    }
    // EVERYTHING ELSE
    return (
      <figure
        className={product.rented ? 'product rented product-snippet' : 'product product-snippet'}
      >
        <img
          onClick={this.openModal}
          className="product-image"
          style={{ cursor: 'pointer' }}
          src={product.listingImage[0] ? product.listingImage[0].image : null}
          alt="product"
        />
        {product.rented ? <img src="rented-diagonal.png" className="rented-overlay" alt="rented" /> : null}
        <div
          className="rent-it"
        > <i className="ion-android-add"></i><span>Rent it! </span></div>
        <p id="product-banner">{this.product.distance} from {this.product.distanceCity}</p>
        <figcaption>
          <h3>{this.state.shortName}</h3>
          <span className="fuschia"><a href={`/profile/${this.product.owner.username}`} className="preview-owner">@{this.product.owner.username}</a></span>
          <div className="price">${product.rentalFee}/day</div>
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
            href={`/profile/${product.owner.username}`}
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
