import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../actions/userActions.js';
import { postMessage } from '../actions/messageActions.js';
// import ProductModal from './ProductModal.js';
import Modal from 'react-modal';


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
    // this.methods.getUser(`id=${this.product.ownerId}`);
  }

  componentWillReceiveProps() {
    // if (this.product.ownerId)
    // this.product.owner = nextProps.user.username;
  }
  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }
  handleSubmit() {
    this.props.methods.postMessage({
      subject: 'Rent Item Request',
      text: 'bigboyben wants to rent your stuff',
      sender_id: 1,
      recipient_id: 2,

    });
    this.state.rentRequestMessage = 'Your request has been sent!';
    this.closeModal();
    this.openModal();
  }
  render() {
    const product = this.props.product;

    return (
      <span
        onClick={this.openModal}
        className={product.rented ? 'product rented' : 'product'}
      >
        <img src={product.image} alt="product" />
        {product.rented ? <img src="rented.png" className="rented-overlay" alt="rented" /> : null}
        <div className="product-info">
          <h4>{product.name}</h4>
          <p>${product.rentalFee}/day</p>
          <p>XY miles away - Fremont, CA</p>
          <a href="/">{product.owner.username}</a>
        </div>

        <Modal
          style={{ content: { height: '650px', width: '800px' } }}
          isOpen={this.state.open}
          onRequestClose={this.closeModal}
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
                src={product.image}
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
      </span>
    );
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  methods: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user, message } = state;

  return {
    user,
    message,
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
