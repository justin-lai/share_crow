import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, postUser, putUser, deleteUser } from '../actions/userActions.js';
import { getListing, postListing, putListing, deleteListing } from '../actions/listingActions.js';
import { getSession, isLoggedIn } from '../actions/sessionActions.js';
import { getCategory } from '../actions/categoryActions.js';
import NavBar from './NavBar.js';
import Search from './Search.js';
import Filters from './Filters.js';
import ProductList from './ProductList.js';
import Footer from './Footer.js';
// import Loading from './LoadingBar.js';
// const fetch = require('isomorphic-fetch');

require('../assets/styles/app.scss');

class Marketplace extends Component {
  constructor(props) {
    super(props);

    // this.listings = [  // change this later with listings from database
    //   {
    //     name: 'Tent',
    //     price: '$20/day',
    //     owner: 'caathylee',
    //     image: 'http://ecx.images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg',
    //     ownerId: 1,
    //     rentalFee: 25,
    //     User: { username: 'Cathy' },
    //   },
    //   {
    //     name: 'Grill',
    //     price: '$20/day',
    //     owner: 'caathylee',
    //     image: 'http://cdn.charbroil.com/media/catalog/product/cache/1/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/1/2/12301672_charcoal-grill-800_001.png',
    //     ownerId: 2,
    //     rentalFee: 30,
    //     User: { username: 'Justin' },
    //   },
    //   {
    //     name: 'Fishing Rod',
    //     price: '$10/day',
    //     owner: 'caathylee',
    //     image: 'http://www.clipartkid.com/images/52/use-these-free-images-for-your-websites-art-projects-reports-and-ECSktZ-clipart.jpg',
    //     ownerId: 3,
    //     rentalFee: 15,
    //     User: { username: 'Arthur' },
    //   },
    //   {
    //     name: 'Tent',
    //     price: '$20/day',
    //     owner: 'caathylee',
    //     image: 'http://ecx.images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg',
    //     ownerId: 1,
    //     rentalFee: 25,
    //     User: { username: 'Cathy' },
    //   },
    //   {
    //     name: 'Grill',
    //     price: '$20/day',
    //     owner: 'caathylee',
    //     image: 'http://cdn.charbroil.com/media/catalog/product/cache/1/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/1/2/12301672_charcoal-grill-800_001.png',
    //     ownerId: 2,
    //     rentalFee: 30,
    //     User: { username: 'Justin' },
    //   },
    //   {
    //     name: 'Fishing Rod',
    //     price: '$10/day',
    //     owner: 'caathylee',
    //     image: 'http://www.clipartkid.com/images/52/use-these-free-images-for-your-websites-art-projects-reports-and-ECSktZ-clipart.jpg',
    //     ownerId: 3,
    //     rentalFee: 15,
    //     User: { username: 'Arthur' },
    //   }, {
    //     name: 'Tent',
    //     price: '$20/day',
    //     owner: 'caathylee',
    //     image: 'http://ecx.images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg',
    //     ownerId: 1,
    //     rentalFee: 25,
    //     User: { username: 'Cathy' },
    //   },
    //   {
    //     name: 'Grill',
    //     price: '$20/day',
    //     owner: 'caathylee',
    //     image: 'http://cdn.charbroil.com/media/catalog/product/cache/1/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/1/2/12301672_charcoal-grill-800_001.png',
    //     ownerId: 2,
    //     rentalFee: 30,
    //     User: { username: 'Justin' },
    //   },
    //   {
    //     name: 'Fishing Rod',
    //     price: '$10/day',
    //     owner: 'caathylee',
    //     image: 'http://www.clipartkid.com/images/52/use-these-free-images-for-your-websites-art-projects-reports-and-ECSktZ-clipart.jpg',
    //     ownerId: 3,
    //     rentalFee: 15,
    //     User: { username: 'Arthur' },
    //   }, {
    //     name: 'Tent',
    //     price: '$20/day',
    //     owner: 'caathylee',
    //     image: 'http://ecx.images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg',
    //     ownerId: 1,
    //     rentalFee: 25,
    //     User: { username: 'Cathy' },
    //   },
    //   {
    //     name: 'Grill',
    //     price: '$20/day',
    //     owner: 'caathylee',
    //     image: 'http://cdn.charbroil.com/media/catalog/product/cache/1/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/1/2/12301672_charcoal-grill-800_001.png',
    //     ownerId: 2,
    //     rentalFee: 30,
    //     User: { username: 'Justin' },
    //   },
    //   {
    //     name: 'Fishing Rod',
    //     price: '$10/day',
    //     owner: 'caathylee',
    //     image: 'http://www.clipartkid.com/images/52/use-these-free-images-for-your-websites-art-projects-reports-and-ECSktZ-clipart.jpg',
    //     ownerId: 3,
    //     rentalFee: 15,
    //     User: { username: 'Arthur' },
    //   }, {
    //     name: 'Tent',
    //     price: '$20/day',
    //     owner: 'caathylee',
    //     image: 'http://ecx.images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg',
    //     ownerId: 1,
    //     rentalFee: 25,
    //     User: { username: 'Cathy' },
    //   },
    //   {
    //     name: 'Grill',
    //     price: '$20/day',
    //     owner: 'caathylee',
    //     image: 'http://cdn.charbroil.com/media/catalog/product/cache/1/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/1/2/12301672_charcoal-grill-800_001.png',
    //     ownerId: 2,
    //     rentalFee: 30,
    //     User: { username: 'Justin' },
    //   },
    //   {
    //     name: 'Fishing Rod',
    //     price: '$10/day',
    //     owner: 'caathylee',
    //     image: 'http://www.clipartkid.com/images/52/use-these-free-images-for-your-websites-art-projects-reports-and-ECSktZ-clipart.jpg',
    //     ownerId: 3,
    //     rentalFee: 15,
    //     User: { username: 'Arthur' },
    //   },
    // ];
    this.state = {
      listings: [],
    };

    this.categories = [];

    this.filterBy = this.filterBy.bind(this);
    this.searchFor = this.searchFor.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.methods = this.props.methods;
    // fetch('/main/listing')
    //   .then(res => res.json())
    //     .then(responseData => {
    //       this.products = responseData;
    //       console.log('product list: ', this.products);
    //     })
    //       .then(() => this.setState({ loading: false }));
    this.methods.getListing();
    this.methods.getCategory();
    this.methods.isLoggedIn();
  }

  componentWillReceiveProps(nextProps) {
    this.categories = nextProps.category;
    this.setState({
      listings: nextProps.listing,
    });

    console.log('market next: ', nextProps);
  }

  filterBy(filter) {
    // clear the current list of items
    this.setState({
      listings: [],
    });

    for (let i = 0; i < this.props.category.length; i++) {
      const category = this.props.category[i];

      if (category.CategoryId === null) {
        // display parent category listings and all its subcategory listings
        if (category.categoryName === filter) {
          let newListings = [];
          newListings = newListings.concat(category.Listings);
          for (let j = 0; j < category.subCategory.length; j++) {
            const subcategory = category.subCategory[j];
            newListings = newListings.concat(subcategory.Listings);
          }
          this.setState({
            listings: newListings,
          });
          break;
        }
      } else {
        // display subcategory listings
        if (category.categoryName === filter) {
          this.setState({
            listings: category.Listings,
          });
          break;
        }
      }
    }
  }

  searchFor(query) {
    console.log(query);
    // this.props.methods.getListing() by query
  }

  login(userData) {
    console.log(`logging in as ${userData.username}`);
    let query = [];
    Object.keys(userData).forEach(key => query.push(`${key}=${userData[key]}`));
    query = query.join('&');
    this.methods.getSession(query);
    this.methods.isLoggedIn();
    this.user = userData;
  }

  signup(userData) {
    console.log('signing up as', userData);
    this.methods.postUser(userData);
  }

  render() {
    // if (this.state.loading) {
    //   return <Loading message={'Loading Marketplace'} />;
    // }
    return (
      <div id="marketplace">
        <NavBar
          isLoggedIn={this.props.isAuth.status || false}
          username={this.props.isAuth.username || ''}
          login={this.login}
          signup={this.signup}
        />
        <Filters categories={this.categories} filterBy={this.filterBy} />
        <div id="marketplace-search-container">
          <Search searchFor={this.searchFor} />
        </div>
        <div id="marketplace-items-container">
          <h3>Items</h3>
          <ProductList products={this.state.listings} />
        </div>
        <Footer />
      </div>
    );
  }
}

Marketplace.propTypes = {
  isAuth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user, listing, category, session, isAuth } = state;

  return {
    user,
    listing,
    category,
    session,
    isAuth,
  };
}

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    methods: {
      getUser: (id) => {
        dispatch(getUser(id));
      },
      postUser: (data) => {
        dispatch(postUser(data));
      },
      putUser: (data) => {
        dispatch(putUser(data));
      },
      deleteUser: (data) => {
        dispatch(deleteUser(data));
      },
      getListing: (id) => {
        dispatch(getListing(id));
      },
      postListing: (data) => {
        dispatch(postListing(data));
      },
      putListing: (data) => {
        dispatch(putListing(data));
      },
      deleteListing: (data) => {
        dispatch(deleteListing(data));
      },
      getCategory: () => {
        dispatch(getCategory());
      },
      getSession: (data) => {
        dispatch(getSession(data));
      },
      isLoggedIn: () => {
        dispatch(isLoggedIn());
      },
    },
  };
};

Marketplace.propTypes = {
  methods: PropTypes.object.isRequired,
  category: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);

