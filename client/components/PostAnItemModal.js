import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCategory } from '../actions/categoryActions.js';
import Modal from 'react-modal';
import ImageUploader from './ImageUploader';

class PostAnItemModal extends Component {
  constructor(props) {
    super(props);

    console.log('POST ITEM PROPS: ', props);
    this.state = {
      username: props.isAuth.userInfo.username,
      ownerId: props.isAuth.userInfo.id,
      open: false,
      listing: '',
      maxFee: '',
      rentalFee: '',
      category: 0,
      uploadListing: '',
      uploadID: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleItemListing = this.handleItemListing.bind(this);
    this.handleMaxFee = this.handleMaxFee.bind(this);
    this.handleRentalFee = this.handleRentalFee.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleSubmit() {
    const listingData = {
      item: this.state.listing,
      max_fee: this.state.maxFee,
      rental_fee: this.state.rentalFee,
      owner_id: this.state.ownerId,
      category: this.state.category,
    };
    console.log(listingData);
    fetch('http://localhost:3000/main/listing',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      }).then(response => response.json())
        .then(responseData => {
          fetch('http://localhost:3000/main/imageUpload',
            {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: this.state.uploadID,
                listingId: responseData.id,
              }),
            }).then(response => response.json())
              .then(responseData2 => console.log(responseData2));
        });
    this.closeModal();
  }

  handleUpload(listing, id) {
    this.setState({
      uploadListing: listing,
      uploadID: id,
    });
    console.log(`image upload stored at id: ${listing}`);
  }

  handleItemListing(value) { this.setState({ listing: value.target.value }); }
  handleMaxFee(value) { this.setState({ maxFee: value.target.value }); }
  handleRentalFee(value) { this.setState({ rentalFee: value.target.value }); }
  handleCategory(value) { this.setState({ category: value.target.value }); }
  openModal() { this.setState({ open: true }); }
  closeModal() { this.setState({ open: false }); }

  render() {
    return (
      <div className="post-item-wrapper">
        <div
          className="post-item-modal"
          onClick={this.openModal}
        >
          Post an Item
        </div>
        <Modal
          style={{ content: { height: '600px' } }}
          isOpen={this.state.open}
          onRequestClose={this.closeModal}
        >
          <input
            className="close-button"
            type="submit"
            value="x"
            onClick={this.closeModal}
          />
          <h1 className="modal-header">Post Item</h1>
          <p>
            <div>Item Listing Title</div>
            <input
              value={this.state.listing}
              onChange={this.handleItemListing}
              type="text"
            />
          </p>
          <p>
            <div>Max Fee - Cost set in case of lost or damaged item</div>
            <input
              value={this.state.maxFee}
              onChange={this.handleMaxFee}
              type="text"
            />
          </p>
          <p>
            <div>Rental Fee - Cost per day</div>
            <input
              value={this.state.rentalFee}
              onChange={this.handleRentalFee}
              type="text"
            />
          </p>
          <span>Category: </span>
          <select
            value={this.state.category}
            onChange={this.handleCategory}
          >
            <option value="0">Book</option>
            <option value="2">Camera</option>
            <option value="9">Clothing</option>
            <option value="3">Computers</option>
            <option value="8">Consumer Electronics</option>
            <option value="12">Home & Garden</option>
            <option value="10">Motors</option>
            <option value="4">Music</option>
            <option value="11">Pet Supplies</option>
            <option value="5">Real Estate</option>
            <option value="7">Sporting Goods</option>
          </select>
          <ImageUploader
            handleUpload={this.handleUpload}
          />
          <input
            className="modal-post-item-button button"
            type="submit"
            value="Post Item"
            onClick={this.handleSubmit}
          />
        </Modal>
      </div>
    );
  }
}

PostAnItemModal.propTypes = {
  isAuth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { category, isAuth } = state;

  return {
    category,
    isAuth,
  };
}

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    methods: {
      getCategory: () => {
        dispatch(getCategory());
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostAnItemModal);
