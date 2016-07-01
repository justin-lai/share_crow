import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, postUser, putUser, deleteUser } from '../../actions/userActions';
import { getListing, postListing, putListing, deleteListing } from '../../actions/listingActions';
import { getSession, isLoggedIn } from '../../actions/sessionActions';
import { getCategory } from '../../actions/categoryActions';
import NavBar from '../Navigation/NavBar';
import Search from './Search';
import Filters from './Filters';
import ProductList from './ProductList';
import Footer from './../Shared/Footer';
import LoadingBar from './../Shared/LoadingBar';

// require('../../assets/styles/app.scss');

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

  isFetchingData() {
    const isFetching = Object.keys(this.props.isFetching).some(key => this.props.isFetching[key]);
    if (!isFetching) console.log('marketplace props: ', this.props);
    return isFetching;
  }

  render() {
    return this.isFetchingData() ?
      <div id="marketplace">
        <NavBar
          isLoggedIn={this.props.isAuth.status || false}
          username={this.props.isAuth.username || ''}
        />
        <LoadingBar />;
      </div>
    :
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
      </div>;
  }
}

Marketplace.propTypes = {
  isAuth: PropTypes.object.isRequired,
  isFetching: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user, listing, category, session, isAuth, isFetching } = state;

  return {
    user,
    listing,
    category,
    session,
    isAuth,
    isFetching,
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
