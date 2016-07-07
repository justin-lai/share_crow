import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, postUser, putUser, deleteUser } from '../../actions/userActions';
import { getListing, postListing, putListing, deleteListing } from '../../actions/listingActions';
import { getMessage, postMessage, putMessage, deleteMessage } from '../../actions/messageActions';
import { getSession, isLoggedIn, refreshComponent } from '../../actions/sessionActions';
import { getCategory } from '../../actions/categoryActions';
import { signup, login, signout } from '../../helpers/authHelpers';
import Landing from './Landing';
import ProductCarousel from './ProductCarousel';
import NavBar from '../Navigation/NavBar';
// import Footer from '../Shared/Footer';
import LoadingBar from '../Shared/LoadingBar';

class App extends Component {
  constructor(props) {
    super(props);

    this.products = [];
    this.methods = this.props.methods;
    this.methods.isLoggedIn();
  }

  componentWillMount() {
    this.methods.getListing();
  }

  componentWillReceiveProps(nextProps) {
    // this.methods.isLoggedIn();
    if (nextProps.componentNeedsRefresh) {
      this.methods.refreshComponent(false);
      this.componentDidMount();
    }

    this.products = nextProps.listing;
  }

  isFetchingData() {
    const isFetching = Object.keys(this.props.isFetching).some(key => this.props.isFetching[key]);
    return isFetching;
  }

  render() {
    return (
      <div id="app">
        <NavBar
          isLoggedIn={this.props.isAuth.status || false}
          username={this.props.isAuth.username || ''}
          login={login}
          signup={signup}
          signout={signout}
        />
        {this.isFetchingData() ?
          <LoadingBar /> :
          <div>
            <Landing
              signup={signup}
              history={this.props.history}
            />
            <ProductCarousel products={this.products} />
          </div>
        }
      </div>
    );
  }
}

App.propTypes = {
  methods: PropTypes.object.isRequired,
  isAuth: PropTypes.object.isRequired,
  isFetching: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user, listing, message, notification, category,
    session, isAuth, isFetching, componentNeedsRefresh } = state;

  return {
    user,
    listing,
    message,
    notification,
    session,
    category,
    isAuth,
    isFetching,
    componentNeedsRefresh,
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
      getMessage: (id) => {
        dispatch(getMessage(id));
      },
      postMessage: (data) => {
        dispatch(postMessage(data));
      },
      putMessage: (data) => {
        dispatch(putMessage(data));
      },
      deleteMessage: (data) => {
        dispatch(deleteMessage(data));
      },
      getNotification: (id) => {
        dispatch(getMessage(id));
      },
      postNotification: (data) => {
        dispatch(postMessage(data));
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


export default connect(mapStateToProps, mapDispatchToProps)(App);
