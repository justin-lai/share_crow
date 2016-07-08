import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { store } from '../../index';
import { getUser, postUser, putUser, deleteUser } from '../../actions/userActions';
import { getListing, postListing, putListing, deleteListing } from '../../actions/listingActions';
import { getSession, isLoggedIn, refreshComponent } from '../../actions/sessionActions';
import { getCategory } from '../../actions/categoryActions';
import { signup, login, signout } from '../../helpers/authHelpers';
import NavBar from '../Navigation/NavBar';
import Search from './Search';
import Filters from './Filters';
import ProductList from './ProductList';
import LoadingBar from './../Shared/LoadingBar';

// require('../../assets/styles/app.scss');

class Marketplace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: props.searchFilter || '',
      sortFilter: 'closest',
      listings: [],
      filteredListings: [],
      listingsLoadedOnce: false,
    };

    this.categories = [];
    this.filterBy = this.filterBy.bind(this);
    this.searchFor = this.searchFor.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.methods = this.props.methods;
    this.methods.isLoggedIn();
  }

  componentDidMount() {
    //eslint-disable-next-line
    this.methods.getListing('', listings => {
      const newListings = [];
      if (this.props.isAuth.status) {
        listings.forEach(listing => {
          const user2location = `${listing.owner.address} ${listing.owner.state}`;
          fetch(`http://localhost:3000/api/distanceMatrix?origin=${this.props.isAuth.userInfo.address}&destination=${user2location}`)
            .then(response3 => response3.json())
              .then(responseData3 => {
                const listingWithDistance = listing;
                listingWithDistance.distance = responseData3.miles;
                newListings.push(listingWithDistance);

                if (newListings.length === listings.length) {
                  console.log('NEW LISTINGS~~~~~~~~~~~~~~~~~~', newListings);
                  this.setState({
                    listings: newListings,
                    filteredListings: newListings.filter(filteredListing =>
                      filteredListing.name.toUpperCase().includes(this.state.filter.toUpperCase())
                    ),
                  });
                }
              });
        });
      } else {
        this.setState({
          listings,
          filteredListings: listings.filter(filteredListing =>
            filteredListing.name.toUpperCase().includes(this.state.filter.toUpperCase())
          ),
        });
      }
    });
    this.methods.getCategory();

    // grabs the search filter (from Landing search bar) if it exists
    document.getElementById('search-input').value = this.props.searchFilter;
    store.dispatch({
      type: 'SEARCH_FILTER',
      search: '',
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.componentNeedsRefresh) {
      this.methods.refreshComponent(false);
      this.componentDidMount();
    }

    this.categories = nextProps.category;
    // this.setState({
    //   listings: nextProps.listing,
    //   filteredListings: nextProps.listing.filter(listing =>
    //     listing.name.toUpperCase().includes(this.state.filter.toUpperCase())
    //   ),
    // });
  }

  filterBy(filter) {
    if (filter === 'showAll') {
      // this.methods.getListing();
      this.setState({
        filteredListings: this.state.listings,
      });
    } else {
      // determine the category id
      const catId = this.categories.filter(category => category.categoryName === filter)[0].id;

      this.setState({
        filteredListings: this.state.listings.filter(listing =>
          listing.Categories[0].CategoryId === catId || listing.Categories[0].id === catId
        ),
      });
      // // get category id
      // const catId = this.categories.filter(category => category.categoryName === filter)[0].id;

      // this.methods.getListing(`categoryId=${catId}`);
    }
  }

  searchFor(query) {
    const newListings = this.state.listings.filter(listing =>
      listing.name.toUpperCase().includes(query.toUpperCase())
    );
    this.setState({
      filter: query,
      filteredListings: newListings,
    });
  }

  sortBy(e, alt) {
    const sortFilter = e ? e.target.value : alt;
    let sorted = this.state.filteredListings;
    switch (sortFilter) {
      case 'closest':
        sorted = sorted.sort((a, b) => {
          const distA = a.distance.replace(',', '').replace(' mi', '');
          const distB = b.distance.replace(',', '').replace(' mi', '');
          return distB - distA;
        });
        break;
      case 'newest':
        sorted = sorted.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case 'item-a-z':
        sorted = sorted.sort((a, b) => b.name.toUpperCase().localeCompare(a.name.toUpperCase()));
        break;
      case 'item-z-a':
        sorted = sorted.sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()));
        break;
      case 'owner-a-z':
        sorted = sorted.sort((a, b) =>
          b.owner.username.toUpperCase().localeCompare(a.owner.username.toUpperCase())
        );
        break;
      case 'owner-z-a':
        sorted = sorted.sort((a, b) =>
          a.owner.username.toUpperCase().localeCompare(b.owner.username.toUpperCase())
        );
        break;
      default:
    }
    this.setState({
      filteredListings: sorted,
    });
  }

  isFetchingData() {
    const isFetching = Object.keys(this.props.isFetching).some(key => this.props.isFetching[key]);
    if (this.props.isFetching.listing) return false;
    return isFetching;
  }

  render() {
    if (this.state.loading) {
      return <LoadingBar message={'Loading Marketplace'} />;
    }
    return (
      <div id="marketplace">
        <NavBar
          isLoggedIn={this.props.isAuth.status || false}
          username={this.props.isAuth.username || ''}
          login={login}
          signup={signup}
          signout={signout}
        />
        <Filters categories={this.categories} filterBy={this.filterBy} />
        <div id="marketplace-search-container">
          <Search searchFor={this.searchFor} />
          <label id="label-sort-by-filter" htmlFor="sort-by-filter">Sort by:</label>
          <select
            id="sort-by-filter"
            className="styled-select blue semi-square"
            onChange={this.sortBy}
          >
            <option disabled selected value> -- select an option -- </option>
            <option value="closest">Nearby You</option>
            <option value="newest">Most Recent</option>
            <option value="item-a-z">Item Name (A-Z)</option>
            <option value="item-z-a">Item Name (Z-A)</option>
            <option value="owner-a-z">Owner Name (A-Z)</option>
            <option value="owner-z-a">Owner Name (Z-A)</option>
          </select>
        </div>
        {this.isFetchingData() ?
          <LoadingBar /> :
          <div id="marketplace-items-container">
            <h3>Items</h3>
            <ProductList products={this.state.filteredListings.reverse()} lazyLoad />
          </div>
        }
      </div>
    );
  }
}

Marketplace.propTypes = {
  isAuth: PropTypes.object.isRequired,
  isFetching: PropTypes.object.isRequired,
  searchFilter: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { user, listing, category, session, isAuth,
    isFetching, componentNeedsRefresh, searchFilter } = state;

  return {
    user,
    listing,
    category,
    session,
    isAuth,
    isFetching,
    componentNeedsRefresh,
    searchFilter,
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
      getListing: (id, cb) => {
        dispatch(getListing(id, cb));
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
      refreshComponent: (bool) => {
        dispatch(refreshComponent(bool));
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
