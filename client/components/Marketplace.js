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
const fetch = require('isomorphic-fetch');

class Marketplace extends Component {
  constructor(props) {
    super(props);
    this.products = [];
    this.categories = [];
    this.state = {
      loading: true,
    };
    this.filterBy = this.filterBy.bind(this);
    this.searchFor = this.searchFor.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    fetch('/main/listing')
      .then(res => res.json())
        .then(responseData => {
          this.products = responseData;
          console.log('product list: ', this.products);
        })
          .then(() => this.setState({ loading: false }));
    // this.props.methods.getListing();
    this.props.methods.getCategory();
    this.props.methods.isLoggedIn();
  }

  componentWillReceiveProps(nextProps) {
    this.categories = nextProps.category;
    // this.categories = {};
    // const context = this;
    // nextProps.category
    //   .filter(category => category.CategoryId === null)
    //   .forEach(category => {
    //     const name = category.categoryName;
    //     const id = category.id;
    //     context.categories[id] = { name, children: [] };
    //   });
    // nextProps.category
    //   .filter(category => category.CategoryId !== null)
    //   .forEach(category => {
    //     const name = category.categoryName;
    //     const id = category.id;
    //     const parentId = category.CategoryId;
    //     context.categories[parentId].children.push({ name, id });
    //   });

    // console.log(this.categories);
  }

  filterBy(category) {
    console.log('cat: ', category);
    // this.props.methods.getListing() by category
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
          <h3>Items</h3>
          <ProductList products={this.products} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);

