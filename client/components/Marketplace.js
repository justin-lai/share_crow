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
import Loading from './LoadingBar.js';


// import Loading from './LoadingBar.js';
// const fetch = require('isomorphic-fetch');

require('../assets/styles/app.scss');

class Marketplace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
      filteredListings: [],
    };

    this.categories = [];

    this.filterBy = this.filterBy.bind(this);
    this.searchFor = this.searchFor.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.methods = this.props.methods;
    this.methods.isLoggedIn();
  }

  componentDidMount() {
    if (this.props.isAuth.status) {
      //eslint-disable-next-line
      console.log('get user from marketplace');
    }
    //eslint-disable-next-line
    console.log(this.props);
    this.methods.getListing();
    this.methods.getCategory();
  }

  componentWillReceiveProps(nextProps) {
    this.categories = nextProps.category.sort((a, b) => (a.categoryName < b.categoryName ? -1 : 1));
    console.log('changed');
    this.setState({
      listings: nextProps.listing,
      filteredListings: nextProps.listing,
    });
    //eslint-disable-next-line
    console.log('market next: ', nextProps);
  }

  filterBy(filter) {
    if (filter === 'showAll') {
      this.methods.getListing();
    } else {
      // clear the current list of items
      this.setState({
        listings: [],
        filteredListings: [],
      });

      // get category id
      const catId = this.categories.filter(category => category.categoryName === filter)[0].id;

      this.methods.getListing(`categoryId=${catId}`);
      // for (let i = 0; i < this.props.category.length; i++) {
      //   const category = this.props.category[i];

      //   if (category.CategoryId === null) {
      //     // display parent category listings and all its subcategory listings
      //     if (category.categoryName === filter) {
      //       let newListings = [];
      //       newListings = newListings.concat(category.Listings);
      //       for (let j = 0; j < category.subCategory.length; j++) {
      //         const subcategory = category.subCategory[j];
      //         newListings = newListings.concat(subcategory.Listings);
      //       }
      //       this.setState({
      //         listings: newListings,
      //         filteredListings: newListings,
      //       });
      //       break;
      //     }
      //   } else {
      //     // display subcategory listings
      //     if (category.categoryName === filter) {
      //       this.setState({
      //         listings: category.Listings,
      //         filteredListings: category.Listings,
      //       });
      //       break;
      //     }
      //   }
      // }
    }
  }

  searchFor(query) {
    const newListings = this.state.listings.filter(listing =>
      listing.name.toUpperCase().includes(query.toUpperCase())
    );
    this.setState({
      filteredListings: newListings,
    });
  }

  login(userData) {
    //eslint-disable-next-line
    console.log(`logging in as ${userData.username}`);
    let query = [];
    Object.keys(userData).forEach(key => query.push(`${key}=${userData[key]}`));
    query = query.join('&');
    this.methods.getSession(query);
    setTimeout(this.methods.isLoggedIn, 500);
    this.user = userData;
  }

  signup(userData) {
    //eslint-disable-next-line
    console.log('signing up as', userData);
    this.methods.postUser(userData);
  }

  render() {
    if (this.state.loading) {
      return <Loading message={'Loading Marketplace'} />;
    }
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
          <button className="marketplace-button post-item-button">Post an Item</button>
          <h3>Items</h3>
          <ProductList products={this.state.filteredListings} />
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
  listing: PropTypes.array.isRequired,
  category: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);
